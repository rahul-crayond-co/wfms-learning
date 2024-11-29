const express = require("express");
const {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/tasks");
const roleAuthorization = require("../middleware/roleAuthorization");

const router = express.Router();

const middlwareHasPathId = roleAuthorization(3);
router.use(middlwareHasPathId);

router.get("/", getTasksByProject);
router.post("/", createTask);
router.put("/", updateTask);
router.delete("/:task_id", deleteTask);
router.patch("/update-task-status", updateTaskStatus);

module.exports = router;
