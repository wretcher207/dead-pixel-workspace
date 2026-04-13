interface AnnotationBadgeProps {
  text: string;
  color?: "berry" | "gold" | "sage";
}

const colorMap = {
  berry: "text-[#b85c6e]",
  gold:  "text-[#c9a96e]",
  sage:  "text-[#7a9e7e]",
};

export default function AnnotationBadge({ text, color = "gold" }: AnnotationBadgeProps) {
  return (
    <span className={`font-accent text-sm ${colorMap[color]}`}>
      {text}
    </span>
  );
}
