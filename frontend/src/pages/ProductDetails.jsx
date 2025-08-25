import { Link, useParams } from "react-router-dom";
import products from "../product/products";
import { Rating } from "../components/Rating";

const ProductScreenUI = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  return (
    <div className="p-6">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded shadow mb-4"
      >
        Go Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt="Product"
            className="rounded-lg shadow w-full"
          />
        </div>

        {/* Product Details */}
        <div>
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-yellow-500">
            <Rating
              value={product.rating}
              text={`${product.numReviews}`}
            ></Rating>
          </p>
          <p className="text-lg font-semibold mt-2">Price: ${product.price}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>

        {/* Purchase Card */}
        <div className=" rounded-xl shadow-lg p-4">
          <div className="flex justify-between mb-2">
            <span>Price:</span>
            <strong>$99.99</strong>
          </div>
          <div className="flex justify-between mb-2">
            <span>Status:</span>
            <span className="text-green-600 font-semibold">
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Qty Input */}
          <div className="mb-4">
            <label className="block mb-1">Qty</label>
            <input
              type="number"
              min="1"
              max="99" // you can set product.countInStock here dynamically
              defaultValue="1"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg shadow">
            Add To Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {/* Single Review */}
        <div className="border rounded-lg p-4 mb-4 shadow">
          <p className="font-semibold">John Doe</p>
          <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
          <p className="text-sm text-gray-500">2025-08-24</p>
          <p className="mt-2">Great product! Highly recommend.</p>
        </div>

        {/* Review Form */}
        <div className="border rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">
            Write a Customer Review
          </h3>
          <form className="space-y-3">
            <div>
              <label className="block mb-1">Rating</label>
              <select className="w-full border rounded-lg p-2">
                <option>Select...</option>
                <option>1 - Poor</option>
                <option>2 - Fair</option>
                <option>3 - Good</option>
                <option>4 - Very Good</option>
                <option>5 - Excellent</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Comment</label>
              <textarea
                className="w-full border rounded-lg p-2"
                rows="3"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductScreenUI;
