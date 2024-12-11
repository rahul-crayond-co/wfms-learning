const pool = require("../config/db");
const queries = require("../queries");

const getTasksByProject = (req, res) => {
  const { project_id } = req.query;
  if (project_id) {
    pool
      .query(queries.getTaskByProjectId, [project_id, req.user.uid])
      .then((queryRes) => {
        res.status(200).json({
          tasks: queryRes.rows,
        });
      })
      .catch((e) => {
        res.status(500).json({
          error: e?.message,
        });
      });
  } else {
    res.status(500).json({
      error: "project_id is required to fetch all tasks",
    });
  }
};

const createTask = (req, res) => {
  const { name, start_date, end_date, estimated_hrs, user_id, project_id } =
    req.body;
  const created_at = new Date().toISOString();
  pool
    .query(queries.createTask, [
      name,
      start_date,
      end_date,
      estimated_hrs,
      project_id,
      user_id,
      created_at,
      req.user.user_name,
    ])
    .then(() => {
      res.status(201).json({
        message: "Task created successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e?.message,
      });
    });
};

const updateTask = (req, res) => {
  const { name, start_date, end_date, estimated_hrs, user_id, id } = req.body;
  const updated_at = new Date().toISOString();
  pool
    .query(queries.updateTask, [
      name,
      start_date,
      end_date,
      estimated_hrs,
      user_id,
      updated_at,
      req.user.user_name,
      id,
    ])
    .then(() => {
      res.status(200).json({
        message: "Task updated successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e?.message,
      });
    });
};

const deleteTask = (req, res) => {
  if (req.params.task_id) {
    pool
      .query(queries.deleteTask, [req.params.task_id])
      .then(() => {
        res.status(204).json({
          message: "Task deleted successfully",
        });
      })
      .catch((e) => {
        res.status(500).json({
          message: e?.message,
        });
      });
  } else {
    res.status(500).json({
      error: "task_id is required to delete the task",
    });
  }
};

const updateTaskStatus = (req, res) => {
  const { task_id, status_id } = req.body;
  pool
    .query(queries.updateTaskStatus, [status_id, task_id])
    .then(() => {
      res.status(200).json({
        message: "Task status updated successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e?.message,
      });
    });
};

module.exports = {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
