import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ProductsScreen from './screens/ProductsScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
  // set up authorization 
  const userSignin = useSelector((state) => state.userSignin);
  // grab user info
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  }
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');

  }
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='header'>
          <div className='brand'>
            <button onClick={openMenu}>&#9776;</button>
            <Link to='/'>piKel</Link>
          </div>
          <div className='header-links'>
            <a href='cart.html'>Cart</a>
            {userInfo ? (
              <Link to='profile'>{userInfo.name}</Link>
            ) : (
                <Link to='/signin'>Sign In</Link>
              )}
            {userInfo && userInfo.isAdmin && (
              <div className='dropdown'>
                <a href='#'>Admin</a>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/orders'>Orders</Link>
                    <Link to='/products'>Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className='sidebar'>
          <h3>Shopping Ccategories</h3>
          <button className='sidebar-close-button' onClick={closeMenu}>x</button>
          <ul>
            <li>
              <Link to='/category/Plush'>Plush</Link>
            </li>
            <li>
              <Link to='/category/Poster'>Posters</Link>
            </li>
          </ul>
        </aside>
        <main className='main'>
          <div className='content'>
            {/* <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} /> */}
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            {/* <Route path="/placeorder" component={PlaceOrderScreen} /> */}
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className='footer'>
          All right reserved.
      </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
