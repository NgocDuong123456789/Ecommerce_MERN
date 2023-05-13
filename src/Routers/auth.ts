import express  from "express";
import { authController } from "../Controller/authController";
import { requiredSignIn , isAdmin} from "../middleware/authMiddleware";

const router= express.Router();

router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/refresh_token", authController.refreshToken)
router.post("/logout",requiredSignIn,authController.logout)
router.get("/forgetpassword", authController.forgotPassword)
router.put('/api/user/reset-password', authController.resetPassword)
// test routes
router.put('/addToCart',[requiredSignIn],authController.addToCart)
router.put('/address',[requiredSignIn, isAdmin],authController.updateAddressUser)
router.get('/current',requiredSignIn ,authController.test)
router.get('/alluser', [requiredSignIn, isAdmin],authController.getAllUser)
router.delete('/:_id',[requiredSignIn, isAdmin],authController.deleteUser)
router.put('/curent',requiredSignIn,authController.updateUser)
router.put('/:_id',[requiredSignIn, isAdmin],authController.updateByAdmin)

export default router;