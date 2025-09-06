import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating } from "../components/Rating";
import { useGetProductByIdQuery } from "../features/productApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useState } from "react";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1); // qty state
  const navigate = useNavigate();


  // Add To Cart handler
  const addToCartHandler = () => {
    console.log("Add to cart clicked");
    console.log("Product:", product, qty);
    dispatch(
      addToCart({
        ...product,
        qty, // selected quantity
      })
    );
   // navigate to cart
   navigate("/cart");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

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
            src={product?.image}
            alt="Product"
            className="rounded-lg shadow w-full"
          />
        </div>

        {/* Product Details */}
        <div>
          <h3 className="text-2xl font-bold mb-2">{product?.name}</h3>
          <p className="text-yellow-500">
            <Rating
              value={product?.rating}
              text={`${product?.numReviews}`}
            ></Rating>
          </p>
          <p className="text-lg font-semibold mt-2">Price: ${product?.price}</p>
          <p className="text-gray-600 mt-2">{product?.description}</p>
        </div>

        {/* Purchase Card */}
        <div className=" rounded-xl shadow-lg p-4 w-full md:w-80 h-fit ">
          <div className="flex justify-between mb-2">
            <span>Price:</span>
            <strong>${product?.price}</strong>
          </div>
          <div className="flex justify-between mb-2">
            <span>Status:</span>
            <span className="text-green-600 font-semibold">
              {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Qty Input */}
          {product?.countInStock > 0 && (
            <div className="mb-4">
              <label className="block mb-1">Qty</label>
              <input
                type="number"
                min="1"
                max={product?.countInStock || 99}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border rounded-lg p-2"
              />
            </div>
          )}

          <button
            onClick={addToCartHandler}
            disabled={product?.countInStock === 0}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg shadow disabled:bg-gray-400"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;



//  {/* Reviews Section */}
//       <div className="mt-10 max-w-2xl">
//         <h2 className="text-xl font-bold mb-4">Reviews</h2>

//         {/* Single Review */}
//         <div className="border rounded-lg p-4 mb-4 shadow">
//           <p className="font-semibold">John Doe</p>
//           <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
//           <p className="text-sm text-gray-500">2025-08-24</p>
//           <p className="mt-2">Great product! Highly recommend.</p>
//         </div>

//         {/* Review Form */}
//         <div className="border rounded-lg p-4 shadow">
//           <h3 className="text-lg font-semibold mb-2">
//             Write a Customer Review
//           </h3>

//           <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
//             {/* Rating Select */}
//             <div>
//               <label className="block mb-1">Rating</label>
//               <select
//                 {...register("rating", { required: "Rating is required" })}
//                 className="w-full border rounded-lg p-2"
//               >
//                 <option value="">Select...</option>
//                 <option value="1">1 - Poor</option>
//                 <option value="2">2 - Fair</option>
//                 <option value="3">3 - Good</option>
//                 <option value="4">4 - Very Good</option>
//                 <option value="5">5 - Excellent</option>
//               </select>
//               {errors.rating && (
//                 <p className="text-red-500 text-sm">{errors.rating.message}</p>
//               )}
//             </div>

//             {/* Comment Input */}
//             <div>
//               <label className="block mb-1">Comment</label>
//               <textarea
//                 {...register("comment", {
//                   required: "Comment is required",
//                   minLength: {
//                     value: 5,
//                     message: "Comment must be at least 5 characters"
//                   }
//                 })}
//                 className="w-full border rounded-lg p-2"
//                 rows="3"
//               ></textarea>
//               {errors.comment && (
//                 <p className="text-red-500 text-sm">{errors.comment.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg shadow"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>