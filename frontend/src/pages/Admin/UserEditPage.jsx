import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../features/userApiSlice";
import Loading from "../../components/Loading";
import Message from "../../components/Message";


const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("isAdmin", user.isAdmin);
    }
  }, [user, setValue]);

  const submitHandler = async (data) => {
    try {
     // console.log(data)
      await updateUser({ userId, ...data }).unwrap();
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/users");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Link
        to="/admin/users"
        className="inline-block mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Go Back
      </Link>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded ">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>

        {loadingUpdate && <Loading />}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Admin Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("isAdmin")}
                className="h-4 w-4 bg-gray-300-600 border-gray-300 rounded"
              />
              <label className="text-gray-700">Is Admin</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-1/4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded"
            >
             Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
