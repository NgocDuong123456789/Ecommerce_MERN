import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import  brandController  from "../Controller/BrandController";
import express from "express";

const router = express.Router();
router.post('/',[requiredSignIn, isAdmin], brandController.createBrand)
router.get('/', brandController.getBrand)
router.put('/:_id',[requiredSignIn, isAdmin], brandController.updateBrand)
router.delete('/:_id',[requiredSignIn, isAdmin], brandController.deleteBrand)
export default router;