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
        setIsLoading(!isLoading);
      } catch (error) {
        console.error("There some errors during fetching api", error);
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

  const toggleLike = (product) => {
    const isAlreadyLiked = likedProducts.some((p) => p.id === product.id);
    if (isAlreadyLiked) {
      setLikedProducts(likedProducts.filter((p) => p.id !== product.id));
      Swal.fire({
        icon: "warning",
        title: "Product unliked!",
        text: `${product.title.slice(0, 20)} unliked.`,
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      setLikedProducts([...likedProducts, product]);
      Swal.fire({
        icon: "success",
        title: "Product liked!",
        text: `${product.title.slice(0, 20)} liked.`,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  const toggleCart = (product) => {
    const isAlreadyAdded = cart.some((p) => p.id === product.id);
    if (isAlreadyAdded) {
      setCart(cart.filter((p) => p.id !== product.id));
      Swal.fire({
        icon: "warning",
        title: "Product deleted from Cart!",
        text: `${product.title.slice(0, 20)} deleted.`,
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      setCart([...cart, product]);
      Swal.fire({
        icon: "success",
        title: "Product added to Cart!",
        text: `${product.title.slice(0, 20)} added.`,
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 bg-blue-500"></div>
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
