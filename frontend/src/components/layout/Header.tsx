import React, { useState } from "react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import clsx from "clsx";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isToggling, setIsToggling] = useState<boolean>(false);

  const handleToggle = () => {
    setIsToggling(true);
    toggleTheme();
    setTimeout(() => setIsToggling(false), 300);
  };

  return (
    <header className="sticky top-0 z-50 w-full  dark:bg-[#1e2233] dark:text-[#cdd6f4] bg-[#f4f0ec] text-[#4c4769] shadow-md">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center">
          <img src="/site-logo.svg" alt="Logo" className="h-8 w-auto" />
          <p className="ml-4">Movie App</p>
        </Link>
        <button
          onClick={handleToggle}
          className="text-2xl relative transition-transform duration-300 focus:outline-none"
          aria-label="Toggle Theme"
        >
          <span
            className={clsx(
              "block transition-transform duration-300",
              isToggling && "rotate-180"
            )}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
