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
        if (!user) throw new Error("User not found!");
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
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role!;
      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
} satisfies NextAuthConfig;
