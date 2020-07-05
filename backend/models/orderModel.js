import mongoose, { MongooseDocument } from 'mongoose';

// set shipping schema
const shippingSchema = {
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
};

// set up payment schema
const paymentSchema = {
  paymentMethod: {
    type: String,
    required: true
  },
};

// set up orderItemSchema
const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

// set up order schema
const orderSchema = new MongooseDocument.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    orderItemSchema
  ],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: {
    type: Number
  },
  taxPrice: {
    type: Number
  },
  shippingPrice: {
    type: Number
  },
  totalPrice: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  },
}, {
  timestamps: true
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;