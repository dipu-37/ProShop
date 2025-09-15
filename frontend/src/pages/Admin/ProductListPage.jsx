import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../features/productApiSlice";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const searchTerm = searchParams.get("searchTerm") || "";

  const [createProduct] = useCreateProductMutation();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    page,
    limit,
    searchTerm,
  });
  const [deleteProduct] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const newProduct = await createProduct().unwrap(); // POST request sent
        refetch();
        toast.success(`Product "${newProduct.name}" created!`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteProductHandler = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        //
        await deleteProduct(productId);
        refetch();
        toast.success(`Product delete successfully!`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit, searchTerm });
  };

 

  return (
    <div className="p-4">
      {/* Header + Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Products</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded shadow transition duration-200"
        >
          <IoCreateOutline />
          Create Product
        </button>
      </div>

      {/* Loader */}
      {isLoading && <Loading />}

      {/* Error */}
      {error && (
        <Message variant="danger">{error.data?.message || "Error"}</Message>
      )}

      {/* Product Table */}
      {!isLoading && !error && (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full text-left text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[150px]">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">${product.price}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded shadow-sm transition duration-200"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteProductHandler(product._id)}
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

      {/* Pagination Placeholder */}
      <div className="mt-6 flex justify-center">
        {" "}
        {data?.meta && (
          <div className="mt-6">
            <Paginate
              pages={data.meta.totalPage}
              page={data.meta.page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
