import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "../cart/CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [directionChange, setDirectionChange] = useState(false);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-foodEasyPrimary transition-all ease-in-out duration-100">
            What's healthier than Fresh Fruits ?
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="w-8 h-8 rounded-lg bg-foodEasyBorder hover:bg-foodEasyPrimary cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => {
                if (directionChange) {
                  setDirectionChange(false);
                  setScrollValue(-300);
                } else {
                  setScrollValue(scrollValue - 300);
                }
              }}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="w-8 h-8 rounded-lg bg-foodEasyBorder hover:bg-foodEasyPrimary cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => {
                if (!directionChange) {
                  setDirectionChange(true);
                  setScrollValue(0 + 300);
                } else {
                  setScrollValue(scrollValue + 300);
                }
              }}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
