import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sanityWriteClient } from "@/lib/sanity.server";

const waitlistSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const submitWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => waitlistSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      await sanityWriteClient.create({
        _type: "waitlist",
        email: data.email,
        submittedAt: new Date().toISOString(),
      });
      return { success: true as const };
    } catch (err) {
      console.error("Waitlist save failed", err);
      return { success: false as const, error: "Could not save signup. Please try again." };
    }
  });

const subjectKeys = ["general", "partnership", "press", "bug", "other"] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.enum(subjectKeys),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      await sanityWriteClient.create({
        _type: "contactMessage",
        ...data,
        submittedAt: new Date().toISOString(),
      });
      return { success: true as const };
    } catch (err) {
      console.error("Contact save failed", err);
      return { success: false as const, error: "Could not send message. Please try again." };
    }
  });
