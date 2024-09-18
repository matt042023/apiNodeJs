const express = require("express");
const router = express.Router();
const { welcome } = require("../controller/base-controller");

router.get("/api", welcome);

module.exports = router;