import React from "react";

function Loading() {
  return (
    <div className="container mx-auto min-h-[calc(100vh-80px-100px)] w-full flex items-center justify-center relative">
      <div className="h-[250px] w-[250px] rounded-full overflow-hidden relative shadow-2xl  animate-wiggle -rotate-[120deg] border-b-8 border-b-red-800 border-r-[6px] border-r-black" />

      <p className="font-title text-2xl text-gray-600 font-bold absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        Chargement
      </p>
    </div>
  );
}

export default Loading;
