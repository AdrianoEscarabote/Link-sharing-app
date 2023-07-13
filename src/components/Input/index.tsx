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
    "BodyM h-12 rounded-lg border border-gray-300 bg-white text-primaryDarker placeholder-black placeholder-opacity-20",
    error ? "border-red-500" : "focus:ring-1 focus:ring-primary"
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
