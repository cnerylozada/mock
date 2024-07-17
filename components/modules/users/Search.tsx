"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 2000);

  return (
    <div>
      <div>Search</div>
      <input
        onChange={(_) => onSearch(_.target.value.trim())}
        placeholder="Search some name..."
        className="border"
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};
