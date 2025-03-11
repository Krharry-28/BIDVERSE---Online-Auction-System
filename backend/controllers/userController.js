import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

// Register User
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.profileImage) {
    return next(new ErrorHandler("Profile image is required.", 400));
  }

  const { profileImage } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("Invalid file format. Use PNG, JPEG, or WebP.", 400));
  }

  const {
    userName,
    email,
    password,
    phone,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    easypaisaAccountNumber,
    paypalEmail,
  } = req.body;

  if (!userName || !email || !phone || !password || !address || !role) {
    return next(new ErrorHandler("Please fill in all required fields.", 400));
  }

  if (role === "Auctioneer") {
    if (!bankAccountName || !bankAccountNumber || !bankName) {
      return next(new ErrorHandler("Please provide full bank details.", 400));
    }
    if (!easypaisaAccountNumber) {
      return next(new ErrorHandler("Easypaisa account number is required.", 400));
    }
    if (!paypalEmail) {
      return next(new ErrorHandler("Paypal email is required.", 400));
    }
  }

  // Check if user already exists
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered.", 400));
  }

  // Upload profile image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
    folder: "MERN_AUCTION_PLATFORM_USERS",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Upload Error:", cloudinaryResponse.error);
    return next(new ErrorHandler("Failed to upload profile image.", 500));
  }

  // Create new user
  const user = await User.create({
    userName,
    email,
    password, // Password will be hashed in userSchema.js (pre-save hook)
    phone,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: { bankAccountNumber, bankAccountName, bankName },
      easypaisa: { easypaisaAccountNumber },
      paypal: { paypalEmail },
    },
  });

  // Generate token and send response
  generateToken(user, "User registered successfully.", 201, res);
});

// Login User
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter both email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }

  generateToken(user, "Login successful.", 200, res);
});

// Get User Profile
export const getProfile = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      sameSite: "Strict",
    })
    .json({
      success: true,
      message: "Logout successful.",
    });
});

// Fetch Leaderboard (Sorted by Money Spent)
export const fetchLeaderboard = catchAsyncErrors(async (req, res, next) => {
  const leaderboard = await User.find({ moneySpent: { $gt: 0 } })
    .sort({ moneySpent: -1 }) // Sort descending
    .select("userName moneySpent"); // Select only needed fields

  res.status(200).json({
    success: true,
    leaderboard,
  });
});
