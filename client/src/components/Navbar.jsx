import { useState } from "react";
import { Heart, Menu, Package, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const navItems = [
    { to: "/", icon: <Package className="w-6 h-6" />, title: "Home" },
    {
      to: "/favorites",
      icon: <Heart className="w-6 h-6" />,
      title: "Favorites",
    },
    {
      to: "/cart",
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Cart",
    },
  ];

  return (
    <nav className="bg-white border-b-2 border-blue-500">
      <div className="container mx-auto py-10 px-5 md:px-0 flex gap-10 items-center justify-between">
        <Link to="/">
          <h1 className="text-3xl text-blue-500 font-bold">Logo</h1>
        </Link>

        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-blue-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full max-w-xs"
        />

        <ul className="hidden md:flex gap-10 text-blue-500 text-xl font-bold tracking-widest">
          {navItems.map((links) => (
            <li key={links.title}>
              <NavLink
                to={links.to}
                className={({ isActive }) =>
                  `p-2 rounded-lg transition-colors duration-200 hover:bg-blue-100 flex items-center gap-3 ${
                    isActive ? "bg-blue-100" : ""
                  }`
                }
              >
                {links.icon} {links.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="sm:hidden text-blue-600"
          onClick={handleOpen}
          aria-label="Toggle Menu"
        >
          <Menu className="w-7 h-7" />
        </button>

        {open && (
          <div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`sm:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 px-6 py-8 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-6 text-blue-600 font-semibold text-lg">
            {navItems.map((links) => (
              <li key={links.title}>
                <NavLink
                  to={links.to}
                  onClick={handleOpen}
                  className={({ isActive }) =>
                    `p-2 rounded-lg transition-colors duration-200 hover:bg-blue-100 flex items-center justify-start gap-3 ${
                      isActive ? "bg-blue-100" : ""
                    }`
                  }
                >
                  {links.icon} {links.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
