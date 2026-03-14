export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-white/50">Welcome back</p>
        <h2 className="text-3xl font-bold">Finance Dashboard</h2>
      </div>

      <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
        +12.4% this month
      </div>
    </header>
  );
}
