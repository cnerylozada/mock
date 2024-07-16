import { Pagination } from "@/components/app/Pagination";
import prisma from "@/prisma/client";
import Link from "next/link";

const PAGE_SIZE = 3;
export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const page = searchParams.page;
  const offset = (page - 1) * PAGE_SIZE;

  const users = await prisma.user.findMany({ skip: offset, take: PAGE_SIZE });
  const totalElements = await prisma.user.count();
  const totalPages =
    Math.floor(totalElements / PAGE_SIZE) + (totalElements % PAGE_SIZE);

  return (
    <div>
      <div>UsersPage</div>
      <div>
        <Link href={"users/create"}>Create new user</Link>
      </div>
      <div>
        {users.map((_) => (
          <div key={_.id}>
            Name:{_.name} Email: {_.email}
          </div>
        ))}
      </div>
      <div>
        <Pagination totalPages={totalPages} urlPath={`/users?page=`} />
      </div>
    </div>
  );
}
