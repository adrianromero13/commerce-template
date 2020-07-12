const router = require('express').Router();

const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const uploadRoutes = require('./uploadRoutes');
const userRoutes = require('./userRoutes');
const configRoutes = require('./configRoutes');

// '/api' prepended on all routes

// /api/orders
router.use('/orders', orderRoutes);

// /api/products
router.use('/products', productRoutes);

// /api/uploads
router.use('/uploads', uploadRoutes);

// /api/users
router.use('/users', userRoutes);

// paypal route
router.use('/config/paypal', configRoutes);

module.exports = router;
