"use client";

import React, { FC } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder: string;
}

const Input: FC<InputProps> = (props) => {
  const { name, type = "text", placeholder, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errMessage = errors[name]?.message;

  return (
    <div className="flex flex-col mb-4">
      <input
        id={name}
        type={type}
        className={clsx(
          `block bg-transparent w-full p-4 rounded-2xl border focus:outline-primary placeholder:text-[#00000099]`
        )}
        placeholder={placeholder}
        {...register(name, { required: true })}
        aria-invalid={errors[name] ? "true" : "false"}
        {...rest}
      />
      {errMessage && typeof errMessage === "string" && (
        <div className="text-red-500 text-xs">{errMessage}</div>
      )}
    </div>
  );
};

export { Input };
