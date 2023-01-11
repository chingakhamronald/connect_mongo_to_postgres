const router = require("express").Router();
const Controller = require("./controller");
const upload = require("../../multer.config");

router.post("/", upload, Controller.Csv);

module.exports = router;
