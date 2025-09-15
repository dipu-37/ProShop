import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useGetTopProductQuery } from "../features/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  const animation = { duration: 3000, easing: (t) => t }; // auto-scroll speed

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 15 },
    created(s) {
      s.moveToIdx(0, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2, spacing: 15 },
      },
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading top products</div>;
  if (!products || products.length === 0) return <div>No top products found</div>;

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">Top Products</h2>
      <div ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="keen-slider__slide rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-white flex flex-col items-center p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
