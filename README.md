# Budget Tracker

A lightweight personal finance tracker built with React 18, TypeScript, and Vite. Log your income and expenses, monitor your balance at a glance, and visualise spending by category — all stored locally in the browser with no backend required.

## Features

- **Transaction logging** — add income or expense entries with amount, category, description, and date
- **Live dashboard** — running totals for income, expenses, and net balance
- **Spending chart** — donut chart (recharts) breaking down expenses by category
- **Transaction list** — full history with per-entry delete
- **Persistent storage** — data survives page reloads via `localStorage`; no account or server needed

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite 5 |
| Charts | recharts 2 |
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
├── App.tsx                  # Root component — layout and data wiring
├── main.tsx                 # React entry point
├── index.css                # Global styles
├── components/
│   ├── Dashboard.tsx        # Income / Expenses / Balance summary cards
│   ├── TransactionForm.tsx  # Add-transaction form
│   ├── TransactionList.tsx  # Scrollable history with delete
│   └── CategoryChart.tsx    # Recharts donut chart (expenses only)
└── hooks/
    └── useTransactions.ts   # CRUD state + localStorage persistence
```

## Categories

**Expenses:** Food · Rent · Transport · Entertainment · Utilities · Health · Shopping · Other

**Income:** Salary · Freelance · Investment · Other

## Data persistence

Transactions are stored under the key `budget-tracker.transactions.v1` in `localStorage`. Clearing browser data will erase all entries. No data is ever sent to a server.

## Git Workflow

After completing any meaningful change, commit and push to GitHub:

 