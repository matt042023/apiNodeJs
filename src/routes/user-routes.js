const express = require("express");
const router = express.Router();
const { getAllUser, getUsersbyID, createUsers, deleteUsers, updateUsers, loginUser } = require("../controller/user-controller");
const { verifyToken } = require("../middleware/auth");

router.get("/all-users",getAllUser);
router.get("/by-id/:id", getUsersbyID);
router.post("/create-user", createUsers);
router.delete("/delete-user/:id",verifyToken,deleteUsers);
router.put("/update-user/:id",updateUsers);
router.post("/login", loginUser);

module.exports = router;