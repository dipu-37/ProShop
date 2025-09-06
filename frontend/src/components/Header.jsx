import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {useLogoutMutation} from "../features/userApiSlice";
import { logout } from "../features/authSlice";
import { resetCart } from "../features/cartSlice";



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // access the cart state
  const cart = useSelector((state) => state.cart);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="bg-slate-700 text-white px-6 py-4 md:flex md:items-center md:justify-between">
      {/* Left - Logo */}
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ProShop
        </Link>

        {/* Hamburger for Mobile */}
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
        } md:flex md:items-center md:justify-between md:flex-row-reverse mt-2 md:mt-0 gap-4`}
      >
        {/* Right side dropdowns */}
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
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="cursor-pointer flex items-center gap-1"
            >
              Admin <IoMdArrowDropdown />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-40"
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

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="cursor-pointer flex items-center gap-1"
            >
              User <IoMdArrowDropdown />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-40"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search Products..."
            className="input input-bordered w-40 md:w-64 text-black"
          />
          <button className="btn btn-outline btn-success">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
