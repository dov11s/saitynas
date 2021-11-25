const {
  createUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  userOrders,
} = require("./user.controller.js");
const router = require("express").Router();
const token = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/", token.checkToken, getUsers);
router.get("/orders", token.checkToken, userOrders);

router.get("/:id", token.checkToken, getUserByUserId);
router.patch("/:id", token.checkToken, updateUser);
router.delete("/:id", token.checkToken, deleteUser);
router.post("/login", loginUser);

module.exports = router;
