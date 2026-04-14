// middleware/auth.js
import jwt  from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised — no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password -refreshToken");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User belonging to this token no longer exists" });
    }

    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"  ? "Token expired — please log in again" :
      err.name === "JsonWebTokenError"  ? "Invalid token" :
      "Not authorised";

    return res.status(401).json({ success: false, message });
  }
};

export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Role '${req.user.role}' is not allowed to perform this action`,
    });
  }
  next();
};
