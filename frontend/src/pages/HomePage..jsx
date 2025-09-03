import Cart from "../components/Cart.jsx";
import Loading from "../components/Loading.jsx";
// import { useState } from "react";
// import { useEffect } from "react";
// import baseUrl from "../api/axiosInstance";
import { useGetProductsQuery } from "../features/productApiSlice.js";

const HomeScreen = () => {

  // const [products,setProducts] = useState([]);
  // useEffect(()=>{

  //   const fetchProducts = async ()=>{
  //     const {data}=await baseUrl.get('/api/products');
  //     console.log(data);
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // },[])


  // {isLoading ? () : error ? () : ()}

  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(products);

  if (isLoading) return <Loading></Loading>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
      {products?.map((product) => (
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