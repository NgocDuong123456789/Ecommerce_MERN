import express  from "express";
import { authController } from "../Controller/authController";
import { requiredSignIn , isAdmin} from "../middleware/authMiddleware";

const router= express.Router();

router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/refresh_token", authController.refreshToken)
router.post("/logout",authController.logout)

// test routes
router.get('/test',requiredSignIn ,authController.test)

export default router;