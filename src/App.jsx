import { AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  Aboutus,
  CreateContainer,
  Header,
  MainContainer,
  OrderHistory,
  Services,
} from "./components";
import { actionType } from "./context/reducer";
import { useStateValue } from "./context/StateContext";
import { getAllFoodItems } from "./utils/firebaseFunctions";

const App = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    document.title = "Food Easy";
  }, []);

  const fetchData = useCallback(async () => {
    const data = await getAllFoodItems();
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen min-h-0 flex flex-col bg-foodEasyLite">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full flex-none min-h-0">
          <Routes>
            <Route path="/create" element={<CreateContainer />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/*" element={<MainContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
