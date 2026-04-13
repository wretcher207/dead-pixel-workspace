export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[10%] -left-[10%] h-[60vh] w-[60vh] rounded-full bg-[#8B5CF6]/10 blur-3xl animate-clay-float" />
      <div className="absolute -right-[10%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-[#EC4899]/10 blur-3xl animate-clay-float-delayed animation-delay-2000" />
      <div className="absolute -left-[5%] top-[60%] h-[60vh] w-[60vh] rounded-full bg-[#0EA5E9]/10 blur-3xl animate-clay-float-slow animation-delay-4000" />
      <div className="absolute -right-[15%] top-[70%] h-[60vh] w-[60vh] rounded-full bg-[#8B5CF6]/8 blur-3xl animate-clay-float animation-delay-4000" />
    </div>
  );
}
