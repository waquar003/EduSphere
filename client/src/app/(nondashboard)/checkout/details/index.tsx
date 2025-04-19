"use client";

import CoursePreview from "@/components/CoursePreview";
import { CustomFormField } from "@/components/CustomFormField";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { GuestFormData, guestSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SignUpComponent from "@/components/SignUp";
import SignInComponent from "@/components/SignIn";

const CheckoutDetailsPage = () => {
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse();
  const searchParams = useSearchParams();
  const showSignUp = searchParams.get("showSignUp") === "true";

  const methods = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      email: "",
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center p-6">Failed to fetch course data</div>;
  if (!selectedCourse) return <div className="text-gray-700 text-center p-6">Course not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#EEF0F2]">
          <CoursePreview course={selectedCourse} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-[#EEF0F2]">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Guest Checkout</h2>
            <p className="text-gray-600 mb-4">
              Enter email to receive course access details and order
              confirmation. You can create an account after purchase.
            </p>
            <Form {...methods}>
              <form
                onSubmit={methods.handleSubmit((data) => {
                  console.log(data);
                })}
                className="space-y-4"
              >
                <CustomFormField
                  name="email"
                  label="Email address"
                  type="email"
                  className="w-full rounded-md"
                  labelClassName="font-medium text-gray-700"
                  inputClassName="p-3 border border-[#EEF0F2] bg-[#F5F7FA] focus:ring-[#0056D2] focus:border-[#0056D2]"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[#0056D2] text-white hover:bg-[#004BB4] transition-colors py-3 rounded-md shadow-md"
                >
                  Continue as Guest
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-lg">
            {showSignUp ? <SignUpComponent /> : <SignInComponent />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsPage;