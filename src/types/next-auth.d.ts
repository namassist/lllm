import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    role: string;
    user_id: string;
    email: string;
  }

  interface Session {
    user: User & {
      username: string;
    };
    token: {
      username: string;
    };
  }
}
