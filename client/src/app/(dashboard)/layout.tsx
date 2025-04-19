"use client"

import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";

export default function DashboardLayout({ children }: {children: React.ReactNode}) {
    const pathName = usePathname();
    const [courseId, setCourseId] = React.useState<string | null>(null);
    const { user, isLoaded } = useUser();
    const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(pathName);
    
    useEffect(() => {
        if (isCoursePage) {
        const match = pathName.match(/\/user\/courses\/([^\/]+)/);
        setCourseId(match ? match[1] : null);
        } else {
        setCourseId(null);
        }
    }, [isCoursePage, pathName]);

    if(!isLoaded) return <div className="flex items-center justify-center w-full h-screen bg-white"><Loading /></div>
    if(!user) return <div className="flex items-center justify-center w-full h-screen text-lg font-medium text-gray-700 bg-white">Please sign in to access this page.</div>

    return (
    <SidebarProvider>
        <div className="flex w-full bg-[#F5F7FA]">
            <AppSidebar />
            <div className="flex flex-col flex-grow min-h-screen">
                {courseId && <ChaptersSidebar />}
                <div 
                    className={cn(
                        "flex flex-col flex-grow",
                        isCoursePage && "ml-64"
                    )}
                    style={{ height: "100vh" }}
                >
                    <Navbar isCoursePage={isCoursePage}/>
                    <main className="flex-grow p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    </SidebarProvider>
  );
}