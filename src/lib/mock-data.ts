import type { OverviewItem, SummaryItem, Transaction } from "./types";

export const summaryItems: SummaryItem[] = [
  {
    title: "Total Balance",
    value: "$ 12,480.00",
    valueClassName: "text-white",
  },
  {
    title: "Income",
    value: "$ 8,350.00",
    valueClassName: "text-emerald-400",
  },
  {
    title: "Expenses",
    value: "$ 3,920.00",
    valueClassName: "text-rose-400",
  },
];

export const transactions: Transaction[] = [
  {
    title: "Grocery Store",
    category: "Food",
    amount: "- $84.90",
    amountClassName: "text-rose-400",
  },
  {
    title: "Salary",
    category: "Income",
    amount: "+ $4,000.00",
    amountClassName: "text-emerald-400",
  },
  {
    title: "Internet Bill",
    category: "Utilities",
    amount: "- $59.00",
    amountClassName: "text-rose-400",
  },
];

export const overviewData: OverviewItem[] = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 5200, expenses: 2800 },
  { name: "Apr", income: 4100, expenses: 3200 },
  { name: "May", income: 4700, expenses: 2600 },
  { name: "Jun", income: 5500, expenses: 3500 },
];
