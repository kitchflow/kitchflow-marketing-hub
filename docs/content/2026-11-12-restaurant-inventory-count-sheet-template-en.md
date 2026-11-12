# Sanity fields (English)

| Field | Value |
|-------|-------|
| **title** | Restaurant Inventory Count Sheet Template: How to Count Stock Accurately |
| **slug** | `restaurant-inventory-count-sheet-template` |
| **language** | `en` |
| **translationKey** | `restaurant-inventory-count-sheet-template` |
| **excerpt** | Use this restaurant inventory count sheet template to track stock, par levels, unit costs, suppliers, reorder quantities, and total inventory value. |
| **seoTitle** | Restaurant Inventory Count Sheet Template: Track Stock & Par Levels | KitchFlow |
| **seoDescription** | Use this restaurant inventory count sheet template to track stock, par levels, unit costs, suppliers, reorder quantities, and total inventory value. |
| **category** | Inventory |
| **readTime** | 12 |
| **publishedAt** | 2026-11-12 |
| **author** | `author-kitchflow-team` |
| **coverImage** | UNRESOLVED — TODO before publish: replace featured image with final KitchFlow graphic. |
| **coverImageAlt** | |

## Editor note (not for public)

TODO before publish: replace featured image with final KitchFlow graphic.

---

# Restaurant Inventory Count Sheet Template: How to Count Stock Accurately

Restaurant inventory becomes difficult long before the restaurant becomes large.

A café may have milk, syrups, coffee beans, pastries, cleaning supplies, takeaway packaging, and dozens of refrigerated ingredients.

A restaurant may have hundreds of items spread across:

- walk-in refrigerators
- freezers
- dry storage
- prep stations
- bar storage
- beverage coolers
- cleaning cupboards

If the count lives in someone's memory or an inconsistent spreadsheet, it becomes hard to answer simple questions:

- What do we actually have?
- What is running low?
- What needs to be ordered?
- Which items are repeatedly overstocked?
- How much stock value is sitting in the kitchen?
- Which supplier do we normally use?

A **restaurant inventory count sheet** gives the team one repeatable structure for answering those questions.

The important part is not making the sheet complicated.

It is making the count **consistent enough to compare from one count to the next**.

---

## Restaurant Inventory Count Sheet Template

A practical count sheet can look like this:

| Storage Area | Item | Category | Count Unit | Par Level | On Hand | To Order | Unit Cost | Inventory Value | Supplier | Notes |
|---|---|---|---|---:|---:|---:|---:|---:|---|---|
| Walk-in | Whole milk | Dairy | carton | 24 | 11 | 13 | 24 SEK | 264 SEK | Dairy Supplier | 2 expire soon |
| Walk-in | Tomatoes | Produce | kg | 12 | 7 | 5 | 31 SEK | 217 SEK | Produce Supplier | — |
| Freezer | Fries | Frozen | bag | 10 | 6 | 4 | 89 SEK | 534 SEK | Food Supplier | — |
| Dry store | Flour | Dry goods | 25 kg bag | 4 | 2 | 2 | 245 SEK | Bakery Supplier | — |
| Bar | Espresso beans | Coffee | kg | 15 | 9 | 6 | 190 SEK | Coffee Roaster | New price |

### Simple formulas

**To Order**

`MAX(Par Level - On Hand, 0)`

**Inventory Value**

`On Hand × Unit Cost`

These formulas are simple enough for Excel, Google Sheets, or a basic inventory system.

---

## What Should Be on a Restaurant Inventory Count Sheet?

A useful inventory count sheet should help someone walk through the restaurant and count stock without guessing what each column means.

## 1. Storage Area

Organize the list by where the item physically lives.

Examples:

- walk-in refrigerator
- freezer
- dry storage
- bar
- prep fridge
- beverage cooler
- cleaning storage

This makes counting faster because the sheet can follow the same order as the person walking through the kitchen.

Instead of searching the sheet for every product, the counter moves shelf by shelf.

---

## 2. Item Name

Use a consistent product name.

