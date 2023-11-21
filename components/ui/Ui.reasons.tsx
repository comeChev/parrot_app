import { BsPinMapFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import HomeReasonsItem from "../site/home/Home.reasons.item";
import { LiaCertificateSolid } from "react-icons/lia";
import React from "react";
import SeparatorImage from "./Ui.separator.image";
import outils from "@/assets/home/outils.jpg";

const reasonItems = [
  {
    Icon: FaHandsHelping,
    text: "Forts de plus de 15 années d'expérience dans le métier de garagiste, nous saurons répondre à vos besoins dans les meilleurs délais.",
    title: "Expertise et réactivité",
  },
  {
    Icon: LiaCertificateSolid,
    text: "Nous disposons des qualifications et des compétences nécessaires pour vous assurer un service de qualité.",
    title: "Certifications",
  },
  {
    Icon: GiReceiveMoney,
    text: "Nous vous proposons des tarifs attractifs et respectueux de la qualité de notre travail.",
    title: "Tarifs attractifs",
  },
  {
    Icon: BsPinMapFill,
    text: "Notre emplacement idéal nous permet de vous offrir un service de proximité.",
    title: "Emplacements et réseaux",
  },
];

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
