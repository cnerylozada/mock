"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { registerUserSchema } from "./RegisterForm";
import { signInUserAction } from "@/server-actions/user";
import { useRouter } from "next/navigation";
import { useNotification } from "@/hooks/app";
import { useState } from "react";

const schema = registerUserSchema.omit({ name: true });
export type Login = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ mode: "all", resolver: zodResolver(schema) });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { canShowNotification, setCanShowNotification, renderNotification } =
    useNotification();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const response = await signInUserAction(data);

    if (response?.error) {
      setCanShowNotification(true);
      setErrorMessage(response?.error);
    } else {
      router.push(DEFAULT_LOGIN_REDIRECT);
      router.refresh();
    }
  };

  return (
    <>
      {canShowNotification && renderNotification("error", errorMessage)}
      <div className="w-9/12 space-y-4 mx-auto">
        <div className="space-y-4 text-center">
          <div>
            <button
              className="p-2 w-[200px] border-2 border-gray-400 rounded-sm bg-red-200"
              onClick={() => {
                signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
              }}
            >
              Google
            </button>
          </div>
          <div>
            <button
              className="p-2 w-[200px] border-2 border-gray-400 rounded-sm bg-gray-200"
              onClick={() => {
                signIn("github", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
              }}
            >
              Github
            </button>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("email")}
                placeholder="email"
                className="w-full p-1 border"
              />
              {errors.email && (
                <div className="text-xs text-red-500">
                  {errors.email?.message}
                </div>
              )}
            </div>

            <div>
              <input
                {...register("password")}
                placeholder="password"
                className="w-full p-1 border"
                type="password"
              />
              {errors.password && (
                <div className="text-xs text-red-500">
                  {errors.password?.message}
                </div>
              )}
            </div>

            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};
