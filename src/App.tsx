import { CategoryChart } from "./components/CategoryChart";
import { Dashboard } from "./components/Dashboard";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { useTransactions } from "./hooks/useTransactions";

export default function App() {
  const { transactions, add, remove } = useTransactions();

  return (
    <div className="app">
      <header className="app__header">
        <h1>Budget Tracker</h1>
        <p>Track your income and expenses in one place.</p>
      </header>

      <main className="app__main">
        <Dashboard transactions={transactions} />

        <div className="app__grid">
          <TransactionForm onAdd={add} />
          <CategoryChart transactions={transactions} />
        </div>

        <TransactionList transactions={transactions} onRemove={remove} />
      </main>
    </div>
  );
}
