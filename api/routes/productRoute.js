const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductDetails,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAdminProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// -- user && admin roles
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);

// --admin roles
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

//reviews
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser ,authorizeRoles("admin"), deleteReview);
module.exports = router;
