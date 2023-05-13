import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import  couponController  from "../Controller/CouponController";
import express from "express";

const router = express.Router();
router.post('/',[requiredSignIn, isAdmin], couponController.createCoupon)
router.get('/', couponController.getCoupon)
router.put('/:_id',[requiredSignIn, isAdmin], couponController.updateCoupon)
router.delete('/:_id',[requiredSignIn, isAdmin], couponController.deleteCoupon)
export default router;