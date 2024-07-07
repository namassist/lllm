"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteEnrollment = async (id: string) => {
  let result;

  try {
    result = await db.enrollmentCourse.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return { message: "Failed to delete enroollment" };
  }

  revalidatePath(`/admin/courses/${result.course_id}`);
};
