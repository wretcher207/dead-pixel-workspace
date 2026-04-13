"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeIn, viewportOnce } from "@/lib/motion";

function TelemetryValue({ label, baseValue, suffix }: { label: string; baseValue: number; suffix: string }) {
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(baseValue + (Math.random() - 0.5) * baseValue * 0.1);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [baseValue]);

  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px]">
      <span className="text-[10px] font-mono tracking-[0.3em] text-bt-muted uppercase">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-sm md:text-base font-mono text-bt-cold tabular-nums">
          {value.toFixed(1)}
        </span>
        <span className="text-[10px] font-mono text-bt-muted">{suffix}</span>
      </div>
    </div>
  );
}

function StatusDot({ color, delay }: { color: string; delay: number }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full pulse-status"
      style={{ backgroundColor: color, animationDelay: `${delay}s` }}
    />
  );
}

export default function SignalBar() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative border-y border-white/[0.04] py-6 overflow-hidden"
    >
      {/* Faint gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-bt-violet/[0.02] via-transparent to-bt-cyan/[0.02]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-3">
          <StatusDot color="#22c55e" delay={0} />
          <span className="text-[10px] font-mono tracking-[0.2em] text-bt-dim">MESH ONLINE</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <TelemetryValue label="Latency" baseValue={12.4} suffix="ms" />
          <TelemetryValue label="Nodes" baseValue={847} suffix="" />
          <TelemetryValue label="Threads" baseValue={2.4} suffix="k" />
          <TelemetryValue label="Uplink" baseValue={99.7} suffix="%" />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-wider text-bt-muted">
            {new Date().toISOString().split("T")[0]}
          </span>
          <StatusDot color="#f59e0b" delay={1.5} />
        </div>
      </div>
    </motion.div>
  );
}
