import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "budget-tracker.budget.v1";

function load(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => typeof v === "number" && Number.isFinite(v as number))
    ) as Record<string, number>;
  } catch {
    return {};
  }
}

export function useBudget() {
  const [budgets, setBudgets] = useState<Record<string, number>>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets]);

  const setMonthBudget = useCallback((month: string, amount: number) => {
    setBudgets((prev) => ({ ...prev, [month]: amount }));
  }, []);

  return { budgets, setMonthBudget };
}
