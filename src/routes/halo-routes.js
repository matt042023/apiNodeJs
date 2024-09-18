const express = require("express");
const router = express.Router();
const { getAllShipInformations, getInformationsdetails, createOfficiersMember, deleteMembers, updateMembers } = require("../controller/halo-controller");

router.get("/all-ship",getAllShipInformations);
router.get("/by-id/:id", getInformationsdetails);
router.post("/create-member", createOfficiersMember);
router.delete("/delete-member/:id",deleteMembers);
router.put("/update-member/:id",updateMembers);

module.exports = router;