"use client";

type HeaderProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-black/50 dark:text-white/50">Welcome back</p>
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Finance Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-400">
          +12.4% this month
        </div>

        <button
          onClick={onToggleTheme}
          className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-black/5 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:hover:bg-white/5"
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
