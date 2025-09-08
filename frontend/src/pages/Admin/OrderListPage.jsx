import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../features/orderApiSlice";


const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">USER</th>
                <th className="px-4 py-2 text-left">DATE</th>
                <th className="px-4 py-2 text-left">TOTAL</th>
                <th className="px-4 py-2 text-left">PAID</th>
                <th className="px-4 py-2 text-left">DELIVERED</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.user?.name}</td>
                  <td className="px-4 py-2">{order.createdAt.substring(0, 10)}</td>
                  <td className="px-4 py-2">${order.totalPrice}</td>
                  <td className="px-4 py-2">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/order/${order._id}`}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListPage;

