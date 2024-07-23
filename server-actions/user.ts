"use server";

import {
  RegisterUser,
  registerUserSchema,
} from "@/components/app/RegisterForm";
import prisma from "@/prisma/client";
import * as bcrypt from "bcrypt";

export const registerUser = async (newUser: RegisterUser) => {
  const isEmailAlreadyTaken = await prisma.user.count({
    where: { email: newUser.email },
  });
  if (isEmailAlreadyTaken) return { error: "Email already in use!" };

  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  await prisma.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
    },
  });

  return { success: "Email sent!" };
};

export const signInUser = () => {};
