import Cart from "../components/Cart";
import { useState } from "react";
import { useEffect } from "react";
import baseUrl from "../api/axiosInstance";


const HomeScreen = () => {

  const [products,setProducts] = useState([]);
  useEffect(()=>{

    const fetchProducts = async ()=>{
      const {data}=await baseUrl.get('/api/products');
      console.log(data);
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



// const items = [];
// function addItem(text) {
//   items.push({...text, Comment: false});
// }