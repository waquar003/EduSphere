"use client"

import CourseCardSearch from '@/components/CourseCardSearch';
import Loading from '@/components/Loading';
import { useGetCoursesQuery } from '@/state/api';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SelectedCourse from './SelectedCourse';

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { data, isLoading, isError } = useGetCoursesQuery({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  // Defensive check to ensure courses is always an array
  const courses = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    if (courses.length > 0) {
      if (id) {
        const course = courses.find((course) => course.courseId === id);
        setSelectedCourse(course || courses[0]);
      } else {
        setSelectedCourse(courses[0]);
      }
    }
  }, [courses, id]);

  if (isLoading || !Array.isArray(data?.data)) return <Loading />;
  if (isError) return <div className="flex justify-center items-center h-64 text-red-600 font-medium">Something went wrong</div>;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`);
  };

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='bg-[#F5F7FA] min-h-screen px-4 py-8 md:px-8 lg:px-16'
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Discover courses</h1>
      <h2 className="text-lg text-gray-600 mb-8">{courses.length} courses available</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:w-1/3'
        >
          {courses.map((course) => (
            <CourseCardSearch
              key={course.courseId}
              course={course}
              isSelected={selectedCourse?.courseId === course.courseId}
              onClick={() => handleCourseSelect(course)}
            />
          ))}
        </motion.div>

        {selectedCourse && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='lg:w-2/3'
          >
            <SelectedCourse
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;