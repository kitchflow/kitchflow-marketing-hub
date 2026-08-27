import { defineField, defineType } from "sanity";

const categories = [
  { title: "Inventory", value: "Inventory" },
  { title: "Waste", value: "Waste" },
  { title: "Staff", value: "Staff" },
  { title: "Operations", value: "Operations" },
  { title: "General", value: "General" },
] as const;

const languages = [
  { title: "English", value: "en" },
  { title: "Français", value: "fr" },
  { title: "العربية", value: "ar" },
] as const;

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: { list: [...languages], layout: "radio" },
      initialValue: "en",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "translationKey",
      title: "Translation key",
      type: "string",
      description:
        "Shared ID for all language versions of this article (e.g. reduce-kitchen-waste). Use the same key when duplicating for FR or AR.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: "slug",
            invert: false,
          }),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...categories], layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      validation: (rule) => rule.min(1).max(120).integer(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", category: "category", language: "language" },
    prepare({ title, media, category, language }) {
      const langLabel = language ? `[${String(language).toUpperCase()}] ` : "";
      return {
        title: `${langLabel}${title ?? "Untitled"}`,
        subtitle: category,
        media,
      };
    },
  },
  validation: (rule) =>
    rule.custom(async (_, context) => {
      const { document, getClient } = context;
      const language = document?.language;
      const translationKey = document?.translationKey;
      const rawId = document?._id?.replace(/^drafts\./, "");

      if (!language || !translationKey || !rawId) return true;

      const client = getClient({ apiVersion: "2024-01-01" });
      const duplicateCount = await client.fetch<number>(
        `count(*[
          _type == "post"
          && translationKey == $translationKey
          && language == $language
          && !(_id in [$draftId, $publishedId])
        ])`,
        {
          translationKey,
          language,
          draftId: `drafts.${rawId}`,
          publishedId: rawId,
        },
      );

      return duplicateCount === 0
        ? true
        : "A post with this translation key and language already exists.";
    }),
});
