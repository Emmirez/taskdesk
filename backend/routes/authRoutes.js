// routes/authRoutes.js
import { Router } from "express";
import {
  register,
  login,
  logout,
  refresh,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updatePassword,
  updateProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import {
  validate,
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
} from "../middleware/validate.js";
import {
  authLimiter,
  forgotPasswordLimiter,
} from "../middleware/rateLimiter.js";

const router = Router();

//  Public 
router.post("/register", authLimiter, registerRules, validate, register);
router.post("/login", authLimiter, loginRules, validate, login);
router.post("/refresh", refresh);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordRules,
  validate,
  forgotPassword,
);
router.post(
  "/reset-password/:token",
  resetPasswordRules,
  validate,
  resetPassword,
);
router.get("/verify-email/:token", verifyEmail);

//  Private 
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
router.put("/update-password", protect, updatePassword);
router.put("/update-profile", protect, updateProfile);

export default router;
