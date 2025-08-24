import React from 'react'
import { Link } from 'react-router-dom'

const Cart = ({product}) => {
  
  return (
   <div className="bg-white shadow-md rounded-lg overflow-hidden my-3 p-3 hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md"
        />
      </Link>

      <div className="mt-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold hover:text-blue-600 transition-colors">
            {product.name}
          </h2>
        </Link>

        <div className="mt-2">
          <span value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <h3 className="mt-2 text-xl font-bold">${product.price}</h3>
      </div>
    </div>
  )
}

export default Cart
