import { CreateProductForm } from "@/components/modules/products/CreateProductForm";
import prisma from "@/prisma/client";

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div>Create Product Page</div>
      <div>
        <CreateProductForm categories={categories} />
      </div>
    </div>
  );
}
