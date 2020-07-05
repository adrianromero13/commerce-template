import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
// import fileUpload from 'express-fileupload';
// import path from 'path';

import userRoute from './routes/userRoutes';
import productRoute from './routes/productRoutes';
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

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

// app.get('/api/products/:id', (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find(x => x._id === productId);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ msg: 'product not found' });
//   }
// });

// app.get('/api/products', (req, res) => {

//   res.send(data.products);
// });

app.listen(3000, () => { console.log('server started at http://localhost:3000') })
