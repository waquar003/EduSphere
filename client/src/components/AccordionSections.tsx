import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { FileText } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type AccordionSectionsProps = {
  sections?: Section[];
  isLoading?: boolean;
};

const AccordionSections = ({
  sections = [],
  isLoading = false,
}: AccordionSectionsProps) => {
  const showSkeleton = isLoading || sections.length === 0;

  return (
    <Accordion type='multiple' className='w-full'>
      {showSkeleton ? (
        // Show 3 placeholder skeleton sections
        Array.from({ length: 3 }).map((_, index) => (
          <AccordionItem
            key={`skeleton-${index}`}
            value={`skeleton-${index}`}
            className="border-b border-[#EEF0F2] last:border-b-0"
          >
            <AccordionTrigger className='py-4 flex justify-between hover:no-underline hover:bg-[#F5F7FA] transition-colors px-2 rounded'>
              <h5 className="font-medium text-gray-800">
                <Skeleton className="h-5 w-40" />
              </h5>
            </AccordionTrigger>
            <AccordionContent className='py-2 px-2 text-gray-700'>
              <ul className="space-y-2">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        sections.map((section) => (
          <AccordionItem
            key={section.sectionId}
            value={section.sectionTitle}
            className="border-b border-[#EEF0F2] last:border-b-0"
          >
            <AccordionTrigger className='py-4 flex justify-between hover:no-underline hover:bg-[#F5F7FA] transition-colors px-2 rounded'>
              <h5 className="font-medium text-gray-800">{section.sectionTitle}</h5>
            </AccordionTrigger>
            <AccordionContent className='py-2 px-2 text-gray-700'>
              <ul className="space-y-2">
                {section.chapters.map((chapter) => (
                  <li
                    key={chapter.chapterId}
                    className='flex items-center gap-2 hover:text-[#0056D2] transition-colors cursor-pointer'
                  >
                    <FileText className='w-4 h-4' />
                    <span className='text-sm'>{chapter.title}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))
      )}
    </Accordion>
  );
};

export default AccordionSections;