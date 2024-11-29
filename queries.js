module.exports = {
  getRoles: "SELECT * from roles",
  createUser:
    "INSERT INTO users (uid, name, email, phone, role_id) VALUES ($1, $2, $3, $4, $5)",
  getUserDetails: "SELECT * FROM users WHERE uid = $1",
  getRoleAccess:
    "SELECT * FROM previliges_roles_mapping WHERE role_id = $1 AND privilige_id = $2",
  // PROJECT QUERIES
  createProject:
    "INSERT INTO projects (name, start_date, end_date, created_at, created_by) VALUES ($1, $2, $3, $4, $5)",
  updateProject:
    "UPDATE projects SET (name, start_date, end_date, updated_at, updated_by) = ($1, $2, $3, $4, $5) WHERE id = $6",
  getProjectsByUid:
    "SELECT p.id, p.name, p.start_date, p.end_date, sm.name as project_status FROM projects_users_mapping as pum LEFT JOIN projects as p ON pum.project_id = p.id LEFT JOIN status_master as sm ON sm.id = p.status_id where user_id = $1",
  deleteProject: "DELETE FROM projects where id = $1",
  // TASK QUERIS
  createTask:
    "INSERT INTO tasks (name, start_date, end_date, estimated_hrs, project_id, user_id, created_at, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
  updateTask:
    "UPDATE tasks SET (name, start_date, end_date, estimated_hrs, user_id, updated_at, updated_by) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8",
  deleteTask: "DELETE FROM tasks where id = $1",
  updateTaskStatus: "UPDATE tasks SET status_id = $1 WHERE id = $2",
  getTaskByProjectId:
    "SELECT * FROM tasks where project_id = $1 AND user_id = $2",
  // CHECKLIST QUERIES
  getChecklist: "SELECT * FROM checklists WHERE task_id = $1",
  createChecklist:
    "INSERT INTO checklists (name, task_id, created_at, created_by) VALUES ($1, $2, $3, $4)",
  updateChecklist:
    "UPDATE checklists SET (name, updated_at, updated_by) = ($1, $2, $3) WHERE id = $4",
  deleteChecklist: "DELETE FROM checklists WHERE id = $1",
  updateChecklistStatus: "UPDATE checklists SET status_id = $1 WHERE id = $2",
};
