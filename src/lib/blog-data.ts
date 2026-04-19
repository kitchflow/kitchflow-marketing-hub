import type { Post } from "@/types";

export const mockPosts: Post[] = [
  {
    _id: "1",
    title: "How to Reduce Kitchen Waste by 40%",
    slug: { current: "reduce-kitchen-waste" },
    excerpt:
      "Practical strategies for tracking and minimising food waste in your restaurant or café.",
    category: "Waste",
    publishedAt: "2025-01-15",
    readTime: 5,
    author: { name: "KitchFlow Team" },
  },
  {
    _id: "2",
    title: "The Ultimate Guide to Kitchen Inventory Management",
    slug: { current: "kitchen-inventory-management" },
    excerpt:
      "Stop running out of stock. Learn how smart inventory systems save time and money.",
    category: "Inventory",
    publishedAt: "2025-01-10",
    readTime: 7,
    author: { name: "KitchFlow Team" },
  },
  {
    _id: "3",
    title: "How to Build an Accountable Kitchen Team",
    slug: { current: "accountable-kitchen-team" },
    excerpt:
      "Task management and activity logs that keep your whole team aligned and responsible.",
    category: "Staff",
    publishedAt: "2025-01-05",
    readTime: 4,
    author: { name: "KitchFlow Team" },
  },
];

export const mockBodyFor = (slug: string) => {
  const bodies: Record<string, string[]> = {
    "reduce-kitchen-waste": [
      "Food waste isn't just an environmental problem — it's a margin killer. The average restaurant throws away 4–10% of all food purchased before it ever reaches a customer's plate.",
      "Start by logging every gram. KitchFlow's waste module lets you tag waste by reason — spoilage, prep error, customer return — so patterns become visible within a week.",
      "Once you see the patterns, action is simple: tighten par levels on what spoils, retrain on what's misprepped, and renegotiate suppliers on what arrives damaged.",
    ],
    "kitchen-inventory-management": [
      "Inventory chaos is the silent tax on every kitchen. Running out mid-service costs you covers; over-ordering rots in the walk-in.",
      "A modern inventory system tracks par levels, usage velocity, and supplier lead times automatically. KitchFlow uses QR scanning so receiving takes seconds, not hours.",
      "The result: 30% less stockouts, 20% lower carrying cost, and a team that trusts the numbers.",
    ],
    "accountable-kitchen-team": [
      "Great kitchens run on clear ownership. Every prep, every clean, every order has a name attached.",
      "KitchFlow's task and activity log gives every action a timestamp and an owner — no more 'I thought you did it' at 7pm service.",
      "Accountability isn't about blame. It's about making good work visible.",
    ],
  };
  return bodies[slug] ?? [
    "This is a sample article body. Connect your Sanity studio to publish real content.",
  ];
};
