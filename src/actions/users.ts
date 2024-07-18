"use server";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createdAccount = async (data: any) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await db.users.create({
      data: {
        username: data.nim,
        password: hashedPassword,
        email: data.email,
        image: "https://github.com/namassist.png",
        students: {
          create: {
            fullname: data.fullname,
            gender: data.gender,
            address: data.address,
            phone: "",
          },
        },
      },
      select: {
        id: true,
      },
    });

    await db.userRole.create({
      data: {
        user_id: result.id,
        role_id: "ef96069f-b52e-416c-9844-a23dc40a8e24",
      },
    });
  } catch (error) {
    console.log(error);
    return { message: "Failed to create account" };
  }

  revalidatePath(`/auth/signup`);
  return { message: "success added account" };
};
