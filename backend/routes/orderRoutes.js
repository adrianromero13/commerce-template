import express from 'express';

import Order from './../models/orderModel';
import { isAuth, isAdmin } from './../util';


// define router
const router = express.Router();

// create the order
router.post('/', isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
});

// payment route
router.put('/:id/pay', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found' });
  }
});

router.get('/mine', isAuth, async(req,res) => {
 const orders = await Order.find({ user: req.user._id });
 res.send(orders);
});

// fetch users orders
router.get('/', isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});

// fetch specific users order by id
router.get('/:id', isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Oops, Order Not Found' });
  }
});

// delete an order, but only an admin can have access to this
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send({ message: 'Oops, Order Not Found' });
  }
});

export default router;
