'use server';
import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

export default async function changeOrderStatusAction({
  id,
  newOrderStatus,
}: {
  id: string;
  newOrderStatus: OrderStatus;
}) {
  await db.order.update({
    where: { id },
    data: {
      status: newOrderStatus,
    },
  });
}
