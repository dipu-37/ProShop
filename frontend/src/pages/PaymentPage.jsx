import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../features/cartSlice';


const PaymentPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Payment Method</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <fieldset className="border border-gray-300 rounded p-4">
          <legend className="text-gray-700 font-medium mb-2">Select Method</legend>
          <div className="flex items-center my-2">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="PayPal" className="ml-2 text-gray-700">
              PayPal or Credit Card
            </label>
          </div>
        </fieldset>

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

export default PaymentPage;
