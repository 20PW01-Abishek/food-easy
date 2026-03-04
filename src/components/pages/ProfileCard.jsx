import React from "react";

const ProfileCard = ({ name, image, description, email, github }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[280px]">
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center focus:outline-none"
      >
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-border ring-offset-2 transition-shadow group-hover:ring-foodEasyPrimary"
        />
        <h2 className="mt-4 text-lg font-medium text-headingColor">{name}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted text-center line-clamp-2">
            {description}
          </p>
        )}
        {email && (
          <p className="mt-1 text-xs text-mutedLight truncate max-w-full px-2">
            {email}
          </p>
        )}
        <span className="mt-3 text-xs font-medium text-foodEasyPrimary opacity-0 group-hover:opacity-100 transition-opacity">
          View profile →
        </span>
      </a>
    </div>
  );
};

export default ProfileCard;
