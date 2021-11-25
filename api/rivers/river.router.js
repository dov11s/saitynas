const {
  createRiver,
  getRiverByRiverId,
  getRivers,
  updateRiver,
  deleteRiver,
} = require("./river.controller.js");

const router = require("express").Router();
const token = require("../../auth/token_validation");

router.post("/", token.checkToken, createRiver);
router.get("/", getRivers);
router.get("/:id", getRiverByRiverId);
router.patch("/:id", token.checkToken, updateRiver);
router.delete("/:id", token.checkToken, deleteRiver);

module.exports = router;
