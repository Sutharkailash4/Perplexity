import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
// import { sendEmail } from "../services/mail.service.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User with this email or username already exists",
        success: false,
        error: "User Already Exists"
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
      verified: true // Automatically set to true since email verification is disabled
    });

    /* EMAIL VERIFICATION DISABLED
    const emailVerificationToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_EMAIL_VERIFICATION_TOKEN,
      {
        expiresIn: "1d"
      }
    );

    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity",
      html: `
        <p>Hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
          Verify your email
        </a>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>The Perplexity Team</p>
      `
    });
    */

    return res.status(201).json({
      message: "User registered successfully.", // Updated message
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      success: false,
      error: error.message
    });
  }
};

/* EMAIL VERIFICATION CONTROLLER DISABLED
export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_EMAIL_VERIFICATION_TOKEN
    );

    const verifiedUser = await userModel.findByIdAndUpdate(
      decoded.id,
      { verified: true },
      { new: true }
    );

    if (!verifiedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.send(`
      <div style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:5173/login">Go To Login</a>
      </div>
    `);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired verification token",
      success: false,
      error: error.message
    });
  }
};
*/

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
        error: "User does not exist"
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
        error: "Password does not match"
      });
    }

    /* EMAIL VERIFICATION CHECK DISABLED
    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email before logging in",
        success: false,
        error: "Email not verified"
      });
    }
    */

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    };

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      success: false,
      error: error.message
    });
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      success: false,
      error: error.message
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    };

    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
      success: false,
      error: error.message
    });
  }
};