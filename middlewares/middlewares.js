const { isValidObjectId } = require("mongoose");

const validateQueryParams = (req, res, next) => {
  const { from, to } = req.query;
  if (from && isNaN(Date.parse(from))) {
    return res.status(400).json({ error: "Invalid from date" });
  }
  if (to && isNaN(Date.parse(to))) {
    return res.status(400).json({ error: "Invalid to date" });
  }
  next();
};

const validatePagination = (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (!page || page <= 0) {
    page = 1;
  }

  if (!limit || limit <= 0) {
    limit = 10;
  }

  req.pagination = { page, limit };
  next();
};

const validateUserId = (req, res, next, val) => {
  if (!isValidObjectId(val))
    return res.status(400).json({ error: "Invalid user id" });
  next();
};

module.exports = { validateQueryParams, validatePagination, validateUserId };
