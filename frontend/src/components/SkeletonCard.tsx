import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="w-[300px] h-[400px] rounded-3xl bg-gray-300 dark:bg-gray-700 animate-pulse" />
  );
};

export default SkeletonCard;
