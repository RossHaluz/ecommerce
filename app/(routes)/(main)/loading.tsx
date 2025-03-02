import React from "react";

const Loading = () => {
  return (
    <div className="flex items-start gap-4 container mt-[70px] mb-6">
      <div className="hidden lg:block bg-gray-200 w-1/3 h-[500px] rounded-md" />

      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex items-center justify-between">
          <div className="w-full h-16 rounded-md bg-gray-200 md:w-[300px]" />
          <div className="hidden md:block w-full h-16 rounded-md bg-gray-200 md:w-[300px]" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full h-[400px] bg-gray-200 rounded-md" />
          <div className="w-full h-[400px] bg-gray-200 rounded-md" />
          <div className="w-full h-[400px] bg-gray-200 rounded-md" />
          <div className="w-full h-[400px] bg-gray-200 rounded-md" />
          <div className="w-full h-[400px] bg-gray-200 rounded-md" />
          <div className="w-full h-[400px] bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
