const pool = require("../config/db");
const queries = require("../queries");
const { checkPermission, bulkInsertPlaceholders } = require("../utils/helpers");

const getProjectsByUser = async (req, res) => {
  // if (checkPermission(req, res, "read")) {
  pool
    .query(queries.getProjectsByUid, [req.user.uid])
    .then((queryRes) => {
      res.status(200).json({
        projects: queryRes.rows,
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: e?.message,
      });
    });
  // }
};

const createProject = async (req, res) => {
  // if (checkPermission(req, res, "add")) {
  const { name, start_date, end_date } = req.body;
  const created_at = new Date().toISOString();
  pool
    .query(queries.createProject, [
      name,
      start_date,
      end_date,
      created_at,
      req.user.user_name,
    ])
    .then(() => {
      res.status(201).json({
        message: "Project created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error?.message,
      });
    });
  // }
};

const updateProject = (req, res) => {
  // if (checkPermission(req, res, "update")) {
  const { id, name, start_date, end_date } = req.body;
  const updated_at = new Date().toISOString();
  pool
    .query(queries.updateProject, [
      name,
      start_date,
      end_date,
      updated_at,
      req.user.user_name,
      id,
    ])
    .then(() => {
      res.status(200).json({
        message: "Project updated successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error?.message,
      });
    });
  // }
};

const assignProjectMembers = (req, res) => {
  // if (checkPermission(req, res, "add")) {
  const { project_id, user_ids = [] } = req.body;
  const constructBulkInsertPlaceholder = bulkInsertPlaceholders(user_ids);
  pool
    .query(
      `INSERT INTO projects_users_mapping (project_id, user_id) VALUES ${constructBulkInsertPlaceholder}`,
      [project_id, ...user_ids]
    )
    .then(() => {
      res.status(201).json({
        message: "Project members assigned successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error?.message,
      });
    });
  // }
};

const deleteProject = (req, res) => {
  // if (checkPermission(req, res, "delete")) {
  if (req.params.project_id) {
    pool
      .query(queries.deleteProject, [req.params.project_id])
      .then(() => {
        res.status(200).json({
          message: "Project deleted successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error?.message,
        });
      });
  } else {
    res.status(500).json({
      error: "project_id is required to delete the project",
    });
  }
  // }
};

module.exports = {
  createProject,
  updateProject,
  getProjectsByUser,
  assignProjectMembers,
  deleteProject,
};
