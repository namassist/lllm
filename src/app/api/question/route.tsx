import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { question, score, choices } = await request.json();

  if (!question || !score || !choices) {
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
        exam_id: "0053c8bd-fb4b-41d3-956d-3e8df7f34331",
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
