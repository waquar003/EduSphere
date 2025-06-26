import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isStudentRoute = createRouteMatcher(["/user/(.*)"])
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"])
const isCompleteProfileRoute = createRouteMatcher(["/complete-profile"])

export default clerkMiddleware(async (auth, req) => {
    const { sessionClaims, userId } = await auth();
    
    if (isCompleteProfileRoute(req) && userId) {
        return NextResponse.next();
    }

    const userRole = (sessionClaims?.metadata as { userType: "student" | "teacher"})?.userType;
    
    console.log("@@METADATA", userRole, "@@USER_ID", userId);
    

    if (userId && !userRole) {
        const url = new URL("/complete-profile", req.url);
        return NextResponse.redirect(url);
    }
    
    if (isStudentRoute(req)) {
        if (userRole !== "student") {
            const url = new URL("/teacher/courses", req.url);
            return NextResponse.redirect(url);
        }
    }
    
    if (isTeacherRoute(req)) {
        if (userRole !== "teacher") {
            const url = new URL("/user/courses", req.url);
            return NextResponse.redirect(url);
        }
    }
    
    return NextResponse.next();
})

export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
};