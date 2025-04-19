"use client"

import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCoursesQuery } from '@/state/api'
import CourseCardSearch from '@/components/CourseCardSearch'
import { useRouter } from 'next/navigation'

const LoadingSkeleton = () => {
    return (
        <div className="w-full px-4 py-8 md:px-8 lg:px-16 bg-[#F5F7FA]">
            <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Skeleton className='h-10 w-3/4 mb-4' />
                        <Skeleton className='h-6 w-full mb-3' />
                        <Skeleton className='h-6 w-4/5 mb-6' />
                        <Skeleton className='h-12 w-40 rounded-md' />
                    </div>
                    <Skeleton className='w-full md:w-1/2 h-64 rounded-lg' />
                </div>
            </div>

            <div className="mt-16">
                <Skeleton className='h-8 w-48 mb-4' />
                <Skeleton className='h-6 w-full max-w-2xl mb-8' />

                <div className="flex flex-wrap gap-3 mb-8">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton key={index} className='h-8 w-32 rounded-full' />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((_, index) => (
                        <Skeleton key={index} className='h-72 rounded-lg' />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Landing = () => {
    const router = useRouter()
    const currentImage = useCarousel({ totalImages: 3 })
    const { data, isLoading, isError } = useGetCoursesQuery({ category: "all" })

    // Ensure courses is always an array to prevent runtime errors
    const courses = Array.isArray(data?.data) ? data.data : []

    const handleCourseClick = (courseId: string) => {
        router.push(`/search?id=${courseId}`)
    }

    if (isLoading || !Array.isArray(data?.data)) return <LoadingSkeleton />

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='bg-[#F5F7FA] min-h-screen'
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white rounded-b-3xl shadow-md overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 z-10 mb-12 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">EduSphere</h1>
                        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                            Discover a world of learning with our expert-led courses.
                            <br />
                            Learn at your own pace, anytime, anywhere.
                        </p>
                        <div>
                            <Link href="/search">
                                <div className="inline-block bg-[#0056D2] hover:bg-[#004BB4] text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
                                    Explore Courses
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 h-64 md:h-80 relative">
                        {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
                            <Image
                                key={src}
                                src={src}
                                alt={`Hero Banner ${index + 1}`}
                                fill
                                priority={index === currentImage}
                                sizes='(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                className={`object-cover rounded-lg shadow-lg transition-opacity duration-500 ${index === currentImage ? "opacity-100" : "opacity-0"}`}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[#D8E8FF] opacity-20 z-0"></div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.3, once: true }}
                className="container mx-auto px-4 md:px-8 py-16"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Courses</h2>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl">
                    From beginner to advanced, in all industries we have a course particularly handpicked for you
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    {["Web Development", "Enterprise IT", "React & Next.js", "Machine Learning", "Web3"].map((tag, index) => (
                        <span 
                            key={index} 
                            className='bg-[#D8E8FF] text-[#0056D2] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0056D2] hover:text-white transition-colors duration-200 cursor-pointer'
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.slice(0, 4).map((course, index) => (
                        <motion.div
                            key={course.courseId}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ amount: 0.4 }}
                        >
                            <CourseCardSearch
                                course={course}
                                onClick={() => handleCourseClick(course.courseId)}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Landing