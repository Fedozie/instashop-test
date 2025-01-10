import React from "react";
import { ButtonProps } from "./index.types";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const button = cva("", {
  variants: {
    variant: {
      primary: "bg-primary text-white border-0 drop-shadow-custom",
      secondary: "bg-transparent text-primary border-2 border-primary",
    },
  },
});

const Button: React.FC<ButtonProps> = (props) => {
  const { variant, buttonType, label, customClassName, ...rest } = props;

  const className = clsx(
    "h-auto w-auto flex justify-center items-center py-[0.75rem] px-[2.5rem] text-center font-medium rounded-[6.25rem] cursor-pointer",
    customClassName
  );

  return (
    <button
      className={button({ className, variant })}
      type={buttonType}
      {...rest}
    >
      {label}
    </button>
  );
};

export { Button };
