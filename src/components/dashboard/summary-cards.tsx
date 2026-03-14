import { summaryItems } from "../../lib/mock-data";

export function SummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {summaryItems.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <p className="text-sm text-white/60">{item.title}</p>
          <h3 className={`mt-3 text-3xl font-bold ${item.valueClassName}`}>
            {item.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
