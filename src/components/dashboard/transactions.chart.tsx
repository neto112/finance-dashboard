"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Transaction } from "../../lib/services/transactions";

type TransactionsChartProps = {
  transactions: Transaction[];
};

type MonthlyChartItem = {
  key: string;
  month: string;
  income: number;
  expense: number;
  balance: number;
};

function getMonthKey(dateString?: string) {
  if (!dateString) return "unknown";

  const date = new Date(`${dateString}T00:00:00`);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getMonthLabel(dateString?: string) {
  if (!dateString) return "Unknown";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function TransactionsChart({ transactions }: TransactionsChartProps) {
  const groupedMap = new Map<string, MonthlyChartItem>();

  for (const transaction of transactions) {
    const key = getMonthKey(transaction.date);

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        key,
        month: getMonthLabel(transaction.date),
        income: 0,
        expense: 0,
        balance: 0,
      });
    }

    const current = groupedMap.get(key)!;

    if (transaction.type === "income") {
      current.income += Number(transaction.amount);
    } else {
      current.expense += Number(transaction.amount);
    }
  }

  const chartData = Array.from(groupedMap.values())
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce<MonthlyChartItem[]>((acc, item) => {
      const previousBalance = acc.length ? acc[acc.length - 1].balance : 0;
      const balance = previousBalance + item.income - item.expense;

      acc.push({
        ...item,
        balance,
      });

      return acc;
    }, []);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black dark:text-white">
            Financial Overview
          </h3>
          <p className="text-sm text-black/60 dark:text-white/60">
            Income, expenses and monthly balance
          </p>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed border-black/10 text-sm text-black/50 dark:border-white/10 dark:text-white/50">
          No chart data yet
        </div>
      ) : (
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(
                  value:
                    | number
                    | string
                    | readonly (string | number)[]
                    | undefined,
                  name: string | number | undefined,
                ) => [
                  formatCurrency(
                    Number(Array.isArray(value) ? value[0] : (value ?? 0)),
                  ),
                  name === "income"
                    ? "Income"
                    : name === "expense"
                      ? "Expense"
                      : "Balance",
                ]}
              />
              <Legend />
              <Bar dataKey="income" name="Income" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" name="Expense" radius={[8, 8, 0, 0]} />
              <Line
                type="monotone"
                dataKey="balance"
                name="Balance"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
