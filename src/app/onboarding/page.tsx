"use client";

import React from "react";
import Link from "next/link";
import { Form } from "../components";
import { IoArrowBack } from "react-icons/io5";

const Onboarding: React.FC = () => {
  return (
    <section className="h-full w-full flex flex-col max-w-[375px] py-8 px-4">
      <div className="w-full flex-none">
        <Link
          href="/"
          className="flex justify-start items-center gap-2 cursor-pointer"
        >
          <IoArrowBack />
          <p className="text-black text-base font-medium">Get Started</p>
        </Link>
      </div>

      <div className="grow">
        <Form />
      </div>
    </section>
  );
};

export default Onboarding;
