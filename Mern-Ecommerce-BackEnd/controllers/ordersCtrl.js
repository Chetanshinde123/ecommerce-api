import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import User from "../model/Users.js";
import Product from "../model/Product.js";
import { Db } from "mongodb";
import Coupon from "../model/Coupon.js";

// @desc    Create orders
// @route   GET /api/v1/orders
// @access  Private/Admin

//---------- stripe Instance ----------
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = asyncHandler(async (req, res) => {
  // Get the coupon
  const coupon = req.query;

  const couponFound = await Coupon.findOne({ code: coupons.toUpperCase() });

  if (couponFound.isExpired) {
    throw new Error("Coupon is Expired");
  }

  if (!couponFound) {
    throw new Error("Coupon does exists");
  }

  // Get Discount
  const discount = couponFound.discount / 100;

  // console.log(req.query);

  // Get the payload(customers,orderItems,shippingAddress.totalPrice);
  const { orderItems, shippingAddress, totalPrice } = req.body;

  // Find the User

  const user = await User.findById(req.userAuthId);
  //   console.log(user)

  // Check if user has shipping address
  if (!user.hasShippingAddress) {
    throw new Error("Please provide shipping address");
  }

  // Check if order is not empty
  if (orderItems.length <= 0) {
    throw new Error("No Orders, Please place order first");
  }
  // Place/create order - save into DB
  const order = await Order.create({
    user: user._id,
    orderItems,
    shippingAddress,
    totalPrice
  });
  console.log(order);

  //   Update the product qty

  // --------- This other way where we directly decrease the qty from product ad=nd in diffent method ---------------
  /*const productId = order.orderItems.map(item => item._id);
  const buyingQty = order.orderItems.map(item => item.totalQtyBuying);

  const products = await Product.findById(productId);

  console.log(buyingQty); // This is in array
  const productQty = products.totalQty - buyingQty;
  // const totalSell =  Number(products.totalSold) + Number(buyingQty)

  if (products.totalQty <= 0) {
    throw new Error("Product Out off Stock");
  }

  const productUpdate = await Product.findByIdAndUpdate(
    products,
    {
      totalQty: productQty,
      totalSold: Number(products.totalSold) + Number(buyingQty)
    },
    { new: true }
  );
  console.log(productUpdate);

  await productUpdate.save();*/

  // ------------------- Alternate Method ------------------
  // Here we are finding Product _id in orderItems array with help of $in operator
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems.map(async order => {
    const product = products.find(product => {
      return product._id.toString() === order._id.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });

  //   Push order into user
  user.orders.push(order._id); // user model ; orders = object in user model

  await user.save();

  //  Make Payment (Stripe)

  const convertedOrders = orderItems.map(item => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description
        },
        unit_amount: couponFound
          ? item.price - item.price * discount
          : item.price * 100
      },
      quantity: item.qty
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order._id) //Stringify helps to give you id or else give undefine
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.send({ url: session.url });

  // Payment Webhook
  //   Update the user order

  res.json({
    success: true,
    msg: "Order Creted",
    order,
    user
  });
});

// @desc    get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin

export const getOrdersCtrl = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.json({
    msg: "Order Ctrl",
    orders
  });
});

// @desc    get single order
// @route   GET /api/v1/orders/:id
// @access  Private/Admin

export const getsingleOrderCtrl = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.json({
    msg: "Order Ctrl",
    order
  });
});

// @desc    update order to delivered
// @route   PUT /api/v1/orders/update/:id
// @access  Private/Admin

export const updateOrderCtrl = asyncHandler(async (req, res) => {
  // get the id from params
  const id = req.params.id;

  // update
  const updateOrder = await Order.findByIdAndUpdate(
    id,
    { status: req.body.status },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Order updated",
    updateOrder
  });
});



// @desc    get sales sum of orders
// @route   GET /api/v1/orders/update/:id
// @access  Private/Admin

export const getOrderStatsCtrl = asyncHandler(async (req, res) => {
  // get the order stats
  const order = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimunSales: {
          $min: "$totalPrice"
        },
        totalSales: {
          $sum: "$totalPrice"
        },
        maximumSales: {
          $max: "$totalPrice"
        },
        averageSales: {
          $avg: "$totalPrice"
        }
      }
    }
  ]);

  // get the date
  const date = new Date();
  console.log(date.toString())
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const pastDate = new Date(date)
  pastDate.setDate(date.getDate()-15)

  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: pastDate,
          $lte: today,
        }
      }
    },
    {
      $group: {
        _id : null,
        totalSales : {
          $sum : "$totalPrice"
        }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    message: "Sum of orders",
    order,
    saleToday
  });
});
