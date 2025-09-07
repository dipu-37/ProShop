import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: ['https://ecommerce-dipu-client-1.onrender.com', 'http://localhost:5173'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('This is my first project MERN Stack!');
});

// app.get('/api/products',(req,res)=>{
//     res.json(products);
// })

// app.get('/api/products/:id',(req,res)=>{
//     const product = products.find((p)=> p._id ===req.params.id);
//     res.json(product);
// })

app.use('/api/products', productRoutes);
app.use('/api/user/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal',(req,res)=>{
  res.send({clientId : process.env.PAYPAL_CLIENT_ID});
});

app.use(notFound);
app.use(errorHandler);

// MongoDB connection
// DB connect first
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});

export default app;