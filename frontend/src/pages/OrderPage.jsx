import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useGetOrderDetailsQuery } from "../features/orderApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || "Failed to load order"}
      </Message>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Order #{order._id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Shipping</h2>
            <p>
              <span className="font-medium">Name:</span> {order.user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${order.user?.email}`}
                className="text-blue-600 hover:underline"
              >
                {order.user?.email}
              </a>
            </p>
            <p className="mb-3">
              <span className="font-medium">Address:</span>{" "}
              {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.postalCode},{" "}
              {order.shippingAddress?.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <p>
              <span className="font-medium">Method:</span> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          {/* Items */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            {order.orderItems?.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div className="divide-y">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-700">
                      {item.qty} × ${item.price} ={" "}
                      <span className="font-medium">
                        ${(item.qty * item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div>
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between">
              <span>Items</span> <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span> <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span> <span>${order.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span> <span>${order.totalPrice}</span>
            </div>

            {/* Admin Deliver */}
            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <button className="w-full mt-3 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Mark As Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
