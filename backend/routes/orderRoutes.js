import express from 'express';

import Order from './../models/orderModel';
import { isAuth, isAdmin } from './../util';


// define router
const router = express.Router();

// YOU ARE HERE!! 

// SET UP ROUTES REQUIRED FOR MAKING ORDERS!
