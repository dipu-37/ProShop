import React from "react";
import products from "../product/products";
import Cart from "../components/Cart";

const HomeScreen = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
      {products.map((product) => (
        <Cart key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HomeScreen;
