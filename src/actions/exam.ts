"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { openai } from "@ai-sdk/openai";
import { cosineSimilarity, embedMany } from "ai";

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
        course: true,
        examAttempt: {
          orderBy: { createdAt: "asc" },
          include: {
            student: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const startExam = async (data: any) => {
  try {
    const result = await db.examAttempt.create({
      data: {
        exam_id: data.examId,
        student_id: data.studentId,
        finished_at: new Date(),
        isActive: true,
        feedback: "",
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch data");
  }

  redirect(`/student/courses/${data.courseId}/exams/${data.examId}`);
};

export const submittedAnswer = async (data: any) => {
  try {
    const { multipleChoice, essay, attemptId } = data;

    // Tambahkan data multipleChoice
    const multipleChoicePromises = multipleChoice.map((answer: any) => {
      return db.multipleChoiceAnswer.create({
        data: {
          attempt_id: answer.attemptId,
          question_id: answer.questionId,
          choice_id: answer.choiceId,
        },
      });
    });

    // Tambahkan data essay
    const essayAnswers = await Promise.all(
      essay.map((answer: any) => {
        return db.essayAnswer.create({
          data: {
            attempt_id: answer.attemptId,
            question_id: answer.questionId,
            answer: answer.answer,
            score: 0,
          },
        });
      })
    );

    await Promise.all(multipleChoicePromises);

    let totalScore = 0;
    for (const answer of multipleChoice) {
      const question = await db.question.findUnique({
        where: { id: answer.questionId },
        select: {
          score: true,
          choice: {
            select: {
              id: true,
              is_correct: true,
            },
          },
        },
      });

      if (!question) continue;

      const correctChoice = question.choice.find((ch) => ch.is_correct);

      if (correctChoice && correctChoice.id === answer.choiceId) {
        totalScore += question.score;
      }
    }

    // Penilaian jawaban essay menggunakan embeddings
    for (const [index, answer] of essayAnswers.entries()) {
      const question = await db.question.findUnique({
        where: { id: essay[index].questionId },
        select: {
          score: true,
          choice: {
            where: {
              is_correct: true,
            },
          },
        },
      });

      if (!question) continue;

      const { embeddings } = await embedMany({
        model: openai.embedding("text-embedding-3-small"), // Pastikan model ini tersedia dalam library
        values: [essay[index].answer, question.choice[0].choice],
      });

      const similarity = cosineSimilarity(embeddings[0], embeddings[1]);
      const essayScore = Math.round(similarity * question.score); // Membulatkan ke integer

      totalScore += essayScore;

      await db.essayAnswer.update({
        where: { id: answer.id },
        data: { score: essayScore },
      });
    }

    // Update status examAttempt
    await db.examAttempt.update({
      where: { id: attemptId },
      data: { isActive: false, score: totalScore },
    });

    return { message: "success submitted answer" };
  } catch (error) {
    console.error("Failed to fetch data", error);
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
