import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckoutSteps from '../components/CheckoutSteps';
import {createOrder} from '../actions/orderActions';




function PlaceOrderScreen(props) {

  // define cart 
  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;
  // pricing logic constants
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;


  const orderCreate = useSelector(state => state.orderCreate);
  if (!shipping.address) {
    props.history.push('/shipping');
  }
  
  else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }
  const { loading, success, error, order } = orderCreate;
  
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create the order
    dispatch(createOrder({
      orderItems: {
      cartItems, 
      shipping, 
      payment, 
      itemsPrice, 
      shippingPrice, 
      taxPrice, 
      totalPrice,
      }
    }));
  }

  useEffect(() => {
    if (success) {
      props.history.push('/order/' + order._id);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='placeOrder'>
        <div className='placeOrder-info'>
          <div>
            <h3>Shipping</h3>
          </div>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          </div>
          <div>
            {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {cart.payment.paymentMethod}
            </div>
          </div>
          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {
                cartItems.length === 0 ?
                  <div>Cart is empty</div>
                  :
                  cartItems.map(item =>
                    <li key={item._id}>
                      <div className='cart-image'>
                        <img src={item.image} alt='product' />
                      </div>
                      <div className='cart-name'>
                        <div>
                          <Link to={'/product/' + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className='cart-price'>
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>
        </div>
        <div className='placeOrder-action'>
          <ul>
            <li>
              <button className='button primary full-width' onClick={placeOrderHandler}>Place Order</button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen;
