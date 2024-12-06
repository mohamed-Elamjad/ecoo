const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contactController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/contact/new").post(createContact);
router
  .route("/admin/contacts")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllContacts);
router
  .route("/admin/contact/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteContact);
module.exports = router;
