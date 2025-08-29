import RoleAccess from "../models/RoleAccess.js";
import Board from "../models/Board.js";

const assignPermission = async (req, res) => {
  try {
    const boardId = req.params.id;
    const requesterId = req.user && req.user.id;
    const { userId, role, permissions } = req.body;

    if (!requesterId) return res.status(401).json({ message: "Unauthorized: no user in request" });
    if (!boardId) return res.status(400).json({ message: "Board ID missing" });
    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!role) return res.status(400).json({ message: "Role is required" });
    if (!Array.isArray(permissions)) return res.status(400).json({ message: "Permissions must be an array" });

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    const requesterRole = await RoleAccess.findOne({ user: requesterId, board: boardId, role: "superAdmin" });
    if (!requesterRole) return res.status(403).json({ message: "Forbidden: only superAdmin can assign roles" });

    let roleDoc = await RoleAccess.findOne({ user: userId, board: boardId });
    if (!roleDoc) {
      roleDoc = await RoleAccess.create({ user: userId, board: boardId, role, permissions, owner: board.owner });
    } else {
      const existingPermissions = new Set(roleDoc.permissions);
      permissions.forEach(p => existingPermissions.add(p));
      roleDoc.role = role;
      roleDoc.permissions = [...existingPermissions];
      await roleDoc.save();
    }

    if (!board.members.includes(userId)) {
      board.members.push(userId);
      await board.save();
    }

    return res.status(200).json({ success: true, message: "Role assigned successfully", role: roleDoc });

  } catch (err) {
    console.error("Error in assignPermission:", err);
    return res.status(500).json({ message: "Internal server error while assigning role", error: err.message });
  }
};

export default assignPermission;
