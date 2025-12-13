const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  status: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
