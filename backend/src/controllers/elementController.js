const Element = require('../models/Element');

const getElements = async (req, res) => {
  try {
    const elements = await Element.find({}).sort({ Atomic_Number: 1 });
    res.json(elements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getElements,
};