import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
// import fileUpload from 'express-fileupload';
// import path from 'path';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

import data from './data';
import config from './config';

// set up mongo db connection
dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose
.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);

app.listen(3000, () => { console.log('server started at http://localhost:3000') })
