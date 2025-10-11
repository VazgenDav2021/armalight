import Breadcrumb from "@/components/ui/client/Breadcrumb";
import SearchBar from "@/components/ui/client/SearchBar";
import PriceFilter from "@/components/ui/client/PriceFilter";

type Crumb = { title: string; url?: string };

export default function CategoryHeader({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="flex items-center justify-between py-12 gap-6">
      <div className="flex items-center gap-6 w-[-webkit-fill-available]">
        <Breadcrumb items={crumbs} />
        <SearchBar />
      </div>
      <PriceFilter />
    </div>
  );
}
