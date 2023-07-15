import express from "express";

import authRouter from "./router/authRoute.js";
import accountRouter from "./router/accountRoute.js";
import productRouter from "./router/productRoute.js";
import productAdminRouter from "./router/productAdminRoute.js";
import cartRouter from "./router/cartRoute.js";
import checkoutRouter from "./router/checkoutRoute.js";

import morgan from 'morgan'
import 'dotenv/config'

const app = express();
const port = 10000;
const host = "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(morgan('dev'))

// authentication
app.use('/api/auth', authRouter);

// authentication
app.use('/api/account', accountRouter);

// product
app.use('/api/product', productRouter);

// product admin
app.use('/api/admin/product', productAdminRouter);

// cart
app.use('/api/cart', cartRouter);

// checkout
app.use('/api/checkout', checkoutRouter);

app.listen(port,host,()=>{
    console.log(`server berjalan di http://${process.env.HOST}:${process.env.PORT}`);
});