import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

const choicesSchema = z.object({
  choice: z.string().describe("the option text"),
  is_correct: z.boolean().describe("whether the option is correct"),
});

const questionSchema = z.object({
  id: z.string(),
  question: z.string().describe("the question text"),
  score: z.number().describe("the score for the question"),
  choice: z.array(choicesSchema).describe("the options for the question"),
});

const questionsSchema = z.object({
  questions: z.array(questionSchema).describe("the questions for the quiz"),
});

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json(
      {
        message: "Method not allowed",
      },
      {
        status: 405,
      }
    );
  }

  const { prompt, totalQuestion, withOptions } = await req.json();
  if (!prompt || !totalQuestion) {
    return Response.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  const result = await generateObject({
    model: openai("gpt-4o"),
    prompt: `${totalQuestion} ${prompt}`,
    schema: z.object({
      total: z.number().describe("the total number of question."),
      subject: z.string().describe("the subject of the question."),
      topic: z.string().describe("the topics of the question."),
    }),
  });
  const { total, subject, topic } = result.object;

  let generateQuizPrompt = "";
  if (withOptions) {
    generateQuizPrompt = `Buatlah ${total} soal pilihan ganda untuk materi ${subject} mengenai topik ${topic}, sertakan 4 pilihan jawaban dengan satu jawaban yang benar dan tiga pengecoh. tentukan juga skor untuk tiap soal!`;
  } else {
    generateQuizPrompt = `Buatlah ${total} soal esay untuk materi ${subject} mengenai topik ${topic}, hanya sertakan satu pilihan jawaban yang benar saja (tanpa menyertakan jawabn yang salah) dan dalam bentuk kalimat yang jelas. tentukan juga skor untuk tiap soal!`;
  }

  const quiz = await generateObject({
    model: openai("gpt-4o"),
    prompt: generateQuizPrompt,
    schema: questionsSchema,
  });

  return Response.json(quiz.object, {
    status: 200,
  });
}
