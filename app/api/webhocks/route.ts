// when customer create paid mony
// first the stripe will make an post request to my webhook
// this request will have a signineture. that will create the event.
// then you listen for one event checkout.session.completed
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import OrderResiveEmail from "@/components/emails/OrderResiveEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature");
    if (!signature) return new Response("Invalid signature.", { status: 400 });

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type == "checkout.session.completed") {
      if (!event.data.object.customer_details?.email)
        throw new Error("User data is missing password");
      const session = event.data.object as Stripe.Checkout.Session;
      const { orderId, userId } = session.metadata || {
        userId: null,
        orderId: null,
      };
      if (!userId || !orderId) throw new Error("Invalid request");
      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.customer_details!.address;
      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name! || "default",
              city: shippingAddress!.city! || "default",
              country: shippingAddress!.country! || "default",
              postalCode: shippingAddress!.postal_code! || "default",
              street: shippingAddress?.line1! || "default",
              state: shippingAddress?.state! || "default",
            },
          },
          BillingAddress: {
            create: {
              name: session.customer_details!.name! || "default",
              city: billingAddress?.city! || "default",
              country: billingAddress?.country! || "default",
              postalCode: billingAddress?.postal_code! || "default",
              street: billingAddress?.line1! || "default",
              state: billingAddress?.state! || "default",
            },
          },
        },
        include: {
          shippingAddress: true,
        },
      });

      await resend.emails.send({
        from: "CaseCobra <abdallaemad1.3.2.0.0.5@gmail.com>",
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your Order",
        react: OrderResiveEmail({
          orderId: orderId,
          orderDate: updatedOrder.createdAt.toString(),
          shippingAddress: updatedOrder.shippingAddress!,
        }),
      });
      return NextResponse.json({ result: event, ok: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "something went wrong", ok: false },
      { status: 500 }
    );
  }
}
