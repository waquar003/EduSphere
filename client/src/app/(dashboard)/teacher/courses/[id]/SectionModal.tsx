import { CustomFormField } from "@/components/CustomFormField";
import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SectionFormData, sectionSchema } from "@/lib/schemas";
import { addSection, closeSectionModal, editSection } from "@/state";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const SectionModal = () => {
  const dispatch = useAppDispatch();
  const { isSectionModalOpen, selectedSectionIndex, sections } = useAppSelector(
    (state) => state.global.courseEditor
  );

  const section =
    selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;

  const methods = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (section) {
      methods.reset({
        title: section.sectionTitle,
        description: section.sectionDescription,
      });
    } else {
      methods.reset({
        title: "",
        description: "",
      });
    }
  }, [section, methods]);

  const onClose = () => {
    dispatch(closeSectionModal());
  };

  const onSubmit = (data: SectionFormData) => {
    const newSection: Section = {
      sectionId: section?.sectionId || uuidv4(),
      sectionTitle: data.title,
      sectionDescription: data.description,
      chapters: section?.chapters || [],
    };

    if (selectedSectionIndex === null) {
      dispatch(addSection(newSection));
    } else {
      dispatch(
        editSection({
          index: selectedSectionIndex,
          section: newSection,
        })
      );
    }

    toast.success(
      `Section added/updated successfully but you need to save the course to apply the changes`
    );
    onClose();
  };

  return (
    <CustomModal isOpen={isSectionModalOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto">
        <div className="flex items-center justify-between mb-6 border-b border-[#EEF0F2] pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedSectionIndex === null ? "Add New Section" : "Edit Section"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <CustomFormField
              name="title"
              label="Section Title"
              placeholder="Write section title here"
              className="border-[#EEF0F2] rounded-lg focus:ring-[#0056D2] focus:border-[#0056D2]"
            />

            <CustomFormField
              name="description"
              label="Section Description"
              type="textarea"
              placeholder="Write section description here"
              className="border-[#EEF0F2] rounded-lg focus:ring-[#0056D2] focus:border-[#0056D2]"
            />

            <div className="flex justify-end items-center space-x-4 pt-4 border-t border-[#EEF0F2]">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border border-[#EEF0F2] text-gray-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg px-4 py-2"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#0056D2] hover:bg-[#004BB4] text-white transition-colors duration-200 rounded-lg px-6 py-2 shadow-sm"
              >
                {selectedSectionIndex === null ? "Add Section" : "Update Section"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default SectionModal;