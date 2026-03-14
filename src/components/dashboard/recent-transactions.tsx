import { transactions } from "../../lib/mock-data";

export function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-lg font-semibold">Recent Transactions</p>

      <div className="mt-6 space-y-4">
        {transactions.map((transaction) => (
          <div
            key={`${transaction.title}-${transaction.amount}`}
            className="flex items-center justify-between rounded-xl bg-white/5 p-4"
          >
            <div>
              <p className="font-medium">{transaction.title}</p>
              <p className="text-sm text-white/50">{transaction.category}</p>
            </div>

            <span className={`font-semibold ${transaction.amountClassName}`}>
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
