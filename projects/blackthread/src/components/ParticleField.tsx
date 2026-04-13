"use client";

export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="orb orb-violet drift w-[600px] h-[600px] -top-[200px] -right-[200px] opacity-60" />
      <div className="orb orb-indigo drift-slow w-[500px] h-[500px] top-[30%] -left-[150px] opacity-40" />
      <div className="orb orb-cyan drift w-[400px] h-[400px] bottom-[10%] right-[20%] opacity-30" />
    </div>
  );
}
