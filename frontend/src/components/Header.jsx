import React from "react";
import { Link } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  return (
    <div className="navbar bg-slate-700 text-white px-6">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
          ProShop
        </Link>
      </div>

      {/* Center - Search */}
      <div className="navbar-center flex">
        <input
          type="text"
          placeholder="Search Products..."
          className="input input-bordered w-28 md:w-96 text-black"
        />
        <button className="btn btn-outline btn-success ml-2">Search</button>
      </div>

      {/* Right - Cart + User + Admin */}
      <div className="navbar-end gap-4">
        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 cursor-pointer">
          <IoCartSharp /> <span>Cart</span>
        </Link>

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="cursor-pointer flex items-center gap-1">
            razibul <IoMdArrowDropdown />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-black rounded-box w-40"
          >
            <li><Link to="/profile">Profile</Link></li>
            <li><button>Logout</button></li>
          </ul>
        </div>

        {/* Admin Dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="cursor-pointer flex items-center gap-1">
            Admin <IoMdArrowDropdown />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-black rounded-box w-40"
          >
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
