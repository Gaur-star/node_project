import express from "express";
import rateLimit from "express-rate-limit";

import {
  register,
  verifyCode,
  resendCode,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});

router.post(
  "/register",
  authLimiter,
  register
);

router.post(
  "/verify-code",
  authLimiter,
  verifyCode
);

router.post(
  "/resend-code",
  authLimiter,
  resendCode
);

router.post(
  "/login",
  loginLimiter,
  login
);

router.post(
  "/refresh",
  authLimiter,
  refresh
);

router.post(
  "/logout",
  authLimiter,
  logout
);

router.post(
  "/forgot-password",
  authLimiter,
  forgotPassword
);

router.post(
  "/reset-password",
  authLimiter,
  resetPassword
);

router.get(
  "/me",
  requireAuth,
  me
);

export default router;