import List from "../models/List.js";

// Create List
export const createList = async (req, res) => {
  try {
    const { title, board, color, estimate } = req.body;
    const user = req.user.id;

    const list = await List.create({
      title,
      board,
      user,
      color,
      estimate: estimate || null,
    });

    res.status(201).json({ message: "List created", list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all Lists of a board
export const getLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    const lists = await List.find({ board: boardId });
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update List
export const updateList = async (req, res) => {
  try {
    const { title, color, estimate } = req.body;
    const list = await List.findByIdAndUpdate(
      req.params.id,
      { title, color, estimate },
      { new: true }
    );
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete List
export const deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.json({ message: "List deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
