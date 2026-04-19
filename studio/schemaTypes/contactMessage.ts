import { defineField, defineType } from "sanity";

const subjects = [
  { title: "General", value: "general" },
  { title: "Partnership", value: "partnership" },
  { title: "Press", value: "press" },
  { title: "Bug report", value: "bug" },
  { title: "Other", value: "other" },
] as const;

export const contactMessageType = defineType({
  name: "contactMessage",
  title: "Contact message",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      options: { list: [...subjects], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().max(2000),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email", subject: "subject" },
    prepare({ title, subtitle, subject }) {
      return {
        title: title ?? "Message",
        subtitle: subject ? `${subject} · ${subtitle}` : subtitle,
      };
    },
  },
});
