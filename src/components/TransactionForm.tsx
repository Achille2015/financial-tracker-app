import { useState } from "react";
import { categoriesFor } from "../categories";
import type { Transaction, TransactionKind } from "../types";

interface Props {
  onAdd: (tx: Omit<Transaction, "id">) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function TransactionForm({ onAdd }: Props) {
  const [kind, setKind] = useState<TransactionKind>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categoriesFor("expense")[0].name);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today());

  const handleKindChange = (next: TransactionKind) => {
    setKind(next);
    setCategory(categoriesFor(next)[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number(amount);
    if (!Number.isFinite(parsed) || parsed <= 0) return;

    onAdd({
      kind,
      amount: parsed,
      category,
      description: description.trim(),
      date,
    });

    setAmount("");
    setDescription("");
    setDate(today());
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Add transaction</h2>

      <div className="form__kind">
        <button
          type="button"
          className={`pill ${kind === "expense" ? "pill--active-expense" : ""}`}
          onClick={() => handleKindChange("expense")}
        >
          Expense
        </button>
        <button
          type="button"
          className={`pill ${kind === "income" ? "pill--active-income" : ""}`}
          onClick={() => handleKindChange("income")}
        >
          Income
        </button>
      </div>

      <label className="form__field">
        <span>Amount</span>
        <input
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </label>

      <label className="form__field">
        <span>Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoriesFor(kind).map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form__field">
        <span>Description</span>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="optional"
        />
      </label>

      <label className="form__field">
        <span>Date</span>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <button type="submit" className={`form__submit form__submit--${kind}`}>
        Add {kind === "income" ? "Income" : "Expense"}
      </button>
    </form>
  );
}
