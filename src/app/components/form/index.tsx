"use client";

import { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FormDataSchema } from "@/lib/schema";
import { Input } from "../input";
import { Button } from "../button";
import {
  InstagramImg,
  GoogleImg,
  TiktokImg,
  AvatarImg,
} from "@/public/assets/images";
import Image from "next/image";

// Define the form field names as a type
type FormField = keyof z.infer<typeof FormDataSchema>;

// Define step fields type
type StepFields = FormField[];

interface Step {
  id: string;
  fields: StepFields;
  title: string;
}

const steps: Step[] = [
  {
    id: "step1",
    fields: ["phoneNumber"],
    title: "Verification",
  },
  {
    id: "step2",
    fields: ["fullname", "username", "phoneNumber", "email"],
    title: "Profile Setup",
  },
  {
    id: "step3",
    fields: [
      "photo",
      "storeName",
      "storeTagName",
      "storePhoneNumber",
      "storeEmail",
      "category",
    ],
    title: "Store Setup",
  },
];

const socials = [
  { image: InstagramImg, id: "instagram" },
  { image: TiktokImg, id: "tiktok" },
  { image: GoogleImg, id: "google" },
];

const FileInput: FC<{ name: FormField; onBlur?: () => void }> = ({
  name,
  onBlur,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full mb-4">
      <label
        className="block w-full p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        htmlFor={`file-${name}`}
      >
        {preview ? (
          <div>
            <Image
              src={preview}
              width={120}
              height={120}
              priority
              alt="Preview"
              className="w-32 h-32 mx-auto object-cover rounded-full"
            />
            <p className="text-center mt-2 text-sm text-gray-500">
              Upload store logo
            </p>
          </div>
        ) : (
          <div className="text-center">
            <Image
              src={AvatarImg}
              width={120}
              height={120}
              priority
              alt="Avatar Img"
              className="w-32 h-32 mx-auto object-cover rounded-full bg-black"
            />
            <p className="text-sm mt-2 text-gray-500">Upload store logo</p>
          </div>
        )}
        <input
          type="file"
          id={`file-${name}`}
          name={name}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

type FormData = z.infer<typeof FormDataSchema>;

const Form = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
    criteriaMode: "all",
    reValidateMode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    trigger,
    formState: { touchedFields },
    watch,
    clearErrors,
  } = methods;

  // const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Watch the fields for the current step
  const currentFields = steps[currentStep].fields;
  // Convert the fields array to an object with the fields as keys
  // const watchedFields = watch(currentFields as FormField[]);

  // Validate and move to next step when fields change
  const validateStep = async () => {
    const fields = steps[currentStep].fields;

    // Check validation only for touched fields
    const isStepValid = await trigger(
      fields.filter((field) => touchedFields[field]) as FormField[]
    );

    if (isStepValid && currentStep < steps.length - 1) {
      clearErrors(); // Clear any existing errors for the current step
      // setPreviousStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBlur = async (fieldName: FormField) => {
    // Only validate on blur if the field has been touched
    if (touchedFields[fieldName]) {
      await trigger(fieldName);
    }
  };

  // Handle final form submission
  const onSubmit = async (data: FormData) => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as FormField[]);

    if (!isStepValid) {
      return; // Stop if current step is invalid
    }

    if (currentStep === steps.length - 1) {
      setLoading(true);
      try {
        console.log("Form submitted:", data);
        reset();
        setCurrentStep(0);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // setPreviousStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const renderFormFields = () => {
    const currentFields = steps[currentStep].fields;

    const getPlaceholder = (fieldName: FormField) => {
      return fieldName
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    };

    if (currentStep === 0) {
      return (
        <>
          <p className="block font-medium text-2xl leading-7 my-4">
            Enter your phone number or email to get started
          </p>
          <p className="block font-normal text-base leading-5 my-4">
            We will send you a verification code for confirmation
          </p>
          {currentFields.map((field) => (
            <Input
              key={field}
              name={field}
              type="tel"
              placeholder="Enter phone number of email"
              onBlur={() => handleBlur(field)}
              // onBlur ={validateStep}
            />
          ))}
        </>
      );
    }

    if (currentStep === 1) {
      return (
        <>
          <p className="block font-medium text-2xl leading-7 my-4">
            Complete profile setup
          </p>
          <p className="block font-normal text-base leading-5 my-4">
            Connect your socials for quick setup
          </p>

          <div className="w-full grid grid-flow-col justify-stretch gap-4">
            {socials.map((social) => (
              <button
                type="button"
                key={social.id}
                className="bg-[#dcdcdc51] py-[16px] px-[40px] rounded-2xl"
              >
                <Image
                  src={social.image}
                  alt="Social media icon"
                  priority
                  width={16}
                  height={16}
                />
              </button>
            ))}
          </div>

          <p className="block font-normal text-base leading-5 my-4">
            or enter manually
          </p>
          {currentFields.map((field) => (
            <Input
              key={field}
              name={field}
              type={
                field.includes("email")
                  ? "email"
                  : field.includes("phone")
                  ? "tel"
                  : "text"
              }
              placeholder={getPlaceholder(field)}
              onBlur={() => handleBlur(field)}
              // onBlur={validateStep}
            />
          ))}
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          {currentFields.map((field) =>
            field === "photo" ? (
              <FileInput
                key={field}
                name={field}
                onBlur={() => handleBlur(field)}
              />
            ) : (
              <Input
                key={field}
                name={field}
                type={
                  field.includes("email")
                    ? "email"
                    : field.includes("phone")
                    ? "tel"
                    : "text"
                }
                placeholder={getPlaceholder(field)}
                // onBlur={() => handleBlur(field)}
                onBlur={validateStep}
              />
            )
          )}
        </>
      );
    }

    return currentFields.map((field) => (
      <Input
        key={field}
        name={field}
        type={
          field.includes("email")
            ? "email"
            : field.includes("phone")
            ? "tel"
            : "text"
        }
        placeholder={getPlaceholder(field)}
        onBlur={() => handleBlur(field)}
      />
    ));
  };

  return (
    <section className="h-full overflow-y-hidden py-4 flex flex-col">
      <nav className="my-4 flex-none">
        <ol className="w-full flex space-x-4">
          {steps.map((step, index) => (
            <li key={step.id} className="flex-1">
              <div className="flex flex-col">
                <div
                  className={clsx(
                    "h-1.5 w-full rounded-full transition-colors duration-200",
                    currentStep >= index ? "bg-primary" : "bg-gray-200"
                  )}
                />
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="relative grow">
          {renderFormFields()}

          <div className="w-full flex justify-center items-center absolute bottom-0 left-0">
            <Button
              type="submit"
              label="Continue"
              variant="primary"
              customClassName="w-full"
              disabled = {loading}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export { Form };
