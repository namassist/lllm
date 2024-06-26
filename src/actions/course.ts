"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const CourseSchema = z.object({
  title: z.string().min(6),
  description: z.string().min(20),
  category_id: z.string().min(1),
  isPublished: z.string(),
  key: z.string().min(6),
  instructor_id: z.string().min(6),
});

export const saveCourse = async (prevSate: any, formData: FormData) => {
  const validatedFields = CourseSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  const { isPublished } = Object.fromEntries(formData.entries());
  const published = isPublished === "true";

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await db.course.create({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        category_id: validatedFields.data.category_id,
        isPublished: published,
        key: validatedFields.data.key,
        image: "/bg.webp",
        instructor_id: validatedFields.data.instructor_id,
      },
    });

    revalidatePath("/admin/courses");
    return { message: "success added course" };
  } catch (error) {
    return { message: "Failed to create course" };
  }
};

export const deleteCourse = async (id: string) => {
  try {
    await db.course.delete({
      where: { id },
    });

    revalidatePath("/admin/courses");
    return { message: "success deleted course" };
  } catch (error) {
    return { message: "Failed to delete course" };
  }
};
