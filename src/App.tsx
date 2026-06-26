import { BudgetBar } from "./components/BudgetBar";
import { CategoryChart } from "./components/CategoryChart";
import { Dashboard } from "./components/Dashboard";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { useBudget } from "./hooks/useBudget";
import { useTransactions } from "./hooks/useTransactions";

const currentMonth = new Date().toISOString().slice(0, 7);

export default function App() {
  const { transactions, add, remove } = useTransactions();
  const { budgets, setMonthBudget } = useBudget();

  return (
    <div className="app">
      <header className="app__header">
        <h1>Budget Tracker</h1>
        <p>Track your income and expenses in one place.</p>
      </header>

      <main className="app__main">
        <Dashboard transactions={transactions} />

        <BudgetBar
          transactions={transactions}
          budget={budgets[currentMonth] ?? 0}
          month={currentMonth}
          onSetBudget={(amount) => setMonthBudget(currentMonth, amount)}
        />

        <div className="app__grid">
          <TransactionForm onAdd={add} />
          <CategoryChart transactions={transactions} />
        </div>

        <TransactionList transactions={transactions} onRemove={remove} />
      </main>
    </div>
  );
}
