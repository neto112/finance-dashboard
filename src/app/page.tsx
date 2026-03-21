"use client";

import { useEffect, useState } from "react";
import { AddTransaction } from "../components/dashboard/add-transaction";
import { ChartPlaceholder } from "../components/dashboard/chart-placeholder";
import { Header } from "../components/dashboard/header";
import { RecentTransactions } from "../components/dashboard/recent-transactions";
import { Sidebar } from "../components/dashboard/sidebar";
import { SummaryCards } from "../components/dashboard/summary-cards";
import { transactions as initialTransactions } from "../lib/mock-data";
import type { Transaction } from "../lib/types";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  function handleAddTransaction(transaction: Transaction) {
    setTransactions((prevState) => [transaction, ...prevState]);
  }

  function handleDeleteTransaction(id: string) {
    setTransactions((prevState) =>
      prevState.filter((transaction) => transaction.id !== id),
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 text-black transition-colors dark:bg-neutral-950 dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-4 pt-20 md:p-8 md:pt-8">
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          />

          <SummaryCards transactions={transactions} />

          <div className="mt-8">
            <AddTransaction onAddTransaction={handleAddTransaction} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <ChartPlaceholder />
            <RecentTransactions
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
