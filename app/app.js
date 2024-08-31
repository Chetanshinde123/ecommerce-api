// Common js type

// const express = require("express");

// const app = express();

//  module.exports= app

//------------------ Module Type
import dotenv from "dotenv";
dotenv.config(); //This command have to access to .env file

import express from "express";
import Stripe from "stripe";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import productsRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRoute.js";
import brandsRouter from "../routes/brandsRoute.js";
import colorsRouter from "../routes/colorsRoute.js";
import reviewRouter from "../routes/reviewRoute.js";
import orderRouters from "../routes/ordersRoute.js";
import Order from "../model/Order.js";
import couponRouter from "../routes/couponsRoute.js";

dbConnect();
const app = express();

// --------- Stripe Webhook -----------

//---------- stripe Instance ----------
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_0d97c8d1cd2aedd879407943b68760aea5493f4af241c9943350bb83f559e1fa";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("event");
    } catch (err) {
      console.log("err", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      // Update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      // console.log({
      //   orderId,
      //   paymentStatus,
      //   paymentMethod,
      //   totalAmount,
      //   currency
      // });

      // Find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus
        },
        { new: true }
      );
      console.log(order);
    } else {
      return;
    }

    // Handle the event
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// ---- Passing data ---*app.use(express.json())
app.use(express.json());

app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/products/", productsRouter);
app.use("/api/v1/categories/", categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/colors/", colorsRouter);
app.use("/api/v1/reviews/", reviewRouter);
app.use("/api/v1/orders", orderRouters);
app.use("/api/v1/coupons",couponRouter)

// Error Middleware
// Runs from top to bottom
app.use(notFound); //Next Middleware is globalErrHandler
app.use(globalErrHandler);

export default app;
