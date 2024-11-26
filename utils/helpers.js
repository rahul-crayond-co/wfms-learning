module.exports = {
  checkPermission: (req, res, permission) => {
    if (req?.permission?.[permission]) {
      return true;
    } else {
      res.status(401).json({
        error: `You have no access to this ${req.originalUrl} ${req.method} request`,
      });
      return false;
    }
  },
  bulkInsertPlaceholders: (data = []) => {
    return data
      .map((_, index) => {
        const offset = index + 2;
        return `($1, $${offset})`;
      })
      .join(", ");
  },
};
