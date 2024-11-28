import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }

  jwt.verify(token, "n9-legendary", (error) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
    next();
  });
};
