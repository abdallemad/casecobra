"use server";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) throw new Error("Invalid user data");
  const existingUser = await db.user.findUnique({ where: { userId: user.id } });
  if (!existingUser)
    await db.user.create({ data: { email: user.email, userId: user.id } });
  
  return { success: true };
};
