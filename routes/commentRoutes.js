import express from "express";
import auth from "../Middleware/auth.js";
import { addComment, getComments, deleteComment } from "../controllers/commentController.js";
import checkPermission from "../Middleware/checkpermissions.js";

const router = express.Router();

router.post("/", auth, checkPermission("card.comment"), addComment);
router.get("/:cardId", auth, getComments);
router.delete("/:id", auth, checkPermission("card.comment"), deleteComment);

export default router;
