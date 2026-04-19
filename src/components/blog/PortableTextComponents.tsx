import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 text-2xl font-semibold tracking-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary pl-5 italic text-foreground/80">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-[18px] leading-[1.8] text-foreground/85">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc pl-6 space-y-2 text-[18px] leading-[1.8]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal pl-6 space-y-2 text-[18px] leading-[1.8]">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-primary underline-offset-4 hover:underline">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1200).auto("format").url();
      return (
        <img
          src={url}
          alt=""
          loading="lazy"
          className="my-8 rounded-2xl border border-border w-full"
        />
      );
    },
  },
};
