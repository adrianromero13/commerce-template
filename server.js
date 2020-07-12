const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const config = require('./config');

// import userRoute from './routes/userRoutes';
// import productRoute from './routes/productRoutes';
// import orderRoute from './routes/orderRoutes';
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

app.use(routes);




app.use(bodyParser.json());

app.use('/api/uploads', uploadRoute);

app.use('/api/users', userRoute);

app.use('/api/products', productRoute);

app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
