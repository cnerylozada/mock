"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onPagination = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  if (totalPages === 1) return null;
  return (
    <div className="space-x-4">
      {Array.from(Array(totalPages).keys()).map((_) => (
        <button
          key={_}
          className="p-2 bg-blue-200 rounded-md"
          onClick={() => onPagination(_ + 1)}
        >
          {_ + 1}
        </button>
      ))}
    </div>
  );
};
