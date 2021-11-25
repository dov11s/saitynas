const {
  createOrder,
  getOrderByOrderId,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("./order.controller.js");

const router = require("express").Router();
const token = require("../../auth/token_validation");

router.post("/", token.checkToken, createOrder);
router.get("/", token.checkToken, getOrders);
router.get("/:id", token.checkToken, getOrderByOrderId);
router.patch("/:id", token.checkToken, updateOrder);
router.delete("/:id", token.checkToken, deleteOrder);

module.exports = router;
