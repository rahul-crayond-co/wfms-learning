const express = require("express");
const {
  getChecklist,
  createChecklist,
  updateChecklist,
  deleteChecklist,
  updateChecklistStatus,
} = require("../controllers/checklists");
const roleAuthorization = require("../middleware/roleAuthorization");

const router = express.Router();

const middlwareHasPathId = roleAuthorization(4);
router.use(middlwareHasPathId);

router.get("/", getChecklist);
router.post("/", createChecklist);
router.put("/", updateChecklist);
router.delete("/:id", deleteChecklist);
router.patch("/update-checklist-status", updateChecklistStatus);

module.exports = router;
