import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

const TeacherCourseCard = ({
  course,
  onEdit,
  onDelete,
  isOwner,
}: TeacherCourseCardProps) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden border border-[#EEF0F2] shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={course.image || "/placeholder.png"}
            alt={course.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {course.title}
          </CardTitle>

          <CardDescription className="text-sm text-gray-500 mb-2 capitalize">
            {course.category}
          </CardDescription>

          <p className="text-sm mb-3">
            Status:{" "}
            <span
              className={cn(
                "font-medium px-2 py-1 rounded-full text-xs ml-1",
                course.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              {course.status}
            </span>
          </p>
          {course.enrollments && (
            <p className="text-sm bg-[#D8E8FF] text-[#0056D2] px-3 py-1 rounded-full inline-flex items-center w-fit mb-3">
              <span className="font-bold">
                {course.enrollments.length}
              </span>
              <span className="ml-1">
                Student{course.enrollments.length > 1 ? "s" : ""} Enrolled
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          {isOwner ? (
            <>
              <Button 
                className="flex-1 bg-[#0056D2] hover:bg-[#004BB4] text-white rounded transition-colors duration-200"
                onClick={() => onEdit(course)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                className="flex-1 bg-white border border-red-500 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                onClick={() => onDelete(course)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          ) : (
            <p className="text-sm text-gray-500 italic">View Only</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCourseCard;