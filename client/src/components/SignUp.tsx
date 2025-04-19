"use client"

import React from 'react'
import { SignUp, useUser } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useSearchParams } from 'next/navigation'

const SignUpComponent = () => {
    const { user } = useUser()
    const searchParams = useSearchParams();
    const isCheckoutPage = searchParams.get("showSignUp") !== null
    const courseId = searchParams.get("id")

    const signInUrl = isCheckoutPage ? `/checkout?step=1&id${courseId}&showSignUp=false` : "/signin"

    const getRedirectUrl = () => {
        if(isCheckoutPage) {
            return `/checkout?step=2&id=${courseId}`
        }

        const userType = user?.publicMetadata?.userType as string
        if(userType === "teacher") {
            return `/teacher/courses`
        }

        return "/user/courses"
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F7FA] py-8 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Join EduSphere</h1>
          <p className="text-gray-600">Start your learning journey today</p>
        </div>
        <SignUp 
            appearence={{
                baseTheme: dark,
                elements: {
                    rootBox: "flex justify-center items-center",
                    cardBox: "shadow-lg rounded-xl overflow-hidden w-full",
                    card: "bg-white w-full p-6",
                    headerTitle: "text-gray-800 font-bold",
                    headerSubtitle: "text-gray-600",
                    formFieldLabel: "text-gray-700 font-medium",
                    formButtonPrimary: "bg-[#0056D2] hover:bg-[#004BB4] text-white shadow-md transition-all duration-200",
                    formFieldInput: "bg-white border border-[#EEF0F2] rounded-md focus:border-[#0056D2] focus:ring-2 focus:ring-[#D8E8FF]",
                    footerActionLink: "text-[#0056D2] hover:text-[#004BB4] font-medium",
                    dividerLine: "bg-[#EEF0F2]",
                    dividerText: "text-gray-500",
                    formFieldInputShowPasswordButton: "text-gray-600",
                    footer: {
                        backgroundColor: "#FFFFFF",
                        borderTop: "1px solid #EEF0F2",
                        textAlign: "center",
                        padding: "1rem"
                    },
                    socialButtonsIconButton: "border border-[#EEF0F2] hover:bg-[#F5F7FA] transition-all duration-200",
                    socialButtonsBlockButton: "border border-[#EEF0F2] hover:bg-[#F5F7FA] transition-all duration-200",
                }
            }}
            signInUrl={signInUrl}
            forceRedirectUrl={getRedirectUrl()}
            routing="hash"
            afterSignOutUrl="/"
        />
      </div>
    </div>
  )
}

export default SignUpComponent