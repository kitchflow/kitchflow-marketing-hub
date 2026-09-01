import type { PortableTextBlock } from "@portabletext/react";
import type { Lang } from "@/lib/i18n";

export type Slug = { current: string };

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type Author = {
  _id?: string;
  name: string;
  avatar?: SanityImage;
  bio?: string;
};

export type PostTranslation = {
  language: Lang;
  slug: string;
  title: string;
};

export type Post = {
  _id: string;
  language: Lang;
  translationKey: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  coverImage?: SanityImage;
  category: "Inventory" | "Waste" | "Staff" | "Operations" | "General";
  publishedAt: string;
  readTime?: number;
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  author?: Author;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
};
