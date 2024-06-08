require("dotenv").config({ path: "../.env" });
const { connectToDatabase } = require("../connect");
const Transactions = require("../models/transactions");
const User = require("../models/user");
const { faker } = require("@faker-js/faker");

connectToDatabase(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

function createRandomUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
  };
}

async function generateRandomUsers() {
  const users = faker.helpers.multiple(createRandomUser, { count: 100 });
  try {
    await User.insertMany(users);
  } catch (err) {
    console.log(err);
  }
}

function createRandomTransaction(userId) {
  const status = ["success", "pending", "failed"];

  return {
    status: status[Math.floor(Math.random() * status.length)],
    type: ["debit", "credit"][Math.floor(Math.random() * 2)],
    amount: Math.floor(Math.random() * 10000),
    transactionDate: faker.date.past(),
    userId: userId,
  };
}

async function generateAllTransactions() {
  const users = await User.find();
  users.forEach(async (user) => {
    const transactions = faker.helpers.multiple(
      () => createRandomTransaction(user._id),
      { count: 500 }
    );
    try {
      await Transactions.insertMany(transactions);
    } catch (err) {
      console.log(err);
    }
  });
  return;
}

generateAllTransactions();
