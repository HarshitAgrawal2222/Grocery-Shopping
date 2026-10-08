import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './configs/db.js'
import connectCloudinary from './configs/cloudinary.js'

import userRouter from './routes/userRoute.js'
import sellerRouter from './routes/sellerRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import addressRouter from './routes/addressRoute.js'
import orderRouter from './routes/orderRoute.js'

import { stripeWebhooks } from './controllers/orderController.js'

const app = express()

const allowedOrigins = [
    'http://localhost:5173',
    'https://purple-frontend-eight.vercel.app'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

app.post(
    '/stripe',
    express.raw({ type: 'application/json' }),
    stripeWebhooks
)

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    if (
        req.path.startsWith('/api/user') ||
        req.path.startsWith('/api/cart') ||
        req.path.startsWith('/api/address') ||
        req.path.startsWith('/api/order')
    ) {
        res.setHeader(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate'
        )
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
    }

    next()
})

app.get('/', (req, res) => {
    res.send('API is Working')
})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

await connectDB()
await connectCloudinary()

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

export default app