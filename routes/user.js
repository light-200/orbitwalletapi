const express = require("express");
const { getUser, getAllUsers } = require("../controllers/user");
const { validateUserId } = require("../middlewares/middlewares");
const router = express.Router();

router.get("/", getAllUsers);

router.param("id", validateUserId);
router.get("/:id", getUser);

module.exports = router;
