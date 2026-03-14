"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { overviewData } from "../../lib/mock-data";

export function ChartPlaceholder() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <span className="text-sm text-white/50">Last 6 months</span>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={overviewData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.5)"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#171717",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="income" radius={[8, 8, 0, 0]} fill="#34d399" />
            <Bar dataKey="expenses" radius={[8, 8, 0, 0]} fill="#fb7185" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
