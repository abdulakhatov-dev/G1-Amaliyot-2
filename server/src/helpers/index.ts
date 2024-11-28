import { Response } from "express";
import jwt from "jsonwebtoken";

export const NotFoundHandler = (res: Response, title: string) => {
  return res.status(404).json({
    success: false,
    message: `${title} not found`,
  });
};

export const generateToken = (
  payload: object,
  secretKey: string,
  expiresIn = "1d"
) =>
  jwt.sign(payload, secretKey, {
    expiresIn,
  });
