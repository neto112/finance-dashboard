"use client";

import { useState } from "react";
import type { Transaction } from "../../lib/types";

type AddTransactionProps = {
  onAddTransaction: (transaction: Transaction) => void;
};

export function AddTransaction({ onAddTransaction }: AddTransactionProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !category.trim() || !amount.trim()) {
      return;
    }

    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    onAddTransaction({
      id: crypto.randomUUID(),
      title: title.trim(),
      category: category.trim(),
      amount: parsedAmount,
      type,
    });

    setTitle("");
    setCategory("");
    setAmount("");
    setType("expense");
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
      <h3 className="text-xl font-semibold text-black dark:text-white">
        Add Transaction
      </h3>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:placeholder:text-white/40"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:placeholder:text-white/40"
        />

        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:placeholder:text-white/40"
        />

        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value as "income" | "expense")
          }
          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          type="submit"
          className="rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white transition hover:opacity-90 md:col-span-2"
        >
          Add transaction
        </button>
      </form>
    </div>
  );
}
