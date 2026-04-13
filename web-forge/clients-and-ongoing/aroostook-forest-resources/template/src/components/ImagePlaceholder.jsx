function ImagePlaceholder({ message, className = '' }) {
  return (
    <div className={`image-placeholder ${className}`}>
      <div className="max-w-xs border-l border-white/20 pl-4">
        <p className="font-mono text-[11px] uppercase tracking-widerest text-foreground/60">
          Image Placeholder
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/88">{message}</p>
      </div>
    </div>
  )
}

export default ImagePlaceholder
