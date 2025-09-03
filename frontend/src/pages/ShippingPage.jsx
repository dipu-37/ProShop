import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../features/cartSlice";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart || {};

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white ">
        <h1 className="text-3xl font-semibold mb-5 text-gray-800">Shipping</h1>
        <form onSubmit={submitHandler} className="space-y-4 max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
          <div>
            <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Address</label>
            <input
              id="address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Dhaka mirpur-10"
              className="w-full border border-gray-300 rounded px-3 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">City</label>
            <input
              id="city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mirpur"
              className="w-full border border-gray-300 rounded px-3 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-gray-700 text-sm font-medium mb-1">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="7420"
              className="w-full border border-gray-300 rounded px-3 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">Country</label>
            <input
              id="country"
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="BD"
              className="w-full border border-gray-300 rounded px-3 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
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
    </div>
  );
};

export default ShippingPage;
