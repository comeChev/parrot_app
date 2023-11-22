import HomeReasonsItem from "../site/home/Home.reasons.item";
import React from "react";
import SeparatorImage from "./Ui.separator.image";
import outils from "@/assets/home/outils.jpg";
import { reasonItems } from "@/data/data.home";

export default function UiReasons() {
  return (
    <>
      {/* separation image */}
      <SeparatorImage image={outils} />

      {/* section 4 - reasons */}
      <section className="container mx-auto px-4 mb-[100px]">
        <h2 className="text-3xl md:text-4xl md:text-center font-bold mb-5 font-title">
          Pourquoi choisir notre garage
        </h2>
        <div className="h-[3px] bg-red-700 w-2/3 md:w-1/3 lg:w-1/4 mx-auto" />
        <div className="flex flex-wrap md:space-x-5 mt-12">
          {reasonItems.map((r, index) => (
            <HomeReasonsItem
              key={index}
              Icon={r.Icon}
              text={r.text}
              title={r.title}
            />
          ))}
        </div>
      </section>
    </>
  );
}
