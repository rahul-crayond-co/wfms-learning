const express = require("express");
const {
  createProject,
  getProjectsByUser,
  updateProject,
  assignProjectMembers,
  deleteProject,
} = require("../controllers/projects");
const roleAuthorization = require("../middleware/roleAuthorization");

const router = express.Router();

const middlwareHasPathId = roleAuthorization(1);
router.use(middlwareHasPathId);

router.get("/", getProjectsByUser);
router.post("/", createProject);
router.put("/", updateProject);
router.post("/assign-members", assignProjectMembers);
router.delete("/", deleteProject);

module.exports = router;
