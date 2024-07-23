import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/client";
import * as bcryptjs from "bcryptjs";

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email as string);
        if (!user) return null;
        const passwordMatch = await bcryptjs.compare(
          credentials.password as string,
          user.password!
        );
        if (!passwordMatch) throw new Error("Invalid credentials!");
        return user;
      },
    }),
    Google,
    GitHub,
  ],
} satisfies NextAuthConfig;
