"use server";
import { CreateProductDto } from "@/components/modules/products/CreateProductForm";
import prisma from "@/prisma/client";

export const getProductsWithPaginationAction = (
  currentPage: number,
  pageSize: number,
  searchByName: string
) => {
  const offset = (currentPage - 1) * pageSize;
  return prisma.product.findMany({
    where: {
      name: {
        contains: searchByName,
      },
    },
    skip: offset,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });
};

export const createProduct = async (productDto: CreateProductDto) => {
  await prisma.product.create({
    data: {
      name: productDto.name,
      price: productDto.price,
      stock: productDto.stock,
      categories: { connect: { id: productDto.category } },
    },
  });
};
