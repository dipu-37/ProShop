import Cart from "../components/Cart";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';


const HomeScreen = () => {

  const [products,setProducts] = useState([]);
  useEffect(()=>{

    const fetchProducts = async ()=>{
      const {data}=await axios.get('/api/products');
      setProducts(data);
    }
    fetchProducts();
  },[])


  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
      {products.map((product) => (
        <Cart key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HomeScreen;
