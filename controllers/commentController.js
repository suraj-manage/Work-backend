import Comment from "../models/Comment.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const { text, board, list, card } = req.body;
    const user = req.user.id;

    const comment = await Comment.create({
      text,
      board,
      list,
      card,
      user,
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get comments for a card
export const getComments = async (req, res) => {
  try {
    const { cardId } = req.params;
    const comments = await Comment.find({ card: cardId });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
