import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await db.users.findFirst({
          where: {
            OR: [
              { username: credentials?.username },
              { email: credentials?.username },
            ],
          },
          select: {
            id: true,
            username: true,
            password: true,
            email: true,
            image: true,
            students: {
              select: {
                id: true,
                fullname: true,
              },
            },
            instructors: {
              select: {
                id: true,
                fullname: true,
              },
            },
            userRoles: {
              select: {
                role: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          return null;
        }

        if (existingUser?.userRoles[0].role?.name === "admin") {
          return {
            id: `${existingUser?.instructors?.id}`,
            user_id: `${existingUser.id}`,
            username: existingUser.username,
            email: existingUser.email,
            name: existingUser?.instructors?.fullname,
            role: existingUser.userRoles[0].role?.name,
          };
        } else {
          return {
            id: `${existingUser?.students?.id}`,
            user_id: `${existingUser.id}`,
            username: existingUser.username,
            email: existingUser.email,
            name: existingUser?.students?.fullname,
            role: existingUser.userRoles[0].role?.name,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            user_id: token.user_id,
            username: token.username,
            email: token.email,
            name: token.name,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
};
