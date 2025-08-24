// Simple Rating Component
export const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? '★' : value >= star - 0.5 ? '☆' : '☆'}
        </span>
      ))}
      {text && <span className="text-gray-600 text-sm ml-2">{text}</span>}
    </div>
  );
};