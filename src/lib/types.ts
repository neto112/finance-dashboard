export type SummaryItem = {
  title: string;
  value: string;
  valueClassName: string;
};

export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export type OverviewItem = {
  name: string;
  income: number;
  expenses: number;
};
