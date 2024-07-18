import { db } from "@/lib/db";
import { PiBooksFill, PiChatCircleFill, PiExamFill } from "react-icons/pi";

export const getAllCourses = async (query: string) => {
  try {
    const result = await db.course.findMany({
      where: {
        isPublished: true,
        title: { contains: query },
      },
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
        discussion: {
          orderBy: { createdAt: "desc" },
          include: {
            reply: true,
            users: {
              include: {
                students: true,
                instructors: true,
              },
            },
          },
        },
        enrollmentCourse: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
        categories: true,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getInstructorCourses = async (id: string, count?: number) => {
  try {
    const result = await db.course.findMany({
      where: { instructor_id: id },
      orderBy: { createdAt: "desc" },
      take: count,
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

export const getCategories = async () => {
  try {
    const result = await db.categories.findMany({
      select: {
        id: true,
        name: true,
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

export const services = [
  {
    title: "Konten Pembelajaran Dinamis",
    icon: <PiBooksFill color="white" size={40} />,
    desc: "Temukan materi yang disesuaikan khusus untuk Anda, dibuat oleh asisten AI kami yang cerdas",
  },
  {
    title: "Soal Ujian Inovatif",
    icon: <PiExamFill color="white" size={40} />,
    desc: "Tantang diri Anda dengan soal-soal ujian yang dirancang secara unik oleh AI, mendorong pemahaman yang lebih dalam.",
  },
  {
    title: "Analisis Jawaban Cerdas",
    icon: <PiChatCircleFill color="white" size={40} />,
    desc: "Dapatkan wawasan tentang jawaban ujian dengan analisis mendalam dari AI, membantu Anda belajar dari setiap langkah.",
  },
];

export const testimonials = [
  {
    url: "/people.jpg",
    name: "Jhon Doe",
    job: "Dosen",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt quibusdam nesciunt?",
  },
  {
    url: "/people.jpg",
    name: "Jhon Doe",
    job: "Dosen",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt quibusdam nesciunt?",
  },
  {
    url: "/people.jpg",
    name: "Jhon Doe",
    job: "Dosen",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt quibusdam nesciunt?",
  },
  {
    url: "/people.jpg",
    name: "Jhon Doe",
    job: "Dosen",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt quibusdam nesciunt?",
  },
  {
    url: "/people.jpg",
    name: "Jhon Doe",
    job: "Dosen",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sunt quibusdam nesciunt?",
  },
];

export const faqs = [
  {
    question: "Apa itu lLMS?",
    answer:
      "lLMS adalah platform pendidikan online yang memanfaatkan kecerdasan buatan untuk menyediakan pengalaman belajar yang interaktif. Kami menawarkan konten pembelajaran yang dinamis, soal ujian yang inovatif, dan analisis jawaban yang cerdas",
  },
  {
    question: "Bagaimana AI membantu dalam pembelajaran?",
    answer:
      "AI kami dirancang untuk mengadaptasi materi pembelajaran sesuai dengan kebutuhan dan kemampuan setiap individu, membuat soal ujian yang menantang dan relevan, serta menganalisis jawaban untuk memberikan umpan balik yang membantu siswa belajar dan berkembang.",
  },
  {
    question:
      "Apakah saya perlu keahlian teknis untuk menggunakan platform ini?",
    answer:
      "Tidak sama sekali. Platform kami dirancang untuk mudah digunakan oleh siapa saja, tanpa memerlukan keahlian teknis khusus.",
  },
  {
    question: "Apakah platform ini cocok untuk semua tingkat pendidikan?",
    answer:
      "Ya, platform kami dapat disesuaikan untuk berbagai tingkat pendidikan, mulai dari sekolah dasar hingga pendidikan tinggi. Bagaimana cara platform ini menghasilkan soal ujian? Platform kami menggunakan algoritma AI canggih untuk menghasilkan soal ujian yang tidak hanya menilai pengetahuan, tetapi juga kemampuan berpikir kritis dan aplikasi konsep.",
  },
];
