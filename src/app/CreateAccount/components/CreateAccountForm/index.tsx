"use client";

import { useForm } from "react-hook-form";
import { ICreateAccountTypes } from "./CreateAccountTypes";
import ButtonPrimary from "../../../../components/ButtonPrimary/index";
import style from "./style.module.css";
import Input from "../../../../components/Input/index";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateAccountForm = () => {
  const router = useRouter();
  const [showLoadinComponent, setShowLoadingComponent] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ICreateAccountTypes>();

  const onSubmit = handleSubmit(async (data) => {
    setShowLoadingComponent(true);
    try {
      const response = await fetch(
        "https://spring-green-lion-vest.cyclic.cloud/auth/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      /* const dataJson = await response.json(); */

      if (response.ok) {
        router.push(`/ProfileDetails`);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <fieldset className="flex flex-col gap-6 mb-6">
        <legend className="sr-only">estou no form</legend>

        <label
          htmlFor="email"
          className={`flex relative gap-1 flex-col BodyS ${
            errors.email ? "text-red" : "text-almost_dark"
          }`}
        >
          Email address
          <Input
            type="email"
            id="email"
            placeholder="e.g. alex@email.com"
            {...register("email", {
              required: "Can’t be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email!",
              },
            })}
            className={`${
              style.input_email
            } BodyM h-12 rounded-lg border border-solid ${
              errors.email ? "border-red outline-red" : "border-light_gray"
            }`}
          />
          {errors.email && (
            <span className="absolute right-3 top-9">
              {errors.email.message}
            </span>
          )}
        </label>

        <label
          htmlFor="password"
          className={`flex relative gap-1 flex-col BodyS ${
            errors.password ? "text-red" : "text-almost_dark"
          }`}
        >
          Create password
          <Input
            {...register("password", {
              required: "Please check again",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            id="password"
            placeholder="At least 8 characters"
            className={`${
              style.input_password
            } BodyM h-12 rounded-lg border border-solid ${
              errors.password ? "border-red outline-red" : "border-light_gray"
            }`}
            data-testid="password"
          />
          {errors.password && (
            <span className="absolute right-3 top-9">
              {errors.password.message}
            </span>
          )}
        </label>

        <label
          htmlFor="confirm_password"
          className={`flex relative gap-1 flex-col BodyS
          ${errors.confirmpassword ? "text-red" : "text-almost_dark"}`}
        >
          Confirm password
          <Input
            {...register("confirmpassword", {
              required: "Please check again",
              validate: (value) => value === getValues("password"),
            })}
            type="password"
            id="confirm_password"
            placeholder="At least 8 characters"
            className={`${
              style.input_password
            } BodyM h-12 rounded-lg border border-solid ${
              errors.confirmpassword
                ? "border-red outline-red"
                : "border-light_gray"
            }`}
            data-testid="confirm_password"
          />
          {errors.confirmpassword && (
            <span className="absolute right-3 top-9">
              {errors.confirmpassword.message}
            </span>
          )}
        </label>

        <ButtonPrimary
          showLoadingComponent={showLoadinComponent}
          label="Create new account"
          disabled={false}
          type="submit"
        />
      </fieldset>
    </form>
  );
};

export default CreateAccountForm;
