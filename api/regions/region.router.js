const {
  createRegion,
  getRegionByRegionId,
  getRegions,
  updateRegion,
  deleteRegion,
} = require("./region.controller.js");

const router = require("express").Router();
const token = require("../../auth/token_validation");

router.post("/", token.checkToken, createRegion);
router.get("/", getRegions);
router.get("/:id", getRegionByRegionId);
router.patch("/:id", token.checkToken, updateRegion);
router.delete("/:id", token.checkToken, deleteRegion);

module.exports = router;
