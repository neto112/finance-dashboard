"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Transaction } from "../../lib/types";

type AddTransactionProps = {
  onAddTransaction: (transaction: Transaction) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
  editingTransaction: Transaction | null;
  onCancelEdit: () => void;
};

export function AddTransaction({
  onAddTransaction,
  onUpdateTransaction,
  editingTransaction,
  onCancelEdit,
}: AddTransactionProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setCategory(editingTransaction.category);
      setAmount(String(editingTransaction.amount));
      setType(editingTransaction.type);
      setFormError("");
      return;
    }

    setTitle("");
    setCategory("");
    setAmount("");
    setType("expense");
    setFormError("");
  }, [editingTransaction]);

  function resetForm() {
    setTitle("");
    setCategory("");
    setAmount("");
    setType("expense");
    setFormError("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim() || !category.trim() || !amount.trim()) {
      setFormError("Preencha título, categoria e valor.");
      return;
    }

    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Digite um valor maior que zero.");
      return;
    }

    setFormError("");

    if (editingTransaction) {
      onUpdateTransaction({
        ...editingTransaction,
        title: title.trim(),
        category: category.trim(),
        amount: parsedAmount,
        type,
      });
      return;
    }

    onAddTransaction({
      id: crypto.randomUUID(),
      title: title.trim(),
      category: category.trim(),
      amount: parsedAmount,
      type,
    });

    resetForm();
  }

  function handleCancel() {
    onCancelEdit();
    resetForm();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-neutral-900"
    >
      <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {editingTransaction && (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-xl border border-black/10 px-4 py-2 text-sm text-black/70 transition hover:bg-black/5 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
          >
            Cancel
          </button>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:placeholder:text-white/40"
          />

          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Category"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:placeholder:text-white/40"
          />

          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount"
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/40 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:placeholder:text-white/40"
          />

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as "income" | "expense")
            }
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {formError ? (
          <p className="text-sm text-rose-400">{formError}</p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-400"
        >
          {editingTransaction ? "Save changes" : "Add transaction"}
        </button>
      </form>
    </motion.div>
  );
}
