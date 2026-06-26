import { BudgetBar } from "./components/BudgetBar";
import { CategoryChart } from "./components/CategoryChart";
import { Dashboard } from "./components/Dashboard";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { useBudget } from "./hooks/useBudget";
import { useTransactions } from "./hooks/useTransactions";

const currentMonth = new Date().toISOString().slice(0, 7);

const SEED: Parameters<ReturnType<typeof useTransactions>["add"]>[0][] = [
  { kind: "income",  amount: 4500,  category: "Salary",       description: "Monthly salary",       date: "2026-06-01" },
  { kind: "income",  amount: 950,   category: "Freelance",    description: "Website redesign",     date: "2026-06-10" },
  { kind: "income",  amount: 220,   category: "Investment",   description: "Dividend payout",      date: "2026-06-15" },
  { kind: "expense", amount: 1200,  category: "Rent",         description: "June rent",            date: "2026-06-01" },
  { kind: "expense", amount: 95,    category: "Health",       description: "Gym membership",       date: "2026-06-02" },
  { kind: "expense", amount: 45,    category: "Transport",    description: "Monthly transit pass", date: "2026-06-03" },
  { kind: "expense", amount: 88.50, category: "Food",         description: "Weekly groceries",     date: "2026-06-07" },
  { kind: "expense", amount: 80,    category: "Utilities",    description: "Electricity bill",     date: "2026-06-08" },
  { kind: "expense", amount: 34.99, category: "Entertainment",description: "Streaming services",   date: "2026-06-09" },
  { kind: "expense", amount: 120,   category: "Entertainment",description: "Concert tickets",      date: "2026-06-14" },
  { kind: "expense", amount: 65.20, category: "Food",         description: "Restaurant dinner",    date: "2026-06-18" },
  { kind: "expense", amount: 210,   category: "Shopping",     description: "New shoes",            date: "2026-06-20" },
  { kind: "expense", amount: 52,    category: "Food",         description: "Lunch with friends",   date: "2026-06-24" },
  { kind: "expense", amount: 29,    category: "Transport",    description: "Taxi rides",           date: "2026-06-25" },
];

export default function App() {
  const { transactions, add, remove } = useTransactions();
  const { budgets, setMonthBudget } = useBudget();

  function loadSampleData() {
    SEED.forEach((tx) => add(tx));
    setMonthBudget(currentMonth, 2000);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Budget Tracker</h1>
        <p>Track your income and expenses in one place.</p>
        {import.meta.env.DEV && transactions.length === 0 && (
          <button className="seed-btn" onClick={loadSampleData}>
            Load sample data
          </button>
        )}
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
