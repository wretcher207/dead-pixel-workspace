// Plain <picture> + <img> with WebP variants. We skip next/image entirely
// because with `unoptimized: true` it adds nothing and costs hydration weight.

type Props = {
  base: string; // e.g. "showcase-02"
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fallbackDir?: string; // directory inside /public/images/
};

export function ResponsivePicture({
  base,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px",
  className = "",
  imgClassName = "",
  priority = false,
  fallbackDir = "showcase",
}: Props) {
  const root = `/images/${fallbackDir}/${base}`;
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={`${root}-800.webp 800w, ${root}-1600.webp 1600w`}
        sizes={sizes}
      />
      <img
        src={`${root}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className={imgClassName}
      />
    </picture>
  );
}
