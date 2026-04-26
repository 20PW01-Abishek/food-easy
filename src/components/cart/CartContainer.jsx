import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiMinimize2 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import EmptyCart from "../../img/emptyCart.svg";
import { CheckoutModal } from "../checkout";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const showCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.qty * item.price, 0,
    );
    setTot(totalPrice);
  }, [cartItems, flag]);

  const clearCart = () => {
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: [] });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-2xl flex flex-col z-[101]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="cursor-pointer text-muted hover:text-textColor transition-colors"
          onClick={showCart}
        >
          <FiMinimize2 size={18} />
        </motion.div>

        <p className="text-base font-semibold text-textColor tracking-wide">
          Cart
          {cartItems.length > 0 && (
            <span className="ml-2 text-xs font-medium text-white bg-foodEasyPrimary rounded-full px-2 py-0.5">
              {cartItems.length}
            </span>
          )}
        </p>

        <motion.button
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-1 text-xs text-error cursor-pointer hover:opacity-75 transition-opacity font-medium"
          onClick={clearCart}
        >
          Clear <MdDeleteForever size={15} />
        </motion.button>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="flex flex-col flex-1 overflow-hidden bg-cartBg rounded-t-3xl mt-1">
          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 scrollbar-none">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
            ))}
          </div>

          {/* Footer */}
          <div className="bg-cartTotal rounded-t-3xl px-5 pt-4 pb-5 flex flex-col gap-3">
            {/* Totals */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-mutedLight">Subtotal</p>
                <p className="text-sm text-mutedLight">$ {tot.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-mutedLight">Delivery</p>
                <p className="text-sm text-mutedLight">$ 2.50</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-borderDark">
                <p className="text-base font-semibold text-white">Total</p>
                <p className="text-base font-semibold text-white">
                  $ {(tot + 2.5).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Checkout button */}
            {user ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setShowCheckout(true)}
                className="w-full py-3 rounded-full bg-foodEasyPrimary text-white text-sm font-semibold tracking-wide hover:shadow-lg cursor-pointer transition-all"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                className="w-full py-3 rounded-full bg-foodEasyPrimary text-white text-sm font-semibold tracking-wide hover:shadow-lg cursor-pointer transition-all"
              >
                Login to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-4">
          <img src={EmptyCart} className="w-48 opacity-80" alt="" />
          <p className="text-base font-semibold text-textColor">Your cart is empty</p>
          <p className="text-sm text-muted">Add some items to get started</p>
        </div>
      )}

      {showCheckout && (
        <CheckoutModal tot={tot} onClose={() => setShowCheckout(false)} />
      )}
    </motion.div>
  );
};

export default CartContainer;
