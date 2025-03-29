import { Request, Response } from "express";
import Course from "../models/course.model";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";

export const listCourses = async(req: Request, res: Response): Promise<void> => {
    const {category} = req.query;
    try {
        const courses = category && category !== "all"
        ? await Course.scan("category").eq(category).exec()
        : await Course.scan().exec();

        res.status(200).json({message: "Courses retrieved Successfully", data: courses});
    } catch (error) {
        res.status(500).json({ message: "Error retrieving courses ", error});
    }

}


export const getCourse = async(req: Request, res: Response): Promise<void> => {
    const { courseId } = req.params;
    try {
        const course = await Course.get(courseId);
        if(!course) {
            res.status(404).json({ message: "Course not found" })
        }

        res.status(200).json({message: "Course retrieved Successfully", data: course});
    } catch (error) {
        res.status(500).json({ message: "Error retrieving course ", error});
    }

}


export const createCourse = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { teacherId, teacherName } = req.body;
  
      if (!teacherId || !teacherName) {
        res.status(400).json({ message: "Teacher Id and name are required" });
        return;
      }
  
      const newCourse = new Course({
        courseId: uuidv4(),
        teacherId,
        teacherName,
        title: "Untitled Course",
        description: "",
        category: "Uncategorized",
        image: "",
        price: 0,
        level: "Beginner",
        status: "Draft",
        sections: [],
        enrollments: [],
      });
      await newCourse.save();
  
      res.json({ message: "Course created successfully", data: newCourse });
    } catch (error) {
      res.status(500).json({ message: "Error creating course", error });
    }
};


export const updateCourse = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { courseId } = req.params;
    const updateData = { ...req.body };
    const { userId } = getAuth(req);
  
    try {
      const course = await Course.get(courseId);
      if (!course) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
  
      if (course.teacherId !== userId) {
        res
          .status(403)
          .json({ message: "Not authorized to update this course " });
        return;
      }
  
      if (updateData.price) {
        const price = parseInt(updateData.price);
        if (isNaN(price)) {
          res.status(400).json({
            message: "Invalid price format",
            error: "Price must be a valid number",
          });
          return;
        }
        updateData.price = price * 100;
      }
  
      if (updateData.sections) {
        const sectionsData =
          typeof updateData.sections === "string"
            ? JSON.parse(updateData.sections)
            : updateData.sections;
  
        updateData.sections = sectionsData.map((section: any) => ({
          ...section,
          sectionId: section.sectionId || uuidv4(),
          chapters: section.chapters.map((chapter: any) => ({
            ...chapter,
            chapterId: chapter.chapterId || uuidv4(),
          })),
        }));
      }
  
      Object.assign(course, updateData);
      await course.save();
  
      res.json({ message: "Course updated successfully", data: course });
    } catch (error) {
      res.status(500).json({ message: "Error updating course", error });
    }
};


export const deleteCourse = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { courseId } = req.params;
    const { userId } = getAuth(req);
  
    try {
      const course = await Course.get(courseId);
      if (!course) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
  
      if (course.teacherId !== userId) {
        res
          .status(403)
          .json({ message: "Not authorized to delete this course " });
        return;
      }
  
      await Course.delete(courseId);
  
      res.json({ message: "Course deleted successfully", data: course });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
};