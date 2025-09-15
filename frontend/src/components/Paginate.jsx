const Paginate = ({ pages, page, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Prev */}
      {page > 1 && (
        <button
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
        >
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`px-3 py-1 rounded-md border text-sm font-medium transition 
            ${
              x + 1 === page
                ? "bg-gray-600 text-white border-gray-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
        >
          {x + 1}
        </button>
      ))}

      {/* Next */}
      {page < pages && (
        <button
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Paginate;
