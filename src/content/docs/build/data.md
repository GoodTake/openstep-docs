---
title: Site data
description: Browse and edit the data your site stores during development. The live site keeps its own data.
sidebar:
  order: 9
---

Most sites store something: bookings, orders, messages. The **Data** tab lists what your site has stored, so you can look at it and fix it without asking the builder.

1. Click **Data** at the top of the right side, next to **Preview**. The page title is **Data**, with one card for each table and the number of items in it. For the coffee shop the tables are **bookings**, **orders** and **users**. Use **Search tables…** to find one, and **A-Z** to change the sort order.
2. Click a table to open it. Its name and item count are at the top, for example **bookings (1)**, with its rows below. Use **Search rows…** to filter them, click a column heading to sort, and use the arrows at the bottom to page.
3. Click a row to change it, then **Save changes**. Use **+ Add item** to add a row. Each row also has a button to delete it.
4. Click the back arrow at the top left to return to the list of tables.

![The bookings table in the Data tab, with the test booking made in Preview.](/images/build/data-1.webp)

## Good to know

- The booking in the screenshot appeared when we submitted the booking form in [Preview](/build/preview/). A table fills as people use the site.
- This is development data: the data Preview reads and writes. After you [publish](/build/go-live/), the live site has its own separate data. Test bookings made in Preview do not reach the live site, and bookings made on the live site do not show here. **Publish** never copies development data to the live site. It keeps the live data and learner progress, and never starts a new session. If an update would remove data, for example a table or field the new version no longer has, the Publish dialog warns you first, and data removed that way cannot be brought back.
- You edit rows here. To add a table or a new field, ask the builder in the chat. It creates tables as it builds.
- The owner and editors can change rows. Viewers can only look.

Next: [What your site can do](/build/what-your-site-can-do/).
