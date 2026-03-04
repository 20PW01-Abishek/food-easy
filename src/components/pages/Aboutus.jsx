import React from "react";
import ProfileCard from "./ProfileCard";

const Aboutus = () => {
  const profiles = [
    {
      name: "Abishek A",
      image: "https://avatars.githubusercontent.com/20pw01-Abishek",
      description: "Software Systems",
      email: "20pw01@psgtech.ac.in",
      github: "https://github.com/20pw01-Abishek",
    },
    {
      name: "Trisha M",
      image: "https://avatars.githubusercontent.com/tri-m",
      description: "Software Systems",
      email: "20pw39@psgtech.ac.in",
      github: "https://github.com/tri-m",
    },
  ];

  return (
    <div className="min-h-[60vh] py-12">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-headingColor tracking-tight">About us</h1>
        <p className="text-xl text-gray-600 mt-2">Just a pair of weirdos</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-12 px-4">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            image={profile.image}
            description={profile.description}
            email={profile.email}
            github={profile.github}
          />
        ))}
      </div>
    </div>
  );
};

export default Aboutus;
