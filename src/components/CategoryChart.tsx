import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { colorFor } from "../categories";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export function CategoryChart({ transactions }: Props) {
  const byCategory = new Map<string, number>();
  for (const t of transactions) {
    if (t.kind !== "expense") continue;
    byCategory.set(t.category, (byCategory.get(t.category) ?? 0) + t.amount);
  }

  const data = Array.from(byCategory.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <section className="chart">
      <h2 className="chart__title">Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart__empty">Add an expense to see the breakdown.</p>
      ) : (
        <div className="chart__wrap">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={colorFor("expense", d.name)} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(value)
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
