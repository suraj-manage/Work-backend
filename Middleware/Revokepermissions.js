import RoleAccess from "../models/RoleAccess.js";

const revokePermissions = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "superAdmin") {
      return res.status(403).json({ message: "Forbidden: Only superAdmin can revoke roles" });
    }

    const { role, permissions } = req.body;
    if (!role) return res.status(400).json({ message: "Role is required" });
    if (!Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({ message: "Permissions must be a non-empty array" });
    }

    const roleAccess = await RoleAccess.findOne({ role });
    if (!roleAccess) return res.status(404).json({ message: `Role '${role}' not found` });

    roleAccess.permissions = roleAccess.permissions.filter(p => !permissions.includes(p));
    await roleAccess.save();

    req.roleAccess = roleAccess;
    next();

  } catch (error) {
    console.error("Error revoking permissions:", error);
    return res.status(500).json({ message: "Internal server error while revoking permissions", error: error.message });
  }
};

export { revokePermissions };
