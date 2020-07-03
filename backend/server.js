import express from 'express';
import data from './data';

const app = express();

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x=>x._id === productId);
  if (product){
  res.send(product);
  } else {
  res.status(404).send({ msg: 'product not found' });
  }
});

app.get('/api/products', (req, res) => {

  res.send(data.products);
});

app.listen(3000, () => { console.log('server started at http://localhost:3000') })
