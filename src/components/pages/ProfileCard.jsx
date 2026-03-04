import React from "react";

const ProfileCard = ({ name, image, description, email, github }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 w-72 transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="relative -mx-6 -mt-6 mb-4 h-24 bg-gradient-to-br from-foodEasyPrimary to-foodEasySecondary" />
      <img
        className="relative mx-auto w-24 h-24 -mt-16 rounded-full border-4 border-white shadow-lg object-cover ring-2 ring-foodEasyLite"
        src={image}
        alt={name}
      />
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-headingColor">{name}</h2>
        <hr className="my-3 w-12 mx-auto border-foodEasyBorder" />
        <p className="text-sm font-medium text-foodEasyPrimary">
          {description}
        </p>
        <p className="text-sm text-gray-500 mt-1 truncate px-2">{email}</p>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 py-2.5 px-6 rounded-full bg-foodEasyPrimary text-white font-semibold text-sm hover:bg-foodEasyHover transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          CONTACT
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
