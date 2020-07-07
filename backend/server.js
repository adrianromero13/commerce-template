// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import path from 'path';
// // import fileUpload from 'express-fileupload';

// import userRoutes from './routes/userRoutes';
// import productRoutes from './routes/productRoutes';
// import orderRoutes from './routes/orderRoutes';
// import config from './config';

// // set up mongo db connection
// dotenv.config();

// const mongodbURL = config.MONGODB_URL;
// mongoose
//   .connect(mongodbURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .catch((error) => console.log(error.reason));

// const app = express();
// app.use(bodyParser.json());

// app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
// app.use(express.static(path.join(__dirname, '/../frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../build/index.html`));
// });

// app.use('/api/config/paypal', (req, res) => {
//   res.send(config.PAYPAL_CLIENT_ID);
// });

// app.use('/api/users', userRoutes);

// app.use('/api/products', productRoutes);

// app.use('/api/orders', orderRoutes);

// // app.use('/api/uploads', uploadRoutes);

// app.listen(config.PORT, () => {
//   console.log('server started at http://localhost:5000');
// });

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './routes/userRoutes';
import productRoute from './routes/productRoutes';
import orderRoute from './routes/orderRoutes';
// import uploadRoute from './routes/uploadRoutes';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
// app.use('/api/uploads', uploadRoutes);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
