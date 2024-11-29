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

const middlwareHasPathId = roleAuthorization(2);
router.use(middlwareHasPathId);

router.get("/", getProjectsByUser);
router.post("/", createProject);
router.put("/", updateProject);
router.delete("/:project_id", deleteProject);
router.post("/assign-members", assignProjectMembers);

module.exports = router;
