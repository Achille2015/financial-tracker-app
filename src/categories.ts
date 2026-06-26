import type { TransactionKind } from "./types";

export interface Category {
  name: string;
  color: string;
}

export const EXPENSE_CATEGORIES: Category[] = [
  { name: "Food", color: "#ef4444" },
  { name: "Rent", color: "#8b5cf6" },
  { name: "Transport", color: "#3b82f6" },
  { name: "Entertainment", color: "#ec4899" },
  { name: "Utilities", color: "#f59e0b" },
  { name: "Health", color: "#10b981" },
  { name: "Shopping", color: "#06b6d4" },
  { name: "Other", color: "#6b7280" },
];

export const INCOME_CATEGORIES: Category[] = [
  { name: "Salary", color: "#22c55e" },
  { name: "Freelance", color: "#14b8a6" },
  { name: "Investment", color: "#0ea5e9" },
  { name: "Other", color: "#6b7280" },
];

export function categoriesFor(kind: TransactionKind): Category[] {
  return kind === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

export function colorFor(kind: TransactionKind, name: string): string {
  const found = categoriesFor(kind).find((c) => c.name === name);
  return found?.color ?? "#6b7280";
}
