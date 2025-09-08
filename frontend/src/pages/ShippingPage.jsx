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
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Redirect if no shipping address
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (data) => {
    dispatch(saveShippingAddress(data));
    reset(data);
    navigate("/payment");
  };

  return (
    <div className=" w-2/3 -m-4 mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Shipping</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        
        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            {...register("address", { required: "Address is required" })}
            placeholder="Dhaka, Mirpur-10"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
             "border-gray-300 focus:ring-gray-400"
            }`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">
            City
          </label>
          <input
            id="city"
            {...register("city", { required: "City is required" })}
            placeholder="Mirpur"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
             "border-gray-300 focus:ring-gray-400"
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode" className="block text-gray-700 text-sm font-medium mb-1">
            Postal Code
          </label>
          <input
            id="postalCode"
            {...register("postalCode", { required: "Postal code is required" })}
            placeholder="7420"
            type="number"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              "border-gray-300 focus:ring-gray-400"
            }`}
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">
            Country
          </label>
          <input
            id="country"
            {...register("country", { required: "Country is required" })}
            placeholder="BD"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
              "border-gray-300 focus:ring-gray-400"
            }`}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>

        {/* Submit Button */}
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
