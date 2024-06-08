const { isValidObjectId } = require("mongoose");
const Transactions = require("../models/transactions");
const { default: mongoose } = require("mongoose");

async function getAllTransactions(req, res) {
  const { status, from, to, type } = req.query;
  const { page, limit } = req.pagination;

  const match = {};
  if (status) match.status = status;
  if (type) match.type = type;
  if (from || to) {
    match.transactionDate = {};
    if (from) match.transactionDate.$gte = new Date(from);
    if (to) match.transactionDate.$lte = new Date(to);
  }
  try {
    const transactions = await Transactions.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);
    const totalTransactions = await Transactions.countDocuments(match);
    res.json({
      message: "All transactions with user details",
      filters: { status, from, to, type },
      data: transactions,
      pagination: {
        total: totalTransactions,
        page: page,
        limit: limit,
        pages: Math.ceil(totalTransactions / limit),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "No transactions found",
    });
  }
}

async function getUserTransactions(req, res) {
  const id = req.params.id;
  const { status, from, to, type } = req.query;
  const { page, limit } = req.pagination;
  const match = { userId: new mongoose.Types.ObjectId(id) };
  if (status) match.status = status;
  if (type) match.type = type;
  if (from || to) {
    match.transactionDate = {};
    if (from) match.transactionDate.$gte = new Date(from);
    if (to) match.transactionDate.$lte = new Date(to);
  }

  try {
    const transactions = await Transactions.aggregate([
      { $match: match },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    const totalTransactions = await Transactions.countDocuments(match);

    res.json({
      message: `Transactions for user ${id}`,
      filters: { status, from, to, type },
      data: transactions,
      pagination: {
        total: totalTransactions,
        page,
        pages: Math.ceil(totalTransactions / limit),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "User not found",
    });
  }
}

module.exports = {
  getAllTransactions,
  getUserTransactions,
};
