import express from "express";
import auth from "../Middleware/auth.js";
import checkPermission from "../Middleware/checkpermissions.js";
import {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/", auth, createBoard);
router.get("/", auth, getBoards);
router.get("/:id", auth, getBoard);
router.patch("/:id", auth, checkPermission("board.update"), updateBoard);
router.delete("/:id", auth, checkPermission("board.delete"), deleteBoard);

export default router;
