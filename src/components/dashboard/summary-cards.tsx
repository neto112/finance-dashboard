import type { Transaction } from "../../lib/types";

type SummaryCardsProps = {
  transactions: Transaction[];
};

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = income - expenses;

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const summaryItems = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      valueClassName:
        totalBalance >= 0 ? "text-black dark:text-white" : "text-rose-400",
    },
    {
      title: "Income",
      value: formatCurrency(income),
      valueClassName: "text-emerald-400",
    },
    {
      title: "Expenses",
      value: formatCurrency(expenses),
      valueClassName: "text-rose-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {summaryItems.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-sm text-black/60 dark:text-white/60">
            {item.title}
          </p>

          <h3 className={`mt-3 text-3xl font-bold ${item.valueClassName}`}>
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
