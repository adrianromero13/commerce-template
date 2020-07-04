import Axios from "axios"
import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM } from "../constants/cartConstants";


const addToCart = (productId, qty) => async (dispatch) => {
  try {
    const { data } = await Axios.get('/api/products/' + productId);
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
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: { error: error.message } })
  }
}

const removefromCart = (productId) => (dispatch) =>{
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
}

export { addToCart, removefromCart };
