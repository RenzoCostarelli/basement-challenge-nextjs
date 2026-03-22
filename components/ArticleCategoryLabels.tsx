import { cn } from "@/lib/utils";
import { Category } from "@/types/sanity";

type Variant = "dark" | "light";

const variants: Record<Variant, string> = {
  dark: "bg-basement-dark-gray",
  light: "bg-basement-white",
};

function Label({
  category,
  variant = "dark",
}: {
  category: string;
  variant: Variant;
}) {
  return (
    <div
      className={cn(
        variants[variant],
        "text-basement-light-gray font-semibold",
      )}
    >
      {category}
    </div>
  );
}

export default function ArticleLabels({
  categories,
  variant = "dark",
}: {
  variant?: Variant;
  categories: Category[];
}) {
  return (
    <div className="flex items-center gap-2">
      {categories.map((cate, index) => (
        <Label key={index} category={cate.name} variant={variant} />
      ))}
    </div>
  );
}
