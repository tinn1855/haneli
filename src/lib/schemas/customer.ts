import * as z from "zod";
import type { CustomerStatus } from "@/types/customer";

export const customerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .min(6, "Phone must be at least 6 characters"),
  address: z.string().optional(),
  status: z.enum(["active", "inactive"] as const satisfies readonly CustomerStatus[]),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
