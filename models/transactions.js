const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Transactions = mongoose.model("transactions", transactionsSchema);

module.exports = Transactions;
