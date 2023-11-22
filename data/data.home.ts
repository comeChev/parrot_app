import {
  BsCarFrontFill,
  BsPersonWorkspace,
  BsPinMapFill,
  BsStars,
} from "react-icons/bs";

import { FaHandsHelping } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { LiaCertificateSolid } from "react-icons/lia";
import vente from "@/assets/home/vente.jpeg";

export const reasonItems = [
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

export const assetsItems = [
  {
    Icon: BsStars,
    title: "Des experts à votre service",
    text: "Des mécaniciens expérimentés à votre service pour répondre à vos demandes que vous ayez déjà confié un véhicule ou que vous ne soyez pas encore client.",
  },
  {
    Icon: BsCarFrontFill,
    title: "Des véhicules d’occasions vérifiés, entretenus et certifiés",
    text: "Tous les jours, nos techniciens assurent l’entretien et la révisions des véhicules qui nous sont confiés à la vente.",
  },
  {
    Icon: BsPersonWorkspace,
    title: "Un suivi personnalisé de votre dossier",
    text: "De la prise en charge de véhicule au retour de celui-ci, nos experts vous tiennent informés de l’avancée des travaux et répondent à vos questions.",
  },
  {
    Icon: GrServices,
    title: "Des produits et des prestations de qualité",
    text: "Nous prêtons une attention toute particulière à la provenance et la qualité de nos produits. Nos prestations sont donc dans la même lignée.",
  },
];

export const carItem = {
  imageSrc: vente,
  text: "Véhicules en bon état et révisés cherchent propriétaires pour couler des jours heureux. Nous nous chargeons de vous mettre en relation.",
  title: "Vente de véhicules d'occasion",
  url: "/cars",
};
