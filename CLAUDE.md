# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Budget Tracker** — a client-side personal finance app built with React 18, TypeScript, and Vite. Users log income/expense transactions, see a live balance dashboard, set a monthly budget with a progress bar, and visualise spending by category via a recharts donut chart. All data persists in `localStorage`; there is no backend.

## Commands

```bash
npm run dev        # Start Vite dev server at http://localhost:5173
npm run build      # Type-check (tsc -b) then bundle for production → dist/
npm run preview    # Serve the production build locally
```

There are no test scripts configured yet. TypeScript is the primary correctness tool — run `npx tsc --noEmit` to type-check without building.

## Architecture

```
src/
├── types.ts                 # Transaction, TransactionKind
├── categories.ts            # EXPENSE_CATEGORIES, INCOME_CATEGORIES, colorFor(), categoriesFor()
├── App.tsx                  # Root — composes all components, owns no state directly
│                            # Contains SEED data array; dev-only "Load sample data" button
├── main.tsx                 # ReactDOM.createRoot entry point
├── index.css                # All styles (BEM-ish, gradient light theme, Inter font)
├── components/
│   ├── Dashboard.tsx        # Gradient cards: income (green) / expense (red) / balance (indigo)
│   ├── TransactionForm.tsx  # Controlled form; pill buttons + submit button colour match kind
│   ├── TransactionList.tsx  # Renders list with hover effects; calls onRemove(id) prop
│   ├── CategoryChart.tsx    # Recharts PieChart; expense breakdown only
│   └── BudgetBar.tsx        # Monthly budget progress bar; inline edit; orange at 80%, red over budget
└── hooks/
    ├── useTransactions.ts   # Single source of truth: useState + localStorage sync
    │                        # Exposes { transactions, add, remove }
    └── useBudget.ts         # Per-month budget: useState + localStorage sync
                             # Exposes { budgets, setMonthBudget }
```

**Data flow:** `useTransactions` and `useBudget` in `App` own all state and pass slices down as props. No context or global store is used.

**Persistence keys:**
- `budget-tracker.transactions.v1` → `Transaction[]`
- `budget-tracker.budget.v1` → `Record<"YYYY-MM", number>`

## Key conventions

- Components are named exports (not default), except `App`.
- `Transaction` IDs are generated with `crypto.randomUUID()` (with a `Date.now()` fallback).
- Currency is always formatted with `Intl.NumberFormat` — never hardcoded `$` symbols.
- Category colours live in `categories.ts`; use `colorFor(kind, name)` to resolve them.
- The submit button and kind pills in `TransactionForm` reflect the selected kind: green for income, red for expense.
- The budget bar top-border colour and fill change state: green → orange (≥ 80%) → red (over budget).
- The dev seed button is guarded by `import.meta.env.DEV && transactions.length === 0` — it is stripped in production builds.
- TypeScript project references: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`.

## Dependencies

| Package | Purpose |
|---|---|
| `react` / `react-dom` 18 | UI framework |
| `recharts` 2 | Donut chart in `CategoryChart` |
| `typescript` 5 | Type checking |
| `vite` 5 + `@vitejs/plugin-react` | Build tooling |

## GitHub

Repository: https://github.com/Achille2015/financial-tracker-app

```bash
git add -A
git commit -m "<clear, descriptive message>"
git push
```

Use concise commit messages that describe what changed (e.g. `Add streak reset on delete`, `Fix streak calculation off-by-one`).
