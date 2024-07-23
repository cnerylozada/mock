"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = +new URLSearchParams(searchParams).get("page")!;

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
          className={clsx(`p-2  rounded-md`, {
            "bg-blue-400": currentPage === _ + 1,
            "bg-blue-200": currentPage !== _ + 1,
          })}
          onClick={() => onPagination(_ + 1)}
        >
          {_ + 1}
        </button>
      ))}
    </div>
  );
};
