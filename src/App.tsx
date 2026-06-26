import { BudgetBar } from "./components/BudgetBar";
import { CategoryChart } from "./components/CategoryChart";
import { Dashboard } from "./components/Dashboard";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { useBudget } from "./hooks/useBudget";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTransactions } from "./hooks/useTransactions";

type SeedTx = Parameters<ReturnType<typeof useTransactions>["add"]>[0];

const SEED: SeedTx[] = [
  { kind: "income",  amount: 4500,  category: "Salary",        description: "Monthly salary",       date: "2026-06-01" },
  { kind: "income",  amount: 950,   category: "Freelance",     description: "Website redesign",     date: "2026-06-10" },
  { kind: "income",  amount: 220,   category: "Investment",    description: "Dividend payout",      date: "2026-06-15" },
  { kind: "expense", amount: 1200,  category: "Rent",          description: "June rent",            date: "2026-06-01" },
  { kind: "expense", amount: 95,    category: "Health",        description: "Gym membership",       date: "2026-06-02" },
  { kind: "expense", amount: 45,    category: "Transport",     description: "Monthly transit pass", date: "2026-06-03" },
  { kind: "expense", amount: 88.50, category: "Food",          description: "Weekly groceries",     date: "2026-06-07" },
  { kind: "expense", amount: 80,    category: "Utilities",     description: "Electricity bill",     date: "2026-06-08" },
  { kind: "expense", amount: 34.99, category: "Entertainment", description: "Streaming services",   date: "2026-06-09" },
  { kind: "expense", amount: 120,   category: "Entertainment", description: "Concert tickets",      date: "2026-06-14" },
  { kind: "expense", amount: 65.20, category: "Food",          description: "Restaurant dinner",    date: "2026-06-18" },
  { kind: "expense", amount: 210,   category: "Shopping",      description: "New shoes",            date: "2026-06-20" },
  { kind: "expense", amount: 52,    category: "Food",          description: "Lunch with friends",   date: "2026-06-24" },
  { kind: "expense", amount: 29,    category: "Transport",     description: "Taxi rides",           date: "2026-06-25" },
];

const SEED_MORE: SeedTx[] = [
  { kind: "income",  amount: 3800,  category: "Salary",        description: "Monthly salary",       date: "2026-05-01" },
  { kind: "income",  amount: 600,   category: "Freelance",     description: "Logo design project",  date: "2026-05-12" },
  { kind: "expense", amount: 1200,  category: "Rent",          description: "May rent",             date: "2026-05-01" },
  { kind: "expense", amount: 73.40, category: "Food",          description: "Supermarket run",      date: "2026-05-03" },
  { kind: "expense", amount: 45,    category: "Transport",     description: "Monthly transit pass", date: "2026-05-04" },
  { kind: "expense", amount: 95,    category: "Health",        description: "Gym membership",       date: "2026-05-05" },
  { kind: "expense", amount: 320,   category: "Shopping",      description: "Jacket & accessories", date: "2026-05-09" },
  { kind: "expense", amount: 55,    category: "Utilities",     description: "Internet bill",        date: "2026-05-10" },
  { kind: "expense", amount: 89,    category: "Health",        description: "Pharmacy & vitamins",  date: "2026-05-14" },
  { kind: "expense", amount: 48.50, category: "Food",          description: "Sushi dinner",         date: "2026-05-17" },
  { kind: "expense", amount: 15.99, category: "Entertainment", description: "eBook purchase",       date: "2026-05-19" },
  { kind: "expense", amount: 110,   category: "Entertainment", description: "Theater tickets",      date: "2026-05-22" },
  { kind: "expense", amount: 36,    category: "Transport",     description: "Uber trips",           date: "2026-05-26" },
  { kind: "expense", amount: 62,    category: "Food",          description: "BBQ with friends",     date: "2026-05-30" },
  { kind: "income",  amount: 150,   category: "Other",         description: "Sold old laptop",      date: "2026-05-28" },
  { kind: "income",  amount: 4500,  category: "Salary",        description: "Monthly salary",       date: "2026-04-01" },
  { kind: "expense", amount: 1200,  category: "Rent",          description: "April rent",           date: "2026-04-01" },
  { kind: "expense", amount: 95,    category: "Health",        description: "Gym membership",       date: "2026-04-02" },
  { kind: "expense", amount: 45,    category: "Transport",     description: "Monthly transit pass", date: "2026-04-03" },
  { kind: "expense", amount: 490,   category: "Shopping",      description: "Spring wardrobe",      date: "2026-04-05" },
  { kind: "expense", amount: 92.80, category: "Food",          description: "Weekly groceries",     date: "2026-04-06" },
  { kind: "expense", amount: 80,    category: "Utilities",     description: "Electricity bill",     date: "2026-04-08" },
  { kind: "expense", amount: 34.99, category: "Entertainment", description: "Streaming services",   date: "2026-04-09" },
  { kind: "expense", amount: 75,    category: "Health",        description: "Dentist visit",        date: "2026-04-15" },
  { kind: "expense", amount: 44,    category: "Food",          description: "Brunch outing",        date: "2026-04-19" },
  { kind: "income",  amount: 300,   category: "Investment",    description: "Stock dividend",       date: "2026-04-20" },
  { kind: "expense", amount: 185,   category: "Entertainment", description: "Weekend city trip",    date: "2026-04-25" },
];

export default function App() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { transactions, add, remove } = useTransactions();
  const { budgets, setMonthBudget } = useBudget();
  const { dark, toggle } = useDarkMode();

  function loadSampleData() {
    SEED.forEach((tx) => add(tx));
    setMonthBudget(currentMonth, 2000);
  }

  function addMoreData() {
    SEED_MORE.forEach((tx) => add(tx));
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-top">
          <div>
            <h1>Budget Tracker</h1>
            <p>Track your income and expenses in one place.</p>
          </div>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
            {dark ? "☀ Light" : "☽ Dark"}
          </button>
        </div>
        {import.meta.env.DEV && (
          <div className="seed-actions">
            {transactions.length === 0 && (
              <button className="seed-btn" onClick={loadSampleData}>
                Load sample data
              </button>
            )}
            {transactions.length > 0 && (
              <button className="seed-btn" onClick={addMoreData}>
                Add more transactions
              </button>
            )}
          </div>
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
