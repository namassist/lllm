"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const choicesSchema = z.object({
  choice: z.string(),
  isCorrect: z.boolean(),
  image: z.string().optional().nullable(),
});

const QuestionSchema = z.object({
  question: z.string().min(6),
  score: z.number(),
  exam_id: z.string(),
  choice: z.array(choicesSchema),
});

export const createQuestion = async (data: any) => {
  const validatedFields = QuestionSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  let result;
  try {
    result = await db.question.create({
      data: {
        question: validatedFields.data.question,
        score: validatedFields.data.score,
        exam_id: validatedFields.data.exam_id,
        choice: {
          create: validatedFields.data.choice.map((choice: any) => ({
            choice: choice.choice,
            is_correct: choice.isCorrect,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin/courses/${data?.courseId}/exams/${result?.exam_id}`);
  return { message: "success added question" };
};

export const updateQuestion = async (data: any) => {
  const validatedFields = QuestionSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  let result;
  try {
    await db.choice.deleteMany({
      where: { question_id: data.id },
    });

    result = await db.question.update({
      where: { id: data.id },
      data: {
        question: validatedFields.data.question,
        score: validatedFields.data.score,
        choice: {
          create: validatedFields.data.choice.map((choice: any) => ({
            choice: choice.choice,
            is_correct: choice.isCorrect,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin/courses/${data?.courseId}/exams/${result?.exam_id}`);
  return { message: "success update question" };
};

export const createBulkQuestion = async (data: any, examId: string) => {
  try {
    const createdQuestions = await db.question.createMany({
      data: data.map(({ question, score }: any) => ({
        question,
        score,
        exam_id: examId,
      })),
    });

    if (createdQuestions.count > 0) {
      const insertedQuestions = await db.question.findMany({
        where: {
          exam_id: examId,
        },
      });

      const choicesData = [];
      for (let i = 0; i < data.length; i++) {
        const question = data[i];
        const insertedQuestion = insertedQuestions.find(
          (q) => q.question === question.question
        );

        if (insertedQuestion) {
          for (let choice of question.choice) {
            choicesData.push({
              choice: choice.choice,
              question_id: insertedQuestion.id,
              is_correct: choice.is_correct,
              image: choice.image,
            });
          }
        }
      }

      await db.choice.createMany({
        data: choicesData,
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin/courses/[courseId]/exams/[examId]`, "page");
  return { message: "success added question" };
};

export const deleteQuestion = async (id: string) => {
  let result;

  try {
    result = await db.question.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin/courses/[courseId]/exams/[examId]`, "page");
};
