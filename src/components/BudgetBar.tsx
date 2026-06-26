import { useState } from "react";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  budget: number;
  month: string;
  onSetBudget: (amount: number) => void;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

function monthLabel(month: string) {
  const [year, m] = month.split("-");
  return new Date(Number(year), Number(m) - 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export function BudgetBar({ transactions, budget, month, onSetBudget }: Props) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

  const spent = transactions
    .filter((t) => t.kind === "expense" && t.date.startsWith(month))
    .reduce((sum, t) => sum + t.amount, 0);

  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const over = budget > 0 && spent > budget;
  const warn = !over && pct >= 80;

  const handleSave = () => {
    const val = Number(input);
    if (Number.isFinite(val) && val > 0) onSetBudget(val);
    setEditing(false);
  };

  const startEdit = () => {
    setInput(budget > 0 ? String(budget) : "");
    setEditing(true);
  };

  const remaining = budget - spent;

  return (
    <section className="budget">
      <div className="budget__header">
        <div className="budget__title-group">
          <span className="budget__eyebrow">Monthly budget</span>
          <span className="budget__month">{monthLabel(month)}</span>
        </div>

        {editing ? (
          <div className="budget__edit">
            <input
              type="number"
              min="1"
              step="1"
              autoFocus
              className="budget__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setEditing(false);
              }}
              placeholder="Amount"
              aria-label="Budget amount"
            />
            <button className="budget__btn" onClick={handleSave}>Save</button>
            <button
              className="budget__btn budget__btn--cancel"
              onClick={() => setEditing(false)}
              aria-label="Cancel"
            >
              ✕
            </button>
          </div>
        ) : (
          <button className="budget__set-btn" onClick={startEdit}>
            {budget > 0 ? "Edit budget" : "Set budget"}
          </button>
        )}
      </div>

      {budget > 0 ? (
        <>
          <div
            className="budget__bar-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={budget}
            aria-valuenow={Math.min(spent, budget)}
          >
            <div
              className={`budget__bar-fill${over ? " budget__bar-fill--over" : warn ? " budget__bar-fill--warn" : ""}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="budget__stats">
            <span className={over ? "budget__overspent" : ""}>
              {formatCurrency(spent)} <span className="budget__stats-muted">spent of {formatCurrency(budget)}</span>
            </span>
            <span className={over ? "budget__overspent" : "budget__remaining"}>
              {over
                ? `${formatCurrency(Math.abs(remaining))} over`
                : `${formatCurrency(remaining)} left`}
            </span>
          </div>
        </>
      ) : (
        <p className="budget__empty">Set a monthly budget to track your spending.</p>
      )}
    </section>
  );
}
