# Budget Tracker

A personal finance tracker built with React 18, TypeScript, and Vite. Log income and expenses, monitor your balance, set a monthly budget, and visualise spending by category — all stored locally in the browser with no backend required.

## Features

- **Transaction logging** — add income or expense entries with amount, category, description, and date
- **Live dashboard** — running totals for income, expenses, and net balance shown on coloured gradient cards
- **Monthly budget limit** — set a spending budget per month; a progress bar shows how much has been used (turns orange at 80%, red when over budget)
- **Spending chart** — donut chart (recharts) breaking down expenses by category
- **Transaction list** — full history with per-entry delete and hover effects
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
├── types.ts                 # Transaction and TransactionKind types
├── categories.ts            # Predefined income/expense categories with colours
├── App.tsx                  # Root component — layout, data wiring, dev seed button
├── main.tsx                 # React entry point
├── index.css                # Global styles (BEM-ish, gradient theme)
├── components/
│   ├── Dashboard.tsx        # Income / Expenses / Balance gradient cards
│   ├── TransactionForm.tsx  # Add-transaction form; submit button colour matches kind
│   ├── TransactionList.tsx  # Scrollable history with delete
│   ├── CategoryChart.tsx    # Recharts donut chart (expenses only)
│   └── BudgetBar.tsx        # Monthly budget progress bar with inline edit
└── hooks/
    ├── useTransactions.ts   # CRUD state + localStorage persistence
    └── useBudget.ts         # Per-month budget state + localStorage persistence
```

## Categories

**Expenses:** Food · Rent · Transport · Entertainment · Utilities · Health · Shopping · Other

**Income:** Salary · Freelance · Investment · Other

## Data persistence

| Key | Contents |
|---|---|
| `budget-tracker.transactions.v1` | Array of all transactions |
| `budget-tracker.budget.v1` | Object mapping `YYYY-MM` → budget amount |

Clearing browser data will erase all entries. No data is ever sent to a server.

## Dev utilities

In development mode, a **"Load sample data"** button appears in the header when the transaction list is empty. It loads 14 realistic transactions for the current month and sets a $2,000 budget. The button is stripped from production builds.

## Git Workflow

After completing any meaningful change, commit and push to GitHub:

```bash
git add -A
git commit -m "<clear, descriptive message>"
git push
```

Use concise commit messages that describe what changed (e.g. `Add streak reset on delete`, `Fix streak calculation off-by-one`).
