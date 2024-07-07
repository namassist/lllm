"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

const CourseSchema = z.object({
  title: z.string().min(6),
  description: z.string().min(20),
  category_id: z.string().min(1),
  isPublished: z.string(),
  key: z.string().min(6),
  instructor_id: z.string().min(6),
});

export const saveCourse = async (prevSate: any, formData: FormData) => {
  const validatedFields = CourseSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  const { isPublished } = Object.fromEntries(formData.entries());
  const published = isPublished === "true";

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.course.create({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        category_id: validatedFields.data.category_id,
        isPublished: published,
        key: validatedFields.data.key,
        image: "/bg.webp",
        instructor_id: validatedFields.data.instructor_id,
      },
    });
  } catch (error) {
    return { message: "Failed to create course" };
  }

  revalidatePath("/admin/courses");
  return { message: "success added course" };
};

export const deleteCourse = async (id: string) => {
  try {
    await db.course.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete course" };
  }

  revalidatePath("/admin/courses");
  return { message: "success deleted course" };
};

export const getStudentCourses = async (studentId: string) => {
  try {
    const studentCourses = await db.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        enrollmentCourse: {
          include: {
            course: {
              include: {
                instructor: true,
              },
            },
          },
        },
      },
    });

    const courses = studentCourses?.enrollmentCourse.map(
      (enrollment) => enrollment.course
    );

    return courses;
  } catch (error) {
    return { message: "Failed to get courses" };
  }
};

export const getCoursesById = async (id: string) => {
  try {
    const result = await db.course.findUnique({
      where: { id: id },
      include: {
        instructor: true,
        topics: {
          orderBy: { createdAt: "asc" },
        },
        exam: {
          orderBy: { createdAt: "asc" },
        },
        enrollmentCourse: true,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const enrollmentCourse = async (data: any) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: data.course_id,
      },
      select: {
        key: true,
      },
    });

    if (course?.key === data.key) {
      const result = await db.enrollmentCourse.create({
        data: {
          course_id: data.course_id,
          student_id: data.student_id,
        },
      });
    } else {
      return { error: "invalid key" };
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }

  revalidateTag(`/student/courses/${data.student_id}/preview`);
  return { message: "successfully enrollment course" };
};

export const getStudentExamGradeByCourse = async (courseId: string) => {
  try {
    const exams = await db.exam.findMany({
      where: { course_id: courseId },
      select: { id: true, name: true },
    });

    const examScores = await db.examAttempt.groupBy({
      by: ["student_id", "exam_id"],
      where: { exam: { course_id: courseId } },
      _max: {
        score: true,
      },
    });

    const students = await db.student.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const studentScores = students.map((student) => {
      const scores = exams.reduce((acc, exam) => {
        const score = examScores.find(
          (s) => s.student_id === student.id && s.exam_id === exam.id
        );
        acc[exam.name] = score ? score._max.score : "N/A";
        return acc;
      }, {} as Record<string, any>);
      return {
        id: student.id,
        student: student.user.username,
        ...scores,
      };
    });

    const columns = ["Student", ...exams.map((exam) => exam.name)];

    return {
      columns,
      data: studentScores,
    };
  } catch (error) {
    console.log(error);
  }
};
