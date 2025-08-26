import RoleAccess from "../models/Roleaccess.js";

export const revokePermissions = async (req, res, next) => {
  try {
    const { role, permissions } = req.body;

    if (!role || !permissions || !Array.isArray(permissions)) {
      return res.status(400).json({ error: "Role and permissions array required" });
    }

    // Find RoleAccess for this role
    const roleAccess = await RoleAccess.findOne({ role });
    if (!roleAccess) return res.status(404).json({ error: "RoleAccess not found" });

    // Remove permissions from array
    roleAccess.permissions = roleAccess.permissions.filter(
      perm => !permissions.includes(perm)
    );

    await roleAccess.save();
    req.roleAccess = roleAccess;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
