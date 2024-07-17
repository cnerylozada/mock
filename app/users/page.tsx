import { Pagination } from "@/components/app/Pagination";
import { Search } from "@/components/modules/users/Search";
import prisma from "@/prisma/client";
import { getUsersWithPagination } from "@/server-actions/users";
import { getNumberPagesByElements } from "@/utils/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 3;
export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page: number; query: string };
}) {
  if (!searchParams?.page || isNaN(searchParams.page))
    redirect("/users?page=1&query=");

  const page = searchParams.page;
  const query = searchParams.query;
  const getUsersPromise = getUsersWithPagination(page, PAGE_SIZE, query);
  const getTotalElementsPromise = prisma.user.count({
    where: { name: { contains: query } },
  });
  const [users, totalElements] = await Promise.all([
    getUsersPromise,
    getTotalElementsPromise,
  ]);

  const totalPages = getNumberPagesByElements(PAGE_SIZE, totalElements);

  return (
    <div>
      <div>UsersPage</div>
      <div>
        <Link href={"users/create"}>Create new user</Link>
      </div>
      <Search />
      <div>{!users.length && <span>There are no elements</span>}</div>
      <div>
        {users.map((_) => (
          <div key={_.id}>
            Name:{_.name} Email: {_.email}
          </div>
        ))}
      </div>
      <div>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
