import * as z from "zod";
import { emailSchema } from "./auth";

export const newsletterSchema = z.object({
  email: emailSchema,
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
