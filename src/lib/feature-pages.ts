import inventoryImg from "@/assets/screen-inventory.png";
import wasteImg from "@/assets/screen-waste.png";
import scheduleImg from "@/assets/screen-schedule.png";
import shoppingImg from "@/assets/screen-shopping.png";
import homeImg from "@/assets/app-home-screenshot.png";

export type FeaturePageId = "inventory" | "waste" | "staff" | "tasks" | "supplier";

export type FeaturePageMeta = {
  id: FeaturePageId;
  path: string;
  /** English SEO defaults (SSR / crawlers). Visible UI uses i18n. */
  title: string;
  socialTitle: string;
  description: string;
  screenshot: { src: string; alt: string };
  relatedBlog?: { href: string };
};

export const FEATURE_PAGES: FeaturePageMeta[] = [
  {
    id: "inventory",
    path: "/restaurant-inventory-management",
    title: "Restaurant Inventory Management App | KitchFlow",
    socialTitle: "Restaurant Inventory Management",
    description:
      "Track stock, set par levels, scan deliveries and build shopping lists with KitchFlow inventory management for restaurants and cafés.",
    screenshot: {
      src: inventoryImg,
      alt: "KitchFlow restaurant inventory dashboard",
    },
    relatedBlog: {
      href: "/blog/how-to-start-a-small-cafe-inventory-staff-waste",
    },
  },
  {
    id: "waste",
    path: "/restaurant-food-waste-management",
    title: "Food Waste Tracking for Restaurants | KitchFlow",
    socialTitle: "Food Waste Tracking for Restaurants",
    description:
      "Log restaurant and cafe food waste by reason, attach cost and spot patterns with KitchFlow waste tracking.",
    screenshot: {
      src: wasteImg,
      alt: "KitchFlow food waste tracking screen",
    },
    relatedBlog: {
      href: "/blog/reduce-coffee-shop-waste",
    },
  },
  {
    id: "staff",
    path: "/restaurant-staff-scheduling",
    title: "Restaurant Staff Scheduling & Management | KitchFlow",
    socialTitle: "Restaurant Staff Scheduling",
    description:
      "Invite staff by code, manage shifts and keep kitchen coverage clear with KitchFlow staff scheduling.",
    screenshot: {
      src: scheduleImg,
      alt: "KitchFlow employee scheduling dashboard",
    },
  },
  {
    id: "tasks",
    path: "/kitchen-task-management",
    title: "Kitchen Task Management Software | KitchFlow",
    socialTitle: "Kitchen Task Management",
    description:
      "Assign opening and closing checklists, prep tasks and ownership with KitchFlow kitchen task management.",
    screenshot: {
      src: homeImg,
      alt: "KitchFlow kitchen home screen with tasks overview",
    },
  },
  {
    id: "supplier",
    path: "/restaurant-supplier-management",
    title: "Restaurant Supplier & Shopping Lists | KitchFlow",
    socialTitle: "Supplier & Shopping Lists",
    description:
      "Build supplier shopping lists from low stock with KitchFlow, so ordering follows real inventory needs.",
    screenshot: {
      src: shoppingImg,
      alt: "KitchFlow supplier shopping list screen",
    },
  },
];

export const featurePageByPath = (path: string) =>
  FEATURE_PAGES.find((p) => p.path === path);
