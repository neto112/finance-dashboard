"use client";

import { LogoutButton } from "../logout-button";

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
        <LogoutButton />

        <button
          onClick={onToggleTheme}
          className="rounded-xl border px-3 py-1 text-sm"
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
