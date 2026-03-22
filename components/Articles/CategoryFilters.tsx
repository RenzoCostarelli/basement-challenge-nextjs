import { Category } from "@/types/sanity";

function FilterButton({
  slug,
  name = "ALL POSTS",
}: {
  slug: { current: string };
  name: string;
}) {
  return (
    <button className="text-basement-grey hover:text-black uppercase font-mono whitespace-nowrap">
      {name}
    </button>
  );
}

export default function CategoryFilters({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="flex gap-10 items-center mb-14 text-f-t overflow-y-scroll">
      <FilterButton name="ALL POSTS" slug={{ current: "" }} />
      {categories.map((category: Category) => (
        <FilterButton
          key={category._id}
          slug={category.slug}
          name={category.name}
        />
      ))}
    </div>
  );
}
