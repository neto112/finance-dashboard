"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "../lib/supabase/client";

export function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Erro ao sair");
      return;
    }

    toast.success("Logout realizado");
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="
        flex items-center gap-2
        rounded-xl
        border border-black/10 dark:border-white/10
        bg-white/60 dark:bg-white/[0.03]
        px-4 py-2
        text-sm font-medium
        text-black dark:text-white
        backdrop-blur
        transition-all duration-200
        hover:bg-black/5 dark:hover:bg-white/5
        hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      <LogOut size={16} className="opacity-70" />
      Sair
    </button>
  );
}
