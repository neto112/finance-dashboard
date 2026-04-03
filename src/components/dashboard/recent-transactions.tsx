"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Transaction } from "../../lib/types";

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
    <div className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
      <p className="text-lg font-semibold text-black dark:text-white">
        Transactions
      </p>

      <div className="mt-6 space-y-4">
        {transactions.length === 0 ? (
          <div className="rounded-xl bg-black/5 p-4 text-sm text-black/50 dark:bg-white/5 dark:text-white/50">
            No transactions found for the selected filters.
          </div>
        ) : (
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
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  layout
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

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}{" "}
                      {formattedAmount}
                    </span>

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
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
