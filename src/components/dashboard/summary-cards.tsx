import { summaryItems } from "@/src/lib/mock-data";

export function SummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {summaryItems.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
        >
          <p className="text-sm text-black/60 dark:text-white/60">
            {item.title}
          </p>
          <h3 className={`mt-3 text-3xl font-bold ${item.valueClassName}`}>
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
