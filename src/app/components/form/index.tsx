"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FormDataSchema } from "@/lib/schema";
import { Input } from "../input";

const steps = [
  { id: "step1", fields: ["phoneNumber"], title: "Verification" },
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

type FormData = z.infer<typeof FormDataSchema>;

const Form = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
    watch
  } = methods;

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Watch the fields for the current step
  const currentFields = steps[currentStep].fields;
  const watchedFields = watch(currentFields as any[]);

  // Validate and move to next step when fields change
  const validateStep = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as any[], { shouldFocus: true });

    if (isStepValid && currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle final form submission
  const onSubmit = async (data: FormData) => {
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
      await validateStep();
    }
  };

  const renderFormFields = () => {
    const currentFields = steps[currentStep].fields;

    return currentFields.map((field) => {
      const getPlaceholder = (fieldName: string) => {
        return fieldName
          .replace(/([A-Z])/g, " $1") // Add space before capital letters
          .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
          .trim();
      };

      return (
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
          onBlur={() => validateStep()}
        />
      );
    });
  };

  return (
    <section>
      <nav className="my-4">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderFormFields()}

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full py-3 px-4 rounded-2xl text-white transition-colors",
              loading ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
            )}
          >
            {loading 
              ? "Processing..." 
              : currentStep === steps.length - 1 
                ? "Complete Setup" 
                : "Continue"
            }
          </button>
        </form>
      </FormProvider>
    </section>
  );
};

export { Form };
