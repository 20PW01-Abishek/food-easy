import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import Logo from "../../img/logo.png";
import Avatar from "../../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Header = () => {
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
        dispatch({
          type: actionType.SET_USER,
          user: firebaseUser.providerData[0],
        });
        localStorage.setItem(
          "user",
          JSON.stringify(firebaseUser.providerData[0]),
        );
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({ type: actionType.SET_USER, user: null });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const menuItems = (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
    >
      {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <Link to="/create">
          <p
            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={() => setIsMenu(false)}
          >
            New Item <MdAdd />
          </p>
        </Link>
      )}
      <ul className="flex flex-col">
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/#menu">Menu</Link>
        </li>
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/aboutus">About Us</Link>
        </li>
        <li
          className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
          onClick={() => setIsMenu(false)}
        >
          <Link to="/services">Services</Link>
        </li>
      </ul>
      <p
        className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
        onClick={logout}
      >
        Logout <MdLogout />
      </p>
    </motion.div>
  );

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-blue-50 drop-shadow-md">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="Foodeasy Logo" />
          <p className="text-headingColor text-xl font-bold">Foodeasy</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24"
          >
            <li className="hover-underline-animation text-lg text-textColor hover:text-sky-700 duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover-underline-animation text-lg text-textColor hover:text-sky-700 duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/#menu">Menu</Link>
            </li>
            <li className="hover-underline-animation text-lg text-textColor hover:text-sky-700 duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/aboutus">About Us</Link>
            </li>
            <li className="hover-underline-animation text-lg text-textColor hover:text-sky-700 duration-100 transition-all ease-in-out cursor-pointer">
              <Link to="/services">Services</Link>
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="User Profile"
              onClick={login}
            />
            {isMenu && menuItems}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="Foodeasy Logo" />
          <p className="text-headingColor text-xl font-bold">FoodEasy</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="User Profile"
            onClick={login}
          />
          {isMenu && menuItems}
        </div>
      </div>
    </header>
  );
};

export default Header;
