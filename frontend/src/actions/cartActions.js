import axios from "axios"
import Cookie from 'js-cookie';

import { 
  CART_ADD_ITEM, 
  CART_ADD_ITEM_FAIL, 
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
} from "../constants/cartConstants";


const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/products/' + productId);
    // get dispatch
    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: { error: error.message } })
  }
}

const removefromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const { cart: { cartItems } } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

export {
  addToCart,
  removefromCart,
  saveShipping,
};
