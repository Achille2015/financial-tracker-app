# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Budget Tracker** — a client-side personal finance app built with React 18, TypeScript, and Vite. Users log income/expense transactions, see a live balance dashboard, set a monthly budget with a progress bar, visualise spending by category, and toggle dark mode. All data persists in `localStorage`; there is no backend.

## Commands

```bash
npm run dev        # Start Vite dev server at http://localhost:5173
npm run build      # Type-check (tsc -b) then bundle for production → dist/
npm run preview    # Serve the production build locally
```

TypeScript is the primary correctness tool — run `npx tsc --noEmit` to type-check without building. No test runner is configured yet.

## Architecture

```
src/
├── vite-env.d.ts            # /// <reference types="vite/client" /> — required for import.meta.env
├── types.ts                 # Transaction, TransactionKind
├── categories.ts            # EXPENSE_CATEGORIES, INCOME_CATEGORIES, colorFor(), categoriesFor()
├── App.tsx                  # Root — composes all components, owns no state directly
│                            # SEED + SEED_MORE arrays; dev-only seed buttons (import.meta.env.DEV)
│                            # currentMonth derived inside component (not at module level)
├── main.tsx                 # ReactDOM.createRoot entry point
├── index.css                # Full design-token system + light/dark themes (see CSS section)
├── components/
│   ├── Dashboard.tsx        # Gradient cards: income (green) / expense (red) / balance (indigo/red)
│   ├── TransactionForm.tsx  # Controlled form; pill buttons + submit button colour match kind
│   │                        # Resets amount, description, and date after submit
│   ├── TransactionList.tsx  # Sorted newest-first; friendly date format (e.g. "Jun 15");
│   │                        # transaction count in heading; onRemove + onClear props;
│   │                        # "Delete all" button (bottom left) with confirmation dialog
│   ├── CategoryChart.tsx    # Recharts PieChart; expense breakdown only; % in tooltip
│   └── BudgetBar.tsx        # Monthly budget bar; inline edit; green → orange (≥80%) → red;
│                            # shows "$X left" or "$X over"; role="progressbar" accessible
└── hooks/
    ├── useTransactions.ts   # Exposes { transactions, add, remove, clear }
    │                        # localStorage sync in useEffect; load() wrapped in try/catch
    ├── useBudget.ts         # Exposes { budgets, setMonthBudget }
    │                        # load() validates each value is a finite number
    └── useDarkMode.ts       # Exposes { dark, toggle }
                             # Toggles html.dark class; try/catch around localStorage init
                             # Auto-detects prefers-color-scheme on first load
```

**Data flow:** All three hooks live in `App` and pass slices down as props. No context or global store is used.

**Persistence keys:**
- `budget-tracker.transactions.v1` → `Transaction[]`
- `budget-tracker.budget.v1` → `Record<"YYYY-MM", number>`
- `budget-tracker.dark-mode` → `"true"` | `"false"`

## CSS / design system

`index.css` is structured around a token system defined in `:root`:

| Token group | Examples |
|---|---|
| Spacing (4pt grid) | `--space-1` … `--space-16` |
| Type scale | `--text-xs` … `--text-4xl` |
| Radius scale | `--radius-sm` … `--radius-full` |
| Shadows | `--shadow-xs` … `--shadow-lg`, `--shadow-focus` |
| Motion | `--ease`, `--dur-fast`, `--dur-base` |
| Semantic colours | `--accent`, `--income`, `--expense`, `--income-soft`, `--expense-soft` … |

Dark theme is defined in `html.dark { … }` — it overrides every surface, border, shadow, and gradient token. The `html.dark` class is toggled by `useDarkMode`.

Always use tokens (e.g. `var(--space-4)`, `var(--text-sm)`) rather than magic numbers when adding styles.

## Key conventions

- Components are named exports (not default), except `App`.
- `Transaction` IDs are generated with `crypto.randomUUID()` (with a `Date.now()` fallback).
- Currency is formatted with `Intl.NumberFormat` — never hardcode `$` symbols.
- Category colours: use `colorFor(kind, name)` from `categories.ts`.
- `currentMonth` is derived inside the `App` component body (`new Date().toISOString().slice(0, 7)`), not at module level, so it stays current across month boundaries.
- The dev seed buttons are guarded by `import.meta.env.DEV` and stripped from production builds.
- `:focus-visible` is styled globally via `box-shadow: var(--shadow-focus)`.
- `prefers-reduced-motion` disables all transitions app-wide.

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
