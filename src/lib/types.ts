export type SummaryItem = {
  title: string;
  value: string;
  valueClassName: string;
};

export type Transaction = {
  title: string;
  category: string;
  amount: string;
  amountClassName: string;
};

export type OverviewItem = {
  name: string;
  income: number;
  expenses: number;
};
