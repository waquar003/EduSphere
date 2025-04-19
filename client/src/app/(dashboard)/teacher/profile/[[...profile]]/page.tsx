import Header from '@/components/Header'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const TeacherProfilePage = () => {
  return (
    <div className="w-full bg-[#F5F7FA] min-h-screen px-4 py-6">
        <div className="max-w-5xl mx-auto">
            <Header title='Profile' subtitle='View your profile' />
            <div className="bg-white rounded-lg shadow-md mt-6">
                <UserProfile
                    path='/teacher/profile'
                    routing='path'
                    appearance={{
                        baseTheme: null, // Remove dark theme
                        variables: {
                            colorPrimary: '#0056D2',
                            colorTextOnPrimaryBackground: 'white',
                            colorTextSecondary: '#4A5568',
                            colorText: '#1A202C',
                            colorBackground: '#FFFFFF',
                        },
                        elements: {
                            formButtonPrimary: "bg-[#0056D2] hover:bg-[#004BB4] text-white transition-colors duration-200",
                            formButtonReset: "border border-[#EEF0F2] text-[#0056D2] hover:bg-[#D8E8FF] transition-colors duration-200",
                            card: "bg-white shadow-sm rounded-lg",
                            headerTitle: "text-gray-800 text-xl font-semibold",
                            headerSubtitle: "text-gray-600",
                            formFieldLabel: "text-gray-700",
                            formFieldInput: "border-[#EEF0F2] focus:border-[#0056D2] focus:ring-[#0056D2]",
                            profileSectionTitle: "text-gray-800 font-semibold",
                            profileSectionTitleText: "text-gray-800",
                            profileSectionContent: "text-gray-700",
                            navbarButton: "text-gray-700 hover:text-[#0056D2]",
                            navbar: "bg-white border-b border-[#EEF0F2]",
                            navbarMobileMenuButton: "text-gray-700",
                            rootBox: "bg-white",
                            avatarBox: "border-[#EEF0F2] hover:border-[#0056D2]",
                            scrollBox: "bg-white",
                            userPreviewMainIdentifier: "text-gray-800",
                            userPreviewSecondaryIdentifier: "text-gray-600",
                            userButtonBox: "text-gray-800",
                        }
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default TeacherProfilePage