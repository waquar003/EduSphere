declare global {
    interface Course {
        courseId: string;
        teacherId: string;
        teacherName: string;
        title: string;
        description?: string;
        category: string;
        image?: string;
        price?: number; // Stored in cents (e.g., 4999 for $49.99)
        level: "Beginner" | "Intermediate" | "Advanced";
        status: "Draft" | "Published";
        sections: Section[];
        enrollments?: Array<{
          userId: string;
        }>;
    }

    interface Section {
        sectionId: string;
        sectionTitle: string;
        sectionDescription?: string;
        chapters: Chapter[];
    }

    interface Chapter {
        chapterId: string;
        title: string;
        content: string;
        video?: string | File;
        freePreview?: boolean;
        type: "Text" | "Quiz" | "Video";
    }

    interface SearchCourseCardProps {
        course: Course;
        isSelected?: boolean;
        onClick?: () => void;
    }

    interface SelectedCourseProps {
        course: Course;
        handleEnrollNow: (courseId: string) => void;
    }

    interface AccordionSectionsProps {
        sections: Section[];
    }

    interface HeaderProps {
        title: string;
        subtitle: string;
        rightElement?: ReactNode;
    }

    interface SharedNotificationSettingsProps {
        title?: string;
        subtitle?: string;
    }

    interface UserSettings {
        theme?: "light" | "dark";
        emailAlerts?: boolean;
        smsAlerts?: boolean;
        courseNotifications?: boolean;
        notificationFrequency?: "immediate" | "daily" | "weekly";
    }

    interface WizardStepperProps {
        currentStep: number;
    }

    interface CoursePreviewProps {
        course: Course;
    }

    interface Transaction {
        userId: string;
        transactionId: string;
        dateTime: string;
        courseId: string;
        paymentProvider: "stripe";
        paymentMethodId?: string;
        amount: number; // Stored in cents
        savePaymentMethod?: boolean;
    }

    interface TeacherCourseCardProps {
        course: Course;
        onEdit: (course: Course) => void;
        onDelete: (course: Course) => void;
        isOwner: boolean;
    }

    interface ToolbarProps {
        onSearch: (search: string) => void;
        onCategoryChange: (category: string) => void;
    }


    interface ChapterModalProps {
        isOpen: boolean;
        onClose: () => void;
        sectionIndex: number | null;
        chapterIndex: number | null;
        sections: Section[];
        setSections: React.Dispatch<React.SetStateAction<Section[]>>;
        courseId: string;
    }
    
    interface SectionModalProps {
        isOpen: boolean;
        onClose: () => void;
        sectionIndex: number | null;
        sections: Section[];
        setSections: React.Dispatch<React.SetStateAction<Section[]>>;
    }

    interface DroppableComponentProps {
        sections: Section[];
        setSections: (sections: Section[]) => void;
        handleEditSection: (index: number) => void;
        handleDeleteSection: (index: number) => void;
        handleAddChapter: (sectionIndex: number) => void;
        handleEditChapter: (sectionIndex: number, chapterIndex: number) => void;
        handleDeleteChapter: (sectionIndex: number, chapterIndex: number) => void;
    }

    interface CourseFormData {
        courseTitle: string;
        courseDescription: string;
        courseCategory: string;
        coursePrice: string;
        courseStatus: boolean;
    }

    interface CustomFixedModalProps {
        isOpen: boolean;
        onClose: () => void;
        children: ReactNode;
    }

    interface UserCourseProgress {
        userId: string;
        courseId: string;
        enrollmentDate: string;
        overallProgress: number;
        sections: SectionProgress[];
        lastAccessedTimestamp: string;
    }

    interface ChapterProgress {
        chapterId: string;
        completed: boolean;
    }

    interface SectionProgress {
        sectionId: string;
        chapters: ChapterProgress[];
    }


    interface CourseCardProps {
        course: Course;
        onGoToCourse: (course: Course) => void;
    }

    interface PaymentMethod {
        methodId: string;
        type: string;
        lastFour: string;
        expiry: string;
    }


    interface User {
        userId: string;
        firstName?: string;
        lastName?: string;
        username?: string;
        email: string;
        publicMetadata: {
            userType: "teacher" | "student";
        };
        privateMetadata: {
            settings?: UserSettings;
            paymentMethods?: Array<PaymentMethod>;
            defaultPaymentMethodId?: string;
            stripeCustomerId?: string;
        };
        unsafeMetadata: {
            bio?: string;
            urls?: string[];
        };
    }
}


export {};