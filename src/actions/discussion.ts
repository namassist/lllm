"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { getSession } from "@/lib/session";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

export const createdDiscuss = async (data: any) => {
  try {
    const session = await getSession();

    if (session?.user_id) {
      await db.discussion.create({
        data: {
          title: data.title,
          description: data.description,
          course_id: data.course_id,
          is_open: true,
          user_id: session?.user_id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return { message: "Failed to create course" };
  }

  revalidatePath(`/admin/courses/${data.course_id}?tab=discussions`);
  return { message: "success added discussion" };
};

export const getDiscussionById = async (data: any) => {
  try {
    const result = await db.discussion.findUnique({
      where: { id: data },
      include: {
        users: {
          include: {
            students: true,
            instructors: true,
          },
        },
        reply: {
          include: {
            users: {
              include: {
                students: true,
                instructors: true,
              },
            },
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusDiscussion = async (data: any) => {
  try {
    const result = await db.discussion.findUnique({
      where: { id: data },
      select: {
        id: true,
        course: {
          select: {
            title: true,
          },
        },
        title: true,
        description: true,
        reply: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            reply: true,
          },
        },
      },
    });

    const summary = await generateObject({
      model: openai("gpt-4o"),
      prompt: `kamu diberikan data hasil diskusi mengenai ${
        result?.title
      }. Tugas kamu adalah menjelaskan poin poin utama yang dibahas pada diskusi ini dalam bentuk uraian paragraf. Kemudian rangkum kesimpulan utama dari diskusi ini. pastikan menggunakan penyusunan kalimat yang mudah dimengerti dan relevan dengan topik yang dibahas. Berikut ini adalah hasil ujian siswa: \n ${JSON.stringify(
        result
      )}`,
      schema: z.object({
        poin: z
          .string()
          .describe("poin poin utama yang dibahas pada diskusi ini"),
        kesimpulan: z.string().describe("kesimpulan utama dari diskusi ini"),
      }),
    });

    const { poin, kesimpulan } = summary.object;

    if (summary) {
      await db.discussion.update({
        where: { id: result?.id },
        data: {
          is_open: false,
          poin: poin,
          kesimpulan: kesimpulan,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/admin/courses/`);
  return { message: "success update status" };
};
