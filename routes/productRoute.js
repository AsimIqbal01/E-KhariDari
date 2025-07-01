import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// Routes
// Create Product Route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update Product Route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Getting All Products Route
router.get("/get-product", getProductController);

// Getting Single Products Route
router.get("/get-product/:slug", getSingleProductController);

// Photo Products Route
router.get("/product-photo/:pid", productPhotoController);

// Delete Product Route
router.delete("/delete-product/:pid", deleteProductController);

// Count Products Route
router.get("/product-count", productCountController);

// Product Per Page Route
router.get("/product-list/:page", productListController);

// Search Product Controller Route
router.get("/search/:keyword", searchProductController);

// Related Product Controller Route
router.get("/related-product/:pid/:cid", relatedProductController);

// Category Wise Product Controller Route
router.get("/product-category/:slug", productCategoryController);

// Payments Route
// Token From Braintree
router.get("/braintree/token", braintreeTokenController);

// Payment Gateway By Braintree
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
