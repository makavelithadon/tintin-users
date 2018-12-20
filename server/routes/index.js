const express = require("express");

const router = express.Router();

require("./User")(router);

module.exports = router;
