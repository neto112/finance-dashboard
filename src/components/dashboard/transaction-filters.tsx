"use client";

import { motion } from "framer-motion";

type TransactionFiltersProps = {
  selectedType: "all" | "income" | "expense";
  selectedCategory: string;
  categories: string[];
  onTypeChange: (type: "all" | "income" | "expense") => void;
  onCategoryChange: (category: string) => void;
};

const typeOptions: Array<"all" | "income" | "expense"> = [
  "all",
  "income",
  "expense",
];

export function TransactionFilters({
  selectedType,
  selectedCategory,
  categories,
  onTypeChange,
  onCategoryChange,
}: TransactionFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.22 }}
      className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Filters
          </h3>
          <p className="mt-1 text-sm text-black/50 dark:text-white/50">
            Filter transactions by type and category
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((type) => {
              const isActive = selectedType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onTypeChange(type)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500 text-white"
                      : "border border-black/10 bg-white text-black hover:bg-black/5 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              );
            })}
          </div>

          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-black outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
