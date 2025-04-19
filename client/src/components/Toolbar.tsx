import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCategories } from "@/lib/utils";

const Toolbar = ({ onSearch, onCategoryChange }: ToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-[#EEF0F2]">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search courses"
        className="flex-grow px-4 py-2 border border-[#EEF0F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056D2] focus:border-transparent transition-all w-full sm:w-auto"
      />
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-52 border border-[#EEF0F2] rounded-lg focus:ring-2 focus:ring-[#0056D2] focus:border-transparent px-4 py-2">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-[#EEF0F2] shadow-md rounded-lg">
          <SelectItem value="all" className="hover:bg-[#D8E8FF] focus:bg-[#D8E8FF] cursor-pointer py-2">
            All Categories
          </SelectItem>
          {courseCategories.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
              className="hover:bg-[#D8E8FF] focus:bg-[#D8E8FF] cursor-pointer py-2"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Toolbar;