
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { addToCart, removeFromCart } from "../features/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart) || {};
  //console.log("Cart state:", cart);
  const { cartItem } = cart;
  //console.log("Cart Items:", cartItem);

  const { control } = useForm();

  const addToCartHandler = (product, qty) => {
     dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
     dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
     navigate("/login?redirect=/shipping");
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 px-4 sm:px-6 lg:px-8">Shopping Cart</h2>
      <div className="max-w-7xl mx-auto md:flex gap-6 px-4 sm:px-6 lg:px-8">
        {/* Left - Cart Items */}
        <div className="md:w-2/3">
          {cartItem.length === 0 ? (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
              Your cart is empty{" "}
              <Link to="/" className="text-red-400 underline">
                Go Back
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItem.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center gap-4 p-4 rounded shadow"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  {/* Name */}
                  <div className="flex-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">${item.price}</p>
                  </div>

                 <div className="flex items-center gap-4 ">
                     {/* Qty Selector */}
                  <Controller 
                    name={`qty-${item._id}`}
                    control={control}
                    defaultValue={item.qty}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          addToCartHandler(item, Number(e.target.value));
                        }}
                        className="bg-gray-200 rounded p-1"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                 </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Summary */}
        <div className="lg:w-1/3 mt-4 md:mt-0 ">
          <div className=" rounded p-4 shadow space-y-4">
            <h2 className="text-xl font-semibold">
              Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <p className="text-lg font-bold">
              $
              {cartItem
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <button
              onClick={checkoutHandler}
              disabled={cartItem.length === 0}
              className={`w-full  py-2 rounded-lg text-white font-semibold ${
                cartItem.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
