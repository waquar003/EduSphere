import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import AccordionSections from "./AccordionSections";

interface CoursePreviewProps {
  course: {
    image: string;
    title: string;
    teacherName: string;
    description: string;
    price: number;
    sections: any[];
  };
}

const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price);
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex-grow space-y-6">
        <div className="rounded-lg overflow-hidden shadow-sm">
          <Image
            src={course.image || "/placeholder.png"}
            alt="Course Preview"
            width={640}
            height={360}
            className="w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">{course.title}</h2>
          <p className="text-gray-600 text-sm mb-3">by {course.teacherName}</p>
          <p className="text-gray-600 text-sm">
            {course.description}
          </p>
        </div>

        <div>
          <h4 className="text-gray-700 font-semibold mb-2">
            Course Content
          </h4>
          <div className="bg-[#F5F7FA] rounded-lg p-2">
            <AccordionSections sections={course.sections} />
          </div>
        </div>
      </div>

      <div className="border-t border-[#EEF0F2] p-6 bg-[#F5F7FA]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Details (1 item)</h3>
        <div className="flex justify-between mb-4 text-gray-600">
          <span className="font-medium">1x {course.title}</span>
          <span className="font-medium">{price}</span>
        </div>
        <div className="flex justify-between border-t border-[#EEF0F2] pt-4">
          <span className="font-bold text-gray-800">Total Amount</span>
          <span className="font-bold text-[#0056D2] text-lg">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;