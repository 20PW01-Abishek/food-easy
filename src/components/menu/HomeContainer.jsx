import React from "react";
import Delivery from "../../img/delivery.png";
import { heroData } from "../../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center hover:scale-125 bg-foodEasyLite px-4 py-1 rounded-full">
          <p className="text-base text-foodEasyPrimary font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Craziness and Foodiness
          <span className="text-foodEasyPrimary text-[3rem] lg:text-[5rem]">
            <br></br>At Your Doorstep.
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          FoodEasy is perhaps one of the emerging food outlets and eateries in
          Tamilnadu. We offer a variety of products and food items at nominal
          rates. We are also very much heath conscious and all the dishes are
          prepared with much care and love. The fruits that you see are grown in
          our own farm in an organic way. So, why wait? We are here to deliver
          everything at your door step !!!
        </p>

        <button
          type="button"
          className="bg-foodEasyPrimary w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg hover:scale-110 transition-all ease-in-out duration-100"
        >
          <a href="#menu" className="text-white">
            Order now
          </a>
        </button>
      </div>
      <div className="flex items-center justify-center relative">
        <div
          className="mx-5 w-4/5 h-650 rounded-2xl"
          style={{
            background:
              "linear-gradient(to bottom, var(--food-easy-primary), var(--food-easy-lite))",
          }}
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-10 my-5 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={n.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                  alt="I1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-muted font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-foodEasyPrimary">$</span>{" "}
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
