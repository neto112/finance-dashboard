export function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 bg-neutral-900 p-6">
      <h1 className="text-2xl font-bold">FinDash</h1>

      <nav className="mt-10 space-y-3">
        <a
          href="#"
          className="block rounded-lg bg-white/10 px-4 py-3 text-sm font-medium"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          Transactions
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          Categories
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          Settings
        </a>
      </nav>
    </aside>
  );
}
