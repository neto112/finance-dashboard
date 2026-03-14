import { ChartPlaceholder } from "../components/dashboard/chart-placeholder";
import { Header } from "../components/dashboard/header";
import { RecentTransactions } from "../components/dashboard/recent-transactions";
import { Sidebar } from "../components/dashboard/sidebar";
import { SummaryCards } from "../components/dashboard/summary-cards";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-8">
          <Header />
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
