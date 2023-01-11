const prisma = require("../../constant/client");
const fs = require("fs");
const csv = require("fast-csv");

module.exports.Csv = async (req, res) => {
  const stream = fs.createReadStream(
    "/home/cr7/connect_mongo_to_postgres/uploads/" + req.file.filename
  );

  const collectionCsv = [];
  try {
    const csvFileStream = csv
      .parse()
      .on("data", (data) => {
        collectionCsv.push(data);
      })
      .on("end", async () => {
        const headers = collectionCsv.shift();
        const filterData = collectionCsv
          .map((e) => {
            const obj = headers.map((h, idx) => {
              return [h, e[idx]];
            });
            return Object.fromEntries(obj);
          })
          .map((data) => {
            return {
              ref_no: data["Ref No"] ?? "",
              merchant_name: data["Merchant Name"] ?? "",
              merchant_city: data["Merchant City"] ?? "",
              date_time: data["Tx Date Time"],
              m_id: data.MID ?? "",
              t_id: data.TID ?? "",
              cust_device_id: data.Cust_Device_Id ?? "",
              tip_amount: data["Tip Amount"] ?? "",
              amount: data.Amount ?? "",
              card_no: data["Card Number"] ?? "",
              tx_status: data["Tx Status"] ?? "",
              type: data.Type ?? "",
              auth_no: data["Auth No"] ?? "",
              rr_no: data["RR No"] ?? "",
              cr_type: data["Cr/Db Type"] ?? "",
              batch_no: data["Batch No"] ?? "",
              batch_total: data["Batch Total"] ?? "",
              login_id: data["Login ID"] ?? "",
              card_holder_mobile: data["Card Holder Mobile"] ?? "",
              card_holder_name: data["Card Holder Name"] ?? "",
              card_txn_type: data["Card Txn Type"] ?? "",
              email: data["Card Holder Email Id"] ?? "",
              notes: data.Notes ?? "",
              application_no: data["Application No"] ?? "",
              folio_no: data["Folio No"] ?? "",
              schema_type: data["Scheme Type"] ?? "",
              sub_fund_name: data["SubFund Name"] ?? "",
              client_id: data.ClientId ?? "",
              extra_note1: data["Extra Notes 1"] ?? "",
              extra_note2: data["Extra Notes 2"] ?? "",
              extra_note3: data["Extra Notes 3"] ?? "",
              extra_note4: data["Extra Notes 4"] ?? "",
              extra_note5: data["Extra Notes 5"] ?? "",
              extra_note6: data["Extra Notes 6"] ?? "",
              extra_note7: data["Extra Notes 7"] ?? "",
              extra_note8: data["Extra Notes 8"] ?? "",
              extra_note9: data["Extra Notes 9"] ?? "",
              extra_note10: data["Extra Notes 10"] ?? "",
            };
          });

        await prisma.card.createMany({
          data: filterData,
        });
      });

    stream.pipe(csvFileStream);

    res
      .status(200)
      .json({ msg: "File successfully inserted!", file: req.file });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
