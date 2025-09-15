import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../features/userApiSlice";
import { logout } from "../features/authSlice";
import { resetCart } from "../features/cartSlice";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoIosArrowDropdown } from "react-icons/io";
import SearchBox from "./SearchBox";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();


  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="bg-slate-700 text-white md:px-6 py-4 md:flex md:items-center md:justify-between px-4 sm:px-6 lg:px-8">
      {/* Logo + Hamburger */}
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ProShop
        </Link>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:items-center md:flex-row-reverse mt-2 md:mt-0 gap-4`}
      >
        {/* Right side: Cart / Admin / User */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          {/* Cart */}
          <Link
            to="/cart"
            className="btn btn-ghost btn-circle relative flex items-center"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart?.cartItem?.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            </div>
          </Link>

          {/* Admin Dropdown */}
          {userInfo?.isAdmin && (
            <div className="relative dropdown">
              <button
                tabIndex={0}
                className="cursor-pointer flex items-center gap-1 btn btn-ghost hover:bg-gray-600 border-white"
              >
                Admin <IoIosArrowDropdown />
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content absolute bottom-full left-0 mb-2 sm:top-full sm:bottom-auto sm:left-auto bg-white text-black rounded-box shadow z-50 w-40"
              >
                <li>
                  <Link to="/admin/products">Products</Link>
                </li>
                <li>
                  <Link to="/admin/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/admin/users">Users</Link>
                </li>
              </ul>
            </div>
          )}

          {/* User Avatar Dropdown */}
          <div className="relative dropdown">
            {userInfo ? (
              <div className="relative dropdown">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        userInfo.avatar ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt={userInfo.name}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content absolute bottom-full mb-2 sm:top-full sm:bottom-auto lg:right-0 sm:left-auto
                 bg-white text-gray-500 rounded-box shadow z-50 w-full sm:w-48 max-w-xs"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline border-e-white text-white hover:bg-gray-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Search Form */}
       <SearchBox></SearchBox>
      </div>
    </header>
  );
};

export default Header;
