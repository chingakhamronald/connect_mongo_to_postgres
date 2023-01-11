const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
}).single("uploadcsv");

module.exports = upload;
