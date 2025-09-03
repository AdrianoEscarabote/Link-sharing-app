"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ButtonPrimary from "../../../../components/ButtonPrimary/index";
import Input from "../../../../components/Input/index";
import { IloginTypes } from "./LoginTypes";
import style from "./style.module.css";

const Form = () => {
  const router = useRouter();
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);
  const [errorData, setErrorData] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/checkToken`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        router.push(`/ProfileDetails`);
        setErrorData("");
      }
    };
    checkToken();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginTypes>();

  const onSubmit = handleSubmit(async (data) => {
    setErrorData("");
    setShowLoadingComponent(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        router.push(`/ProfileDetails`);
        setErrorData("");
      } else {
        setErrorData("User not found");
        setShowLoadingComponent(false);
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
          } BodyS relative flex flex-col gap-1 text-almost_dark dark:text-grey-300`}
        >
          Email address
          <Input
            id="email"
            autoComplete="email"
            placeholder="e.g. alex@email.com"
            data-testid="email-input"
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
            errors.password ? "text-red" : "text-almost_dark dark:text-grey-300"
          } BodyS relative flex gap-1 flex-col `}
        >
          Create password
          <Input
            type="password"
            autoComplete="current-password"
            id="password"
            placeholder="Enter your password"
            data-testid="password-input"
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
        <ButtonPrimary
          showLoadingComponent={showLoadingComponent}
          label="Login"
          disabled={false}
          type={"submit"}
        />
      </fieldset>
    </form>
  );
};

export default Form;
