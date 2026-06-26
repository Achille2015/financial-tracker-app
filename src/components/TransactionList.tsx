import { colorFor } from "../categories";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatAmount(t: Transaction): string {
  const sign = t.kind === "income" ? "+" : "−";
  return `${sign}${new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(t.amount)}`;
}

function formatDate(iso: string): string {
  // Parse YYYY-MM-DD without timezone shift
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function TransactionList({ transactions, onRemove, onClear }: Props) {
  if (transactions.length === 0) {
    return (
      <section className="list">
        <h2 className="list__title">Transactions</h2>
        <p className="list__empty">
          No transactions yet. Add your first one using the form above.
        </p>
      </section>
    );
  }

  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  function handleClear() {
    if (window.confirm(`Delete all ${transactions.length} transactions? This cannot be undone.`)) {
      onClear();
    }
  }

  return (
    <section className="list">
      <h2 className="list__title">
        Transactions <span className="list__count">({transactions.length})</span>
      </h2>
      <ul className="list__items">
        {sorted.map((t) => (
          <li key={t.id} className="row">
            <span
              className="row__dot"
              style={{ background: colorFor(t.kind, t.category) }}
              aria-hidden
            />
            <div className="row__main">
              <span className="row__category">{t.category}</span>
              {t.description && (
                <span className="row__desc">{t.description}</span>
              )}
            </div>
            <span className="row__date">{formatDate(t.date)}</span>
            <span className={`row__amount row__amount--${t.kind}`}>
              {formatAmount(t)}
            </span>
            <button
              type="button"
              className="row__delete"
              onClick={() => onRemove(t.id)}
              aria-label={`Delete ${t.category} transaction of ${formatAmount(t)}`}
              title="Delete transaction"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="list__footer">
        <button
          type="button"
          className="list__clear-btn"
          onClick={handleClear}
          aria-label="Delete all transactions"
        >
          Delete all transactions
        </button>
      </div>
    </section>
  );
}
