"use server";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

export const getUsersWithPagination = (
  currentPage: number,
  pageSize: number,
  searchByName: string
) => {
  const offset = (currentPage - 1) * pageSize;
  return prisma.user.findMany({
    where: {
      name: {
        contains: searchByName,
      },
    },
    skip: offset,
    take: pageSize,
    orderBy: { createAt: "desc" },
  });
};

export const createUser = async (userDto: { email: string; name: string }) => {
  const newUser = await prisma.user.create({
    data: {
      email: userDto.email,
      name: userDto.name,
      profile: {
        create: {
          bio: "my mock bio",
        },
      },
    },
  });
  redirect("/users");
};
