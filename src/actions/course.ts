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
        exam: true,
        discussion: true,
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

type ExamScoreTable = {
  tableHeaders: string[];
  tableRows: (string | number)[][];
};

type ExamAttemptWithDetails = {
  studentName: string;
  examName: string;
  score: number;
};

type OrganizedData = {
  [studentName: string]: {
    [examName: string]: number;
  };
};

export const getStudentExamGradeByCourse = async (
  courseId: string
): Promise<ExamScoreTable | undefined> => {
  try {
    const examAttemptsFromDb = await db.examAttempt.findMany({
      where: {
        exam: {
          course: {
            id: courseId,
          },
        },
      },
      select: {
        score: true,
        student: {
          select: {
            fullname: true,
          },
        },
        exam: {
          select: {
            name: true,
          },
        },
      },
    });

    // Konversi data ke dalam bentuk yang diharapkan oleh ExamAttemptWithDetails
    const examAttempts: ExamAttemptWithDetails[] = examAttemptsFromDb.map(
      (attempt) => ({
        studentName: attempt.student.fullname,
        examName: attempt.exam.name,
        score: attempt.score ?? 0, // Atur ke 0 jika nilai null
      })
    );

    if (examAttempts.length === 0) {
      return undefined; // Tambahkan return undefined
    }

    const organizedData: OrganizedData = {};

    examAttempts.forEach((attempt) => {
      const studentName = attempt.studentName;
      const examName = attempt.examName;
      const score = attempt.score;

      if (!organizedData[studentName]) {
        organizedData[studentName] = {};
      }
      organizedData[studentName][examName] = score;
    });

    const examNames = [
      ...new Set(examAttempts.map((attempt) => attempt.examName)),
    ];

    const tableData: string[][] = Object.entries(organizedData).map(
      ([studentName, exams]) => {
        const row = [studentName];
        examNames.forEach((examName) => {
          row.push((exams[examName] ?? "N/A").toString()); // Konversi ke string
        });
        return row;
      }
    );

    const tableHeaders = ["Student", ...examNames];

    return {
      tableHeaders,
      tableRows: tableData,
    };
  } catch (error) {
    console.log(error);
  }
};
