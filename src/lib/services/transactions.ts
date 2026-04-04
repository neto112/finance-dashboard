import { createClient } from "../../lib/supabase/client";

export type Transaction = {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  created_at: string;
};

export type NewTransaction = {
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
};

export async function getTransactions() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data as Transaction[];
}

export async function addTransaction(transaction: NewTransaction) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...transaction,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Transaction;
}

export async function deleteTransaction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) throw error;
}

export async function updateTransaction(
  id: string,
  updates: Partial<NewTransaction>,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Transaction;
}
