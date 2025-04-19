import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import Loading from "@/components/Loading";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";

const ChaptersSidebar = () => {
  const router = useRouter();
  const { setOpen } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const {
    user,
    course,
    userProgress,
    chapterId,
    courseId,
    isLoading,
    updateChapterProgress,
  } = useCourseProgressData();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <Loading />;
  if (!user) return <div className="p-4 text-gray-700">Please sign in to view course progress.</div>;
  if (!course || !userProgress) return <div className="p-4 text-gray-700">Error loading course content</div>;

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(sectionTitle)
        ? prevSections.filter((title) => title !== sectionTitle)
        : [...prevSections, sectionTitle]
    );
  };

  const handleChapterClick = (sectionId: string, chapterId: string) => {
    router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
      scroll: false,
    });
  };

  return (
    <div ref={sidebarRef} className="fixed left-0 z-10 flex flex-col w-64 h-screen ml-16 overflow-y-auto bg-white border-r border-[#EEF0F2] shadow-sm">
      <div className="p-4 border-b border-[#EEF0F2]">
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
      </div>
      {course.sections.map((section, index) => (
        <Section
          key={section.sectionId}
          section={section}
          index={index}
          sectionProgress={userProgress?.sections?.find(
            (s) => s.sectionId === section.sectionId
          )}
          chapterId={chapterId as string}
          courseId={courseId as string}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </div>
  );
};

const Section = ({
  section,
  index,
  sectionProgress,
  chapterId,
  courseId,
  expandedSections,
  toggleSection,
  handleChapterClick,
  updateChapterProgress,
}: {
  section: any;
  index: number;
  sectionProgress: any;
  chapterId: string;
  courseId: string;
  expandedSections: string[];
  toggleSection: (sectionTitle: string) => void;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  const completedChapters =
    sectionProgress?.chapters.filter((c: any) => c.completed).length || 0;
  const totalChapters = section.chapters.length;
  const isExpanded = expandedSections.includes(section.sectionTitle);

  return (
    <div className="border-b border-[#EEF0F2]">
      <div
        onClick={() => toggleSection(section.sectionTitle)}
        className="flex flex-col gap-1 p-4 cursor-pointer hover:bg-[#F5F7FA]"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-gray-500">
            Section 0{index + 1}
          </p>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-800">
          {section.sectionTitle}
        </h3>
      </div>

      {isExpanded && (
        <div className="px-4 py-2 bg-[#F5F7FA]">
          <ProgressVisuals
            section={section}
            sectionProgress={sectionProgress}
            completedChapters={completedChapters}
            totalChapters={totalChapters}
          />
          <ChaptersList
            section={section}
            sectionProgress={sectionProgress}
            chapterId={chapterId}
            courseId={courseId}
            handleChapterClick={handleChapterClick}
            updateChapterProgress={updateChapterProgress}
          />
        </div>
      )}
    </div>
  );
};

const ProgressVisuals = ({
  section,
  sectionProgress,
  completedChapters,
  totalChapters,
}: {
  section: any;
  sectionProgress: any;
  completedChapters: number;
  totalChapters: number;
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-grow gap-1 mr-2">
          {section.chapters.map((chapter: any) => {
            const isCompleted = sectionProgress?.chapters.find(
              (c: any) => c.chapterId === chapter.chapterId
            )?.completed;
            return (
              <div
                key={chapter.chapterId}
                className={cn(
                  "h-1 flex-grow rounded-full",
                  isCompleted ? "bg-[#0056D2]" : "bg-gray-300"
                )}
              ></div>
            );
          })}
        </div>
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D8E8FF]">
          <Trophy className="w-3 h-3 text-[#0056D2]" />
        </div>
      </div>
      <p className="mb-3 text-xs font-medium text-gray-500">
        {completedChapters}/{totalChapters} COMPLETED
      </p>
    </>
  );
};

const ChaptersList = ({
  section,
  sectionProgress,
  chapterId,
  courseId,
  handleChapterClick,
  updateChapterProgress,
}: {
  section: any;
  sectionProgress: any;
  chapterId: string;
  courseId: string;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  return (
    <ul className="space-y-1">
      {section.chapters.map((chapter: any, index: number) => (
        <Chapter
          key={chapter.chapterId}
          chapter={chapter}
          index={index}
          sectionId={section.sectionId}
          sectionProgress={sectionProgress}
          chapterId={chapterId}
          courseId={courseId}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </ul>
  );
};

const Chapter = ({
  chapter,
  index,
  sectionId,
  sectionProgress,
  chapterId,
  courseId,
  handleChapterClick,
  updateChapterProgress,
}: {
  chapter: any;
  index: number;
  sectionId: string;
  sectionProgress: any;
  chapterId: string;
  courseId: string;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  const chapterProgress = sectionProgress?.chapters.find(
    (c: any) => c.chapterId === chapter.chapterId
  );
  const isCompleted = chapterProgress?.completed;
  const isCurrentChapter = chapterId === chapter.chapterId;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();

    updateChapterProgress(sectionId, chapter.chapterId, !isCompleted);
  };

  return (
    <li
      className={cn(
        "flex items-center gap-3 p-2 cursor-pointer rounded-lg transition-colors",
        isCurrentChapter ? "bg-[#D8E8FF]" : "hover:bg-gray-100"
      )}
      onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
    >
      {isCompleted ? (
        <div
          className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-white rounded-full bg-[#0056D2]"
          onClick={handleToggleComplete}
          title="Toggle completion status"
        >
          <CheckCircle className="w-4 h-4" />
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center flex-shrink-0 w-6 h-6 text-sm font-medium rounded-full",
            isCurrentChapter ? "bg-[#0056D2] text-white" : "bg-gray-200 text-gray-600"
          )}
        >
          {index + 1}
        </div>
      )}
      <span
        className={cn(
          "text-sm font-medium flex-grow",
          isCompleted ? "text-gray-400" : isCurrentChapter ? "text-[#0056D2]" : "text-gray-700"
        )}
      >
        {chapter.title}
      </span>
      {chapter.type === "Text" && (
        <FileText className="w-4 h-4 text-gray-400" />
      )}
    </li>
  );
};

export default ChaptersSidebar;