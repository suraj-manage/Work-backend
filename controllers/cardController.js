import Card from "../models/Card.js";

// Create Card
export const createCard = async (req, res) => {
  try {
    const { title, desp, board, list, color, estimate } = req.body;
    const user = req.user.id;

    const card = await Card.create({
      title,
      desp: desp || "",
      board,
      list,
      user,
      color,
      estimate: estimate || null,
    });

    res.status(201).json({ message: "Card created", card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all Cards of a list
export const getCards = async (req, res) => {
  try {
    const { listId } = req.params;
    const cards = await Card.find({ list: listId });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Card
export const updateCard = async (req, res) => {
  try {
    const { title, desp, color, estimate, checked } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { title, desp, color, estimate, checked },
      { new: true }
    );
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Card
export const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
