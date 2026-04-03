import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Finance Dashboard</h1>
      <p className="mt-2 text-sm opacity-70">Bem-vindo, {user.email}</p>
    </main>
  );
}
