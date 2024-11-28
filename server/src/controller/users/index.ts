import { Request, Response } from "express";
import { users } from "../../utils/users";

export const getAllUsers = (req: Request, res: Response) => {    
  res.status(200).json({
    success: true,
    message: "ok",
    data: users,
  });
};
