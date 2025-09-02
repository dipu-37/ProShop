import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-24 h-24 border-8 border-t-8 border-gray-200 border-t-slate-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
