"use client";
import { useNotification } from "@/hooks/app";
import { createProduct } from "@/server-actions/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";
import { SimpleMDEReactProps } from "react-simplemde-editor";

export const schema = z.object({
  name: z.string().min(5),
  description: z.string().min(15),
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
    control,
    formState: { errors },
  } = useForm<CreateProductDto>({ mode: "all", resolver: zodResolver(schema) });
  const router = useRouter();

  const { canShowNotification, setCanShowNotification, renderNotification } =
    useNotification(() => {
      router.push("/products");
    });

  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    await createProduct({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
    });
    setCanShowNotification(true);
  };

  const options = useMemo(() => {
    return {
      hideIcons: ["quote", "image", "fullscreen", "link"],
      status: false,
    } as SimpleMDEReactProps;
  }, []);

  return (
    <>
      {canShowNotification && renderNotification("creation")}
      <div className="">
        <div>CreateUserForm</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto space-y-4 md:w-[70%] lg:w-[50%]"
        >
          <div>
            <input
              {...register("name")}
              placeholder="name"
              className="border"
            />
            {errors.name && (
              <div className="text-xs text-red-500">{errors.name?.message}</div>
            )}
          </div>

          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE
                  placeholder="Description"
                  options={options}
                  {...field}
                />
              )}
            />
            {errors.description && (
              <div className="text-xs text-red-500">
                {errors.description?.message}
              </div>
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
              <div className="text-xs text-red-500">
                {errors.stock?.message}
              </div>
            )}
          </div>

          <div>
            <input
              {...register("price", { valueAsNumber: true })}
              placeholder="price"
              className="border"
            />
            {errors.name && (
              <div className="text-xs text-red-500">
                {errors.price?.message}
              </div>
            )}
          </div>

          <input type="submit" />
        </form>
      </div>
    </>
  );
};
