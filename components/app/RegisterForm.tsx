"use client";
import { useNotification } from "@/hooks/app";
import { registerUser } from "@/server-actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(5).max(10),
  email: z.string().email(),
  password: z.string().min(5).max(10),
});
export type RegisterUser = z.infer<typeof registerUserSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    mode: "all",
    resolver: zodResolver(registerUserSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { canShowNotification, setCanShowNotification, renderNotification } =
    useNotification(() => {
      router.push("/login");
    });

  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    setCanShowNotification(false);
    const response = await registerUser(data);
    setCanShowNotification(true);
    if (!!response.error) setErrorMessage(response.error);
  };

  return (
    <>
      {canShowNotification &&
        renderNotification(!!errorMessage ? "error" : "creation", errorMessage)}
      <div className="w-9/12 mx-auto">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name")}
                placeholder="name"
                className="w-full p-1 border"
              />
              {errors.name && (
                <div className="text-xs text-red-500">
                  {errors.name?.message}
                </div>
              )}
            </div>

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
