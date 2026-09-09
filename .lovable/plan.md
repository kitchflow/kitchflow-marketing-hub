# Improve About, FAQ, and Navigation

## Overview
Refresh the existing About page and homepage FAQ so they feel intentional and consistent with KitchFlow’s clean, app-focused visual system. Upgrade the navigation with an accessible Features dropdown and a direct FAQ link.

## About page
- Rework the opening area into a stronger branded introduction using the existing KitchFlow typography, green accent, and app imagery.
- Present the product description with clearer hierarchy and improved spacing instead of a long plain text column.
- Organize inventory, waste, scheduling, tasks, and supplier management into a polished visual feature grid with icons and links to their existing detail pages.
- Refine the audience, platform, and download areas so the page feels cohesive with the landing page.
- Preserve the existing About URL, factual copy, metadata, and App Store destination.

## FAQ section
- Replace the plain question-and-answer list with accessible expandable rows.
- Add clear open/closed states, smooth restrained transitions, keyboard support, and comfortable mobile spacing.
- Keep the existing FAQ copy and App Store link while improving visual hierarchy and scanability.
- Preserve the homepage `#faq` destination for direct navigation.

## Navigation
- Turn Features into a desktop dropdown listing Inventory, Food Waste, Staff Scheduling, Kitchen Tasks, and Supplier Management.
- Link each item to its existing feature page and include a “View all features” link back to the homepage feature section.
- Add About and FAQ as top-level menu items; FAQ will link directly to the homepage FAQ section.
- Build equivalent expandable feature navigation inside the mobile menu.
- Ensure menus close after navigation and support keyboard, focus, and outside-click behavior.
- Add the required English, French, and Arabic navigation labels and preserve RTL behavior.

## Validation
- Check desktop and mobile layouts for menu positioning, text fit, and section spacing.
- Test dropdown, mobile menu, FAQ expansion, internal links, and App Store links.
- Confirm all content routes retain unique metadata and the site builds without errors.

## Technical details
- Reuse the project’s semantic color tokens, existing button component, Lucide icons, and current typography.
- Use TanStack `Link` for internal page navigation and hash destinations.
- Keep changes limited to presentation, navigation, and translations; no content system or data changes.
