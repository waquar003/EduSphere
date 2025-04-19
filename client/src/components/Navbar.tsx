"use client"

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Bell, BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { cn } from '@/lib/utils'

const Navbar = ({ isCoursePage }: { isCoursePage: boolean}) => {
    const {user} = useUser()
    const userRole = user?.publicMetadata?.userType as "student" | "teacher"
  return (
    <nav className='sticky top-0 z-10 w-full bg-white border-b border-[#EEF0F2] shadow-sm'>
        <div className='flex items-center justify-between px-4 py-3 mx-auto md:px-6'>
            <div className="flex items-center space-x-4">
                <div className="md:hidden">
                    <SidebarTrigger className='p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 hover:text-[#0056D2]' />
                </div>
                <div className="flex items-center gap-4">
                    <div className='relative group'>
                        <Link href="/search" className={cn('flex items-center gap-2 px-3 py-2 text-sm text-gray-500 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:border-[#0056D2] hover:text-[#0056D2] focus:outline-none focus:ring-2 focus:ring-[#D8E8FF]', {
                            "bg-[#F5F7FA]": isCoursePage
                        })}>
                            <span className='hidden sm:inline'>Search Courses</span>
                            <span className="sm:hidden">Search</span>
                            <BookOpen
                                className='w-4 h-4' size={18} />
                        </Link>
                    </div>
                </div>
            
            </div>
            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-[#0056D2]">
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <Bell className='w-5 h-5' />
                </button>

                <UserButton 
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            userButtonOuterIdentifier: "text-gray-500",
                            userButtonBox: "scale-90 sm:scale-100"
                        }
                    }}
                    showName={true}
                    userProfileMode = "navigation"
                    userProfileUrl={
                        userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                    }
                />
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar