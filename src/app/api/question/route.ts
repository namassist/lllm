import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { question, score, choices, exam_id } = await req.json();

  if (!question || !score || !choices || !exam_id) {
    return Response.json(
      {
        error: "Missing required fields",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const newQuestion = await db.question.create({
      data: {
        question,
        score,
        exam_id: exam_id,
        choice: {
          create: choices.map((choice: any) => ({
            choice: choice.choice,
            is_correct: choice.isCorrect,
          })),
        },
      },
    });

    return Response.json(
      {
        newQuestion,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    Response.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
