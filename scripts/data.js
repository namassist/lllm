const { randomUUID } = require("crypto");

// Seed roles
const roles = [
  {
    id: randomUUID(),
    name: "admin",
  },
  {
    id: randomUUID(),
    name: "user",
  },
];

// Seed users
const users = [
  {
    id: randomUUID(),
    email: "uadmin@gmail.com",
    username: "superadmin",
    password: "$2b$10$JFpKahP4HnqZ/zrt/3C3uuph3sslWvTZzCqkrk/xpAD9TbXTgg.T6", //secretadmin
    image: "",
  },
  {
    id: randomUUID(),
    email: "jajang@gmail.com",
    username: "superjajang",
    password: "$2b$10$tf90BB8w9fPgr/2pBe2uKOWYzmsSYjO91Wvzhiur3z71yMo6pa3ly", //secretjajang
    image: "",
  },
];

// Seed user roles
const userRoles = [
  {
    user_id: users[0].id,
    role_id: roles[0].id,
  },
  {
    user_id: users[1].id,
    role_id: roles[1].id,
  },
];

// Seed students
const students = [
  {
    id: randomUUID(),
    fullname: "John Doe",
    address: "123 Main St",
    phone: "1234567890",
    gender: "male",
    user_id: users[0].id,
  },
  {
    id: randomUUID(),
    fullname: "Jane Doe",
    address: "456 Elm St",
    phone: "0987654321",
    gender: "female",
    user_id: users[1].id,
  },
];

// Seed instructors
const instructors = [
  {
    id: randomUUID(),
    fullname: "Dr. Smith",
    address: "789 Oak St",
    phone: "1112223333",
    gender: "male",
    user_id: users[0].id,
  },
  {
    id: randomUUID(),
    fullname: "Dr. Johnson",
    address: "321 Pine St",
    phone: "4445556666",
    gender: "female",
    user_id: users[1].id,
  },
];

// Seed courses
const courses = [
  {
    id: randomUUID(),
    title: "Introduction to Programming",
    description: "Learn the basics of programming.",
    image: "",
    key: "intro_programming",
    isPublished: true,
    instructor_id: instructors[0].id,
  },
  {
    id: randomUUID(),
    title: "Advanced Mathematics",
    description: "Explore advanced topics in mathematics.",
    image: "",
    key: "adv_math",
    isPublished: true,
    instructor_id: instructors[1].id,
  },
];

// Seed topics
const topics = [
  {
    id: randomUUID(),
    title: "Variables and Data Types",
    description: "Introduction to variables and data types.",
    course_id: courses[0].id,
  },
  {
    id: randomUUID(),
    title: "Control Flow",
    description: "Learn about control flow statements.",
    course_id: courses[0].id,
  },
  {
    id: randomUUID(),
    title: "Calculus",
    description: "Fundamentals of calculus.",
    course_id: courses[1].id,
  },
  {
    id: randomUUID(),
    title: "Linear Algebra",
    description: "Learn the basics of linear algebra.",
    course_id: courses[1].id,
  },
];

// Seed exams
const exams = [
  {
    id: randomUUID(),
    name: "Intro Programming Exam",
    description: "Final exam for Intro to Programming.",
    course_id: courses[0].id,
    duration: 60,
    held_at: new Date(),
    isPublished: true,
  },
  {
    id: randomUUID(),
    name: "Advanced Math Exam",
    description: "Final exam for Advanced Mathematics.",
    course_id: courses[1].id,
    duration: 90,
    held_at: new Date(),
    isPublished: true,
  },
];

// Seed questions
const questions = [
  {
    id: randomUUID(),
    question: "What is a variable?",
    exam_id: exams[0].id,
    score: 10,
    image: "",
  },
  {
    id: randomUUID(),
    question: "Explain control flow.",
    exam_id: exams[0].id,
    score: 10,
    image: "",
  },
  {
    id: randomUUID(),
    question: "What is the derivative of x^2?",
    exam_id: exams[1].id,
    score: 10,
    image: "",
  },
  {
    id: randomUUID(),
    question: "Solve the matrix equation Ax = b.",
    exam_id: exams[1].id,
    score: 10,
    image: "",
  },
];

// Seed choices
const choices = [
  {
    id: randomUUID(),
    choice: "A storage location for data",
    question_id: questions[0].id,
    is_correct: true,
    image: "",
  },
  {
    id: randomUUID(),
    choice: "A type of loop",
    question_id: questions[1].id,
    is_correct: true,
    image: "",
  },
  {
    id: randomUUID(),
    choice: "2x",
    question_id: questions[2].id,
    is_correct: true,
    image: "",
  },
  {
    id: randomUUID(),
    choice: "Solve for x",
    question_id: questions[3].id,
    is_correct: true,
    image: "",
  },
];

// Seed exam attempts
const examAttempts = [
  {
    id: randomUUID(),
    exam_id: exams[0].id,
    student_id: students[0].id,
    start_at: new Date(),
    finished_at: new Date(),
    score: 90,
    feedback: "Good job!",
  },
  {
    id: randomUUID(),
    exam_id: exams[1].id,
    student_id: students[1].id,
    start_at: new Date(),
    finished_at: new Date(),
    score: 85,
    feedback: "Well done!",
  },
];

// Seed enrollment courses
const enrollmentCourses = [
  {
    id: randomUUID(),
    course_id: courses[0].id,
    student_id: students[0].id,
  },
  {
    id: randomUUID(),
    course_id: courses[1].id,
    student_id: students[1].id,
  },
];

// Seed discussions
const discussions = [
  {
    id: randomUUID(),
    course_id: courses[0].id,
    student_id: students[0].id,
    title: "Discussion on Variables",
    description: "Let's discuss the concept of variables in programming.",
    is_open: true,
  },
  {
    id: randomUUID(),
    course_id: courses[1].id,
    student_id: students[1].id,
    title: "Discussion on Calculus",
    description: "Discussing the fundamental theorem of calculus.",
    is_open: true,
  },
];

// Seed replies
const replies = [
  {
    id: randomUUID(),
    discussion_id: discussions[0].id,
    student_id: students[0].id,
    reply: "I think variables are essential in programming.",
  },
  {
    id: randomUUID(),
    discussion_id: discussions[1].id,
    student_id: students[1].id, // replace with actual student id
    reply: "Calculus is crucial for understanding changes.",
  },
];

module.exports = {
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
};
