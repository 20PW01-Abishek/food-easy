import React from "react";

const ProfileCard = ({ name, image, description, email, github }) => {
  return (
    <div className="group text-white bg-beforeHover rounded-lg shadow-lg p-6 w-72 hover:bg-afterHover hover:text-black hover:scale-105 transform transition duration-500">
      <img
        className="rounded-full mx-auto w-24 border-2 border-white group-hover:bg-beforeHover transition duration-500"
        src={image}
        alt={name}
      />
      <div className="text-center mt-6">
        <h2 className="text-center text-xl font-semibold">{name}</h2>
        <hr className="my-4 border-white group-hover:border-black transition duration-500" />
        <p className="text-center font-light">{description}</p>
        <p className="text-center mt-2">{email}</p>
        <a
          className="text-center inline-block bg-afterHover text-black text-sm mt-4 py-2 px-4 rounded-full group-hover:bg-beforeHover group-hover:text-white transition duration-500"
          href={github}
        >
          CONTACT
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
