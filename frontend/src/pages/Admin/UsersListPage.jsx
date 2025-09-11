import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../features/userApiSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

const UsersListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        deleteUser(userId);
        refetch();
        toast.success("user delete successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

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
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>

                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user?.name}</td>
                  <td className="px-4 py-2">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>

                  <td className="px-6 py-4 flex space-x-2">
                    <Link
                      to={`/admin/user/${user._id}/edit`}
                      className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded shadow-sm transition duration-200"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteUserHandler(user._id)}
                      className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition duration-200"
                    >
                      <RiDeleteBinLine />
                    </button>
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

export default UsersListPage;
