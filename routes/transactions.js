const express = require("express");
const {
  getUserTransactions,
  getAllTransactions,
} = require("../controllers/transactions");
const {
  validateQueryParams,
  validatePagination,
  validateUserId,
} = require("../middlewares/middlewares");
const router = express.Router();

router.use(validateQueryParams);
router.use(validatePagination);

router.get("/", getAllTransactions);

router.param("id", validateUserId);
router.get("/user/:id", getUserTransactions);

module.exports = router;
