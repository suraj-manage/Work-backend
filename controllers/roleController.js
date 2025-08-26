import RoleAccess from "../models/RoleAccess.js";

// Assign role / permissions
export const assignRole = async (req, res) => {
  try {
    const { userId, boardId, role, permissions } = req.body;

    const existing = await RoleAccess.findOne({ user: userId, board: boardId });
    if (existing) {
      existing.role = role;
      existing.permissions = permissions;
      await existing.save();
      return res.json({ message: "Role updated", roleAccess: existing });
    }

    const newRole = await RoleAccess.create({
      user: userId,
      board: boardId,
      role,
      permissions
    });

    res.status(201).json({ message: "Role assigned", roleAccess: newRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get permissions for role
export const getRolePermissions = async (req, res) => {
  try {
    const { boardId, role } = req.params;
    const roleAccess = await RoleAccess.findOne({ board: boardId, role });
    if (!roleAccess) return res.status(404).json({ message: "Role not found" });
    res.json(roleAccess.permissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};