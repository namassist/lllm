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
  {
    id: randomUUID(),
    email: "umiri@gmail.com",
    username: "superumiri",
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
  {
    user_id: users[2].id,
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
    user_id: users[1].id,
  },
  {
    id: randomUUID(),
    fullname: "Jane Doe",
    address: "456 Elm St",
    phone: "0987654321",
    gender: "female",
    user_id: users[2].id,
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
];

const categories = [
  {
    id: randomUUID(),
    name: "EK",
  },
  {
    id: randomUUID(),
    name: "IK",
  },
  {
    id: randomUUID(),
    name: "IL",
  },
  {
    id: randomUUID(),
    name: "LT",
  },
  {
    id: randomUUID(),
    name: "TI",
  },
  {
    id: randomUUID(),
    name: "TK",
  },
];

const courses = [
  {
    id: randomUUID(),
    title: "Basis Data",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.",
    image: "/bg.webp",
    key: "BASISDATA4A",
    isPublished: true,
    category_id: categories[4].id,
    instructor_id: instructors[0].id,
  },
];

const enrollmentCourses = [
  {
    id: randomUUID(),
    course_id: courses[0].id,
    student_id: students[0].id,
  },
  {
    id: randomUUID(),
    course_id: courses[0].id,
    student_id: students[1].id,
  },
];

const topics = [
  {
    id: randomUUID(),
    title: "Introduction to basis data",
    description: `{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","marks":[{"type":"textStyle","attrs":{"color":"#A8A29E"}}],"text":"introduction basis data"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"textStyle","attrs":{"color":"#A8A29E"}}],"text":"On a fundamental level, data acts as the cornerstone of information across a multitude of formats and frameworks, delivering valuable perspectives and assistance for decision-making procedures within diverse sectors and industries. "},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":"#A8A29E"}},{"type":"bold"}],"text":"Data"},{"type":"text","marks":[{"type":"textStyle","attrs":{"color":"#A8A29E"}}],"text":" forms the essential elements for scrutinizing and comprehending. Data's significance lies in its ability to empower organizations and individuals to derive meaning, identify patterns, and draw conclusions from the vast sea of information available. It is through data that businesses can strategically plan, scientists can make groundbreaking discoveries, and policymakers can formulate effective strategies. In essence, data is the lifeblood of modern-day operations, driving innovation, progress, and efficiency across the board."}]}]}`,
    course_id: courses[0].id,
  },
];

const exams = [
  {
    id: randomUUID(),
    name: "Mid Exam",
    description: "Exam 1 description",
    course_id: courses[0].id,
    held_at: new Date(),
    duration: 45,
    isPublished: true,
  },
];

const questions = [
  {
    id: randomUUID(),
    question: "Apa tujuan utama dari normalisasi data dalam basis data?",
    exam_id: exams[0].id,
    score: 10,
  },
  {
    id: randomUUID(),
    question:
      "Apa yang dimaksud dengan ketergantungan fungsional dalam basis data?	",
    exam_id: exams[0].id,
    score: 10,
  },
  {
    id: randomUUID(),
    question:
      "Manakah dari berikut ini yang merupakan bentuk normal pertama (1NF)?	",
    exam_id: exams[0].id,
    score: 10,
  },
];

const options = [
  {
    id: randomUUID(),
    choice: "choice 1A",
    is_correct: true,
    question_id: questions[0].id,
  },
  {
    id: randomUUID(),
    choice: "choice 1B",
    is_correct: false,
    question_id: questions[0].id,
  },
  {
    id: randomUUID(),
    choice: "choice 1C",
    is_correct: false,
    question_id: questions[0].id,
  },
  {
    id: randomUUID(),
    choice: "choice 2A",
    is_correct: false,
    question_id: questions[1].id,
  },
  {
    id: randomUUID(),
    choice: "choice 2B",
    is_correct: false,
    question_id: questions[1].id,
  },
  {
    id: randomUUID(),
    choice: "choice 2C",
    is_correct: true,
    question_id: questions[1].id,
  },
  {
    id: randomUUID(),
    choice: "choice 3A",
    is_correct: false,
    question_id: questions[2].id,
  },
  {
    id: randomUUID(),
    choice: "choice 3B",
    is_correct: true,
    question_id: questions[2].id,
  },
  {
    id: randomUUID(),
    choice: "choice 3C",
    is_correct: false,
    question_id: questions[2].id,
  },
];

module.exports = {
  roles,
  users,
  userRoles,
  students,
  instructors,
  categories,
  courses,
  enrollmentCourses,
  topics,
  exams,
  questions,
  options,
};
