"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchTermChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center mb-5">
      <Input
        type="search"
        placeholder="Search for a course"
        className="md:w-[100px] lg:w-[400px] rounded-r-none focus-visible:ring-0"
        onChange={(e) => handleSearchTermChange(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button variant="ghost" className="rounded-l-none bg-muted h-full">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
