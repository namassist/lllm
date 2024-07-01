import { db } from "@/lib/db";

export async function GET(
  req: Request,
  context: { params: { examId: string } }
) {
  const examId = context.params.examId;
  if (!examId) {
    return Response.json(
      {
        message: "Exam Id not found",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const question = await db.question.findMany({
      where: {
        exam_id: examId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        choice: true,
      },
    });

    return Response.json(
      {
        question,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
