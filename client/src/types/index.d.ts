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
}


export {};