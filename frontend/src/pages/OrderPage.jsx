import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useUpdateOrderToDeliveredMutation,
} from "../features/orderApiSlice";
import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { id: orderId } = useParams();
  console.log(orderId);

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [updateOrderToDelivered] = useUpdateOrderToDeliveredMutation();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  //  async function onApproveTest(){
  //    await payOrder({orderId,details : {payer:{}}})
  //     refetch();
  //     toast.success();
  //   }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        console.log(details);
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.err(err?.data?.message || err.error);
      }
    });
  }
  function onError(err) {
    toast.error(err.message);
  }

  const deliveredOrderHandler = async () => {
    try {
      await updateOrderToDelivered(orderId).unwrap();
      refetch();
      toast.success("Order delivered")
    } catch (err) {
      toast.error(err?.data?.Message || err.message);
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Message variant="danger">
        {error?.data?.message || "Failed to load order"}
      </Message>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className=" font-bold mb-8">Order #{order._id}</h1>

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
            <div>
              {!order.isPaid && (
                <div className="p-4 bg-white rounded-xl shadow-md">
                  {loadingPay && <Loading />}

                  {isPending ? (
                    <Loading />
                  ) : (
                    <div>
                      {/* <button
            onClick={onApproveTest}
            className="mb-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Test Pay Order
          </button> */}

                      <div className="mt-2 flex justify-center">
                        <div className="w-full max-w-md">
                          <PayPalButtons
                            style={{ layout: "vertical", height: 45 }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Admin Deliver */}
            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                onClick={deliveredOrderHandler}
                className="w-full mt-3 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Mark As Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
