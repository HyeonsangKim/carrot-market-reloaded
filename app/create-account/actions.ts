"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

function checkUsername(username: string) {
  return !username.includes("potato");
}

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username?",
      })
      .min(3, "way too short!")
      .max(10, "that is too long!")
      .trim()
      .refine(checkUsername, "No potates allowed"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(10, "Password must contain at least 10 character(s)")
      .regex(
        passwordRegex,
        "A password must have lowercase, UPPERCASE, number and special characters."
      ),
    confirmPassword: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Both passwords shoudl be the same!",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
