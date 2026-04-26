import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: items });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.forEach((cartItem) => {
        if (cartItem.id === id) { cartItem.qty += 1; setFlag(flag + 1); }
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.forEach((cartItem) => {
          if (cartItem.id === id) { cartItem.qty -= 1; setFlag(flag + 1); }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => { items = cartItems; }, [cartItems]);

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
          $ {(parseFloat(item?.price) * qty).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 bg-cartBg rounded-full px-2 py-1 flex-shrink-0">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="cursor-pointer text-mutedLight hover:text-white transition-colors"
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus size={14} />
        </motion.div>

        <p className="text-white text-xs font-semibold w-4 text-center">{qty}</p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          className="cursor-pointer text-mutedLight hover:text-white transition-colors"
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus size={14} />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
