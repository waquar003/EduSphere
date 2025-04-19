import React, { useState } from "react";
import StripeProvider from "./StripeProvider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useClerk, useUser } from "@clerk/nextjs";
import CoursePreview from "@/components/CoursePreview";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTransactionMutation } from "@/state/api";
import { toast } from "sonner";

const PaymentPageContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createTransaction] = useCreateTransactionMutation();
  const { navigateToStep } = useCheckoutNavigation();
  const { course, courseId } = useCurrentCourse();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error("Stripe service is not available");
      return;
    }

    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
        ? `http://${process.env.NEXT_PUBLIC_LOCAL_URL}`
        : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : window.location.origin; // Fallback to current origin

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed. Please try again.");
      } else if (result.paymentIntent?.status === "succeeded") {
        try {
          const transactionData = {
            transactionId: result.paymentIntent.id,
            userId: user?.id,
            courseId: courseId,
            paymentProvider: "stripe" as const,
            amount: course?.price || 0,
          };
          
          await createTransaction(transactionData);
          toast.success("Payment successful!");
          navigateToStep(3);
        } catch (err) {
          console.error("Error creating transaction record:", err);
          toast.error("Payment recorded but we couldn't complete your order. Please contact support.");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSignOutAndNavigate = async () => {
    await signOut();
    navigateToStep(1);
  };

  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md border border-[#EEF0F2] overflow-hidden">
          <CoursePreview course={course} />
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md border border-[#EEF0F2] p-6">
          <form id="payment-form" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Checkout
              </h2>
              
              <p className="text-gray-600">
                Fill out the payment details below to complete your purchase.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Payment Method
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCard size={24} className="text-[#0056D2]" />
                    Credit/Debit Card
                  </div>
                  
                  <div className="p-4 bg-[#F5F7FA] rounded-lg border border-[#EEF0F2]">
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          className="border border-[#0056D2] text-[#0056D2] bg-white hover:bg-[#D8E8FF] transition-colors"
          onClick={handleSignOutAndNavigate}
          variant="outline"
          type="button"
          disabled={isSubmitting}
        >
          Switch Account
        </Button>
        
        <Button
          form="payment-form"
          type="submit"
          className="bg-[#0056D2] text-white hover:bg-[#004BB4] transition-colors shadow-md"
          disabled={!stripe || !elements || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Pay with Credit Card"}
        </Button>
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <StripeProvider>
    <PaymentPageContent />
  </StripeProvider>
);

export default PaymentPage;