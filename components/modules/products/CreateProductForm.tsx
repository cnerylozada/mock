"use client";
import { createProduct } from "@/server-actions/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

export const schema = z.object({
  name: z.string().min(5),
  stock: z.number().int().min(1),
  price: z.number(),
  category: z.string(),
});
export type CreateProductDto = z.infer<typeof schema>;

export const CreateProductForm = ({
  categories,
}: {
  categories: Category[];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductDto>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    await createProduct({
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.category,
    });
  };

  return (
    <div>
      <div>CreateUserForm</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input {...register("name")} placeholder="name" className="border" />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.name?.message}</div>
          )}
        </div>

        <select {...register("category")}>
          {categories.map((_) => (
            <option key={_.id} value={_.id}>
              {_.name}
            </option>
          ))}
        </select>

        <div>
          <input
            {...register("stock", { valueAsNumber: true })}
            placeholder="stock"
            className="border"
          />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.stock?.message}</div>
          )}
        </div>

        <div>
          <input
            {...register("price", { valueAsNumber: true })}
            placeholder="price"
            className="border"
          />
          {errors.name && (
            <div className="text-xs text-red-500">{errors.price?.message}</div>
          )}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};
