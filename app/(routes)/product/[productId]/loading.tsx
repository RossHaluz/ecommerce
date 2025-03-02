import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 container my-6">
      <div className="w-full h-[400px] bg-gray-200 rounded-md" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-1/3 h-9 bg-gray-200 rounded-md" />
          <div className="w-1/5 h-9 bg-gray-200 rounded-md" />
        </div>
        <div className="w-1/3 h-9 bg-gray-200 rounded-md" />
        <div className="w-full h-14 bg-gray-200 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="w-1/6 h-9 bg-gray-200 rounded-md" />
          <div className="w-1/6 h-9 bg-gray-200 rounded-md" />
        </div>
        <div className="w-1/5 h-9 bg-gray-200 rounded-md" />
        <div className="w-1/5 h-9 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
