import Link from "next/link";

export const Pagination = ({
  totalPages,
  urlPath,
}: {
  totalPages: number;
  urlPath: string;
}) => {
  return (
    <div className="space-x-4">
      {Array.from(Array(totalPages).keys()).map((_) => (
        <Link href={`${urlPath}${_ + 1}`} key={_}>
          <button className="p-2 bg-blue-200 rounded-md">{_ + 1}</button>
        </Link>
      ))}
    </div>
  );
};
