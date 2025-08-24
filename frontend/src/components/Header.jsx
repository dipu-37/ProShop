import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-slate-700 text-white px-4 py-2 md:flex md:items-center md:justify-between">
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
          {/* Admin Dropdown */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="cursor-pointer flex items-center gap-1">
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
            <button tabIndex={0} className="cursor-pointer flex items-center gap-1">
              razibul <IoMdArrowDropdown />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-40"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 cursor-pointer"
          >
            <IoCartSharp /> Cart
          </Link>
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
