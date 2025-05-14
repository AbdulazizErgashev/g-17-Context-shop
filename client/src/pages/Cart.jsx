import { useContext } from "react";
import { Context } from "../context/Context";
import { BadgeMinus, BadgePlus, Trash } from "lucide-react";

export default function Cart() {
  const { cart, toggleCart } = useContext(Context);

  if (cart.length === 0) {
    return (
      <div className="text-center text-2xl mt-20 text-gray-500">
        There are no any products in your cart
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Favorite Products
      </h1>
      <div className="flex flex-col gap-5">
        {cart.map((product) => (
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
                {product.name.slice(0, 10)}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {product.description.slice(0, 45)}...
              </p>
              <span className="text-gray-500 font-bold text-md">
                ${product.price}
              </span>
            </div>
            <div className="flex items-center gap-8 mt-4 sm:mt-0">
              <div className="flex items-center gap-3">
                <button
                  className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-tr from-red-400 to-red-600 rounded-full shadow hover:scale-110 active:scale-95 transition-all duration-200"
                  title="Decrease quantity"
                >
                  <BadgeMinus className="w-5 h-5" />
                </button>
                <span className="text-gray-700 font-semibold text-lg select-none">
                  1
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-tr from-green-400 to-green-600 rounded-full shadow hover:scale-110 active:scale-95 transition-all duration-200"
                  title="Increase quantity"
                >
                  <BadgePlus className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => toggleCart(product)}
                className="text-red-500 hover:text-red-600 p-2 rounded-full border border-red-200 hover:border-red-400 transition"
                title="Delete"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
