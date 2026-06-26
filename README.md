# Budget Tracker

A personal finance tracker built with React 18, TypeScript, and Vite. Log income and expenses, monitor your balance, set a monthly budget, and visualise spending by category — all stored locally in the browser with no backend required.

## Features

- **Transaction logging** — add income or expense entries with amount, category, description, and date
- **Live dashboard** — income, expenses, and net balance on coloured gradient cards
- **Monthly budget limit** — set a budget per month; progress bar shows usage (orange at 80%, red when over); displays amount remaining or over
- **Spending chart** — donut chart breaking down expenses by category with percentage tooltips
- **Transaction list** — sortable by date (newest first), friendly date format, per-entry delete, and a **Delete all** button at the bottom left
- **Dark mode** — toggle between light and dark theme; preference saved in `localStorage`; auto-detects system preference on first load
- **Persistent storage** — all data survives page reloads via `localStorage`; no account or server needed

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite 5 |
| Charts | recharts 2 |
| Font | Inter (Google Fonts) |
| Persistence | Browser `localStorage` |

## Getting started

**Prerequisites:** Node.js ≥ 18

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project structure

```
src/
├── vite-env.d.ts            # Vite client type reference
├── types.ts                 # Transaction and TransactionKind types
├── categories.ts            # Predefined income/expense categories with colours
├── App.tsx                  # Root component — layout, data wiring, dev seed buttons
├── main.tsx                 # React entry point
├── index.css                # Global styles — full design-token system (spacing, type,
│                            #   radius, shadow, motion tokens); light + dark themes
├── components/
│   ├── Dashboard.tsx        # Income / Expenses / Balance gradient cards
│   ├── TransactionForm.tsx  # Add-transaction form; submit button colour matches kind
│   ├── TransactionList.tsx  # Sorted history, friendly dates, delete per row,
│   │                        #   transaction count, "Delete all" button
│   ├── CategoryChart.tsx    # Recharts donut chart (expenses only) with % tooltips
│   └── BudgetBar.tsx        # Monthly budget bar; shows spent / remaining / over
└── hooks/
    ├── useTransactions.ts   # CRUD + clear; useState + localStorage persistence
    ├── useBudget.ts         # Per-month budget; useState + localStorage persistence
    └── useDarkMode.ts       # Dark mode toggle; syncs html.dark class + localStorage
```

## Categories

**Expenses:** Food · Rent · Transport · Entertainment · Utilities · Health · Shopping · Other

**Income:** Salary · Freelance · Investment · Other

## Data persistence

| Key | Contents |
|---|---|
| `budget-tracker.transactions.v1` | Array of all transactions |
| `budget-tracker.budget.v1` | Object mapping `YYYY-MM` → budget amount |
| `budget-tracker.dark-mode` | `"true"` or `"false"` |

Clearing browser data will erase all entries. No data is ever sent to a server.

## Dev utilities

In development mode, the header shows seed buttons (stripped from production builds):
- **"Load sample data"** — appears when the list is empty; loads 14 June 2026 transactions and sets a $2,000 budget
- **"Add more transactions"** — appears when data exists; loads 27 additional April/May 2026 transactions

## Git Workflow

After completing any meaningful change, commit and push to GitHub:

```bash
git add -A
git commit -m "<clear, descriptive message>"
git push
```

Use concise commit messages that describe what changed (e.g. `Add streak reset on delete`, `Fix streak calculation off-by-one`).
