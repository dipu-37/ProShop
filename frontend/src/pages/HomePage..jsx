import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../features/productApiSlice";
import Cart from "../components/Cart";
import Paginate from "../components/Paginate";
import Loading from "../components/Loading";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const searchTerm = searchParams.get("searchTerm") || "";

  const { data, isLoading, error } = useGetProductsQuery({ page, limit, searchTerm });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading products</div>;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit, searchTerm });
  };

  const handleLimitChange = (e) => {
    setSearchParams({ page: 1, limit: e.target.value, searchTerm }); // reset page to 1
  };

  return (
    <div>
      {/* Limit Selector */}
      <div className="flex justify-end px-6 mb-4">
        <select
          value={limit}
          onChange={handleLimitChange}
          className="border border-gray-500 rounded-md px-2 py-1"
        >
          <option value={4}>4 per page</option>
          <option value={8}>8 per page</option>
          <option value={12}>12 per page</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
        {data?.products?.map((product) => (
          <Cart key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
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
  );
};

export default HomePage;
