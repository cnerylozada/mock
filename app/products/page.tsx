import { Pagination } from "@/components/app/Pagination";
import { Search } from "@/components/modules/products/Search";
import prisma from "@/prisma/client";
import { getProductsWithPaginationAction } from "@/server-actions/products";
import { getNumberPagesByElements } from "@/utils/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_SIZE = 3;
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: number; query: string };
}) {
  if (!searchParams?.page || isNaN(searchParams.page))
    redirect("/products?page=1&query=");

  const page = searchParams.page;
  const query = searchParams.query;
  const getProductsPromise = getProductsWithPaginationAction(
    page,
    PAGE_SIZE,
    query
  );
  const getTotalElementsPromise = prisma.product.count({
    where: { name: { contains: query } },
  });
  const [products, totalElements] = await Promise.all([
    getProductsPromise,
    getTotalElementsPromise,
  ]);

  const totalPages = getNumberPagesByElements(PAGE_SIZE, totalElements);

  return (
    <div>
      <div>Products Page</div>
      <div>
        <Link href={"products/create"}>Create new product</Link>
      </div>

      <Search />
      <div>{!products.length && <span>There are no elements</span>}</div>
      <div>
        {products.map((_) => (
          <div key={_.id}>
            Name:{_.name} Price: {_.price}
          </div>
        ))}
      </div>
      <div>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
