"use client";

import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactPlayer from "react-player";
import Loading from "@/components/Loading";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";

const Course = () => {
  const {
    user,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  } = useCourseProgressData();
  console.log("currentChapter.video:", currentChapter);

  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = ({ played }: { played: number }) => {
    if (
      played >= 0.8 &&
      !hasMarkedComplete &&
      currentChapter &&
      currentSection &&
      userProgress?.sections &&
      !isChapterCompleted()
    ) {
      setHasMarkedComplete(true);
      updateChapterProgress(
        currentSection.sectionId,
        currentChapter.chapterId,
        true
      );
    }
  };

  if (isLoading) return <Loading />;
  if (!user) return <div className="p-6 text-center text-lg text-gray-600">Please sign in to view this course.</div>;
  if (!course || !userProgress) return <div className="p-6 text-center text-lg text-gray-600">Error loading course</div>;

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2 flex items-center">
            <span className="hover:text-[#0056D2] transition-colors">{course.title}</span>
            <span className="mx-2">/</span>
            <span className="hover:text-[#0056D2] transition-colors">{currentSection?.sectionTitle}</span>
            <span className="mx-2">/</span>
            <span className="text-[#0056D2] font-medium">
              {currentChapter?.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{currentChapter?.title}</h2>
          <div className="flex items-center">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage alt={course.teacherName} />
                <AvatarFallback className="bg-[#0056D2] text-white">
                  {course.teacherName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="ml-3 text-gray-700 font-medium">
                {course.teacherName}
              </span>
            </div>
          </div>
        </div>

        <Card className="bg-white border border-[#EEF0F2] shadow-sm rounded-xl overflow-hidden mb-8">
          <CardContent className="p-0">
            {currentChapter?.video ? (
              <div className="aspect-video w-full">
                <ReactPlayer
                  ref={playerRef}
                  url={currentChapter.video as string}
                  controls
                  width="100%"
                  height="100%"
                  onProgress={handleProgress}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="aspect-video w-full flex items-center justify-center bg-[#D8E8FF] text-[#0056D2]">
                No video available for this chapter.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="Notes" className="w-full">
              <TabsList className="flex bg-[#EEF0F2] p-1 rounded-lg mb-6">
                <TabsTrigger 
                  className="flex-1 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#0056D2] data-[state=active]:shadow-sm transition-all" 
                  value="Notes"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  className="flex-1 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#0056D2] data-[state=active]:shadow-sm transition-all" 
                  value="Resources"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  className="flex-1 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#0056D2] data-[state=active]:shadow-sm transition-all" 
                  value="Quiz"
                >
                  Quiz
                </TabsTrigger>
              </TabsList>

              <TabsContent value="Notes">
                <Card className="border border-[#EEF0F2] shadow-sm bg-white">
                  <CardHeader className="border-b border-[#EEF0F2] bg-white">
                    <CardTitle className="text-xl font-semibold text-gray-900">Notes Content</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 prose max-w-none">
                    {currentChapter?.content}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="Resources">
                <Card className="border border-[#EEF0F2] shadow-sm bg-white">
                  <CardHeader className="border-b border-[#EEF0F2] bg-white">
                    <CardTitle className="text-xl font-semibold text-gray-900">Resources Content</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Add resources content here */}
                    <p className="text-gray-600">No resources available for this chapter.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="Quiz">
                <Card className="border border-[#EEF0F2] shadow-sm bg-white">
                  <CardHeader className="border-b border-[#EEF0F2] bg-white">
                    <CardTitle className="text-xl font-semibold text-gray-900">Quiz Content</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Add quiz content here */}
                    <p className="text-gray-600">No quiz available for this chapter.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="border border-[#EEF0F2] shadow-sm bg-white h-full">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-16 w-16 border-2 border-[#D8E8FF]">
                      <AvatarImage alt={course.teacherName} />
                      <AvatarFallback className="bg-[#0056D2] text-white text-lg">
                        {course.teacherName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {course.teacherName}
                      </h4>
                      <p className="text-sm text-gray-500">Senior UX Designer</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm">
                    <p>
                      A seasoned Senior UX Designer with over 15 years of experience
                      in creating intuitive and engaging digital experiences.
                      Expertise in leading UX design projects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;