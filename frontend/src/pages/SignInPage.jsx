import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../features/userApiSlice.js";
import { setCredentials } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import React from "react";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redirect if already logged in
  React.useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (data) => {
    try {
      // RTK Query login API call
      const res = await login(data).unwrap();

      // Save user info in Redux + localStorage
      dispatch(setCredentials({ ...res }));

      toast.success("Login Successful!");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Login Failed!");
    }
  };

  return (
    <FormContainer>
      <h1 className="text-3xl font-bold mb-6 text-center ">Sign In</h1>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
        >
          {isLoading ? <Loading /> : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-4">
        New Customer?{" "}
        <Link
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
          className="text-gray-500 hover:underline"
        >
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default SignInPage;
