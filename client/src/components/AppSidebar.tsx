"use client"

import { useClerk, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar';
import { BookOpen, Briefcase, ChevronRight, DollarSign, LogOut, PanelLeft, Settings, User } from 'lucide-react';
import Loading from './Loading';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const pathname = usePathname();
    const { toggleSidebar, collapsed } = useSidebar();

    const navLinks = {
        student: [
            { icon: BookOpen, label: "Courses", href: "/user/courses" },
            { icon: DollarSign, label: "Billing", href: "/user/billing" },
            { icon: User, label: "Profile", href: "/user/profile" },
            { icon: Settings, label: "Settings", href: "/user/settings" },
        ],
        teacher: [
            { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
            { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
            { icon: User, label: "Profile", href: "/teacher/profile" },
            { icon: Settings, label: "Settings", href: "/teacher/settings" },
        ],
    }

    if(!isLoaded) return <Loading />
    if(!user) return <div className="p-4 text-gray-700">User not found</div>

    const userType = user?.publicMetadata?.userType as "student" | "teacher" 
    const currentNavLinks = navLinks[userType] || navLinks.student

    return (
        <Sidebar
            collapsible='icon'
            style={{ height: "100vh" }}
            className='bg-white border-r border-[#EEF0F2] shadow-sm'
        >
            <SidebarHeader>
                <SidebarMenu className='p-4'>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size={"lg"}
                            onClick={() => toggleSidebar()}
                            className='flex items-center justify-between w-full p-2 rounded-lg group hover:bg-[#F5F7FA] transition-colors'
                        >
                            {!collapsed ? (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <span className="text-xl font-bold text-[#0056D2]">EduSphere</span>
                                    </div>
                                    <PanelLeft className='w-5 h-5 text-gray-500 group-hover:text-[#0056D2] transition-colors' />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <ChevronRight className='w-5 h-5 text-[#0056D2]' />
                                </div>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="flex flex-col flex-grow">
                <SidebarMenu className='px-3 py-2 space-y-1'>
                    {currentNavLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        
                        return (
                            <SidebarMenuItem
                                key={link.href}
                                className={cn(
                                    "rounded-lg relative overflow-hidden transition-colors",
                                    isActive ? "bg-[#D8E8FF]" : "hover:bg-gray-100"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-[#0056D2] rounded-r-full" />
                                )}
                                <SidebarMenuButton
                                    asChild
                                    size={"lg"}
                                    className={cn(
                                        "p-3",
                                        !isActive && "text-gray-600"
                                    )}
                                >
                                    <Link href={link.href} className='flex items-center gap-3'>
                                        <link.icon 
                                            className={cn(
                                                "flex-shrink-0 w-5 h-5 transition-colors",
                                                isActive ? "text-[#0056D2]" : "text-gray-500"
                                            )} 
                                        />
                                        {!collapsed && (
                                            <span 
                                                className={cn(
                                                    "font-medium transition-colors",
                                                    isActive ? "text-[#0056D2]" : "text-gray-600"
                                                )}
                                            >
                                                {link.label}
                                            </span>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button
                                onClick={() => signOut()}
                                className='flex items-center w-full gap-2 p-3 mx-3 my-4 font-medium text-gray-600 transition-colors rounded-lg hover:bg-gray-100'
                            >
                                <LogOut className='w-5 h-5 text-gray-500' />
                                {!collapsed && <span>Sign out</span>}
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>        
        </Sidebar>
    )
}

export default AppSidebar