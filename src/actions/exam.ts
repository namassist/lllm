"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from 'ai';

const ExamSchema = z.object({
  name: z.string().min(6),
  course_id: z.string(),
  held_at: z.date(),
  duration: z.number(),
});

const FeedbackSchema = z.object({
  ringkasan: z.string().describe("ringkasan peserta didik dalam mengikuti ujian"),
  kelebihan: z.string().describe("kelebihan peserta didik dalam mengikuti ujian"),
  peningkatan: z.string().describe("aspek yang perlu ditingkatkan peserta didik dalam mengikuti ujian"),
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

export const getExamAttempt = async () => {
  try {
    const examData = await db.examAttempt.findMany({
      include: {
        student: {
          include: {
            user: true
          }
        },
        exam: {
          include: {
            question: {
              include: {
                choice: true,
              },
            },
          },
        },
        essayAnswer: {
          include: {
            question: true,
          },
        },
        multiplechoiceAnswer: {
          include: {
            question: true,
            choice: true,
          },
        },
      },
    });
  
    const organizedData = examData.map(attempt => {
      const questionsWithAnswers = attempt.exam.question.map(question => {
        const mcAnswer = attempt.multiplechoiceAnswer.find(mc => mc.question_id === question.id);
        const essayAnswer = attempt.essayAnswer.find(es => es.question_id === question.id);
  
        const correctChoice = question.choice.find(choice => choice.is_correct);
        const questionType = mcAnswer ? 'multiple choice' : essayAnswer ? 'essay' : 'unknown';
  
        return {
          questionId: question.id,
          questionText: question.question,
          questionScore: question.score,
          questionType: questionType,
          correctAnswer: correctChoice ? correctChoice.choice : 'Essay Answer Required',
          studentAnswer: mcAnswer ? mcAnswer.choice.choice : essayAnswer ? essayAnswer.answer : 'No Answer',
          studentScore: mcAnswer ? (mcAnswer.choice_id === correctChoice?.id ? question.score : 0) : essayAnswer ? essayAnswer.score : 0,
        };
      });

      const totalPossiblePoints = questionsWithAnswers.reduce((total, q) => total + q.questionScore, 0);
      const totalQuestionsAnswered = questionsWithAnswers.filter(q => q.studentAnswer !== 'No Answer').length;
  
      return {
        attemptId: attempt.id,
        fullname: attempt.student.fullname,
        status: attempt.status,
        email: attempt.student.user.email,
        feedback: attempt.feedback,
        advantage: attempt.advantage,
        disadvantage: attempt.disadvantage,
        examName: attempt.exam.name,
        score: attempt.score,
        createdAt: attempt.createdAt,
        totalPossiblePoints,
        totalQuestionsAnswered,
        questionsWithAnswers,
      };
    });

    return organizedData;
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
    const multipleChoicePromises = multipleChoice.map((answer: any) =>
      db.multipleChoiceAnswer.create({
        data: {
          attempt_id: answer.attemptId,
          question_id: answer.questionId,
          choice_id: answer.choiceId,
        },
      })
    );

    // Tambahkan data essay
    const essayPromises = essay.map((answer: any) =>
      db.essayAnswer.create({
        data: {
          attempt_id: answer.attemptId,
          question_id: answer.questionId,
          answer: answer.answer,
          score: 0,
        },
      })
    );

    const [essayAnswers] = await Promise.all([
      Promise.all(essayPromises),
      Promise.all(multipleChoicePromises),
    ]);

    // Penilaian jawaban multiple-choice
    const multipleChoiceScoresPromises = multipleChoice.map(async (answer:any) => {
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

      if (!question) return 0;

      const correctChoice = question.choice.find((ch) => ch.is_correct);
      return correctChoice && correctChoice.id === answer.choiceId ? question.score : 0;
    });

    const multipleChoiceScores = await Promise.all(multipleChoiceScoresPromises);
    const multipleChoiceTotalScore = multipleChoiceScores.reduce((acc, score) => acc + score, 0);

    // Penilaian jawaban essay menggunakan embeddings
    const essayScoresPromises = essayAnswers.map(async (answer, index) => {
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

      if (!question) return 0;

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Berikan penilaian untuk jawaban essay berikut dengan membandingkan jawaban yang benar dengan jawaban peserta didik. Penilaian harus diberikan dalam bentuk poin berdasarkan kesesuaian dengan jawaban yang benar. hanya berikan jawaban poin yang didapatkan saja (contoh: 20) dan maksimal poin yang diberikan adalah ${question.score}. Berikut adalah jawaban yang benar dan jawaban peserta didik: \n 
        Jawaban yang benar: ${question.choice[0].choice} \n
        Jawaban peserta didik: ${essay[index].answer}`,
      });

      const essayScore = parseInt(text);
      await db.essayAnswer.update({
        where: { id: answer.id },
        data: { score: essayScore },
      });
      return essayScore;
    });

    const essayScores = await Promise.all(essayScoresPromises);
    const essayTotalScore = essayScores.reduce((acc, score) => acc + score, 0);

    const totalScore = multipleChoiceTotalScore + essayTotalScore;

    // Update status examAttempt
    await db.examAttempt.update({
      where: { id: attemptId },
      data: { isActive: false, score: totalScore },
    });

    const examData = await db.examAttempt.findFirst({
      where: { id: attemptId },
      include: {
        student: true,
        exam: {
          include: {
            question: {
              include: {
                choice: true,
              },
            },
            course: true,
          },
        },
        essayAnswer: {
          include: {
            question: true,
          },
        },
        multiplechoiceAnswer: {
          include: {
            question: true,
            choice: true,
          },
        },
      },
    });

    if (!examData) {
      console.log(`No exam attempt found with ID: ${attemptId}`);
      return;
    }

    // Memetakan data ke format yang lebih terorganisir
    const organizedData = {
      attemptId: examData.id,
      studentName: examData.student.fullname,
      examName: examData.exam.name,
      totalScore: examData.score,
      questionsWithAnswers: examData.exam.question.map((question) => {
        const mcAnswer = examData.multiplechoiceAnswer.find((mc) => mc.question_id === question.id);
        const essayAnswer = examData.essayAnswer.find((es) => es.question_id === question.id);

        const correctChoice = question.choice.find((choice) => choice.is_correct);

        return {
          questionId: question.id,
          questionText: question.question,
          questionScore: question.score,
          correctAnswer: correctChoice ? correctChoice.choice : 'Essay Answer Required',
          studentAnswer: mcAnswer ? mcAnswer.choice.choice : essayAnswer ? essayAnswer.answer : 'No Answer',
          studentScore: mcAnswer ? (mcAnswer.choice_id === correctChoice?.id ? question.score : 0) : essayAnswer ? essayAnswer.score : 0,
        };
      }),
    };

    const result = await generateObject({
      model: openai("gpt-4o"),
      prompt: `Berikan umpan balik mengenai kinerja seorang siswa dalam ujian ${examData?.exam?.course?.title} baru-baru ini. Umpan balik harus mencakup ringkasan kinerja keseluruhan siswa, menyoroti kelebihan dan area yang perlu ditingkatkan. Berikut ini adalah hasil ujian siswa: \n ${JSON.stringify(organizedData)}`,
      schema: FeedbackSchema,
    });

    const { ringkasan, kelebihan, peningkatan } = result.object;

    await db.examAttempt.update({
      where: { id: attemptId },
      data: {
        feedback: ringkasan,
        advantage: kelebihan,
        disadvantage: peningkatan,
      },
    });

    return { message: "success submitted answer" };
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
};

export const updateStatusExamAttempt = async (id: string) => {
  try {
    await db.examAttempt.update({
      where: { id: id },
      data: {
        status: "publish"
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/admin/courses/[courseId]/exams/[examId]', "page");
  return { message: "feedback published" };
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
