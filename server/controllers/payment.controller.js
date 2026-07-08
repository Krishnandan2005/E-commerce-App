import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { amount } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Flipkart Order",
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],

            mode: "payment",

            success_url: "http://localhost:5173/cart",
            cancel_url: "http://localhost:5173/cart",
        });

        res.json({
            id: session.id,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};