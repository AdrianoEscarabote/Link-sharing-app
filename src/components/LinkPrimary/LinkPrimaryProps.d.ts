import { ComponentPropsWithoutRef } from "react";

interface LinkPrimaryProps extends ComponentPropsWithoutRef<"a"> {
  label: string;
  disabled: boolean;
  maxWidth?: string;
}

export { LinkPrimaryProps };
