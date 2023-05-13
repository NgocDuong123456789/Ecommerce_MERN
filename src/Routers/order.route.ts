import { isAdmin, requiredSignIn } from "../middleware/authMiddleware";
import   orderController from "../Controller/orderController";
import express from "express";

const router = express.Router();

router.post('/',[requiredSignIn],orderController.createOrder)
router.put('/status/:oid',[requiredSignIn, isAdmin],orderController.createOrder)
router.get('/',[requiredSignIn],orderController.getUserOrder)
router.get('/',[requiredSignIn,isAdmin],orderController.getAdminOrder)

export default router;