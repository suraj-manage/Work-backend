import express from "express";
import auth from "../Middleware/auth.js";
import checkPermission from "../Middleware/checkpermissions.js";
import { createCard, getCards, updateCard, deleteCard } from "../controllers/cardController.js";

const router = express.Router();

router.post("/", auth, checkPermission("card.create"), createCard);
router.get("/:listId", auth, getCards);
router.patch("/:id", auth, checkPermission("card.update"), updateCard);
router.delete("/:id", auth, checkPermission("card.delete"), deleteCard);

export default router;
