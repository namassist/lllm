"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

export const createdReply = async (data: any) => {
  try {
    const session = await getSession();

    if (session?.user_id) {
      await db.reply.create({
        data: {
          reply: data.reply,
          discussion_id: data.discussion_id,
          user_id: session?.user_id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return { message: "Failed to create reply" };
  }

  revalidatePath(`/admin/courses/`);
  return { message: "success added reply" };
};
