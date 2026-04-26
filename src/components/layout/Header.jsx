import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdAdd, MdLogout,MdShoppingBasket } from "react-icons/md";
import { Link, useLocation,useNavigate } from "react-router-dom";

import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateContext";
import { app } from "../../firebase.config";
import Avatar from "../../img/avatar.png";
import Logo from "../../img/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      try {
        const { user: firebaseUser } = await signInWithPopup(
          firebaseAuth,
          provider,
        );
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
        };
        dispatch({ type: actionType.SET_USER, user: userData });
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  const logout = async () => {
    setIsMenu(false);
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
    localStorage.clear();
    dispatch({ type: actionType.SET_USER, user: null });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const scrollToTop = (e) => {
    if (location.pathname !== "/") {
      e?.preventDefault();
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToMenu = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="w-40 bg-surface shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
    >
      {user && user.email === import.meta.env.REACT_APP_ADMIN_EMAIL && (
        <Link to="/create">
          <p
            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-surfaceHover transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={() => setIsMenu(false)}
          >
            New Item <MdAdd />
          </p>
        </Link>
      )}
      <ul className="flex flex-col">
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-surfaceHover px-4 py-2"
          onClick={() => {
            setIsMenu(false);
            scrollToTop();
          }}
        >
          <Link
            to="/"
            onClick={(e) => location.pathname !== "/" && e.preventDefault()}
          >
            Home
          </Link>
        </li>
        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-surfaceHover px-4 py-2">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setIsMenu(false);
              scrollToMenu();
            }}
          >
            Menu
          </Link>
        </li>
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-surfaceHover px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/services">Services</Link>
        </li>
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-surfaceHover px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/aboutus">About Us</Link>
        </li>
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-surfaceHover px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/orders">My Orders</Link>
        </li>
      </ul>
      <p
        className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-surfaceHover gap-3 cursor-pointer hover:bg-surfaceHoverDarker transition-all duration-100 ease-in-out text-textColor text-base"
        onClick={logout}
      >
        Logout <MdLogout />
      </p>
    </motion.div>
  );

  return (
    <header className="fixed z-50 w-screen p-3 px-4 sm:p-4 sm:px-6 md:p-6 md:px-16 bg-foodEasyLite drop-shadow-md">
      <div className="flex items-center justify-between w-full h-full gap-2 sm:gap-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Food Easy" className="w-10 h-10" />
          </Link>
          <p className="text-xl font-bold">
            <span className="text-foodEasyPrimary">Food</span>{" "}
            <span className="text-textColor">Easy</span>
          </p>
        </div>

        <nav className="hidden sm:flex items-center gap-6 lg:gap-12">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-6 lg:gap-12"
          >
            <li className="hover-underline-animation text-base lg:text-lg text-textColor hover:text-foodEasyHover duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/" onClick={(e) => scrollToTop(e)}>
                Home
              </Link>
            </li>
            <li className="hover-underline-animation text-base lg:text-lg text-textColor hover:text-foodEasyHover duration-100 transition-all ease-in-out cursor-pointer">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToMenu();
                }}
              >
                Menu
              </Link>
            </li>
            <li className="hover-underline-animation text-base lg:text-lg text-textColor hover:text-foodEasyHover duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/services">Services</Link>
            </li>
            <li className="hover-underline-animation text-base lg:text-lg text-textColor hover:text-foodEasyHover duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/aboutus">About Us</Link>
            </li>
          </motion.ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <div
            className="relative flex items-center justify-center cursor-pointer"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-xl sm:text-2xl" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-foodEasyPrimary flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div
            className="relative p-1 cursor-pointer"
            onMouseEnter={() => user && setIsMenu(true)}
            onMouseLeave={() => setIsMenu(false)}
            onClick={login}
          >
            <motion.img
              whileTap={{ scale: 0.85 }}
              src={user?.photoURL || Avatar}
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] drop-shadow-xl rounded-full object-cover"
              alt="User Profile"
              onError={(e) => {
                e.currentTarget.src = Avatar;
              }}
            />
            {isMenu && menuItems}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
