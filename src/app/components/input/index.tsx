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
  const { name, type = "text", placeholder, onBlur, ...rest } = props;
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors
  } = useFormContext();

  const errMessage = errors[name]?.message;

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const isValid = await trigger(name);

    if(isValid){
      clearErrors(name)
    }

    // Call the original onBlur if provided
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <input
        id={name}
        type={type}
        className={clsx(
          `block bg-transparent w-full p-4 rounded-2xl border focus:outline-none placeholder:text-[#00000099]`,
            errMessage ? "border-red-400 focus:border-red-400" : "border-gray-200", !errMessage && "focus:border-primary"
          
        )}
        placeholder={placeholder}
        {...register(name, { required: true})}
        aria-invalid={errors[name] ? "true" : "false"}
        onBlur = {handleBlur}
        {...rest}
      />
      {errMessage && typeof errMessage === "string" && (
        <div className="text-red-500 text-xs">{errMessage}</div>
      )}
    </div>
  );
};

export { Input };
