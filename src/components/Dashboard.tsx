import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

export function Dashboard({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.kind === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.kind === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <section className="dashboard">
      <div className="card card--income">
        <span className="card__label">Income</span>
        <span className="card__value">{formatCurrency(income)}</span>
      </div>
      <div className="card card--expense">
        <span className="card__label">Expenses</span>
        <span className="card__value">{formatCurrency(expenses)}</span>
      </div>
      <div
        className={`card card--balance ${balance < 0 ? "card--negative" : ""}`}
      >
        <span className="card__label">Balance</span>
        <span className="card__value">{formatCurrency(balance)}</span>
      </div>
    </section>
  );
}
