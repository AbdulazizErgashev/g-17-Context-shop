import { useContext } from "react";
import { Context } from "../context/Context";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { likedProducts, toggleLike } = useContext(Context);

  if (likedProducts.length === 0) {
    return (
      <div className="text-center text-2xl mt-20 text-gray-500">
        There are no any favorite products
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Favorite Products
      </h1>
      <div className="flex flex-col gap-5">
        {likedProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
            <div className="flex-1 w-full text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-700">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {product.description.slice(0, 46)}...
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="text-green-600 font-bold text-lg">
                ${product.price}
              </span>
              <button
                onClick={() => toggleLike(product)}
                className="text-red-500 hover:text-red-600 p-2 rounded-full border border-red-200 hover:border-red-400 transition"
                title="Unlike"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
