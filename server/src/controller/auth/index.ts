import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../../interfaces";

const users: IUser[] = [
  {
    _id: "1",
    name: "John",
    surname: "Doe",
    email: "john.@gmail.com",
    password: "12345",
  },
];

const SECRET_KEY = "n9-legendary";

export const signUp = async (req: Request, res: Response) => {
  const body = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = {
    _id: String(users.length + 1),
    name: body.name,
    surname: body.surname,
    email: body.email,
    password: hashedPassword,
  };

  users.unshift(newUser);

  // Create token;
  const token = jwt.sign({ email: body.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

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
};

export const signIn = async (req: Request, res: Response) => {
  const body = req.body;

  const user = users.find((user: IUser) => user.email === body.email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
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
  const token = jwt.sign({ email: body.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

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
};

// sign-up
// name, surname, email, password

// {
// user: user,
// token: token,
// }

// sign-in
// email and password

// JWT TOKEN
// 1. Secret key SECRET_KEY
// jwt.sign({ email: body.email }, SECRET_KEY, { expiresIn: '1h'})
