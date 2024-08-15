"use client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GoogleMapsLoader } from "./GoogleMaps";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(5),
  lastName: z.string().min(4),
  address: z.string().min(1),
});

export type UserMapType = z.infer<typeof schema>;

export const BasicForm = () => {
  const defaultValues = {
    address: "Arequipa",
    name: "cristh",
    lastName: "nery",
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UserMapType>({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<UserMapType> = (data) => console.log(data);

  //   useEffect(() => {
  //     reset({ ...defaultValues });
  //   }, []);

  return (
    <div>
      <div>Basic Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input defaultValue="test" {...register("example")} /> */}
        <input {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}

        <input {...register("lastName")} />
        {errors.lastName && <div>{errors.lastName.message}</div>}

        <GoogleMapsLoader setValue={setValue} />
        {errors.address && <div>{errors.address.message}</div>}

        <input type="submit" />
      </form>
    </div>
  );
};
