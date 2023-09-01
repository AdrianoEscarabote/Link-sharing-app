"use client";

import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { FormProps } from "./FormProps";
import ButtonPrimary from "@/components/ButtonPrimary";
import { useEffect, useState } from "react";
import Alert from "@/components/Alert";
import { useDispatch } from "react-redux";
import {
  setProfileDetails,
  setProfileImageUrl,
} from "@/redux/userProfileData/reducer";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";
import style from "./style.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const { previewEmail, firstName, lastName } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );

  useEffect(() => {
    if (firstName) {
      setValue("firstName", firstName);
    }
    if (lastName) {
      setValue("lastName", lastName);
    }
    if (previewEmail) {
      setValue("previewEmail", previewEmail);
    }
  }, [firstName, lastName, previewEmail]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormProps>();

  const onSubmit = handleSubmit(async (data) => {
    setShowLoadingComponent(true);
    setAlertOpen(true);
    const { previewEmail, firstName, lastName } = data;

    const formatData = {
      previewEmail,
      firstName,
      lastName,
    };

    const response = await fetch(
      `https://spring-green-lion-vest.cyclic.cloud/profile/setProfileDetails`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatData),
      }
    );

    const responseData = await response.json();
    setShowLoadingComponent(false);

    dispatch(
      setProfileDetails({
        firstName,
        lastName,
        previewEmail,
        uuid: responseData.uuid,
      })
    );

    dispatch(
      setProfileImageUrl({
        url: responseData.profileImageUrl,
      })
    );

    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  });

  const handleInputChange = (
    inputName: "firstName" | "lastName" | "previewEmail",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (inputName === "previewEmail") {
      const cleanedValue = e.target.value.replace(/\s/g, "");
      setValue(inputName, cleanedValue);
    } else {
      const cleanedValue = e.target.value.replace(
        /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
        ""
      );
      setValue(inputName, cleanedValue);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="bg-almost_white p-5 rounded-xl">
        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">enter your information</legend>

          <div
            className={`${style.container_input} flex items-center relative item justify-between`}
          >
            <label
              htmlFor="first_name"
              className={`${style.label} BodyM text-gray`}
            >
              First name*
            </label>
            <Input
              type="text"
              className={`${style.input} pl-4 w-full max-w-[432px] ${
                errors.firstName
                  ? "border-red outline-red"
                  : `border-light_gray ${style.focus_purple}`
              }`}
              id="first_name"
              placeholder="e.g. John"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Can’t be empty",
                },
              })}
              onChange={(ev) => handleInputChange("firstName", ev)}
            />
            {errors.firstName && (
              <span
                className={`BodyS absolute right-2 top-4 ${
                  errors.firstName ? "text-red" : ""
                }`}
              >
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div
            className={`${style.container_input} flex items-center relative item justify-between w-full`}
          >
            <label
              htmlFor="last_name"
              className={`${style.label} BodyM text-gray`}
            >
              Last name*
            </label>
            <Input
              className={`${style.input} pl-4 w-full max-w-[432px] ${
                errors.lastName
                  ? "border-red outline-red"
                  : `border-light_gray ${style.focus_purple}`
              }`}
              type="text"
              id="last_name"
              placeholder="e.g. Appleseed"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Can’t be empty",
                },
              })}
              onChange={(ev) => handleInputChange("lastName", ev)}
            />
            {errors.lastName && (
              <span
                className={`BodyS absolute right-2 top-4 ${
                  errors.lastName ? "text-red" : ""
                }`}
              >
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div
            className={`${style.container_input} flex items-center relative item justify-between w-full`}
          >
            <label htmlFor="email" className={`${style.label} BodyM text-gray`}>
              Email
            </label>
            <Input
              id="email"
              autoComplete="email"
              placeholder="e.g. email@example.com"
              className={`${style.input} pl-4 w-full max-w-[432px] ${
                errors.previewEmail
                  ? "border-red outline-red"
                  : `border-light_gray ${style.focus_purple}`
              }`}
              {...register("previewEmail", {
                required: "Can’t be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email!",
                },
              })}
              onChange={(ev) => handleInputChange("previewEmail", ev)}
            />
            {errors.previewEmail && (
              <span
                className={`BodyS absolute right-2 top-4 ${
                  errors.previewEmail ? "text-red" : ""
                }`}
              >
                {errors.previewEmail.message}
              </span>
            )}
          </div>

          <ButtonPrimary
            showLoadingComponent={showLoadingComponent}
            className="mt-5"
            type="submit"
            disabled={false}
            label="Save"
          />
        </fieldset>
      </form>
      {alertOpen ? (
        <Alert
          altImage="icon saved"
          imgPath="/assets/icon-changes-saved.svg"
          text="Your changes have been successfully saved!"
          show={alertOpen}
        />
      ) : null}
    </>
  );
};

export default Form;
