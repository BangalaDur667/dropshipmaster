import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LyjppEooqBM3lcWIuyS3vGU" },
          { shipping_rate: "shr_1LyjqiEooqBM3lcWcBlvDQtZ" },
        ],
        line_items: [
          req.body.cartItems.map((item) => {
            const img = item.image[0].asset_ref;
            const newImage = img
              .replace(
                "image-",
                "https://cdn.sanity.io/images/6brpcq9j/production"
              )
              .replace("-webp", ".webp");
            console.log("IMAGE", newImage);
            return {
              price_data: { currency: "eur" },
              product_data: { name: item.name, images: [newImage] },
              unit_amount: item.price * 100,

              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            };
          }),
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
