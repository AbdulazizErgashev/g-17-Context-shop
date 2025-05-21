import { useContext } from "react";
import { Context } from "../context/Context";
import { Heart, ShoppingCart } from "lucide-react";

export default function Products() {
  const { products, toggleLike, likedProducts, toggleCart } =
    useContext(Context);

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center gap-y-10 my-20">
        {products.map((mahsulot) => {
          const isLiked = likedProducts.some((p) => p._id === mahsulot._id);
          return (
            <div
              key={mahsulot._id}
              className="w-[20rem] h-[25rem] relative flex flex-col items-center shadow-xl hover:shadow-2xl gap-10 p-10 rounded-2xl"
            >
              <span className="absolute top-0 left-0 bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-tl-2xl text-sm shadow-md">
                {mahsulot.count} remained
              </span>
              <button
                className={`absolute top-3 right-3 p-2 border rounded-full ${
                  isLiked
                    ? "text-red-500 border-red-500"
                    : "text-gray-500 border-gray-500"
                }`}
                onClick={() => toggleLike(mahsulot._id)}
              >
                <Heart />
              </button>
              <img
                src={mahsulot.image}
                alt={mahsulot.name}
                className="size-[60%] object-contain"
              />
              <div>
                <h1 className="text-xl text-blue-500 text-center font-bold">
                  {mahsulot.name.slice(0, 10)}
                </h1>
                <p className="text-center font-medium">
                  {mahsulot.description.slice(0, 45)}
                </p>
              </div>
              <span className="absolute bottom-0 left-0 p-5 text-green-500 font-bold tracking-widest">
                ${mahsulot.price}
              </span>

              <button
                className="absolute bottom-0 right-0 p-5 text-green-500"
                onClick={() => toggleCart(mahsulot)}
              >
                <ShoppingCart />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
