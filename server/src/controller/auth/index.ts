import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { IUser } from "../../interfaces";
import { users } from "../../utils/users";
import { apiErrorHandler } from "../../errors";
import { generateToken, NotFoundHandler } from "../../helpers";
import { validateSignIn, validateSignUp } from "../../validation/auth";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "n9-legendary";

export const signUp = async (req: Request, res: Response) => {
  try {
    const body = validateSignUp(req.body);

    const exisitingUser = users.find(
      (user: IUser) => user?.email === req.body.email
    );

    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = {
      _id: uuidv4(),
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: hashedPassword,
    };

    users.unshift(newUser);

    // Create token;
    const token = generateToken({ email: body.email }, SECRET_KEY, "1s");

    res.status(200).json({
      success: true,
      message: "You have successfully signed up!",
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    apiErrorHandler(res, error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const body = validateSignIn(req.body);

    const user = users.find((user: IUser) => user.email === body.email);

    if (!user) {
      return NotFoundHandler(res, "User");
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    // Create token;
    const token = generateToken({ email: body.email }, SECRET_KEY, "1s");

    res.status(200).json({
      success: true,
      message: "You have successfully signed in!",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    apiErrorHandler(res, error);
  }
};
