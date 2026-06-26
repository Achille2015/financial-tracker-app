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

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <section className="chart">
      <h2 className="chart__title">Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart__empty">Add an expense to see the breakdown.</p>
      ) : (
        <div className="chart__wrap">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={colorFor("expense", d.name)} />
                ))}
              </Pie>
              <Tooltip
                cursor={{ fill: "transparent" }}
                formatter={(value: number, name: string) => {
                  const formatted = new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(value);
                  const pct = total > 0 ? ((value / total) * 100).toFixed(0) : "0";
                  return [`${formatted} (${pct}%)`, name];
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: 12, fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
