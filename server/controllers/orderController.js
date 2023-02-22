import Order from "../models/orderModel.js";

import ErrorHandler from "../utils/errorhandler.js";

import catchasyncerror from "../middlewear/asyncerrors.js";

import Product from "../models/productModel.js";

export const newOrder = catchasyncerror(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

export const getSingleOrder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with Id", 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

export const getLoginedUserOrder = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(201).json({
    success: true,
    orders,
  });
});

// admin
export const getAllOrders = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(201).json({
    success: true,
    totalAmount,
    orders,
  });
});

// admin
export const updateOrder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already deliverd this order", 400));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// admin

export const deletOrder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with Id", 404));
  }

  await order.remove();

  res.status(201).json({
    success: true,
  });
});
