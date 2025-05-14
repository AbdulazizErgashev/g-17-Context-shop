import Navbar from "./components/Navbar";
import { ContextProvider } from "./context/Context";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <ContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ContextProvider>
  );
}
