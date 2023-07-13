import { ComponentPropsWithoutRef } from "react";

interface LinkSecondaryProps extends ComponentPropsWithoutRef<"a"> {
  label: string;
  disabled: boolean;
  maxWidth?: string;
}

export { LinkSecondaryProps };
