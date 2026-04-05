"use client";

import { Transaction } from "@/src/lib/services/transactions";
import { AnimatePresence, motion } from "framer-motion";

type RecentTransactionsProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (transaction: Transaction) => void;
};

export function RecentTransactions({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: RecentTransactionsProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
      <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Transactions
      </h3>

      {transactions.length === 0 ? (
        <p className="text-sm text-black/60 dark:text-white/60">
          No transactions found for the selected filters.
        </p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {transactions.map((transaction) => {
              const formattedAmount = transaction.amount.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                },
              );

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col gap-3 rounded-xl border border-black/10 bg-black/[0.03] p-4 dark:border-white/10 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-black dark:text-white">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {transaction.category}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span
                      className={`text-sm font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}{" "}
                      {formattedAmount}
                    </span>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEditTransaction(transaction)}
                        className="rounded-lg border border-black/10 px-3 py-2 text-sm text-black/70 transition hover:bg-black/5 hover:text-black dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="rounded-lg border border-black/10 px-3 py-2 text-sm text-black/70 transition hover:bg-black/5 hover:text-black dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
