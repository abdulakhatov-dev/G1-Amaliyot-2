import { z } from "zod";

// sign-up -> name, surname, email, password
export const validateSignUp = (data: any) => {
  const schema = z.object({
    name: z.string({ required_error: "Name is required!" }),
    surname: z.string({ required_error: "Surname is required!" }),
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Invalid email!" }),
    password: z.string({ required_error: "Password is required!" }),
  });

  return schema.parse(data);
};

export const validateSignIn = (data: any) => {
  const schema = z.object({
    email: z
      .string({ required_error: "Email is required!" })
      .email({ message: "Invalid email!" }),
    password: z.string({ required_error: "Password is required!" }),
  });

  return schema.parse(data);
};
