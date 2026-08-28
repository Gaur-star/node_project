import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../models/User.js";

import {
  generateOTP,
  hashOTP
} from "../utils/otp.js";

import {
  createAccessToken,
  createRefreshToken,
  hashToken
} from "../services/token.service.js";

import {
  sendVerificationEmail,
  sendPasswordResetEmail
} from "../services/email.service.js";

const REFRESH_COOKIE_NAME = "refreshToken";

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth"
  };
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified
  };
}

/**
 * REGISTER
 */
export async function register(req, res, next) {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({
      email: normalizedEmail
    });

    if (user && user.isVerified) {
      return res.status(409).json({
        message: "Account already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const code = generateOTP();

    const verificationCodeHash = hashOTP(code);

    const expires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    if (!user) {
      user = await User.create({
        name,
        email: normalizedEmail,
        passwordHash,
        isVerified: false,
        verificationCodeHash,
        verificationCodeExpiresAt: expires
      });
    } else {
      user.name = name;
      user.passwordHash = passwordHash;
      user.verificationCodeHash = verificationCodeHash;
      user.verificationCodeExpiresAt = expires;

      await user.save();
    }

    await sendVerificationEmail(
      normalizedEmail,
      code
    );

    res.status(201).json({
      message: "Verification code sent",
      email: normalizedEmail
    });
  } catch (error) {
    next(error);
  }
}

/**
 * VERIFY EMAIL
 */
export async function verifyCode(req, res, next) {
  try {
    const {
      email,
      code
    } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Email and verification code are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification request"
      });
    }

    if (
      !user.verificationCodeHash ||
      !user.verificationCodeExpiresAt
    ) {
      return res.status(400).json({
        message: "No verification code available"
      });
    }

    if (
      user.verificationCodeExpiresAt.getTime() <
      Date.now()
    ) {
      return res.status(400).json({
        message: "Verification code expired"
      });
    }

    const valid =
      hashOTP(code) === user.verificationCodeHash;

    if (!valid) {
      return res.status(400).json({
        message: "Invalid verification code"
      });
    }

    user.isVerified = true;
    user.verificationCodeHash = null;
    user.verificationCodeExpiresAt = null;

    await user.save();

    res.json({
      message: "Account verified successfully"
    });
  } catch (error) {
    next(error);
  }
}

/**
 * RESEND VERIFICATION CODE
 */
export async function resendCode(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.json({
        message: "If the account exists, a code has been sent"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Account is already verified"
      });
    }

    const code = generateOTP();

    user.verificationCodeHash = hashOTP(code);

    user.verificationCodeExpiresAt =
      new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendVerificationEmail(
      user.email,
      code
    );

    res.json({
      message: "Verification code sent"
    });
  } catch (error) {
    next(error);
  }
}

/**
 * LOGIN
 */
export async function login(req, res, next) {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
        requiresVerification: true
      });
    }

    const passwordValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const accessToken =
      createAccessToken(user);

    const refreshToken =
      createRefreshToken(user);

    user.refreshTokenHash =
      hashToken(refreshToken);

    await user.save();

    res.cookie(
      REFRESH_COOKIE_NAME,
      refreshToken,
      refreshCookieOptions()
    );

    res.json({
      accessToken,
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

/**
 * REFRESH TOKEN
 */
export async function refresh(req, res, next) {
  try {
    const refreshToken =
      req.cookies[REFRESH_COOKIE_NAME];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing"
      });
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(
      payload.sub
    );

    if (!user || !user.refreshTokenHash) {
      return res.status(401).json({
        message: "Invalid refresh token"
      });
    }

    if (
      hashToken(refreshToken) !==
      user.refreshTokenHash
    ) {
      return res.status(401).json({
        message: "Invalid refresh token"
      });
    }

    const accessToken =
      createAccessToken(user);

    res.json({
      accessToken,
      user: publicUser(user)
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token"
    });
  }
}

/**
 * LOGOUT
 */
export async function logout(req, res, next) {
  try {
    const refreshToken =
      req.cookies[REFRESH_COOKIE_NAME];

    if (refreshToken) {
      try {
        const payload = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );

        await User.findByIdAndUpdate(
          payload.sub,
          {
            refreshTokenHash: null
          }
        );
      } catch {
        // Token already invalid/expired.
      }
    }

    res.clearCookie(
      REFRESH_COOKIE_NAME,
      refreshCookieOptions()
    );

    res.json({
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
}

/**
 * CURRENT USER
 */
export async function me(req, res, next) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

/**
 * FORGOT PASSWORD
 */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.json({
        message:
          "If the account exists, a reset code has been sent"
      });
    }

    const code = generateOTP();

    user.resetCodeHash = hashOTP(code);

    user.resetCodeExpiresAt =
      new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendPasswordResetEmail(
      normalizedEmail,
      code
    );

    res.json({
      message: "Password reset code sent"
    });
  } catch (error) {
    next(error);
  }
}

/**
 * RESET PASSWORD
 */
export async function resetPassword(req, res, next) {
  try {
    const {
      email,
      code,
      newPassword
    } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        message:
          "Email, code and new password are required"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid reset request"
      });
    }

    if (
      !user.resetCodeHash ||
      !user.resetCodeExpiresAt
    ) {
      return res.status(400).json({
        message: "Reset code is invalid"
      });
    }

    if (
      user.resetCodeExpiresAt.getTime() <
      Date.now()
    ) {
      return res.status(400).json({
        message: "Reset code expired"
      });
    }

    if (
      hashOTP(code) !==
      user.resetCodeHash
    ) {
      return res.status(400).json({
        message: "Invalid reset code"
      });
    }

    user.passwordHash =
      await bcrypt.hash(newPassword, 12);

    user.resetCodeHash = null;
    user.resetCodeExpiresAt = null;

    // Invalidate existing sessions.
    user.refreshTokenHash = null;

    await user.save();

    res.json({
      message: "Password reset successfully"
    });
  } catch (error) {
    next(error);
  }
}