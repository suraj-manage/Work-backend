import express from "express";
import auth from "../Middleware/auth.js";
import { assignRole, getRolePermissions } from "../controllers/roleController.js";

const router = express.Router();

router.post("/", auth, assignRole);
router.get("/:boardId/:role", auth, getRolePermissions);

export default router;
