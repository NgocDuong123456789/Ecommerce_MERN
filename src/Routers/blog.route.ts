import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import  BlogController from "../Controller/BlogController";
import express from "express";
const uploadImage = require("../config/Cloudinary")
const router = express.Router();

router.put('/uploadImageBlog/:pid',[requiredSignIn,isAdmin],uploadImage.single('image'),BlogController.uploadImageBlog)
router.put('/like/:bid',[requiredSignIn],BlogController.likeBlog)
router.put('/diskLike/:bid',[requiredSignIn],BlogController.diskLikeBlog)
router.post('/',[requiredSignIn, isAdmin],BlogController.createNewBlog)
router.get('/',BlogController.getBlog)
router.get('/getblog',BlogController.getOneBlog)
router.put('/:_id',[requiredSignIn, isAdmin],BlogController.updateBlog)
router.delete('/:_id',[requiredSignIn, isAdmin],BlogController.deleteBlog)

export default router;