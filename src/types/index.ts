import type { PortableTextBlock } from "@portabletext/react";

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

export type Post = {
  _id: string;
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

export type WaitlistEntry = {
  email: string;
  submittedAt: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
};
