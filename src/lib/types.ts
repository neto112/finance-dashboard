export type SummaryItem = {
  title: string;
  value: string;
  valueClassName: string;
};

export type Transaction = {
  id: string;
  user_id?: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date?: string;
  created_at?: string;
};

export type OverviewItem = {
  name: string;
  income: number;
  expenses: number;
};