Avoid switching between:

- tomato
- tomatoes
- fresh tomatoes
- Roma tomato

for the same item.

Consistency matters because repeated names make historical counts easier to compare.

---

## 3. Category

Categories make inventory easier to review.

Examples:

- produce
- dairy
- meat
- seafood
- frozen
- dry goods
- beverages
- coffee
- packaging
- cleaning

Categories are especially useful when reviewing where most inventory value is concentrated.

---

## 4. Count Unit

Choose one clear counting unit for each item.

Examples:

- kg
- carton
- bottle
- bag
- case
- each
- tray

Do not count the same product in cartons one week and individual pieces the next unless there is a defined conversion.

The more consistent the unit, the easier it is to compare counts over time.

---

## 5. Par Level

The **par level** is the amount of an item you generally want available after replenishment.

For example:

- Par level: 20 cartons of milk
- Current stock: 8 cartons
- Suggested amount to order: 12 cartons

Par levels are not permanent.

They should change when:

- demand changes
- menu items change
- delivery frequency changes
- storage capacity changes
- seasonality changes

A count sheet should make par levels easy to review instead of hiding them in a separate document.

---

## 6. On-Hand Count

This is the quantity physically present during the count.

The key word is **physically**.

Do not rely only on what the system says should be there.

The purpose of a stock count is to verify reality.

---

## 7. To Order

A simple reorder field turns the count into an operational decision.

If:

- par = 20
- on hand = 8

then:

- to order = 12

