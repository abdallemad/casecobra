import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { NextResponse } from "next/server";

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
      await db.order.update({
        where:{id:orderId},
        data:{
          isPaid:true,
          shippingAddress:{
            create:{
              name:session.customer_details!.name!,
              city:shippingAddress!.city!,
              country:shippingAddress!.country!,
              postalCode:shippingAddress!.postal_code!,
              street:shippingAddress?.line1!,
              state:shippingAddress?.state!
            }
          },
          BillingAddress:{
            create:{
              name:session.customer_details!.name!,
              city:billingAddress?.city!,
              country:billingAddress?.country!,
              postalCode:billingAddress?.postal_code!,
              street:billingAddress?.line1!,
              state:billingAddress?.state!
            }
          },
        }
      })
      return NextResponse.json({result:event, ok:true})
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({message:'something went wrong',ok:false},{status:500})
  }
}
