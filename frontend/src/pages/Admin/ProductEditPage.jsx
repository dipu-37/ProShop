import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import Message from "../../components/Message";

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../features/productApiSlice";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      // populate form
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("image", product.image);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("countInStock", product.countInStock);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const submitHandler = async (data) => {
    try {
      await updateProduct({ productId, ...data }).unwrap();
      toast.success("Product updated");
      refetch();
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  //   const uploadFileHandler = async (e) => {
  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);
  //     try {
  //       const res = await uploadProductImage(formData).unwrap();
  //       setValue("image", res.image);
  //       toast.success(res.message);
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Link
        to="/admin/products"
        className="inline-block mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Go Back
      </Link>
      <div className="max-w-3xl mx-auto py-4">
        <div className="bg-white space-y-0">
          <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

          {loadingUpdate && <Loading />}
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error.data?.message || "Error"}</Message>
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Image URL
                </label>
                <input
                  {...register("image", { required: "Image URL is required" })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />

                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Brand
                </label>
                <input
                  {...register("brand", { required: "Brand is required" })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              {/* Count In Stock */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Count In Stock
                </label>
                <input
                  type="number"
                  {...register("countInStock", {
                    required: "Stock count is required",
                    valueAsNumber: true,
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.countInStock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.countInStock.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Category
                </label>
                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 w-1/4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded"
              >
                Update Product
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
