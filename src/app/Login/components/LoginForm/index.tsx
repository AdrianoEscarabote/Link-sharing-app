"use client";

import { useForm } from "react-hook-form";
import { IloginTypes } from "./LoginTypes";
import { useRouter } from "next/navigation";
import ButtonPrimary from "../../../../components/ButtonPrimary/index";
import style from "./style.module.css";
import Input from "../../../../components/Input/index";
import { useState } from "react";

const Form = () => {
  const router = useRouter();
  const [errorData, setErrorData] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IloginTypes>();

  const onSubmit = handleSubmit(async (data) => {
    setErrorData("");
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataJson = await response.json();

      if (response.status === 200) {
        const token = dataJson.token as string;

        localStorage.getItem("token")
          ? null
          : localStorage.setItem("token", token);

        router.push("/ProfileDetails/64b6b275628e9d7551be865d");
        setErrorData("");
      } else {
        setErrorData(dataJson.msg);
      }
    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="relative" noValidate>
      {errorData && (
        <span className="absolute -top-1 right-0 BodyS text-red">
          {errorData}
        </span>
      )}

      <fieldset className="flex flex-col gap-6">
        <legend className="sr-only">enter your login information</legend>

        <label
          htmlFor="email"
          className={`${
            errors.email ? "text-red" : ""
          } BodyS relative flex flex-col gap-1 text-almost_dark`}
        >
          Email address
          <Input
            id="email"
            autoComplete="email"
            placeholder="e.g. alex@email.com"
            className={`${style.input_email} ${
              errors.email ? "border-red outline-red" : "border-light_gray"
            }`}
            {...register("email", {
              required: "Can’t be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email!",
              },
            })}
          />
          {errors.email && (
            <span className="absolute right-3 top-9">
              {errors.email.message}
            </span>
          )}
        </label>

        <label
          htmlFor="password"
          className={`${
            errors.password ? "text-red" : "text-almost_dark"
          } BodyS relative flex gap-1 flex-col `}
        >
          Create password
          <Input
            type="password"
            autoComplete="current-password"
            id="password"
            placeholder="Enter your password"
            className={`${style.input_email} ${
              errors.email ? "border-red outline-red" : "border-light_gray"
            }`}
            {...register("password", {
              required: "Please check again",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="absolute right-3 top-9">
              {errors.password.message}
            </span>
          )}
        </label>
        <ButtonPrimary label="Login" disabled={false} type={"submit"} />
      </fieldset>
    </form>
  );
};

export default Form;
