import RoleAccess from "../models/RoleAccess.js";

const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const userId = req.user.id;

      const roleAccess = await RoleAccess.findOne({ user: userId, board: boardId });
      if (!roleAccess || !roleAccess.permissions.includes(permission)) {
        return res.status(403).json({ message: "Permission denied" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
};

export default checkPermission;
