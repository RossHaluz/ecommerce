import { z } from "zod";

// The e-mail is optional: people who sign in by phone often have none, and that must not block saving a name.
export const profileFormSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().max(80),
  email: z.union([z.literal(""), z.string().trim().email().max(80)]),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
