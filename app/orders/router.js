const router = require("express").Router();
const Controller = require("./controller");

router.post("/", Controller.Orders);

module.exports = router;
