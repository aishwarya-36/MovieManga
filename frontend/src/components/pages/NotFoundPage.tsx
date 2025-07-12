import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen flex  flex-col items-center justify-center">
      <p className="text-4xl font-semibold">Oops !! 404 Page not found.</p>
      <Link
        to="/"
        className="ml-4 mt-4 px-4 py-2 bg-[#4c4769] text-white dark:bg-[#cdd6f4] dark:text-[#24273a] rounded-xl hover:opacity-90 transition"
      >
        ← Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
