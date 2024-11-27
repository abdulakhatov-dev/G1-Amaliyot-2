import { Response } from "express";

export const NotFoundHandler = (res: Response, title: string) => {
  return res.status(404).json({
    success: false,
    message: `${title} not found`,
  });
};
