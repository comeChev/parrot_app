import React from "react";
import { BsHourglassSplit } from "react-icons/bs";

export default function loading() {
  return (
    <div className="px-4 mt-10 min-h-screen container">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center">
          <BsHourglassSplit className="text-3xl animate-spin mr-5" />
          <h1>Chargement en cours</h1>
        </div>
      </div>
    </div>
  );
}
