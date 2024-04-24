const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
const stripeApiKey =
  "sk_test_51Nqae9SBjZU8XkZzPmlN0iPFXMRSGcuwIl32RmZIulVBuIU3eCSo6t"+
  "w8aFz0z0gxY3kte6mph6sjMY2onPL86O7w00YTdRXuLK";

const stripe = require("stripe")(stripeApiKey);


const app = express();
app.use(cors({
  origin: true,
}));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  try {
    const {amount, shipping} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "inr",
    });

    res
        .status(200)
        .send(paymentIntent.client_secret);
  } catch (err) {
    res
        .status(500)
        .json({
          statusCode: 500,
          message: err.message,
        });
  }
});

app.get("*", (req, res) => {
  res
      .status(404)
      .send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);
