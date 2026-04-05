"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Transaction } from "../../lib/services/transactions";

type Props = {
  transactions: Transaction[];
};

export function TransactionsChart({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const data = [
    { name: "Entradas", value: income },
    { name: "Saídas", value: expense },
  ];

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
      <h2 className="mb-4 text-lg font-semibold">Visão geral</h2>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              <Cell />
              <Cell />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
