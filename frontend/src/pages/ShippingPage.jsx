import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { saveShippingAddress } from "../features/cartSlice";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form setup
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
  });

  // Redirect if no shipping address
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (data) => {
    dispatch(saveShippingAddress(data));
    reset(); 
    navigate("/payment");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Shipping</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Address</label>
          <input
            id="address"
            {...register("address", { required: true })}
            placeholder="Dhaka mirpur-10"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">City</label>
          <input
            id="city"
            {...register("city", { required: true })}
            placeholder="Mirpur"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-gray-700 text-sm font-medium mb-1">Postal Code</label>
          <input
            id="postalCode"
            {...register("postalCode", { required: true })}
            placeholder="7420"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">Country</label>
          <input
            id="country"
            {...register("country", { required: true })}
            placeholder="BD"
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gray-800 text-white font-medium rounded hover:bg-gray-900 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
