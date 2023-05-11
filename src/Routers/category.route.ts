import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import  categoryController  from "../Controller/CategoryController";
import express from "express";

const router = express.Router();
router.post('/',[requiredSignIn, isAdmin],categoryController.createCategory)
router.get('/',categoryController.getCategory)
router.put('/:_id',[requiredSignIn, isAdmin],categoryController.updateCategory)
router.delete('/:_id',[requiredSignIn, isAdmin],categoryController.deleteCategory)
export default router;