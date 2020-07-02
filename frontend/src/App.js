import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import './App.css';
import './index.css';
import data from './data';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';


function App() {

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
            <button onClick={openMenu}>
              &#9776;
        </button>
        <Link to ='/'>piKel</Link>
          </div>
          <div className='heade r-links'>
            <a href='cart.html'>Cart</a>
            <a href='signin.html'>Sign In</a>
          </div>
        </header>
        <aside className='sidebar'>
          <h3>Shopping Ccategories</h3>
          <button className='sidebar-close-button' onClick={closeMenu}>x</button>
          <ul>
            <li>
              <a href='index.html'>Plush</a>
            </li>
            <li>
              <a href='index.html'>Poster</a>
            </li>
          </ul>
        </aside>
        <main className='main'>
          <div className='content'>
            <Route path='/product/:id' component={ProductScreen} />
            <Route exact path='/' component={HomeScreen} />
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
