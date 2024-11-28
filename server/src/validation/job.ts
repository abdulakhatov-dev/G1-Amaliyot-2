import { z } from "zod";

export const validateAddJob = (data: any) => {
  const schema = z.object({
    title: z.string({ required_error: "Title is required!" }),
    type: z.string({ required_error: "Type is required!" }),
    location: z.string({ required_error: "Location is required!" }),
    description: z.string({ required_error: "Description is required!" }),
    salary: z.string({ required_error: "Salary is required!" }),
    company: z.object({
      name: z.string({ required_error: "Company name is required!" }),
      description: z.string({
        required_error: "Company description is required!",
      }),
      contactEmail: z
        .string({ required_error: "Contact email is required" })
        .email({ message: "Contact email is invalid!" }),
      contactPhone: z.string({ required_error: "Contact phone is required!" }),
    }),
  });

  return schema.parse(data);
};

export const validateEditJob = (data: any) => {
  const schema = z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    salary: z.string().optional(),
    company: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      contactEmail: z
        .string()
        .email({ message: "Contact email is invalid!" })
        .optional(),
      contactPhone: z.string().optional(),
    }),
  });

  return schema.parse(data);
};