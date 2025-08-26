import RoleAccess from "../models/Roleaccess.js";

// Default permissions for each role
const defaultPermissions = {
  superAdmin: ["board.create","board.update","board.delete",
               "list.create","list.update","list.delete",
               "card.create","card.update","card.delete",
               "card.checkbox","card.upload","card.comment"],
  admin: ["list.create","list.update",
          "card.create","card.update","card.delete",
          "card.checkbox","card.upload","card.comment"],
  member: [] // initially empty, superAdmin/admin will assign
};

export const assignPermissions = async (req, res, next) => {
  try {
    const { role, permissions, assignToRole } = req.body;

    if (!role) return res.status(400).json({ error: "Role is required" });

    // Determine actual permissions to assign
    let permsToAssign = [];

    if (role === "superAdmin") {
      permsToAssign = defaultPermissions.superAdmin;
    } else if (role === "admin") {
      // Admin can assign only to members
      if (assignToRole && assignToRole !== "member") {
        return res.status(403).json({ error: "Admins can assign only to members" });
      }
      permsToAssign = defaultPermissions.admin.concat(permissions || []);
    } else if (role === "member") {
      permsToAssign = permissions || [];
    }

    // Find or create RoleAccess
    let roleAccess = await RoleAccess.findOne({ role });
    if (!roleAccess) {
      roleAccess = await RoleAccess.create({ role, permissions: permsToAssign });
    } else {
      permsToAssign.forEach((perm) => {
        if (!roleAccess.permissions.includes(perm)) {
          roleAccess.permissions.push(perm);
        }
      });
      await roleAccess.save();
    }

    req.roleAccess = roleAccess;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};