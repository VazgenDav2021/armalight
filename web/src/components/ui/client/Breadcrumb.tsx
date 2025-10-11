import Link from "next/link";

type Crumb = {
  title: string;
  url?: string;
};

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-600 my-4">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {!isLast && item.url ? (
                <Link href={item.url} className="hover:underline text-gray-700">
                  {item.title}
                </Link>
              ) : (
                <span className="font-medium text-gray-400">{item.title}</span>
              )}
              {!isLast && <span className="text-gray-400">{">"}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
