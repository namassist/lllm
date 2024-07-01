import { db } from "@/lib/db";

export const getAllCourses = async () => {
  try {
    const result = await db.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        instructor: {
          select: {
            fullname: true,
            user: {
              select: {
                image: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getCoursesById = async (id: string) => {
  try {
    const result = await db.course.findUnique({
      where: { id: id },
      include: {
        instructor: true,
        topics: {
          orderBy: { createdAt: "asc" },
        },
        exam: true,
        discussion: true,
        enrollmentCourse: true,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getInstructorCourses = async (id: string) => {
  try {
    const result = await db.course.findMany({
      where: { instructor_id: id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        instructor: {
          select: {
            fullname: true,
            user: {
              select: {
                image: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getTopicByCourse = async (id: string) => {
  try {
    const result = await db.topics.findFirst({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
