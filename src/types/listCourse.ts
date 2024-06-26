interface User {
  image: string;
}

interface Instructor {
  fullname: string;
  user: User;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: Instructor;
}
