const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String
    }
  ],
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
