import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { useCreateStripePaymentIntentMutation } from "@/state/api";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import Loading from "@/components/Loading";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0056D2",
    colorBackground: "#FFFFFF",
    colorText: "#333333",
    colorDanger: "#DF1B41",
    colorTextPlaceholder: "#6B7280",
    fontFamily: "Inter, system-ui, sans-serif",
    spacingUnit: "4px",
    borderRadius: "8px",
    fontSizeBase: "16px",
  },
};

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = useState<string | "">("");
  const [error, setError] = useState<string | null>(null);
  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
  const { course } = useCurrentCourse();

  useEffect(() => {
    if (!course) return;

    const fetchPaymentIntent = async () => {
      try {
        // Make sure there's a valid price
        const amount = course?.price && course.price > 0 ? course.price : 1000;
        
        const result = await createStripePaymentIntent({
          amount: amount,
        }).unwrap();
        
        setClientSecret(result.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Unable to initialize payment. Please try again later.");
      }
    };

    fetchPaymentIntent();
  }, [createStripePaymentIntent, course]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          className="px-4 py-2 bg-[#0056D2] text-white rounded-md hover:bg-[#004BB4] transition-colors shadow-md"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!clientSecret) return <Loading />;

  return (
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      {children}
    </Elements>
  );
};

export default StripeProvider;