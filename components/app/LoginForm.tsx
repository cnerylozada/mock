"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
          }}
        >
          Google
        </button>
      </div>
    </div>
  );
};
