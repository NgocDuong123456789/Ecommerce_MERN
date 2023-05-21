import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import  blogController  from "../Controller/ProductcategoryController";
import express from "express";

const router = express.Router();
router.post('/',[requiredSignIn, isAdmin],blogController.createBlog)
router.get('/',blogController.getBlog)
router.put('/:_id',[requiredSignIn, isAdmin],blogController.updateBlog)
router.delete('/:_id',[requiredSignIn, isAdmin],blogController.deleteBlog)
export default router;