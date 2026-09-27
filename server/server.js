import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

import { stripeWebhooks } from './controllers/orderController.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://purple-frontend-eight.vercel.app'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Stripe webhook
app.post(
    '/stripe',
    express.raw({ type: 'application/json' }),
    stripeWebhooks
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('API is Working');
});

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Initialize database and Cloudinary
await connectDB();
await connectCloudinary();

// Local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Vercel
export default app;