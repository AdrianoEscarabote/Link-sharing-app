"use client";

import { LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./InputProps";

function Input(
  { className, error, errorMessage, ...props }: InputProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  const inputClassName = twMerge(
    className,
    `BodyM h-12 rounded-lg border bg-white text-primaryDarker placeholder-black placeholder-opacity-20 ${
      error ? "border-red" : "focus:ring-1 focus:ring-primary border-gray-300"
    }`
  );

  return (
    <>
      <input ref={ref} className={inputClassName} {...props} />
      {error && errorMessage && (
        <span className="mt-1 text-xs text-red-500">{errorMessage}</span>
      )}
    </>
  );
}

export default forwardRef(Input);
