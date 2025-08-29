import RoleAccess from "../models/RoleAccess.js";

const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const boardId = req.params.id;
      const userId = req.user && req.user.id;

      if (!userId) return res.status(401).json({ message: "Unauthorized: user not found in request" });
      if (!boardId) return res.status(400).json({ message: "Bad request: board ID missing" });

      const roleAccess = await RoleAccess.findOne({ user: userId, board: boardId });
      if (!roleAccess) return res.status(403).json({ message: "Permission denied: no role assigned for this board" });
      if (!roleAccess.permissions.includes(permission)) {
        return res.status(403).json({ message: `Permission denied: missing required permission '${permission}'` });
      }

      req.roleAccess = roleAccess;
      next();

    } catch (err) {
      console.error("Error in checkPermission middleware:", err);
      return res.status(500).json({ message: "Internal server error while checking permissions", error: err.message });
    }
  };
};

export default checkPermission;
