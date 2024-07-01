"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const ExamSchema = z.object({
  name: z.string().min(6),
  course_id: z.string(),
  held_at: z.date(),
  duration: z.number(),
});

export const createExam = async (courseId: string) => {
  let result;
  try {
    result = await db.exam.create({
      data: {
        name: "",
        description: "",
        course_id: courseId,
        held_at: new Date(),
        duration: 0,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin/courses/${courseId}`);
  return { message: "success added exam", id: result?.id };
};

export const updateExam = async (id: string, input: any) => {
  const validatedFields = ExamSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await db.exam.update({
      where: { id: id },
      data: {
        name: validatedFields.data.name,
        held_at: validatedFields.data.held_at,
        duration: validatedFields.data.duration,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(
    `/admin/courses/${validatedFields.data.course_id}/exams/${id}`
  );
  return { message: "success added exam" };
};

export const getExamById = async (id: string) => {
  try {
    const result = await db.exam.findUnique({
      where: { id: id },
      include: {
        question: {
          orderBy: { createdAt: "desc" },
          include: {
            choice: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const deleteExam = async (id: string) => {
  let result;

  try {
    result = await db.exam.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete exam" };
  }

  revalidatePath(`/admin/courses/${result.course_id}`);
};
