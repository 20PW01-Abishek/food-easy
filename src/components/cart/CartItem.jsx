import { motion } from "framer-motion";
import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateContext";

const CartItem = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const updateCart = (next) => {
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: next });
    localStorage.setItem("cartItems", JSON.stringify(next));
  };

  const increment = () => {
    const next = cartItems.map((c) =>
      c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
    );
    updateCart(next);
  };

  const decrement = () => {
    const next =
      item.qty === 1
        ? cartItems.filter((c) => c.id !== item.id)
        : cartItems.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty - 1 } : c,
          );
    updateCart(next);
  };

  return (
    <div className="w-full px-3 py-2.5 rounded-xl bg-cartItem flex items-center gap-3">
      <img
        src={item?.imageURL}
        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
        alt=""
      />

      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{item?.title}</p>
        <p className="text-xs text-mutedLight mt-0.5">
          $ {(parseFloat(item?.price) * item.qty).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 bg-cartBg rounded-full px-2 py-1 flex-shrink-0">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="cursor-pointer text-mutedLight hover:text-white transition-colors"
          onClick={decrement}
        >
          <BiMinus size={14} />
        </motion.div>

        <p className="text-white text-xs font-semibold w-4 text-center">{item.qty}</p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          className="cursor-pointer text-mutedLight hover:text-white transition-colors"
          onClick={increment}
        >
          <BiPlus size={14} />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
