import express from 'express'
import dotenv from 'dotenv'
import stripe from 'stripe';

// Load environment variables from a .env file if it exists
dotenv.config();

// Create an Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Define a route for the homepage
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});

// stripe gateway
let stripeGateway = stripe(process.env.STRIPE_SECRET_KEY);

// Success

app.get("/success", (req, res) => {
    res.sendFile("success.html", { root: "public" });
});
app.get("/cancel", (req, res) => {
    res.sendFile("cancel.html", { root: "public" });
});


let DOMAIN = process.env.DOMAIN

app.post('/stripe-checkout', async (req, res) => {
    const lineItems = req.body.items.map((cartItemObj) => {
        const unitAmount = parseInt(cartItemObj.price.replace(/[^0-9.-]+/g, "") * 100);
        console.log('item-price:', cartItemObj.price);
        console.log('unitAmount:', unitAmount);
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: cartItemObj.title,
                    images: [cartItemObj.imgSrc]
                },
                unit_amount: unitAmount,
            },
            quantity: cartItemObj.quantity,
        }
    });
    console.log('lineItems:', lineItems);

    // create checkout 
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,

        // asking for address
        billing_address_collection: 'required',
    });
    res.json(session.url);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");

})

