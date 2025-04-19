import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

const CourseCard = ({ course, onGoToCourse }: CourseCardProps) => {
  return (
    <Card 
      className="bg-white border border-[#EEF0F2] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col" 
      onClick={() => onGoToCourse(course)}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image || "/placeholder.png"}
            alt={course.title}
            width={400}
            height={350}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <CardTitle className="text-lg font-semibold line-clamp-2 mb-3 text-gray-900 hover:text-[#0056D2] transition-colors">
          {course.title}: {course.description}
        </CardTitle>

        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage alt={course.teacherName} />
            <AvatarFallback className="bg-[#D8E8FF] text-[#0056D2] text-xs">
              {course.teacherName[0]}
            </AvatarFallback>
          </Avatar>

          <p className="text-sm text-gray-500">
            {course.teacherName}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="bg-[#D8E8FF] text-[#0056D2] text-xs px-3 py-1 rounded-full font-medium">
            {course.category}
          </div>
          <span className="text-[#0056D2] font-bold">
            {formatPrice(course.price)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;