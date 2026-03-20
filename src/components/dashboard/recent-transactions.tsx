import { transactions } from "@/src/lib/mock-data";

export function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
      <p className="text-lg font-semibold text-black dark:text-white">
        Recent Transactions
      </p>

      <div className="mt-6 space-y-4">
        {transactions.map((transaction) => (
          <div
            key={`${transaction.title}-${transaction.amount}`}
            className="flex items-center justify-between rounded-xl bg-black/5 p-4 dark:bg-white/5"
          >
            <div>
              <p className="font-medium text-black dark:text-white">
                {transaction.title}
              </p>
              <p className="text-sm text-black/50 dark:text-white/50">
                {transaction.category}
              </p>
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