This can later connect naturally to [restaurant supplier management](https://kitchflowapp.com/restaurant-supplier-management) and your supplier ordering process.

If you are organizing supplier records too, see the [Restaurant Supplier List Template](https://kitchflowapp.com/blog/restaurant-supplier-list-template).

---

## 8. Unit Cost

Use the cost of the unit you are counting.

If you count olive oil by bottle, use the bottle cost.

If you count chicken by kilogram, use the cost per kilogram.

Mixing purchase units and count units without a conversion makes inventory values unreliable.

---

## 9. Inventory Value

For each line:

**On Hand × Unit Cost = Inventory Value**

Example:

- 8 cartons
- 24 SEK per carton
- inventory value = 192 SEK

Adding all rows gives you an estimate of the inventory value currently on hand.

---

## 10. Supplier

Adding a supplier column makes the count more actionable.

When an item is low, the person counting can immediately see who normally supplies it.

This connects [restaurant inventory management](https://kitchflowapp.com/restaurant-inventory-management) with purchasing instead of keeping them in separate systems.

---

## 11. Notes

Use notes only for information that affects the count or the next action.

Examples:

- expires tomorrow
- damaged packaging
- waiting for delivery
- supplier out of stock
- recount needed
- moved to another storage area

Avoid turning the notes column into a long diary.

---

## Count in the Same Physical Order Every Time

One of the simplest ways to improve inventory counts is to organize the count sheet in **walk order**.

For example:

### Walk-in refrigerator

1. Top shelf — dairy
2. Middle shelf — prepared ingredients
3. Lower shelf — produce
4. Floor rack — sealed cases

Then:

### Freezer

1. Proteins
2. Frozen vegetables
3. Fries
4. Desserts

Then:

### Dry storage

1. Flour
2. Rice
3. Oils
4. Canned goods
5. Packaging

When the sheet follows the same order as the kitchen, fewer products are skipped.

---

## Use the Same Count Unit Every Time

A common inventory problem is changing units between counts.

Example:

**Week 1:** Milk = 4 cases  
**Week 2:** Milk = 32 cartons

Both may be correct, but the comparison becomes harder.

Choose one count unit and keep it consistent.

If a case contains eight cartons and you want to count cartons, define that conversion once.

Consistency is more valuable than complexity.

---

## Choose a Consistent Count Time

Inventory changes continuously during service.

That means two counts taken at very different times can be difficult to compare.

Try to count under similar conditions.

For example:

- every Sunday after closing
- every Monday before deliveries
- every morning before opening for high-value items

The exact schedule depends on the business.

The important part is consistency.

---

## Weekly Count vs Daily Count

Not every item needs to be counted every day.

## Daily or frequent counts can make sense for:

- expensive proteins
- milk
- coffee beans
- alcohol
- high-waste ingredients
- fast-moving items

## Weekly counts may be enough for:

- dry goods
- packaging
- cleaning products
- slower-moving frozen stock

The frequency should reflect how quickly the item moves and how costly mistakes are.

---

## Add a Recount Column for Important Inventory

For high-value or inconsistent items, add:

| Item | Count 1 | Recount | Final Count |
|---|---:|---:|---:|
| Salmon | 8.4 kg | 8.2 kg | 8.2 kg |
| Olive oil | 14 bottles | 14 bottles | 14 bottles |

A second count is particularly useful when:

- the number looks unusual
- the item is expensive
- the variance from the previous count is large
- multiple partial containers are involved

You do not need to double-count everything.

---

## How to Handle Open Containers and Partial Stock

Some restaurant inventory is easy to count.

A sealed carton is one carton.

An open bottle is less obvious.

Choose a practical rule and use it consistently.

For example:

- full bottle = 1
- approximately half-full = 0.5
- approximately quarter-full = 0.25

For weighted ingredients, weighing may be more accurate.

The method matters less than using the same method repeatedly.

---

## Example: Café Inventory Count Sheet

| Area | Item | Unit | Par | On Hand | To Order |
|---|---|---|---:|---:|---:|
| Bar fridge | Whole milk | carton | 28 | 16 | 12 |
| Bar fridge | Oat milk | carton | 14 | 9 | 5 |
| Coffee shelf | Espresso beans | kg | 20 | 12 | 8 |
| Syrup shelf | Vanilla syrup | bottle | 8 | 4 | 4 |
| Counter | 12 oz cups | sleeve | 12 | 5 | 7 |
| Bakery | Croissants | each | 30 | 11 | 19 |

This is enough for a small café to start.

You do not need 25 columns on day one.

---

## Example: Restaurant Inventory by Storage Area

A larger kitchen may split its sheet into sections:

### Walk-in

- vegetables
- dairy
- sauces
- prepared ingredients

### Freezer

- proteins
- fries
- frozen vegetables
- desserts

### Dry Store

- grains
- flour
- oil
- canned products
- spices

### Packaging

- takeaway boxes
- bags
- cups
- lids
- napkins

Organizing by physical location usually makes the count easier than organizing the sheet alphabetically.

---

## What to Do When the Count Does Not Match Expectations

A difference does not automatically mean theft or a serious problem.

Possible causes include:

- waste that was never recorded
- incorrect receiving quantity
- incorrect unit conversion
- staff usage
- prep loss
- damaged stock
- transfers between storage areas
- counting error
- outdated system quantity

Start by recounting.

Then review the operational records around that item.

If waste is part of the problem, a consistent [food waste log](https://kitchflowapp.com/blog/coffee-shop-waste-log-template) can help explain why stock disappears between counts.

---

## Connect Inventory Counts With Waste

Inventory tells you **what changed**.

Waste records can help explain **why**.

For example:

- inventory repeatedly drops faster than expected
- waste records show frequent spoilage
- the purchasing quantity may be too high

Or:

- milk repeatedly falls below par
- almost no milk is logged as waste
- the par level may simply be too low for demand

This is why inventory and [restaurant food waste management](https://kitchflowapp.com/restaurant-food-waste-management) should not be treated as completely separate processes.

---

## Connect Inventory Counts With Suppliers

Once the count is complete, low-stock items often become the next supplier order.

A useful flow is:

**Count → Compare with par → Identify shortage → Find supplier → Order**

That connection becomes much easier when supplier information is organized.

See:

- [Restaurant Supplier List Template](https://kitchflowapp.com/blog/restaurant-supplier-list-template)
- [Restaurant Supplier Management](https://kitchflowapp.com/restaurant-supplier-management)

---

## Make Inventory Counting a Recurring Task

Inventory only works if the count actually happens.

Add it to the team's recurring operational checklist.

For example:

> Weekly full inventory count — Sunday 21:30 — assigned to closing manager

or:

> Daily milk / coffee / protein count — before opening

See the [Daily Kitchen Checklist Template](https://kitchflowapp.com/blog/daily-kitchen-checklist-template) and KitchFlow's [kitchen task management](https://kitchflowapp.com/kitchen-task-management).

---

## Spreadsheet vs Restaurant Inventory App

A spreadsheet is often the right place to start.

It is flexible and inexpensive.

But it becomes harder to maintain when:

- several people count stock
- quantities change constantly
- suppliers need to connect to items
- low-stock actions need follow-up
- waste needs to explain variances
- managers use multiple devices
- the sheet contains outdated copies

At that point, a restaurant inventory app can reduce the number of disconnected steps.

The goal is not to replace a spreadsheet for the sake of using an app.

The goal is to make inventory easier to keep current.

---

## Where KitchFlow Fits

KitchFlow is built for smaller restaurants, cafés, and food businesses that want everyday kitchen operations in one simpler workflow.

Inventory sits alongside the operational areas that affect it:

- suppliers
- shopping and ordering needs
- waste
- staff
- schedules
- tasks

Instead of treating the stock count as an isolated spreadsheet, KitchFlow can help keep inventory connected to the rest of the kitchen's daily work.

Explore [restaurant inventory management with KitchFlow](https://kitchflowapp.com/restaurant-inventory-management) or visit [KitchFlow](https://kitchflowapp.com/) to see the wider operations workflow.

---

## Restaurant Inventory Count Checklist

Before the count:

- [ ] Choose the count date and time
- [ ] Organize the sheet by storage area
- [ ] Confirm each item's count unit
- [ ] Update major unit costs if needed
- [ ] Avoid counting during a delivery if possible

During the count:

- [ ] Move through storage in a fixed order
- [ ] Count physical stock
- [ ] Record partial stock consistently
- [ ] Add notes for damaged or expiring items
- [ ] Recount unusual high-value items

After the count:

- [ ] Compare stock against par levels
- [ ] Review items below par
- [ ] Calculate reorder quantities
- [ ] Review unexpected variances
- [ ] Update supplier/order needs
- [ ] Review related waste where relevant
- [ ] Save the count history

---

## FAQ

## What should be included in a restaurant inventory count sheet?

A useful sheet normally includes storage area, item name, category, count unit, par level, on-hand quantity, reorder quantity, unit cost, total value, supplier, and notes.

## How often should a restaurant count inventory?

It depends on the item. High-value and fast-moving stock may need daily or frequent counts, while slower items may only need weekly counts. Consistency is more important than using the same frequency for every item.

## What is a par level in restaurant inventory?

A par level is the target quantity you generally want available after replenishment. It helps the team compare current stock with the amount normally needed.

## Should a restaurant count inventory before or after deliveries?

For comparable counts, it is useful to count under similar conditions each time. Counting before a scheduled delivery can make comparisons easier because incoming stock is not mixed into the count.

## How do I calculate restaurant inventory value?

For a basic estimate, multiply the on-hand quantity by the cost of the unit being counted, then add the value of all items.

## Is a spreadsheet enough for restaurant inventory?

For many small restaurants, yes. An app becomes more useful when several people need access, stock changes frequently, or inventory must connect to suppliers, waste, tasks, and ordering.

---

## Conclusion

A restaurant inventory count sheet should make stock easier to understand, not harder.

Start with:

- where the item is stored
- what it is called
- how it is counted
- how much you want
- how much you actually have
- what you need to reorder
- what it costs
- who supplies it

Then count in the same order, with the same units, at a consistent time.

That gives you something far more useful than a one-off stock number:

**a history you can compare.**

A spreadsheet is enough to begin.

When inventory starts becoming connected to supplier orders, waste records, recurring tasks, and several members of staff, [KitchFlow](https://kitchflowapp.com/) can help keep those operational pieces together.

---
