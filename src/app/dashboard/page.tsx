"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AddTransaction } from "../../components/dashboard/add-transaction";
import { ChartPlaceholder } from "../../components/dashboard/chart-placeholder";
import { Header } from "../../components/dashboard/header";
import { RecentTransactions } from "../../components/dashboard/recent-transactions";
import { Sidebar } from "../../components/dashboard/sidebar";
import { SummaryCards } from "../../components/dashboard/summary-cards";
import { TransactionFilters } from "../../components/dashboard/transaction-filters";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
  type Transaction,
} from "../../lib/services/transactions";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [selectedType, setSelectedType] = useState<
    "all" | "income" | "expense"
  >("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
        setErrorMessage("Não foi possível carregar as transações.");
        toast.error("Erro ao carregar transações.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, []);

  async function handleAddTransaction(transaction: {
    id: string;
    title: string;
    category: string;
    amount: number;
    type: "income" | "expense";
  }) {
    try {
      setErrorMessage("");

      const createdTransaction = await addTransaction({
        title: transaction.title,
        category: transaction.category,
        amount: transaction.amount,
        type: transaction.type,
        date: new Date().toISOString().slice(0, 10),
      });

      setTransactions((prev) => [createdTransaction, ...prev]);
      toast.success("Transação adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      setErrorMessage("Não foi possível adicionar a transação.");
      toast.error("Erro ao adicionar transação.");
    }
  }

  async function handleDeleteTransaction(id: string) {
    try {
      setErrorMessage("");
      await deleteTransaction(id);

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id),
      );

      setEditingTransaction((current) => (current?.id === id ? null : current));

      toast.success("Transação removida com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      setErrorMessage("Não foi possível deletar a transação.");
      toast.error("Erro ao remover transação.");
    }
  }

  function handleEditTransaction(transaction: Transaction) {
    setEditingTransaction(transaction);
  }

  async function handleUpdateTransaction(updatedTransaction: {
    id: string;
    title: string;
    category: string;
    amount: number;
    type: "income" | "expense";
  }) {
    try {
      setErrorMessage("");

      const currentTransaction = transactions.find(
        (transaction) => transaction.id === updatedTransaction.id,
      );

      const savedTransaction = await updateTransaction(updatedTransaction.id, {
        title: updatedTransaction.title,
        category: updatedTransaction.category,
        amount: updatedTransaction.amount,
        type: updatedTransaction.type,
        date: currentTransaction?.date ?? new Date().toISOString().slice(0, 10),
      });

      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === savedTransaction.id
            ? savedTransaction
            : transaction,
        ),
      );

      setEditingTransaction(null);
      toast.success("Transação atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      setErrorMessage("Não foi possível atualizar a transação.");
      toast.error("Erro ao atualizar transação.");
    }
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
  }

  const categories = useMemo(() => {
    return Array.from(
      new Set(transactions.map((transaction) => transaction.category)),
    ).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesType =
        selectedType === "all" ? true : transaction.type === selectedType;

      const matchesCategory =
        selectedCategory === "all"
          ? true
          : transaction.category === selectedCategory;

      return matchesType && matchesCategory;
    });
  }, [transactions, selectedType, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-100 text-black transition-colors dark:bg-neutral-950 dark:text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 p-4 md:p-6">
        <div className="hidden md:block md:w-64">
          <div className="sticky top-6">
            <Sidebar />
          </div>
        </div>

        <div className="w-full space-y-6">
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
          />

          {errorMessage ? (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {errorMessage}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70 dark:border-white/10 dark:bg-neutral-900 dark:text-white/70">
              Carregando transações...
            </div>
          ) : (
            <>
              <SummaryCards transactions={filteredTransactions} />

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <ChartPlaceholder />
                </div>

                <div className="xl:col-span-1">
                  <AddTransaction
                    onAddTransaction={handleAddTransaction}
                    onUpdateTransaction={handleUpdateTransaction}
                    editingTransaction={editingTransaction as any}
                    onCancelEdit={handleCancelEdit}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-1">
                  <TransactionFilters
                    selectedType={selectedType}
                    selectedCategory={selectedCategory}
                    categories={categories}
                    onTypeChange={setSelectedType}
                    onCategoryChange={setSelectedCategory}
                  />
                </div>

                <div className="xl:col-span-2">
                  <RecentTransactions
                    transactions={filteredTransactions as any}
                    onDeleteTransaction={handleDeleteTransaction}
                    onEditTransaction={handleEditTransaction as any}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
