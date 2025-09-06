import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../features/orderApiSlice';
import { clearCartItems } from '../features/cartSlice';
import Message from '../components/Message';
import Loading from '../components/Loading';


const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate('/shipping');
    else if (!cart.paymentMethod) navigate('/payment');
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItem,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log(res);
      toast.success('Order placed successfully');
      // clear cart
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Left Section */}
        <div className="md:w-2/3 space-y-4">
          {/* Shipping */}
          <div className="border border-gray-200 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="border border-gray-200 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <p>
              <strong>Method: </strong> {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="border border-gray-200 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {cart?.cartItem?.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="space-y-2">
                {cart?.cartItem?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <Link to={`/product/${item.product}`} className="flex-1 text-shadow-black hover:underline">
                      {item.name}
                    </Link>
                    <div className="w-32 text-right">
                      {item.qty} x ${item.price} = ${(item.qty * (item.price * 100)) / 100}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 border border-gray-200 p-4 rounded space-y-4 h-fit">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

          <div className="flex justify-between border-b border-gray-200">
            <span>Items</span>
            <span>${cart.itemPrice}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200">
            <span>Shipping</span>
            <span>${cart.shippingPrice}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200">
            <span>Tax</span>
            <span>${cart.taxPrice}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${cart.totalPrice}</span>
          </div>

          {error && <Message variant="danger">{error.data.message}</Message>}

          <button
            type="button"
            className={`w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 disabled:opacity-50`}
            disabled={cart?.cartItem?.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loading />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
