import { z } from "zod";

const phoneNumberRegExp =
  /^\+?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/




  export const FormDataSchema = z.object({
    phoneNumber: z
    .string()
    .trim()
    .refine((value) => phoneNumberRegExp.test(value), {
      message: "Phone number entered is not valid",
    }),
    fullname: z.string().min(1, {message: "Please enter your full name"}),
    username: z.string().min(1, {message: "Please enter your username"}),
    email: z.string().min(1, {message: "Please enter your email address"}),
    storeName: z.string().min(1, {message: "Please enter store name"}),
    storeTagName: z.string().min(1, {message: "Please enter store tag name"}),
    storePhoneNumber: z
    .string()
    .trim()
    .refine((value) => phoneNumberRegExp.test(value), {
      message: "Phone number entered is not valid",
    }),
    storeEmail: z.string().min(1, {message: "Please enter your email address"}),
    category: z.string().min(1, {message: "Please select the category"}),
    photo: z
    .instanceof(File) // Ensures the field is a File object
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size must be less than 5MB",
    }) // Validate file size
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPEG, PNG, or WebP formats are allowed",
      }
    ),
  })