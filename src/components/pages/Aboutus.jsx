import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

const GITHUB_USERNAMES = ["20pw01-Abishek", "tri-m"];

const Aboutus = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const results = await Promise.all(
          GITHUB_USERNAMES.map(async (username) => {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) throw new Error(`Failed to fetch ${username}`);
            const data = await res.json();
            return {
              name: data.name || data.login,
              image: data.avatar_url,
              description: data.bio || "",
              email: data.email || "",
              github: data.html_url,
            };
          }),
        );
        setProfiles(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-foodEasyPrimary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-sm text-muted">Unable to load profiles.</p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-16 md:py-24">
      <header className="text-center mb-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-headingColor tracking-tight">
          About us
        </h1>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          The people behind Food Easy
        </p>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.github}
            name={profile.name}
            image={profile.image}
            description={profile.description}
            email={profile.email}
            github={profile.github}
          />
        ))}
      </div>
    </section>
  );
};

export default Aboutus;
