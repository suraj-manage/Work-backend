import express from "express";
import auth from "../Middleware/auth.js";
import checkPermission from "../Middleware/checkpermissions.js";
import { createList, getLists, updateList, deleteList } from "../controllers/listController.js";

const router = express.Router();

router.post("/", auth, checkPermission("list.create"), createList);
router.get("/:boardId", auth, getLists);
router.patch("/:id", auth, checkPermission("list.update"), updateList);
router.delete("/:id", auth, checkPermission("list.delete"), deleteList);

export default router;
