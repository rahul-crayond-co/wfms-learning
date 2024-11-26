module.exports = {
  getRoles: "SELECT * from roles",
  createUser:
    "INSERT INTO users (uid, name, email, phone, role_id) VALUES ($1, $2, $3, $4, $5)",
  getUserDetails: "SELECT * FROM users WHERE uid = $1",
  getRoleAccess:
    "SELECT * FROM previliges_roles_mapping WHERE role_id = $1 AND privilige_id = $2",
  createProject:
    "INSERT INTO projects (name, start_date, end_date, created_at, created_by) VALUES ($1, $2, $3, $4, $5)",
  updateProject:
    "UPDATE projects SET (name, start_date, end_date, updated_at, updated_by) = ($1, $2, $3, $4, $5) WHERE id = $6",
  getProjectsByUid:
    "SELECT p.id, p.name, p.start_date, p.end_date, sm.name as project_status FROM projects_users_mapping as pum LEFT JOIN projects as p ON pum.project_id = p.id LEFT JOIN status_master as sm ON sm.id = p.status_id where user_id = $1",
  deleteProject: "DELETE FROM projects where id = $1",
};
