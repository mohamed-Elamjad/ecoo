import { useState } from "react";
import { FiGrid } from "react-icons/fi";

import {
  AlignJustify,
  ChevronDown,
  CircleUserRound,
  LogOut,
  Logs,
  User,
  Heart,
  X,
  ShoppingCart,
} from "lucide-react";
import Search from "../../Product/Search";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import Images from "../../images";
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header className="font-[sans-serif] py-4 px-4 bg-white shadow-md  min-h-[80px] relative z-50">
        <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
          {/* logo */}
          <Link to="/">
            <img src={Images.Logo} alt="logo"  className="ml-2 w-20 h-20"/>
          </Link>
          {/* search bar mobile dev*/}
          <div className="sm:hidden   block">
            <Search />
          </div>
          {/* Menu for larger screens */}
          <div className="lg:ml-10 hidden  lg:block">
            <ul className="flex gap-x-4 ml-20">
              <li>
                <Link
                  to="/"
                  className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                >
                  Home
                </Link>
              </li>

              <li>
                {" "}
                <Link
                  to="/products"
                  className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                >
                  {" "}
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-x-6 gap-y-4 ml-auto">
            {/* Search  all scren*/}
            <div className="hidden  sm:block">
              <Search />
            </div>

            <div className="flex items-center space-x-8">
              {/* Wishlist */}
              <Link to={"/wishList"}>
                <span className="relative cursor-pointer">
                  <Heart className="text-black hover:text-blue-500" />
                  <span className="absolute left-auto -ml-[-17px] -top-1 rounded-full bg-red-400 px-[6px]  py-[1px] text-[10px] text-black">
                    0
                  </span>
                </span>
              </Link>
              {/* Cart */}

              <Link to="/cart">
                <span className="relative cursor-pointer">
                  <ShoppingCart className="text-black hover:text-blue-500" />
                  <span className="absolute left-auto -ml-[-17px] -top-1 rounded-full bg-red-400 px-[6px]  py-[1px] text-[10px] text-black">
                    {cartItems?.length}
                  </span>
                </span>
              </Link>

              {isAuthenticated ? (
                <div className="group  relative">
                  <p className=" cursor-pointer flex text-black  hover:text-blue-500">
                    <CircleUserRound className=" text-black  hover:text-blue-500" />{" "}
                    <ChevronDown className="text-black  hover:text-blue-500" />
                  </p>
                  <ul className="absolute  top-10 max-lg:top-8 right-2  z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[160px] group-hover:opacity-100 group-hover:max-h-[700px] px-2 group-hover:pb-2  group-hover:pt-2 transition-all duration-500">
                    <li className="border-b py-3">
                      {/* profile */}
                      <Link
                        to="/account"
                        className="flex items-center gap-4 cursor-pointer hover:text-blue-500 hover:fill-[#3b82f6] text-black  text-[13px]"
                      >
                        <User size="18px" />
                        Voir profil
                      </Link>
                    </li>

                    {/* order */}
                    <li className="border-b py-3">
                      <Link
                        to="account/orders"
                        className="flex items-center gap-4 cursor-pointer hover:text-blue-500 hover:fill-[#3b82f6] text-black  text-[13px]"
                      >
                        <Logs size="18px" />
                        Orders
                      </Link>
                    </li>

                    {/* role */}
                    {user && user.role === "admin" && (
                      <li className="border-b py-3">
                        <Link
                          to="/admin"
                          className="flex items-center gap-4 cursor-pointer hover:text-blue-500 hover:fill-[#3b82f6] text-black  text-[13px]"
                        >
                          <FiGrid size="18px" />
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {/* logout */}

                    <li className="border-b py-3">
                      <p
                        onClick={handleLogout}
                        className="flex items-center gap-4 cursor-pointer hover:text-blue-500 hover:fill-[#3b82f6] text-black  text-[13px]"
                      >
                        <LogOut size="17px" />
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              ) : (
                // login
                <Link to="/login">
                  <button className="px-5 py-2  rounded-full text-white border-[1px]  border-gray-300 bg-blue-500 transition duration-200 ease-in-out   hover:bg-blue-600">
                    Login{" "}
                  </button>
                </Link>
              )}

              {/* Button to open menu on small screens */}
              <button onClick={toggleMenu} className="lg:hidden">
                <AlignJustify className="text-black hover:text-blue-500" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden fixed inset-0 bg-white z-50 shadow-md">
              <div className="border-b-2">
                <Link to="/">
                <img src={Images.Logo} alt="logo"  className="w-20 h-20"/>
                </Link>
                {/* Button to close menu */}
                <button
                  onClick={toggleMenu}
                  className="absolute top-2 right-4  z-[100] border-2 rounded-full bg-white p-3"
                >
                  <X className="text-black hover:text-blue-500" />
                </button>
              </div>
              <ul className="space-y-3 my-5 ml-6">
                <li>
                  <Link
                    to="/"
                    className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link
                    to="/products"
                    className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                  >
                    {" "}
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-black  transition-all duration-200 hover:text-blue-500  hover:underline  font-medium block"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <Breadcrumb />
    </div>
  );
};

export default Header;
