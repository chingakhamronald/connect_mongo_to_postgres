const router = require("express").Router();
const Controller = require("./controller");

router.get("/", Controller.Orders);

module.exports = router;
