import express from 'express'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import products from './data/products.js';
import connectDB from './config/db.js';


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

app.get('/api/products',(req,res)=>{
    res.json(products);
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find((p)=> p._id ===req.params.id);
    res.json(product);
})


// MongoDB connection
// DB connect first
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});

export default app;