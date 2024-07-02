"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const TopicSchema = z.object({
  title: z.string().min(6),
  description: z.string().min(6),
  course_id: z.string().min(6),
});

export const saveTopic = async (data: any) => {
  const validatedFields = TopicSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.topics.create({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        course_id: validatedFields.data.course_id,
      },
    });
  } catch (error) {
    return { message: "Failed to create topic", error: error };
  }

  revalidatePath(`/admin/courses/${validatedFields.data.course_id}/topics`);
  return { message: "Success added topic" };
};

export const deleteTopic = async (id: string) => {
  let result;

  try {
    result = await db.topics.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete topic" };
  }

  revalidatePath(`/admin/courses/${result.course_id}`);
};
