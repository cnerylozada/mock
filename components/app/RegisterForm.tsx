"use client";
import { useNotification } from "@/hooks/app";
import { registerUserAction } from "@/server-actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { notificationType } from "./Notification";

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
  const [isPending, startTransition] = useTransition();
  const [notificationMessage, setNotificationMessage] = useState<{
    message: string;
    type: notificationType;
  }>({ message: "", type: "creation" });
  const { canShowNotification, setCanShowNotification, renderNotification } =
    useNotification();

  const onSubmit: SubmitHandler<RegisterUser> = (data) => {
    startTransition(async () => {
      const response = await registerUserAction(data);
      setCanShowNotification(true);
      if (!!response.error)
        setNotificationMessage({ message: response.error, type: "error" });
      if (response.success)
        setNotificationMessage({ message: response.success, type: "creation" });
    });
  };

  return (
    <>
      {canShowNotification &&
        renderNotification(
          notificationMessage.type,
          notificationMessage.message
        )}
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

            <button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
