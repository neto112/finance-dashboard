"use client";

import { useState } from "react";

const navItems = ["Dashboard", "Transactions", "Categories", "Settings"];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg border border-white/10 bg-neutral-900 px-4 py-2 text-sm font-medium text-white md:hidden"
      >
        Menu
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-neutral-900 p-6 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between md:block">
          <h1 className="text-2xl font-bold">FinDash</h1>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-2 py-1 text-sm text-white/70 md:hidden"
          >
            Close
          </button>
        </div>

        <nav className="mt-10 space-y-3">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`block rounded-lg px-4 py-3 text-sm transition ${
                index === 0
                  ? "bg-white/10 font-medium text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
