// backend/models/Element.js
const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Symbol: { type: String, required: true },
    Atomic_Number: { type: Number, required: true },
    Atomic_Weight: { type: Number },
    Phase: { type: String },
  },
  { collection: "elementstable" }
);

module.exports = mongoose.model("elementstable", ElementSchema);