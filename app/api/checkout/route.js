import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export const POST = async (request) => {
  const stripe = new Stripe(process.env.STRIPE_API_SECRET);
  const { priceId } = await request.json();

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/pricing",
    
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });
  console.log(checkout);
  const { url } = checkout;
  return NextResponse.json({ ok: true, url });
};
