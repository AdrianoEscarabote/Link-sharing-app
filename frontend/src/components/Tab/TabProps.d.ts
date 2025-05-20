import { ComponentPropsWithoutRef } from "react";

interface TabProps extends ComponentPropsWithoutRef<"a"> {
  label: string;
  imagePath: string;
  active: boolean;
}

export { TabProps };
