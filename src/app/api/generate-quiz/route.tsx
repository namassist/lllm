import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

const optionSchema = z.object({
  option: z.string().describe("the option text"),
  isCorrect: z.boolean().describe("whether the option is correct"),
});

const questionSchema = z.object({
  id: z.string(),
  question: z.string().describe("the question text"),
  options: z.array(optionSchema).describe("the options for the question"),
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
    model: openai("gpt-3.5-turbo"),
    prompt: `${totalQuestion} ${prompt}`,
    schema: z.object({
      total: z.number().describe("the total number of question."),
      subject: z.string().describe("the subject of the question."),
      topic: z.string().describe("the topic of the question."),
    }),
  });
  const { total, subject, topic } = result.object;

  let generateQuizPrompt = "";
  if (withOptions) {
    generateQuizPrompt = `Buatlah soal pilihan ganda untuk materi ${subject} mengenai topik ${topic} dengan soal sebanyak ${total}, sertakan 4 pilihan jawaban dengan satu jawaban yang benar dan tiga pengecoh.`;
  } else {
    generateQuizPrompt = `Buatlah soal pilihan esay untuk materi ${subject} mengenai topik ${topic} dengan soal sebanyak ${total}, hanya sertakan satu pilihan jawaban yang benar saja (tanpa menyertakan jawabn yang salah) dan dalam bentuk kalimat yang singkat dan jelas.`;
  }

  const quiz = await generateObject({
    model: openai("gpt-3.5-turbo"),
    prompt: generateQuizPrompt,
    schema: questionsSchema,
  });

  return Response.json(quiz.object, {
    status: 200,
  });
}
