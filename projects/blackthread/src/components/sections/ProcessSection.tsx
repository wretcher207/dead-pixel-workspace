"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const steps = [
  {
    cmd: "ingest",
    title: "Ingest",
    text: "Raw signal enters the mesh.",
    status: "COMPLETE",
  },
  {
    cmd: "weave",
    title: "Weave",
    text: "Threads bind. Context forms.",
    status: "RUNNING",
  },
  {
    cmd: "execute",
    title: "Execute",
    text: "Action without announcement.",
    status: "QUEUED",
  },
];

export default function ProcessSection() {
  return (
    <Section>
      <span className="text-[11px] font-mono tracking-[0.3em] text-bt-muted uppercase mb-16 block">
        Protocol
      </span>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="space-y-4"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.cmd}
            variants={fadeUp}
            className="gradient-border p-6 md:p-8"
          >
            {/* Terminal-style header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono text-bt-violet">$</span>
              <span className="text-[13px] font-mono text-bt-cold">
                blackthread --{step.cmd}
              </span>
              <span className="cursor-blink text-bt-violet font-mono text-sm">
                {i === 1 ? "█" : ""}
              </span>
              <span className="ml-auto text-[10px] font-mono text-bt-muted tracking-wider">
                {step.status}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  step.status === "COMPLETE" ? "bg-emerald-500" :
                  step.status === "RUNNING" ? "bg-bt-amber pulse-status" :
                  "bg-bt-muted"
                }`}
              />
            </div>

            <div className="pl-5 border-l border-white/[0.04]">
              <h3 className="text-white text-xl font-semibold tracking-tight mb-1">
                {step.title}
              </h3>
              <p className="text-bt-dim text-sm">{step.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
