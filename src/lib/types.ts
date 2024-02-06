import { z } from "zod";

export const FormSchema = z.object({
  email: z
    .string()
    .describe("Email")
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .describe("Password")
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const CreateWorkspaceFormSchema = z.object({
  workspaceName: z
    .string()
    .describe("Workspace Name")
    .min(1, "Workspace name is required"),

  logo: z.any(),
});
