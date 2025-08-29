import express from "express";
import auth from "../Middleware/auth.js";
import checkPermission from "../Middleware/checkpermissions.js";
import assignPermission from "../Middleware/RoleAccess.js"; // ESM default export
import { revokePermissions } from "../Middleware/Revokepermissions.js"; // ESM named export

import {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard
} from "../controllers/boardController.js";

const router = express.Router();

// Board CRUD
router.post("/", auth, createBoard);
router.get("/", auth, getBoards);
router.get("/:id", auth, getBoard);
router.patch("/:id", auth, checkPermission("board.update"), updateBoard);
router.delete("/:id", auth, checkPermission("board.delete"), deleteBoard);

// Assign / Revoke Roles (superAdmin only)
router.post("/:id/assign", auth, checkPermission("board.assign"), assignPermission);
router.post("/:id/revoke", auth, checkPermission("board.revoke"), revokePermissions);

export default router;
