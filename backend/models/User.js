// models/User.js
import mongoose from "mongoose";
import bcrypt   from "bcryptjs";
import crypto   from "crypto";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, "Name is required"],
      trim:      true,
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    email: {
      type:      String,
      required:  [true, "Email is required"],
      unique:    true,
      lowercase: true,
      trim:      true,
      match:     [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type:      String,
      required:  [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select:    false,
    },
    role: {
      type:    String,
      enum:    ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type:    Boolean,
      default: false,
    },
    resetPasswordToken:   String,
    resetPasswordExpires: Date,
    emailVerifyToken:     String,
    emailVerifyExpires:   Date,
    refreshToken: {
      type:   String,
      select: false,
    },
    avatar: {
      type:    String,
      default: "",
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

//  Hash password before save 
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt    = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance: compare password 
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//  Instance: generate password reset token
UserSchema.methods.generateResetToken = function () {
  const rawToken            = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken   = crypto.createHash("sha256").update(rawToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
  return rawToken;
};

//  Instance: generate email verify token 
UserSchema.methods.generateEmailVerifyToken = function () {
  const rawToken          = crypto.randomBytes(32).toString("hex");
  this.emailVerifyToken   = crypto.createHash("sha256").update(rawToken).digest("hex");
  this.emailVerifyExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hrs
  return rawToken;
};

//  Virtual: initials 
UserSchema.virtual("initials").get(function () {
  return this.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
});

export default mongoose.model("User", UserSchema);
