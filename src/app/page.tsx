"use client";

import Image from "next/image";
import { Button, List } from "./components";
import { ShoppingImage } from "@/public/assets/images";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const getStarted = () => {
    router.push("/onboarding")
  }

  return (
    <section className="flex flex-col h-full relative w-full max-w-[375px] p-8">
      <div className="w-full">
        <Image
          src={ShoppingImage}
          alt="An illustration on the home page"
          className="h-full w-full object-fill"
          priority
        />
      </div>
      <div className="text-center my-10 text-black ">
        <p className="block text-4xl font-bold leading-10 mb-2">Welcome</p>
        <p className="block text-sm font-normal leading-5">
          The safest platform to shop from social media vendors
        </p>
      </div>
      <div>
        <List />
      </div>
      <div className="w-full flex justify-center items-center absolute bottom-0 left-0 p-8">
        <Button
          label="Get started"
          variant="primary"
          customClassName="w-full"
          onClick={getStarted}
        />
      </div>
    </section>
  );
}
