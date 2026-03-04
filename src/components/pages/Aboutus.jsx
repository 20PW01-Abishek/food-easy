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
    <div>
      <div className="text-center my-5 text-3xl">About us</div>
      <div className="text-center my-5 text-xl">Just a pair of wierdos</div>
      <div className="flex justify-center flex-wrap mt-10 space-x-4">
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
