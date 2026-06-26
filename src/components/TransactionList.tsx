import { colorFor } from "../categories";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

function formatAmount(t: Transaction): string {
  const sign = t.kind === "income" ? "+" : "−";
  return `${sign}${new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(t.amount)}`;
}

export function TransactionList({ transactions, onRemove }: Props) {
  if (transactions.length === 0) {
    return (
      <section className="list">
        <h2 className="list__title">Transactions</h2>
        <p className="list__empty">No transactions yet. Add your first one!</p>
      </section>
    );
  }

  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="list">
      <h2 className="list__title">Transactions</h2>
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
            <span className="row__date">{t.date}</span>
            <span
              className={`row__amount row__amount--${t.kind}`}
            >
              {formatAmount(t)}
            </span>
            <button
              type="button"
              className="row__delete"
              onClick={() => onRemove(t.id)}
              aria-label="Delete transaction"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
