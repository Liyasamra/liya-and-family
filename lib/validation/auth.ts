import { z } from "zod";

// Every one of these runs server-side, inside the Server Action that
// uses it — never trust the client's own form validation for anything
// that touches auth or writes data.

export const signUpSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(12, "Use at least 12 characters.")
    .regex(/[a-z]/, "Include a lowercase letter.")
    .regex(/[A-Z]/, "Include an uppercase letter.")
    .regex(/[0-9]/, "Include a number.")
    .regex(/[^A-Za-z0-9]/, "Include a symbol."),
  displayName: z.string().trim().min(1, "Enter a name.").max(80),
});

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const requestPasswordResetSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(12, "Use at least 12 characters.")
      .regex(/[a-z]/, "Include a lowercase letter.")
      .regex(/[A-Z]/, "Include an uppercase letter.")
      .regex(/[0-9]/, "Include a number.")
      .regex(/[^A-Za-z0-9]/, "Include a symbol."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const mfaChallengeSchema = z.object({
  factorId: z.string().min(1),
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code."),
});

export const accessRequestSchema = z.object({
  profileId: z.string().uuid(),
  requestedRoleKey: z.enum(["teacher_tutor", "contributor", "viewer"]), // no self-service Owner/Admin/Child requests
  reason: z.string().trim().min(20, "Say a bit more about why you're requesting access (20+ characters).").max(1000),
  agreedToTerms: z.literal(true, {
    message: "You must agree to the privacy and acceptable-use terms.",
  }),
});

export const decideAccessRequestSchema = z.object({
  requestId: z.string().uuid(),
  decision: z.enum(["approved", "partial", "rejected", "info_requested"]),
  decisionNote: z.string().trim().max(1000).optional(),
  expiresAt: z.string().datetime().optional(), // time-limited access
});
