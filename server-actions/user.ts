"use server";

import { signIn } from "@/auth";
import { Login } from "@/components/app/LoginForm";
import { RegisterUser } from "@/components/app/RegisterForm";
import prisma from "@/prisma/client";
import * as bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";

export const registerUserAction = async (newUser: RegisterUser) => {
  const isEmailAlreadyTaken = await prisma.user.count({
    where: { email: newUser.email },
  });
  if (isEmailAlreadyTaken) return { error: "Email already in use!" };

  const hashedPassword = await bcryptjs.hash(newUser.password, 10);
  await prisma.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
    },
  });

  return { success: "Email sent!" };
};

export const signInUserAction = async (user: Login) => {
  try {
    await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Something went wrong!" };
  }
};
