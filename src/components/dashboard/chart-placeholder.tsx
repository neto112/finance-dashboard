"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.28 }}
      className="rounded-2xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-black dark:text-white">
          Overview
        </p>
        <span className="text-sm text-black/50 dark:text-white/50">
          Last 6 months
        </span>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={overviewData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(120,120,120,0.15)"
            />
            <XAxis
              dataKey="name"
              stroke="rgba(120,120,120,0.8)"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(120,120,120,0.8)"
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
    </motion.div>
  );
}
