import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  disabled: boolean;
  maxWidth?: string;
  showLoadingComponent: boolean;
}

export { ButtonProps };
