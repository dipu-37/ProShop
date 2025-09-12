import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center space-x-2 mt-6">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/products/${x + 1}`
            }
            className={`px-3 py-1 rounded-md border text-sm font-medium transition 
              ${
                x + 1 === page
                  ? "bg-gray-600 text-white border-gray-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }`}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
