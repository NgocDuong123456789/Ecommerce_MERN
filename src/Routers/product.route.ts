import { isAdmin,requiredSignIn } from "../middleware/authMiddleware";
import { productController } from "../Controller/ProductController";
import express  from "express";

const router = express.Router();
router.post('/',[isAdmin,requiredSignIn],productController.createProduct)
router.get('/', productController.getAllProduct)
router.get('/:_id', productController.getProduct)
router.delete('/:_id',[isAdmin,requiredSignIn], productController.deleteProduct)
router.put('/:_id',[isAdmin,requiredSignIn], productController.updateProduct)
export default router 