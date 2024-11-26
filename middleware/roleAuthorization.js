const pool = require("../config/db");
const queries = require("../queries");

const roleAuthorization = (pathId) => {
  return (req, res, next) => {
    pool
      .query(queries.getRoleAccess, [req.user.role_id, pathId])
      .then((queryRes) => {
        req.permission = queryRes.rows[0];
        next();
      })
      .catch((e) => {
        res.status(500).json({
          error: e?.message,
        });
      });
  };
};

module.exports = roleAuthorization;
