import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import products from './data/products.js';

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
let isConnected = false;
async function main() {
  try {
    if (!isConnected) {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;
      console.log('✅ Database connected');
       app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`);
 });
    }
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
  }
}
main();

export default app;