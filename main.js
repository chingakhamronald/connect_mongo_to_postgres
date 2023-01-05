const prisma = require("./constant/client");
const fs = require("fs");
const csv = require("fast-csv");
const { mergeMap, switchMap, tap, retry, defer, of, range } = require("rxjs");

function flattenObject(ob) {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

const csvStream = csv.format({
  headers: true,
  objectMode: true,
  transform: (r) => flattenObject(r),
});

const csvOutStream = fs.createWriteStream("out.csv", "utf8");

csvStream.pipe(csvOutStream);

let sub = null;

(async () => {
  const total = (await prisma.card.count()) ?? 0;
  const pageSize = 1000;
  const pages = Math.ceil(total / pageSize);
  let started = 0;
  let finished = 0;

  const CONCURRENCY_LEVEL = 5;
  const RETRY_CONFIG = { count: 5, delay: 1000 };

  const fetchPage = (no) => {
    const f = () => {
      return defer(async () => {
        const skip = Math.max(no - 1, 0) * pageSize;
        const monthly =
          await prisma.$queryRaw`SELECT * FROM mswipe LIMIT ${pageSize} OFFSET ${skip}`;

        return monthly;
      }).pipe(
        tap({
          error: () => console.error("Retrying", no),
        }),
        retry(RETRY_CONFIG)
      );
    };

    return of(no).pipe(
      tap(() => (started += 1)),
      tap(() =>
        console.log(`Started: ${started} Finished: ${finished} Total: ${pages}`)
      ),
      switchMap(f)
    );
  };

  sub = range(1, pages)
    .pipe(
      mergeMap(fetchPage, CONCURRENCY_LEVEL),
      tap(() => (finished += 1))
    )
    .subscribe({
      next: (s) => {
        console.log(
          `Started: ${started} Finished: ${finished} Total: ${pages}`
        );
        s.forEach((r) => csvStream.write(r));
      },
      error: (e) => console.error("Error:", e),
      complete: () => {
        csvStream.end();
        sub?.unsubscribe();
      },
    });
})();

process.on("SIGINT", () => {
  csvOutStream.close();
  sub?.unsubscribe();
  prisma.$disconnect().finally(() => {
    process.exit(-1);
  });
});
