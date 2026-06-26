# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Budget Tracker** — a client-side personal finance app built with React 18, TypeScript, and Vite. Users log income/expense transactions, see a live balance dashboard, and visualise spending by category via a recharts donut chart. All data persists in `localStorage`; there is no backend.

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
├── App.tsx                  # Root — composes all four components, owns no state directly
├── main.tsx                 # ReactDOM.createRoot entry point
├── index.css                # All styles (BEM-ish class names: .card, .app__grid, etc.)
├── components/
│   ├── Dashboard.tsx        # Displays income / expense / balance totals
│   ├── TransactionForm.tsx  # Controlled form; calls onAdd(tx) prop
│   ├── TransactionList.tsx  # Renders list; calls onRemove(id) prop
│   └── CategoryChart.tsx    # Recharts PieChart; expense breakdown only
└── hooks/
    └── useTransactions.ts   # Single source of truth: useState + localStorage sync
                             # Exposes { transactions, add, remove }
```

**Data flow:** `useTransactions` in `App` owns all state and passes slices down as props. No context or global store is used.

**Persistence key:** `budget-tracker.transactions.v1` in `localStorage`.

## Key conventions

- Components are named exports (not default), except `App`.
- `Transaction` IDs are generated with `crypto.randomUUID()` (with a `Date.now()` fallback).
- Currency is always formatted with `Intl.NumberFormat` — never hardcoded `$` symbols.
- Category colours live in `categories.ts`; use `colorFor(kind, name)` to resolve them.
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
