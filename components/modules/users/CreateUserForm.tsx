"use client";
import { createUser } from "@/server-actions/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

export const schema = z.object({
  email: z.string().min(1),
  name: z.string().min(10),
});
type User = z.infer<typeof schema>;

export const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<User> = async (data) => {
    await createUser({ email: data.email, name: data.name });
  };

  return (
    <div>
      <div>CreateUserForm</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input {...register("email")} className="border" />
          {errors.email && (
            <div className="text-xs text-red-500">{errors.email?.message}</div>
          )}
        </div>

        <div>
          <input {...register("name")} className="border" />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.name?.message}</div>
          )}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};
