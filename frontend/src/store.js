import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer } from './reducers/userReducers';

const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  productSave: productSaveReducer
});

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
