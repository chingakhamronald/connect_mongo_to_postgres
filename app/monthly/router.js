const router = require("express").Router();
const Controller = require("./controller");

router.post("/", Controller.Monthly);

module.exports = router;
