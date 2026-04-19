import { defineField, defineType } from "sanity";

export const waitlistType = defineType({
  name: "waitlist",
  title: "Waitlist signup",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "submittedAt" },
  },
});
