import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface WizardStepperProps {
  currentStep: number;
}

const WizardStepper = ({ currentStep }: WizardStepperProps) => {
  return (
    <div className="py-6">
      <div className="flex justify-center items-center">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200",
                  {
                    "bg-[#0056D2] shadow-md": currentStep > step || (currentStep === 3 && step === 3),
                    "bg-[#0056D2] shadow-md": currentStep === step && step !== 3,
                    "bg-white border-2 border-[#EEF0F2] text-gray-400": currentStep < step,
                  }
                )}
              >
                {currentStep > step || (currentStep === 3 && step === 3) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className={currentStep < step ? "text-gray-400" : ""}>{step}</span>
                )}
              </div>
              <p
                className={cn("mt-2 text-sm font-medium", {
                  "text-[#0056D2]": currentStep >= step,
                  "text-gray-400": currentStep < step,
                })}
              >
                {step === 1 && "Details"}
                {step === 2 && "Payment"}
                {step === 3 && "Completion"}
              </p>
            </div>
            {index < 2 && (
              <div
                className={cn("w-20 h-1 mx-2", {
                  "bg-[#0056D2]": currentStep > step,
                  "bg-[#EEF0F2]": currentStep <= step,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WizardStepper;