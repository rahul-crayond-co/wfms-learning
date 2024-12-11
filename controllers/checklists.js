const pool = require("../config/db");
const queries = require("../queries");

const getChecklist = (req, res) => {
  const { task_id } = req.query;
  if (task_id) {
    pool
      .query(queries.getChecklist, [task_id])
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
      error: "task_id is required to fetch all checklists",
    });
  }
};

const createChecklist = (req, res) => {
  const { task_id, name } = req.body;
  const created_at = new Date().toISOString();
  pool
    .query(queries.createChecklist, [
      name,
      task_id,
      created_at,
      req.user.user_name,
    ])
    .then(() => {
      res.status(201).json({
        message: "Checklist created successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: e?.message,
      });
    });
};

const updateChecklist = (req, res) => {
  const { id, name } = req.body;
  const updated_at = new Date().toISOString();
  pool
    .query(queries.updateChecklist, [name, updated_at, req.user.user_name, id])
    .then(() => {
      res.status(200).json({
        message: "Checklist updated successfully",
      });
    })
    .catch((e) => {
      res.status(500).json({
        error: e?.message,
      });
    });
};

const deleteChecklist = (req, res) => {
  if (req?.params?.id) {
    pool
      .query(queries.deleteChecklist, [req.params.id])
      .then(() => {
        res.status(204).json({
          message: "Checklist deleted successfully",
        });
      })
      .catch((e) => {
        res.status(500).json({
          error: e?.message,
        });
      });
  } else {
    res.status(500).json({
      error: "checklist_id is required to delete the checklist",
    });
  }
};

const updateChecklistStatus = (req, res) => {
  const { id, status_id } = req.body;
  if (id) {
    pool
      .query(queries.updateChecklistStatus, [status_id, id])
      .then(() => {
        res.status(201).json({
          message: "Checklist status updated successfully",
        });
      })
      .catch((e) => {
        res.status(500).json({
          error: e?.message,
        });
      });
  } else {
    res.status(500).json({
      error: "checklist_id is required to update the status of the checklist",
    });
  }
};

module.exports = {
  getChecklist,
  createChecklist,
  updateChecklist,
  deleteChecklist,
  updateChecklistStatus,
};
