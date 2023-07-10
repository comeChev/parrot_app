import UiImageMain from "@/components/ui/Ui.image.main";

import legalsPic from "@/assets/legals/legalsMain.jpg";
import UiTextMain from "@/components/ui/Ui.text.main";

type Link = {
  text: string;
  url: string;
};

type TextItem = {
  title: string;
  text: string[];
  link?: Link[];
};

const textItems: TextItem[] = [
  {
    title: "Mentions légales",
    text: [
      "1.1 Site (ci-après « le site ») : GARAGE V.PARROT",
      "1.2 Éditeur (ci-après « l'éditeur ») : GARAGE V.PARROT SARL au capital de 15 000€, dont le siège social est situé à Zone artisanale du Moulin, ST CLAUDE (39190) représenté par Vincent PARROT, en sa qualité de gérant, immatriculé au RCS de ST CLAUDE (39190), joignable au 0687654321 ou par mail à garage@garage_parrot.com",
      "1.3 Hébergeur (ci-après « l'hébergeur ») : OVH, dont le siège social est situé à 2 rue Kellermann, 59100 Roubaix, joignable par téléphone au 1007.",
      "1.4 Directeur de publication : Vincent PARROT",
      "1.5 Responsable de la rédaction : Vincent PARROT",
      "1.6 Délégué à la protection des données : un délégué à la protection des données (DPO) (dpo@garage_parrot.com) a été nommé par l'éditeur pour toute question relative à la protection de vos données personnelles.",
    ],
  },
  {
    title: "Accès au site",
    text: [
      "L'accès au site et son utilisation sont réservés à un usage strictement personnel. Vous vous engagez à ne pas utiliser ce site et les informations ou données qui y figurent à des fins commerciales, politiques, publicitaires et pour toute forme de sollicitation commerciale et notamment l'envoi de courriers électroniques non sollicités.",
    ],
  },
  {
    title: "Contenu du site",
    text: [
      "Toutes les marques, photographies, textes, commentaires, illustrations, images animées ou non, séquences vidéo, sons, ainsi que toutes les applications informatiques qui pourraient être utilisées pour faire fonctionner ce site et plus généralement tous les éléments reproduits ou utilisés sur le site sont protégés par les lois en vigueur au titre de la propriété intellectuelle.",
      "Ils sont la propriété pleine et entière de l'éditeur ou de ses partenaires. Toute reproduction, représentation, utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments, y compris les applications informatiques, sans l'accord préalable et écrit de l'éditeur, sont strictement interdites.",
      "Le fait pour l'éditeur de ne pas engager de procédure dès la prise de connaissance de ces utilisations non autorisées ne vaut pas acceptation desdites utilisations et renonciation aux poursuites.",
    ],
  },
  {
    title: "Gestion du site",
    text: [
      "Pour la bonne gestion du site, l'éditeur pourra à tout moment :",
      "suspendre, interrompre ou limiter l'accès à tout ou partie du site, réserver l'accès au site, ou à certaines parties du site, à une catégorie déterminée d'internautes ;",
      "supprimer toute information pouvant en perturber le fonctionnement ou entrant en contravention avec les lois nationales ou internationales ;",
      "suspendre le site afin de procéder à des mises à jour.",
    ],
  },
  {
    title: "Responsabilités",
    text: [
      "La responsabilité de l'éditeur ne peut être engagée en cas de défaillance, panne, difficulté ou interruption de fonctionnement, empêchant l'accès au site ou à une de ses fonctionnalités.",
      "Le matériel de connexion au site que vous utilisez est sous votre entière responsabilité. Vous devez prendre toutes les mesures appropriées pour protéger votre matériel et vos propres données notamment d'attaques virales par Internet. Vous êtes par ailleurs seul responsable des sites et données que vous consultez. L'éditeur ne pourra être tenu responsable en cas de poursuites judiciaires à votre encontre : du fait de l'usage du site ou de tout service accessible via Internet, du fait du non-respect par vous des présentes conditions générales.",
      "L'éditeur n'est pas responsable des dommages causés à vous-même, à des tiers et/ou à votre équipement du fait de votre connexion ou de votre utilisation du site et vous renoncez à toute action contre lui de ce fait. Si l'éditeur venait à faire l'objet d'une procédure amiable ou judiciaire en raison de votre utilisation du site, il pourra se retourner contre vous pour obtenir l'indemnisation de tous les préjudices, sommes, condamnations et frais qui pourraient découler de cette procédure.",
    ],
  },
  {
    title: "Liens hypertextes",
    text: [
      "Vos données sont collectées par la société GARAGE V.PARROT. Une donnée à caractère personnel désigne toute information concernant une personne physique identifiée ou identifiable (personne concernée) ; est réputée identifiable une personne qui peut être identifiée, directement ou indirectement, notamment par référence à un nom, un numéro d'identification ou à un ou plusieurs éléments spécifiques, propres à son identité physique, physiologique, génétique, psychique, économique, culturelle ou sociale.",
      "Les informations personnelles pouvant être recueillies sur le site sont principalement utilisées par l'éditeur pour la gestion des relations avec vous, et le cas échéant pour le traitement de vos commandes. Les données personnelles collectées sont les suivantes : nom et prénom, adresse mail, numéro de téléphone.",
      "Un délégué à la protection des données (DPO) (dpo@garage_parrot.com) a été nommé par l'éditeur pour toute question relative à la protection de vos données personnelles.",
    ],
  },
  {
    title:
      "Droit d’accès, de rectification et de déréférencement de vos données",
    text: [
      "En application de la réglementation applicable aux données à caractère personnel, les utilisateurs disposent des droits suivants :",
      "le droit d’accès : ils peuvent exercer leur droit d'accès, pour connaître les données personnelles les concernant, en écrivant à l'adresse électronique ci-dessous mentionnée. Dans ce cas, avant la mise en œuvre de ce droit, la Plateforme peut demander une preuve de l'identité de l'utilisateur afin d'en vérifier l'exactitude,",
      "le droit de rectification : si les données à caractère personnel détenues par la Plateforme sont inexactes, ils peuvent demander la mise à jour des informations,",
      "le droit de suppression des données : les utilisateurs peuvent demander la suppression de leurs données à caractère personnel, conformément aux lois applicables en matière de protection des données,",
      "le droit à la limitation du traitement : les utilisateurs peuvent de demander à la Plateforme de limiter le traitement des données personnelles conformément aux hypothèses prévues par le RGPD,",
      "le droit de s’opposer au traitement des données : les utilisateurs peuvent s’opposer à ce que ses données soient traitées conformément aux hypothèses prévues par le RGPD,",
      "le droit à la portabilité : ils peuvent réclamer que la Plateforme leur remette les données personnelles qui lui sont fournies pour les transmettre à une nouvelle Plateforme.",
      "Vous pouvez exercer ce droit en nous contactant, à l’adresse suivante : garage@garage_parrot.com, ou par courrier postal à l’adresse suivante : GARAGE V.PARROT – Zone artisanale du Moulin, ST CLAUDE (39190).",
      "Vous pouvez aussi vous adresser à notre DPO par mail à l'adresse suivante : dpo@garage_parrot.com, qui est à votre disposition pour toute question relative à la protection de vos données personnelles.",
      "Toute demande doit être accompagnée de la photocopie d’un titre d’identité en cours de validité signé et faire mention de l’adresse à laquelle l'éditeur pourra contacter le demandeur. La réponse sera adressée dans le mois suivant la réception de la demande. Ce délai d'un mois peut être prolongé de deux mois si la complexité de la demande et/ou le nombre de demandes l'exigent.",
      "De plus, et depuis la loi n°2016-1321 du 7 octobre 2016, les personnes qui le souhaitent, ont la possibilité d’organiser le sort de leurs données après leur décès. Pour plus d’information sur le sujet, vous pouvez consulter le site Internet de la CNIL : https://www.cnil.fr/",
      "Nous vous recommandons de nous contacter dans un premier temps avant de déposer une réclamation auprès de la CNIL, car nous sommes à votre entière disposition pour régler votre problème.",
    ],
  },
  {
    title: "Utilisation des données",
    text: [
      "Les données personnelles collectées auprès des utilisateurs ont pour objectif la mise à disposition des services de la Plateforme, leur amélioration et le maintien d'un environnement sécurisé. La base légale des traitements est l’exécution du contrat entre l’utilisateur et la Plateforme. Plus précisément, les utilisations sont les suivantes :",
      "accès et utilisation de la Plateforme par l'utilisateur,",
      "gestion du fonctionnement et optimisation de la Plateforme,",
      "mise en œuvre d'une assistance utilisateurs,",
      "vérification, identification et authentification des données transmises par l'utilisateur,",
      "personnalisation des services en affichant des publicités en fonction de l'historique de navigation de l'utilisateur, selon ses préférences,",
      "prévention et détection des fraudes, malwares (malicious softwares ou logiciels malveillants) et gestion des incidents de sécurité,",
      "gestion des éventuels litiges avec les utilisateurs,",
      "envoi d'informations commerciales et publicitaires, en fonction des préférences de l'utilisateur.",
    ],
  },
  {
    title: "Politique de conservation des données",
    text: [
      "La Plateforme conserve vos données pour la durée nécessaire pour vous fournir ses services ou son assistance. Dans la mesure raisonnablement nécessaire ou requise pour satisfaire aux obligations légales ou réglementaires, régler des litiges, empêcher les fraudes et abus ou appliquer nos modalités et conditions, nous pouvons également conserver certaines de vos informations si nécessaire, même après que vous ayez fermé votre compte ou que nous n'ayons plus besoin pour vous fournir nos services.",
    ],
  },
  {
    title: "Partage des données personnelles avec des tiers",
    text: [
      "Les données personnelles peuvent être partagées avec des sociétés tierces exclusivement dans l’Union européenne, dans les cas suivants :",
      "quand l'utilisateur publie, dans les zones de commentaires libres de la Plateforme, des informations accessibles au public,",
      "quand l'utilisateur autorise le site web d'un tiers à accéder à ses données,",
      "quand la Plateforme recourt aux services de prestataires pour fournir l'assistance utilisateurs, la publicité et les services de paiement. Ces prestataires disposent d'un accès limité aux données de l'utilisateur, dans le cadre de l'exécution de ces prestations, et ont une obligation contractuelle de les utiliser en conformité avec les dispositions de la réglementation applicable en matière protection des données à caractère personnel,",
      "si la loi l'exige, la Plateforme peut effectuer la transmission de données pour donner suite aux réclamations présentées contre la Plateforme et se conformer aux procédures administratives et judiciaires,",
    ],
  },
  {
    title: "Offres commerciales",
    text: [
      "Vous êtes susceptible de recevoir des offres commerciales de l'éditeur. Si vous ne le souhaitez pas, veuillez envoyer un mail à l'adresse suivante : dpo@garage_parrot.com.",
      "Vos données sont susceptibles d’être utilisées par les partenaires de l'éditeur à des fins de prospection commerciale, si vous ne le souhaitez pas, veuillez envoyer un mail à l'adresse suivante : dpo@garage_parrot.com.",
      "Si lors de la consultation du site, vous accédez à des données à caractère personnel, vous devez vous abstenir de toute collecte, de toute utilisation non autorisée et de tout acte pouvant constituer une atteinte à la vie privée ou à la réputation des personnes. L'éditeur décline toute responsabilité à cet égard. Les données sont conservées et utilisées pour une durée conforme à la législation en vigueur.",
    ],
  },
  {
    title: "Cookies",
    text: [
      "Qu’est-ce qu’un « cookie » ?",
      "Un 'cookie' ou traceur est un fichier électronique déposé sur un terminal (ordinateur, tablette, smartphone,…) et lu par exemple lors de la consultation d'un site internet, de la lecture d'un courrier électronique, de l'installation ou de l'utilisation d'un logiciel ou d'une application mobile et ce quel que soit le type de terminal utilisé (source : https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi )",
      "Le site peut collecter automatiquement des informations standards. Toutes les informations collectées indirectement ne seront utilisées que pour suivre le volume, le type et la configuration du trafic utilisant ce site, pour en développer la conception et l'agencement et à d'autres fins administratives et de planification et plus généralement pour améliorer le service que nous vous offrons.",
      "Le cas échéant, des cookies émanant de tiers pourront être enregistrés sur votre terminal (ordinateur, tablette, smartphone, etc.) et utilisés par des tiers.",
      "Dans ce cas, lors de la première navigation sur ce site, une bannière explicative sur l’utilisation des « cookies » apparaîtra. Dès lors, en poursuivant la navigation, le client et/ou prospect sera réputé informé et avoir accepté l’utilisation desdits « cookies ». Le consentement donné sera valable pour une période de treize (13) mois. L'utilisateur a la possibilité de désactiver les cookies à partir des paramètres de son navigateur.",
    ],
  },
  {
    title: "Photographies et représentation des produits",
    text: [
      "Les photographies de produits, accompagnant leur description, ne sont pas contractuelles et n'engagent pas l'éditeur.",
    ],
  },
  {
    title: "Loi applicable",
    text: [
      "Les présentes conditions d'utilisation du site sont régies par la loi française et soumises à la compétence des tribunaux du siège social de l'éditeur, sous réserve d'une attribution de compétence spécifique découlant d'un texte de loi ou réglementaire particulier.",
    ],
  },
  {
    title: "Contactez-nous",
    text: [
      "Pour toute question, information sur les produits présentés sur le site, ou concernant le site lui-même, vous pouvez laisser un message à l'adresse suivante : garage@garage_parrot.com.",
    ],
  },
];

