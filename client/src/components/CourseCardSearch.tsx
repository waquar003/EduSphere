import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const CourseCardSearch = ({
    course,
    isSelected,
    onClick
}: SearchCourseCardProps) => {
  return (
    <div
        onClick={onClick}
        className={`bg-white rounded-lg overflow-hidden shadow-md border border-[#EEF0F2] transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full ${
            isSelected 
            ? "ring-2 ring-[#0056D2] ring-opacity-70"
            : "hover:-translate-y-1"
        }`}
    >
        <div className="relative h-40 w-full overflow-hidden">
            <Image
                src={course.image || "/placeholder.png"}
                alt={course.title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                    {course.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {course.description}
                </p>
            </div>
            <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">By {course.teacherName}</p>
                <div className="flex justify-between items-center mt-1">
                    <span className='text-[#0056D2] font-bold'>
                        {formatPrice(course.price)}
                    </span>
                    <span className="text-xs text-gray-500">
                        {course.enrollments?.length} Enrolled
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseCardSearch