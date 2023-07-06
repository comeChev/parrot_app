import React from "react";
import outils from "@/assets/home/outils.jpg";
import SeparatorImage from "./Ui.separator.image";
import { FaHandsHelping } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { GiReceiveMoney } from "react-icons/gi";
import { BsPinMapFill } from "react-icons/bs";
import HomeReasonsItem from "../site/home/Home.reasons.item";

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
        <h3 className="text-3xl font-bold mb-10">
          Pourquoi choisir notre garage
        </h3>
        <div className="flex flex-col md:flex-row md:space-x-5">
          {reasonItems.map((r) => (
            <HomeReasonsItem Icon={r.Icon} text={r.text} title={r.title} />
          ))}
        </div>
      </section>
    </>
  );
}
