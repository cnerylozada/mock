"use server";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

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
