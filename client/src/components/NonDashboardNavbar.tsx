"use client"

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Bell, BookOpen, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NonDashboardNavbar = () => {
    const {user} = useUser()
    const userRole = user?.publicMetadata?.userType as "student" | "teacher"
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-nav border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">EduSphere</span>
            </Link>
            <div className="ml-6 md:ml-10 relative">
              <Link href="/search" className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 py-2 text-sm text-gray-600">
                <Search size={18} className="mr-2 text-gray-500" />
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden">Search</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              <Bell size={20} className="text-gray-600" />
            </button>

            <SignedIn>
              <UserButton 
                appearance={{
                  baseTheme: dark,
                  elements: {
                    userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                    userButtonBox: "scale-90 sm:scale-100"
                  }
                }}
                showName={true}
                userProfileMode="navigation"
                userProfileUrl={
                  userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                }
              />
            </SignedIn>
            <SignedOut>
              <Link 
                href="/signin" 
                className="px-4 py-2 text-primary hover:text-primary-dark transition-colors font-medium"
              >
                Log in
              </Link>
              <Link 
                href="/signin" 
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors font-medium"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NonDashboardNavbar