const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  roles,
  users,
  userRoles,
  students,
  instructors,
  courses,
  topics,
  exams,
  questions,
  choices,
  examAttempts,
  enrollmentCourses,
  discussions,
  replies,
} = require("./data");

const seed = async () => {
  try {
    // Delete existing data
    await prisma.reply.deleteMany();
    await prisma.discussion.deleteMany();
    await prisma.choice.deleteMany();
    await prisma.question.deleteMany();
    await prisma.examAttempt.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.topics.deleteMany();
    await prisma.enrollmentCourse.deleteMany();
    await prisma.course.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.student.deleteMany();
    await prisma.instructor.deleteMany();
    await prisma.role.deleteMany();
    await prisma.users.deleteMany();
    console.log("Deleted existing data");

    // Seed roles
    await prisma.role.createMany({
      data: roles,
    });
    console.log("Seeded roles");

    // Seed users
    await prisma.users.createMany({
      data: users,
    });
    console.log("Seeded users");

    // Seed user roles
    await prisma.userRole.createMany({
      data: userRoles,
    });
    console.log("Seeded user roles");

    // Seed students
    await prisma.student.createMany({
      data: students,
    });
    console.log("Seeded students");

    // Seed instructors
    await prisma.instructor.createMany({
      data: instructors,
    });
    console.log("Seeded instructors");

    // Seed courses
    await prisma.course.createMany({
      data: courses,
    });
    console.log("Seeded courses");

    // Seed topics
    await prisma.topics.createMany({
      data: topics,
    });
    console.log("Seeded topics");

    // Seed exams
    await prisma.exam.createMany({
      data: exams,
    });
    console.log("Seeded exams");

    // Seed questions
    await prisma.question.createMany({
      data: questions,
    });
    console.log("Seeded questions");

    // Seed choices
    await prisma.choice.createMany({
      data: choices,
    });
    console.log("Seeded choices");

    // Seed exam attempts
    await prisma.examAttempt.createMany({
      data: examAttempts,
    });
    console.log("Seeded exam attempts");

    // Seed enrollment courses
    await prisma.enrollmentCourse.createMany({
      data: enrollmentCourses,
    });
    console.log("Seeded enrollment courses");

    //seed discussions
    await prisma.discussion.createMany({
      data: discussions,
    });
    console.log("Seeded discussions");

    //seed replies
    await prisma.reply.createMany({
      data: replies,
    });
    console.log("Seeded replies");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
