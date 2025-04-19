"use client";
import Loading from "@/components/Loading";
import WizardStepper from "@/components/WizardStepper";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import CheckoutDetailsPage from "./details";
import PaymentPage from "./payment";
import CompletionPage from "./completion";

const CheckoutWizard = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { checkoutStep, navigateToStep } = useCheckoutNavigation();

  // Redirect to step 1 if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn && checkoutStep > 1) {
      navigateToStep(1);
    }
  }, [isLoaded, isSignedIn, checkoutStep, navigateToStep]);

  if (!isLoaded) return <Loading />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage />;
      case 3:
        return <CompletionPage />;
      default:
        return <CheckoutDetailsPage />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-[#F5F7FA] min-h-screen">
      <WizardStepper currentStep={checkoutStep} />
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default CheckoutWizard;