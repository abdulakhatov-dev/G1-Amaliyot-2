import { Request, Response } from "express";
import { category } from "../../utils/category";

export const getAllCategories = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "ok",
    data: category,
  });
};
