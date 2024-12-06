const express = require("express");
const router = express.Router();
const {
  createCategory,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// -- user && admin roles
router.route("/admin/category/new").post(isAuthenticatedUser, authorizeRoles("admin"),createCategory);

module.exports = router;
