"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus, GripVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import {
  setSections,
  deleteSection,
  deleteChapter,
  openSectionModal,
  openChapterModal,
} from "@/state";

export default function DroppableComponent() {
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const handleSectionDragEnd = (result: any) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedSections = [...sections];
    const [reorderedSection] = updatedSections.splice(startIndex, 1);
    updatedSections.splice(endIndex, 0, reorderedSection);
    dispatch(setSections(updatedSections));
  };

  const handleChapterDragEnd = (result: any, sectionIndex: number) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedSections = [...sections];
    const updatedChapters = [...updatedSections[sectionIndex].chapters];
    const [reorderedChapter] = updatedChapters.splice(startIndex, 1);
    updatedChapters.splice(endIndex, 0, reorderedChapter);
    updatedSections[sectionIndex].chapters = updatedChapters;
    dispatch(setSections(updatedSections));
  };

  return (
    <DragDropContext onDragEnd={handleSectionDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className="space-y-4"
          >
            {sections.map((section: Section, sectionIndex: number) => (
              <Draggable
                key={section.sectionId}
                draggableId={section.sectionId}
                index={sectionIndex}
              >
                {(draggableProvider) => (
                  <div
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    className={`bg-white rounded-lg border border-[#EEF0F2] shadow-sm overflow-hidden`}
                  >
                    <SectionHeader
                      section={section}
                      sectionIndex={sectionIndex}
                      dragHandleProps={draggableProvider.dragHandleProps}
                    />

                    <DragDropContext
                      onDragEnd={(result) =>
                        handleChapterDragEnd(result, sectionIndex)
                      }
                    >
                      <Droppable droppableId={`chapters-${section.sectionId}`}>
                        {(droppableProvider) => (
                          <div
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}
                            className="px-4 py-2 space-y-2"
                          >
                            {section.chapters.map(
                              (chapter: Chapter, chapterIndex: number) => (
                                <Draggable
                                  key={chapter.chapterId}
                                  draggableId={chapter.chapterId}
                                  index={chapterIndex}
                                >
                                  {(draggableProvider) => (
                                    <ChapterItem
                                      chapter={chapter}
                                      chapterIndex={chapterIndex}
                                      sectionIndex={sectionIndex}
                                      draggableProvider={draggableProvider}
                                    />
                                  )}
                                </Draggable>
                              )
                            )}
                            {droppableProvider.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <div className="p-3 bg-[#F5F7FA] border-t border-[#EEF0F2]">
                      <Button
                        type="button"
                        className="w-full bg-white border border-[#0056D2] text-[#0056D2] hover:bg-[#D8E8FF] rounded-md transition-colors duration-200 font-medium"
                        size="sm"
                        onClick={() =>
                          dispatch(
                            openChapterModal({
                              sectionIndex,
                              chapterIndex: null,
                            })
                          )
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        <span>Add Chapter</span>
                      </Button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const SectionHeader = ({
  section,
  sectionIndex,
  dragHandleProps,
}: {
  section: Section;
  sectionIndex: number;
  dragHandleProps: any;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div 
      className="bg-[#D8E8FF] p-4" 
      {...dragHandleProps}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <GripVertical className="h-5 w-5 text-[#0056D2] mr-2 cursor-move" />
            <h3 className="text-lg font-medium text-gray-800">{section.sectionTitle}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              className="text-gray-600 hover:text-[#0056D2] bg-transparent p-1 rounded-md transition-colors"
              onClick={() => dispatch(openSectionModal({ sectionIndex }))}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              className="text-gray-600 hover:text-red-500 bg-transparent p-1 rounded-md transition-colors"
              onClick={() => dispatch(deleteSection(sectionIndex))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {section.sectionDescription && (
          <p className="text-sm text-gray-600 mt-1 ml-7">
            {section.sectionDescription}
          </p>
        )}
      </div>
    </div>
  );
};

const ChapterItem = ({
  chapter,
  chapterIndex,
  sectionIndex,
  draggableProvider,
}: {
  chapter: Chapter;
  chapterIndex: number;
  sectionIndex: number;
  draggableProvider: any;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      ref={draggableProvider.innerRef}
      {...draggableProvider.draggableProps}
      {...draggableProvider.dragHandleProps}
      className={`flex justify-between items-center bg-white rounded-md border border-[#EEF0F2] p-3 hover:bg-gray-50 transition-colors`}
    >
      <div className="flex items-center">
        <GripVertical className="h-4 w-4 text-gray-400 mr-2 cursor-move" />
        <p className="text-sm text-gray-700">{`${chapterIndex + 1}. ${chapter.title}`}</p>
        {chapter.type === "Video" && (
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Video</span>
        )}
      </div>
      <div className="flex items-center space-x-1">
        <Button
          type="button"
          className="text-gray-500 hover:text-[#0056D2] bg-transparent p-1 rounded transition-colors"
          onClick={() =>
            dispatch(
              openChapterModal({
                sectionIndex,
                chapterIndex,
              })
            )
          }
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          className="text-gray-500 hover:text-red-500 bg-transparent p-1 rounded transition-colors"
          onClick={() =>
            dispatch(
              deleteChapter({
                sectionIndex,
                chapterIndex,
              })
            )
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};