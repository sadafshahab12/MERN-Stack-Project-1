import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Cart from "../views/Cart";
import { useCart } from "./ContextReducer";
import toast from "react-hot-toast";

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [cartView, setCartView] = useState(false);
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const data = useCart();
  const handleMenu = () => {
    setIsToggle(!isToggle);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-orange-400 after:transition-all after:duration-300"
      : "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full";
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout Successfully.Thank you for visiting! ", {
      duration: 2000,
    });
    navigate("/login");
  };
  return (
    <header className="bg-slate-800 text-white fixed z-10 w-full top-0 left-0">
      <div className="flex py-5 px-10 justify-between items-center max-w-7xl mx-auto relative">
        <div className="logo">
          <span className="text-lg">
            <a href="/">Food App</a>
          </span>
        </div>
        {/* web navbar  */}
        <nav className="md:flex hidden text-sm  items-center ">
          <div className="space-x-10">
            <Link to="/" className={`${isActive("/")}`}>
              Home
            </Link>
            {authToken ? (
              <Link to="/my-order" className={`${isActive("/my-order")}`}>
                My Order
              </Link>
            ) : (
              ""
            )}
            <Link to="/about" className={`${isActive("/about")}`}>
              About
            </Link>
            <Link to="/contact" className={`${isActive("/contact")}`}>
              Contact
            </Link>
          </div>
        </nav>
        <div className="text-sm">
          {!authToken ? (
            <div className="hidden md:flex justify-center items-center gap-2">
              <Link
                to="/login"
                className="bg-orange-300 py-1 px-4 text-black rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-orange-300 py-1 px-4 text-orange-300 rounded-md"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex  justify-center items-center gap-2">
              <div
                className="bg-orange-300 py-1 px-2 text-black rounded-md relative cursor-pointer"
                onClick={() => setCartView(true)}
              >
                <IoCartOutline size={22} />
                <p className="h-5 w-5 bg-slate-500 text-white rounded-full absolute flex justify-center items-center -top-2 -left-2 border border-amber-400 text-[12px] ">
                  {data.length}
                </p>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  {" "}
                  <Cart closeCart={() => setCartView(false)} />
                </Modal>
              ) : null}
              <button
                onClick={handleLogout}
                className=" border border-orange-300 py-1 px-2 text-orange-300 rounded-md text-[10px] flex items-center gap-2 cursor-pointer"
              >
                <IoIosLogOut size={22} />
                <p>Logout</p>
              </button>
            </div>
          )}
        </div>
        {/* mobile navbar  */}
        <nav
          className={`md:hidden block absolute top-14 ${
            isToggle ? "left-0" : "-left-full"
          } bg-slate-800 w-full h-screen z-50 transition-all ease-in duration-300`}
        >
          <div className="flex flex-col items-center p-5 gap-8">
            <Link to="/" className={`${isActive("/")}`} onClick={handleMenu}>
              Home
            </Link>
            {authToken ? (
              <Link
                to="/my-order"
                className={`${isActive("/my-order")}`}
                onClick={handleMenu}
              >
                My Order
              </Link>
            ) : (
              ""
            )}
            <Link
              to="/about"
              className={`${isActive("/about")}`}
              onClick={handleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${isActive("/contact")}`}
              onClick={handleMenu}
            >
              Contact
            </Link>
          </div>
          <div className="text-sm">
            {!authToken ? (
              <div className="flex flex-col justify-center items-center gap-8">
                <Link
                  to="/login"
                  className="bg-orange-300 py-1 px-4 text-black rounded-md"
                  onClick={handleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-orange-300 py-1 px-4 text-orange-300 rounded-md"
                  onClick={handleMenu}
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-8">
                <div
                  className="bg-orange-300 py-1 px-2 text-black rounded-md relative cursor-pointer"
                  onClick={() => {
                    setCartView(true), handleMenu();
                  }}
                >
                  <IoCartOutline size={22} />
                  <p className="h-5 w-5 bg-slate-500 text-white rounded-full absolute flex justify-center items-center -top-2 -left-2 border border-amber-400 text-[12px] ">
                    {data.length}
                  </p>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    {" "}
                    <Cart closeCart={() => setCartView(false)} />
                  </Modal>
                ) : null}
                <button
                  onClick={() => {
                    handleLogout();
                    handleMenu();
                  }}
                  className="border border-orange-300 py-1 px-2 text-orange-300 rounded-md text-[10px] flex items-center gap-2 cursor-pointer"
                >
                  <IoIosLogOut size={22} />
                  <p>Logout</p>
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="md:hidden block">
          {isToggle ? (
            <IoClose
              size={20}
              className="cursor-pointer "
              onClick={handleMenu}
            />
          ) : (
            <HiMenuAlt3
              size={20}
              className="cursor-pointer"
              onClick={handleMenu}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
