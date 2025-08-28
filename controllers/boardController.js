import Board from "../models/Board.js";
import RoleAccess from "../models/RoleAccess.js";

// Create Board (auto superAdmin)
export const createBoard = async (req, res) => {
  try {
    const { title, color } = req.body;
    const userId = req.user.id;

    const board = await Board.create({
      title,
      color,
      user: userId,
      members: [userId],
    });

    await RoleAccess.create({
      user: userId,
      owner: userId,
      board: board._id,
      role: "superAdmin",
      permissions: [
        "board.create","board.update","board.delete",
        "list.create","list.update","list.delete",
        "card.create","card.update","card.delete",
        "card.upload","card.checkbox","card.comment"
      ],
    });

    res.status(201).json({ message: "Board created", board });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBoards = async (req, res) => {
  try {
    const userId = req.user.id;
    const boards = await Board.find({ members: userId });
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const { title, color } = req.body;
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      { title, color },
      { new: true }
    );
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
