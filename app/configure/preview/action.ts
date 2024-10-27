"use server";
import { BASE_PRICE, PRICES } from "@/config/product";
import { db } from "@/db";
import { Order } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { stripe } from "@/lib/stripe";
// one two three
export const createCheckOutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });
  if (!configuration) throw new Error("no such configuration found!");
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("you need to logged in");

  let price = BASE_PRICE;
  if (configuration.finish == "texture") price += PRICES.finish.texture;
  if (configuration.material === "polycarbonate")
    price += PRICES.materials.polyCarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: { userId: user.id, configurationId: configuration.id },
  });

  if (existingOrder) order = existingOrder;
  else
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  const product = await stripe.products.create({
    name: "custom iphone case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["EG", "US", "DK"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });
  return { url: stripeSession.url };
};
