"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const CompletionPage = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="bg-[#D8E8FF] p-4 rounded-full">
            <Check className="w-16 h-16 text-[#0056D2]" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">COMPLETED</h1>
        <p className="text-xl text-gray-600">
          🎉 You have made a course purchase successfully! 🎉
        </p>
      </div>
      <div className="mt-8 text-gray-600">
        <p>
          Need help? Contact our{" "}
          <Button variant="link" asChild className="p-0 m-0 text-[#0056D2] font-medium">
            <a href="mailto:support@example.com">customer support</a>
          </Button>
          .
        </p>
      </div>
      <div className="mt-10">
        <Link 
          href="user/courses" 
          scroll={false}
          className="inline-block bg-[#0056D2] text-white py-3 px-8 rounded-md hover:bg-[#004BB4] transition-colors shadow-md"
        >
          Go to Courses
        </Link>
      </div>
    </div>
  );
};

export default CompletionPage;