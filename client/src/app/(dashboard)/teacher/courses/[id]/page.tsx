"use client";

import { CustomFormField } from "@/components/CustomFormField";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { courseSchema } from "@/lib/schemas";
import {
  centsToDollars,
  createCourseFormData,
  uploadAllVideos,
} from "@/lib/utils";
import { openSectionModal, setSections } from "@/state";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetUploadVideoUrlMutation,
} from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DroppableComponent from "./Droppable";
import ChapterModal from "./ChapterModal";
import SectionModal from "./SectionModal";

const CourseEditor = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: course, isLoading, refetch } = useGetCourseQuery(id);
  const [updateCourse] = useUpdateCourseMutation();
  const [getUploadVideoUrl] = useGetUploadVideoUrlMutation();

  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      courseCategory: "",
      coursePrice: "0",
      courseStatus: false,
    },
  });

  useEffect(() => {
    if (course?.data) {
      const courseData = course.data;
  
      methods.reset({
        courseTitle: courseData.title,
        courseDescription: courseData.description,
        courseCategory: courseData.category,
        coursePrice: centsToDollars(courseData.price),
        courseStatus: courseData.status === "Published",
      });
  
      dispatch(setSections(courseData.sections || []));
    }
  }, [course, methods, dispatch]);
  

  const onSubmit = async (data: CourseFormData) => {
    try {
      const updatedSections = await uploadAllVideos(
        sections,
        id,
        getUploadVideoUrl
      );

      const formData = createCourseFormData(data, updatedSections);

      await updateCourse({
        courseId: id,
        formData,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  if (isLoading || !course) {
    return <p className="text-center py-8 text-gray-600 font-medium">Loading course editor...</p>;
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-[#EEF0F2] rounded-lg p-2 gap-2 cursor-pointer hover:bg-[#0056D2] hover:text-white transition-colors duration-200 text-gray-600 bg-white shadow-sm"
          onClick={() => router.push("/teacher/courses", { scroll: false })}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      </div>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header
            title="Course Setup"
            subtitle="Complete all fields and save your course"
            rightElement={
              <div className="flex items-center space-x-4">
                <CustomFormField
                  name="courseStatus"
                  label={methods.watch("courseStatus") ? "Published" : "Draft"}
                  type="switch"
                  className="flex items-center space-x-2"
                  labelClassName={`text-sm font-medium ${
                    methods.watch("courseStatus")
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                  inputClassName="data-[state=checked]:bg-[#0056D2]"
                />
                <Button
                  type="submit"
                  className="bg-[#0056D2] hover:bg-[#004BB4] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  {methods.watch("courseStatus")
                    ? "Update Published Course"
                    : "Save Draft"}
                </Button>
              </div>
            }
          />

          <div className="flex justify-between md:flex-row flex-col gap-10 mt-5 font-sans">
            <div className="basis-1/2 bg-white p-6 rounded-lg shadow-sm border border-[#EEF0F2]">
              <div className="space-y-6">
                <CustomFormField
                  name="courseTitle"
                  label="Course Title"
                  type="text"
                  placeholder="Write course title here"
                  className="border-[#EEF0F2] rounded-lg focus:ring-[#0056D2] focus:border-[#0056D2]"
                />

                <CustomFormField
                  name="courseDescription"
                  label="Course Description"
                  type="textarea"
                  placeholder="Write course description here"
                  className="border-[#EEF0F2] rounded-lg focus:ring-[#0056D2] focus:border-[#0056D2]"
                />

                <CustomFormField
                  name="courseCategory"
                  label="Course Category"
                  type="select"
                  placeholder="Select category here"
                  className="border-[#EEF0F2] rounded-lg focus:ring-[#0056D2] focus:border-[#0056D2]"
                  options={[
                    { value: "technology", label: "Technology" },
                    { value: "science", label: "Science" },
                    { value: "mathematics", label: "Mathematics" },
                    {
                      value: "Artificial Intelligence",
                      label: "Artificial Intelligence",
                    },
                  ]}
                />

                <CustomFormField
                  name="coursePrice"
                  label="Course Price"
                  type="number"
                  placeholder="0"
                  className="border-[#EEF0F2] rounded-lg focus:ring-[#0056D2] focus:border-[#0056D2]"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#EEF0F2] mt-4 md:mt-0 basis-1/2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Sections
                </h2>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    dispatch(openSectionModal({ sectionIndex: null }))
                  }
                  className="border border-[#0056D2] text-[#0056D2] hover:bg-[#D8E8FF] hover:text-[#0056D2] transition-colors duration-200 rounded-lg"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  <span>Add Section</span>
                </Button>
              </div>

              <div className="min-h-[200px] rounded-lg">
                {isLoading ? (
                  <p className="text-center py-8 text-gray-600">Loading course content...</p>
                ) : sections.length > 0 ? (
                  <DroppableComponent />
                ) : (
                  <div className="flex items-center justify-center h-40 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-gray-500">No sections available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>

      <ChapterModal />
      <SectionModal />
    </div>
  );
};

export default CourseEditor;