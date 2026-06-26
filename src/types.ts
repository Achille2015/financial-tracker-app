export type TransactionKind = "income" | "expense";

export interface Transaction {
  id: string;
  kind: TransactionKind;
  amount: number;
  category: string;
  description: string;
  date: string;
}