export default function LegalsPage() {
  return (
    <div>
      <UiImageMain image={legalsPic} />

      <UiTextMain text="Politique de confidentialité. Mentions légales" />

      <div className="container mx-auto px-4 mb-[100px] lg:px-[200px]">
        <div className="flex flex-col space-y-2 font-medium text-base mb-[50px]">
          <p>
            La société GARAGE V.PARROT, soucieuse des droits des individus,
            notamment au regard des traitements automatisés et dans une volonté
            de transparence avec ses clients, a mis en place une politique
            reprenant l’ensemble de ces traitements, des finalités poursuivies
            par ces derniers ainsi que des moyens d’actions à la disposition des
            individus afin qu’ils puissent au mieux exercer leurs droits.
          </p>
          <p>
            Pour toute information complémentaire sur la protection des données
            personnelles, nous vous invitons à consulter le site de la{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.cnil.fr/"
              className="hover:underline text-blue-600"
            >
              Commission Nationale Informatique et Libertés (CNIL)
            </a>
          </p>
          <p>
            La poursuite de la navigation sur ce site vaut acceptation sans
            réserve des dispositions et conditions d'utilisation qui suivent.
          </p>
          <p>
            La version actuellement en ligne de ces conditions d'utilisation est
            la seule opposable pendant toute la durée d'utilisation du site et
            jusqu'à ce qu'une nouvelle version la remplace.
          </p>
        </div>
        <div className="container mx-auto mb-[100px]">
          {textItems.map((item, index) => (
            <div key={index} className="mb-[50px] lg:px-[200px]">
              <h4 className="text-lg font-semibold mb-3">
                Article {index + 1} - {item.title}
              </h4>
              <div className="pl-2">
                {item.text.map((text, index) => (
                  <p key={index} className="mb-2">
                    {text}
                  </p>
                ))}
                {item.link &&
                  item.link.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline pr-4"
                    >
                      {link.text}
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
