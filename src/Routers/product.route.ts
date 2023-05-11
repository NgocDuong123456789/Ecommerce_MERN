import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import { productController } from "../Controller/ProductController";
import express from "express";

const router = express.Router();
router.put("/ratings", requiredSignIn, productController.ratings);
router.post("/", [requiredSignIn, isAdmin], productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:_id", productController.getProduct);
router.delete(
  "/:_id",
  [isAdmin, requiredSignIn],
  productController.deleteProduct
);
router.put("/:_id", [isAdmin, requiredSignIn], productController.updateProduct);

export default router;
