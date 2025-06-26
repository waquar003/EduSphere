import express  from "express";
import { createCourse, deleteCourse, getCourse, listCourses, updateCourse } from "../controllers/course.controller";
import { requireAuth } from "@clerk/express"
import multer from "multer";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", listCourses);
router.post("/", requireAuth(), createCourse)

router.get("/:courseId", getCourse)
router.put("/:courseId", requireAuth(), upload.single("image"), updateCourse)
router.delete("/:courseId", requireAuth(), deleteCourse)

router.post(
  "/:courseId/sections/:sectionId/chapters/:chapterId/get-upload-url",
  requireAuth(),
  getUploadVideoUrl
);

export default router