import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState(
    JSON.parse(localStorage.getItem("yoqtirilgan")) || []
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("savatcha")) || []
  );

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products-api");
        setProducts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("API dan ma'lumot olishda xatolik:", error);
      }
    };

    fetchedData();
  }, []);

  useEffect(() => {
    localStorage.setItem("yoqtirilgan", JSON.stringify(likedProducts));
  }, [likedProducts]);

  useEffect(() => {
    localStorage.setItem("savatcha", JSON.stringify(cart));
  }, [cart]);

  const toggleLike = (productId) => {
    const product = products.find((p) => p._id === productId);
    const isAlreadyLiked = likedProducts.some((p) => p._id === productId);

    if (!product) {
      Swal.fire({
        icon: "error",
        title: "Mahsulot topilmadi!",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    if (isAlreadyLiked) {
      setLikedProducts(likedProducts.filter((p) => p._id !== productId));
      Swal.fire({
        icon: "warning",
        title: "Yoqtirilganlardan olib tashlandi",
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      setLikedProducts([...likedProducts, product]);
      Swal.fire({
        icon: "success",
        title: "Yoqtirilganlarga qo‘shildi",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const toggleCart = (product) => {
    const isAlreadyAdded = cart.some((p) => p._id === product._id);

    if (isAlreadyAdded) {
      setCart(cart.filter((p) => p._id !== product._id));
      Swal.fire({
        icon: "warning",
        title: "Savatchadan olib tashlandi",
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      setCart([...cart, product]);
      Swal.fire({
        icon: "success",
        title: "Savatchaga qo‘shildi",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        products,
        isLoading,
        toggleLike,
        likedProducts,
        toggleCart,
        cart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
