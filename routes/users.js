const express = require("express");
const {
  getAllUsers,
  createUser,
  login,
  logout,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
