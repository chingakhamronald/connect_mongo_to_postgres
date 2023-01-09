const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bodyparser = require("body-parser");
const path = require("path");
const csv = require("fast-csv");

const app = express();

// app.use(bodyparser.json());
// app.use(
//   bodyparser.urlencoded({
//     extended: true,
//   })
// );

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    console.log({ fileName: file.originalname });

    callBack(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
}).single("uploadcsv");

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.post("/api/uploadcsv", upload, (req, res) => {
  // csvToDb(__dirname + "/uploads/" + req.file.filename);
  res.json({
    msg: "File successfully inserted!",
    file: req.file,
  });
});

// function csvToDb(csvUrl) {
//   let stream = fs.createReadStream(csvUrl);
//   let collectionCsv = [];
//   let csvFileStream = csv
//     .parse()
//     .on("data", function (data) {
//       collectionCsv.push(data);
//     })
//     .on("end", function () {
//       collectionCsv.shift();
//       db.connect((error) => {
//         if (error) {
//           console.error(error);
//         } else {
//           let query = "INSERT INTO users (id, name, email) VALUES ?";
//           db.query(query, [collectionCsv], (error, res) => {
//             console.log(error || res);
//           });
//         }
//       });
//       fs.unlinkSync(csvUrl);
//     });
//   stream.pipe(csvFileStream);
// }

const PORT = 8003;

app.listen(PORT, () => console.log(`Node app serving on port: ${PORT}`));
