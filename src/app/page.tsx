"use client";

import { useEffect, useState } from "react";
import { ChartPlaceholder } from "../components/dashboard/chart-placeholder";
import { Header } from "../components/dashboard/header";
import { RecentTransactions } from "../components/dashboard/recent-transactions";
import { Sidebar } from "../components/dashboard/sidebar";
import { SummaryCards } from "../components/dashboard/summary-cards";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <main className="min-h-screen bg-neutral-100 text-black transition-colors dark:bg-neutral-950 dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-4 pt-20 md:p-8 md:pt-8">
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          />
          <SummaryCards />

          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <ChartPlaceholder />
            <RecentTransactions />
          </div>
        </section>
      </div>
    </main>
  );
}
