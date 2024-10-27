"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getPaymentStatus({ orderId }: { orderId: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user.id || !user.email) throw new Error("you need to logged in");
  const order = await db.order.findFirst({
    where: { userId: user.id, id: orderId },
    include: {
      BillingAddress: true,
      configuration: true,
      shippingAddress: true,
    },
  });
  const userDB = await db.user.findFirst({ where: { userId: user.id } });
  if (!order) throw new Error("this error doesn't exists");
  if(order.isPaid) return {order, userDB};
  else return false
}
