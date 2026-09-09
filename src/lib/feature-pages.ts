import type { FeaturePageContent } from "@/components/seo/FeatureLanding";
import inventoryImg from "@/assets/screen-inventory.png";
import wasteImg from "@/assets/screen-waste.png";
import scheduleImg from "@/assets/screen-schedule.png";
import shoppingImg from "@/assets/screen-shopping.png";
import homeImg from "@/assets/app-home-screenshot.png";

export const FEATURE_PAGES: FeaturePageContent[] = [
  {
    path: "/restaurant-inventory-management",
    title: "Restaurant Inventory Management App | KitchFlow",
    socialTitle: "Restaurant Inventory Management",
    description:
      "Track stock, set par levels, scan deliveries and build shopping lists with KitchFlow inventory management for restaurants and cafés.",
    h1: "Restaurant inventory management",
    definition:
      "KitchFlow inventory management helps kitchens count stock, set reorder points, receive deliveries with QR scanning and turn low stock into shopping lists.",
    problemTitle: "The inventory problem",
    problemBody:
      "Running out mid-service costs covers. Over-ordering ties up cash and fills the walk-in with product that spoils. Spreadsheets work until multiple people update them at once.",
    featuresTitle: "What KitchFlow inventory does",
    features: [
      {
        title: "Counts and par levels",
        body: "Record on-hand quantities and reorder points so the team knows what to order before service.",
      },
      {
        title: "QR receiving",
        body: "Scan deliveries to update stock faster than typing every line by hand.",
      },
      {
        title: "Shopping lists from stock",
        body: "Build supplier lists from items under par instead of guessing from memory.",
      },
    ],
    whoTitle: "Who it is for",
    whoBody:
      "Cafe owners, restaurant managers and kitchen leads who need inventory visible to the whole team, not locked in one person's notebook.",
    faqs: [
      {
        q: "What does KitchFlow inventory management do?",
        a: "It tracks on-hand stock, reorder points, receiving and shopping lists inside the KitchFlow kitchen ops app.",
      },
      {
        q: "Is it suitable for small cafés?",
        a: "Yes. Small cafés can start with the highest-cost items and expand as the menu grows.",
      },
    ],
    relatedBlog: {
      href: "/blog/how-to-start-a-small-cafe-inventory-staff-waste",
      label: "How to start a small cafe: inventory guide",
    },
    screenshot: {
      src: inventoryImg,
      alt: "KitchFlow restaurant inventory dashboard",
      label: "Inventory",
    },
  },
  {
    path: "/restaurant-food-waste-management",
    title: "Food Waste Tracking for Restaurants | KitchFlow",
    socialTitle: "Food Waste Tracking for Restaurants",
    description:
      "Log restaurant and cafe food waste by reason, attach cost and spot patterns with KitchFlow waste tracking.",
    h1: "Food waste tracking for restaurants",
    definition:
      "KitchFlow food waste tracking lets teams log discards by reason, see cost impact and fix the ordering or prep issues that create waste.",
    problemTitle: "Why waste stays invisible",
    problemBody:
      "Waste often leaves a little at a time: unsold pastry, over-steamed milk, prep mistakes. Without a log, owners guess instead of fixing the biggest sources.",
    featuresTitle: "What KitchFlow waste tracking does",
    features: [
      {
        title: "Reason tags",
        body: "Tag spoilage, prep error, overproduction or returns so patterns show up quickly.",
      },
      {
        title: "Cost attached",
        body: "Connect waste entries to cost so the team sees margin impact, not only volume.",
      },
      {
        title: "Cafe-specific habits",
        body: "Works for pastry cases, dairy and espresso bars, not only full restaurant kitchens.",
      },
    ],
    whoTitle: "Who it is for",
    whoBody:
      "Restaurants and cafés that already run inventory but still lose margin to silent waste.",
    faqs: [
      {
        q: "Can KitchFlow track restaurant waste?",
        a: "Yes. Log waste by reason with cost attached and review trends inside KitchFlow.",
      },
      {
        q: "Do I need software on day one?",
        a: "A paper or spreadsheet log works at first. Move to KitchFlow when volume makes manual entry slip.",
      },
    ],
    relatedBlog: {
      href: "/blog/reduce-coffee-shop-waste",
      label: "Coffee shop waste reduction guide",
    },
    screenshot: {
      src: wasteImg,
      alt: "KitchFlow food waste tracking screen",
      label: "Waste",
    },
  },
  {
    path: "/restaurant-staff-scheduling",
    title: "Restaurant Staff Scheduling & Management | KitchFlow",
    socialTitle: "Restaurant Staff Scheduling",
    description:
      "Invite staff by code, manage shifts and keep kitchen coverage clear with KitchFlow staff scheduling.",
    h1: "Restaurant staff scheduling",
    definition:
      "KitchFlow staff scheduling helps managers invite team members, publish shifts and keep ownership clear across service periods.",
    problemTitle: "The coordination problem",
    problemBody:
      "Double-booked shifts and no-shows usually come from chat threads and informal swaps, not from bad people. The schedule needs one source of truth.",
    featuresTitle: "What KitchFlow scheduling does",
    features: [
      {
        title: "Invite by code",
        body: "Add staff without long onboarding flows so the roster stays current.",
      },
      {
        title: "Shift visibility",
        body: "Publish who is on when so prep and service coverage are obvious.",
      },
      {
        title: "Tied to kitchen ops",
        body: "Scheduling sits next to tasks and inventory, not in a separate disconnected tool.",
      },
    ],
    whoTitle: "Who it is for",
    whoBody:
      "Managers running multi-person cafe or restaurant teams who need coverage without another spreadsheet.",
    faqs: [
      {
        q: "Does KitchFlow include staff scheduling?",
        a: "Yes. Invite staff, manage shifts and keep the roster inside the same kitchen ops app.",
      },
    ],
    screenshot: {
      src: scheduleImg,
      alt: "KitchFlow employee scheduling dashboard",
      label: "Schedule",
    },
  },
  {
    path: "/kitchen-task-management",
    title: "Kitchen Task Management Software | KitchFlow",
    socialTitle: "Kitchen Task Management",
    description:
      "Assign opening and closing checklists, prep tasks and ownership with KitchFlow kitchen task management.",
    h1: "Kitchen task management",
    definition:
      "KitchFlow kitchen task management turns opening, closing and prep work into owned checklists with clear accountability.",
    problemTitle: "When tasks live in someone's head",
    problemBody:
      "If only one lead knows the opening list, quality drops when that person is off. Written tasks with owners fix that.",
    featuresTitle: "What KitchFlow tasks do",
    features: [
      {
        title: "Opening and closing lists",
        body: "Standardize shift routines so the same work happens every day.",
      },
      {
        title: "Named ownership",
        body: "Attach a person to each task so nothing sits as 'someone will do it'.",
      },
      {
        title: "Activity visibility",
        body: "See what was completed when, next to inventory and waste logs.",
      },
    ],
    whoTitle: "Who it is for",
    whoBody:
      "Kitchens that need consistent prep and cleaning standards across rotating staff.",
    faqs: [
      {
        q: "Can kitchen managers assign tasks?",
        a: "Yes. Managers can assign checklists and track completion inside KitchFlow.",
      },
    ],
    screenshot: {
      src: homeImg,
      alt: "KitchFlow kitchen home screen with tasks overview",
      label: "Tasks",
    },
  },
  {
    path: "/restaurant-supplier-management",
    title: "Restaurant Supplier & Shopping Lists | KitchFlow",
    socialTitle: "Supplier & Shopping Lists",
    description:
      "Build supplier shopping lists from low stock with KitchFlow, so ordering follows real inventory needs.",
    h1: "Restaurant supplier management",
    definition:
      "KitchFlow supplier tools help kitchens turn under-par inventory into shopping lists instead of ordering from memory.",
    problemTitle: "Ordering without a stock signal",
    problemBody:
      "When ordering is disconnected from counts, teams buy what feels right. That creates overstock on slow movers and stockouts on busy items.",
    featuresTitle: "What KitchFlow supplier lists do",
    features: [
      {
        title: "Lists from inventory",
        body: "Generate shopping needs from items under reorder points.",
      },
      {
        title: "Fewer forgotten lines",
        body: "Keep milk, cups and dry goods on the same operational list the team already uses.",
      },
      {
        title: "One ops workflow",
        body: "Ordering sits beside receiving, waste and tasks in KitchFlow.",
      },
    ],
    whoTitle: "Who it is for",
    whoBody:
      "Operators who already count stock and want purchasing to follow those numbers.",
    faqs: [
      {
        q: "Does KitchFlow help with suppliers?",
        a: "Yes. Shopping lists can be built from inventory levels so orders match real needs.",
      },
    ],
    screenshot: {
      src: shoppingImg,
      alt: "KitchFlow supplier shopping list screen",
      label: "Shopping",
    },
  },
];

export const featurePageByPath = (path: string) =>
  FEATURE_PAGES.find((p) => p.path === path);
