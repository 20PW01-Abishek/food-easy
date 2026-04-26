import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";

import { useStateValue } from "../../context/StateProvider";
import { categories } from "../../utils/data";
import RowContainer from "./RowContainer";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");

  const [{ foodItems }] = useStateValue();

  return (
    <section className="w-full my-6" id="menu">
      <div
        id="hot"
        className="w-full flex flex-col items-center justify-center"
      >
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-foodEasyPrimary transition-all ease-in-out duration-100 mr-auto">
          Our Menu
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                whileHover={{ scale: 1.2 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName
                    ? "bg-foodEasyPrimary"
                    : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-foodEasyPrimary `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-foodEasyPrimary"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
