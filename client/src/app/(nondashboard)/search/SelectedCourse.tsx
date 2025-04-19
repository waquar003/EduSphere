import AccordionSections from '@/components/AccordionSections'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import React from 'react'

const SelectedCourse = ({ course, handleEnrollNow }: SelectedCourseProps) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden border border-[#EEF0F2] transition-all duration-300'>
        <div className="p-6 border-b border-[#EEF0F2]">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
            <p className="text-gray-600">
                By <span className="font-medium">{course.teacherName}</span> | {" "}
                <span className='text-[#0056D2] font-medium'>
                    {course?.enrollments?.length} students enrolled
                </span>
            </p>
        </div>
        
        <div className="p-6">
            <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

            <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Course Content
                </h4>
                <AccordionSections sections={course.sections} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EEF0F2]">
                <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(course.price)}
                </span>
                <Button
                    onClick={() => handleEnrollNow(course.courseId)}
                    className="bg-[#0056D2] hover:bg-[#004BB4] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm hover:shadow"
                >
                    Enroll Now
                </Button>
            </div>
        </div>
    </div>
  )
}

export default SelectedCourse