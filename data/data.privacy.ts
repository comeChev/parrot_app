type Link = {
  text: string;
  url: string;
};

type TextItem = {
  title: string;
  text: string[];
  link?: Link[];
};

export const textItems: TextItem[] = [
  {
    title: "L'utilisation de cookies",
    text: [
      "Notre site internet GARAGE V.PARROT utilise des cookies. Un cookie est un petit fichier qui est envoyé avec les pages de ce site Web et/ou les applications Flash et qui est stocké par votre navigateur sur votre disque dur à partir de votre ordinateur, téléphone portable, montre connectée ou tablette. Les informations qui y sont stockées peuvent être retournées à nos serveurs lors d'une visite ultérieure.",
      "L'utilisation de cookies est d'une grande importance pour le bon fonctionnement de notre site web. Grâce à la contribution (anonyme) des visiteurs, nous pouvons améliorer l'utilisation du site internet et le rendre plus convivial.",
    ],
  },
  {
    title: "Consentement",
    text: [
      "Votre consentement est requis pour l'utilisation de certains cookies. Nous le recueillons au moyen d'une bannière informative.",
    ],
  },

  {
    title: "Le type de cookies utilisés et leurs objectifs",
    text: [
      "Nous utilisons les cookies suivants :",
      "Cookies fonctionnels : ils nous permettent d'améliorer le fonctionnement du site internet et de le rendre plus convivial pour le visiteur. Par exemple, nous stockons vos données de connexion.",
      "Cookies de mesure d'audience : ils garantissent qu'un cookie anonyme est généré à chaque fois que vous visitez un site internet. Ces cookies permettent de savoir si vous avez déjà visité le site auparavant ou non. Ce n'est que lors de la première visite qu’un cookie est créé. Lors des visites suivantes, l'utilisation du cookie déjà existant est automatique. Ce cookie n'est utilisé qu'à des fins statistiques. De cette façon, les données suivantes peuvent être collectées : le nombre de visiteurs uniques, la fréquence à laquelle les utilisateurs visitent le site, quelles pages les visiteurs consultent, combien de temps les utilisateurs consultent une page particulière, la page à partir de laquelle les visiteurs quittent le site.",
      "Cookies d'amélioration du site : ils permettent de tester différentes versions d'une page internet afin de savoir quelle page est mieux utilisée.",
    ],
  },
  {
    title: "Liste des cookies utilisés",
    text: [
      "Cookies Google",
      "Nous utilisons les cookies Google suivants : ",
      "Google analytics : permet de mesurer l'audience du site.",
      "Google tag manager : facilite l’implémentation des tags sur les pages et permet de gérer les balises Google.",
      "Google Adsense : régie publicitaire de Google utilisant les sites web ou les vidéos YouTube comme support pour ses annonces.",
      "Google Dynamic Remarketing : permet de vous proposer de la publicité dynamique en fonction des précédentes recherches.",
      "Google Adwords Conversion : outil de suivi des campagnes publicitaires adwords.",
      "DoubleClick : cookies publicitaires de Google pour diffuser des bannières.",
    ],
  },
  {
    title: "Vos droits à l'égard de vos données personnelles",
    text: [
      "Vous disposez d'un droit d'accès, de rectification, de limitation et de suppression de vos données personnelles. En outre, vous avez le droit de vous opposer au traitement des données personnelles et le droit à la transportabilité de vos données.",
      "Vous pouvez exercer ces droits en nous envoyant un mail à l'adresse suivante garage@garage_parrot.com. Afin de prévenir les abus, nous pouvons vous demander de vous identifier sur notre site.",
      "Lorsqu'il s'agit d'accéder à des données personnelles liées à un cookie, nous vous demandons de nous envoyer une copie du cookie en question. Vous pouvez les trouver dans les paramètres de votre navigateur.",
    ],
  },
  {
    title: "Blocage et suppression des cookies",
    text: [
      "Vous pouvez facilement bloquer et supprimer vous-même les cookies à tout moment par votre navigateur Internet. Vous pouvez également configurer votre navigateur Internet de manière à recevoir un message lorsqu'un cookie est installé. Vous pouvez également indiquer que certains cookies ne peuvent pas être installés. Pour cela, veuillez consultez la fonction d'aide de votre navigateur. Si vous supprimez les cookies de votre navigateur, cela peut le cas échéant avoir des conséquences sur l'utilisation de notre site internet.",
      "Certains cookies de suivi sont installés par des tiers qui vous affichent des publicités via notre site Web. Vous pouvez supprimer ces cookies de manière centralisée via www.youronlinechoices.eu.",
      "Veuillez noter que si vous ne voulez pas de cookies, nous ne serons plus en mesure de garantir le bon fonctionnement de notre site Web. Certaines caractéristiques du site peuvent être altérées et dans certains cas, vous ne pourrez plus accéder au site. De plus, le refus des cookies ne signifie pas que vous ne verrez aucune publicité. Les annonces ne sont plus adaptées à vos centres d'intérêt et peuvent donc apparaître plus souvent.",
      "Les étapes à suivre pour ajuster vos paramètres varient d'un navigateur à un autre. Si nécessaire, consultez la fonction d'aide de votre navigateur, ou rendez-vous sur l’un des liens ci-dessous pour accéder directement au manuel de votre navigateur.",
    ],
    link: [
      {
        text: "Firefox",
        url: "https://support.mozilla.org/fr/kb/effacer-les-cookies-pour-supprimer-les-information",
      },
      {
        text: "Google Chrome",
        url: "https://support.google.com/chrome/answer/95647?co=GENIE.Platform=Desktop&hl=fr",
      },
      {
        text: "Google Chrome",
        url: " https://support.google.com/chrome/answer/95647?co=GENIE.Platform=Desktop&hl=fr",
      },
      {
        text: "Internet Explorer",
        url: "https://support.microsoft.com/fr-fr/help/278835/how-to-delete-cookie-files-in-internet-explorer",
      },
      {
        text: "Safari",
        url: "https://support.apple.com/kb/ph21411?locale=fr_FR",
      },
    ],
  },
  {
    title: "Nouveaux développements et cookies non prévus",
    text: [
      "Sur certaines de nos pages, nous pouvons utiliser du contenu qui est hébergé sur d'autres sites et qui est rendu accessible sur notre site internet au moyen de certains codes (contenu intégré). Ces codes utilisent souvent des cookies. Nous n’avons cependant aucun contrôle sur ce que ces tiers font de leurs cookies.",
      "Il est également possible que, par l'intermédiaire de notre site internet, des cookies soient placés par d'autres personnes. Vous avez trouvé sur notre site internet des cookies que nous n'avons pas identifiés ? Veuillez nous le faire savoir par mail. Vous pouvez également contacter directement le tiers et lui demander quels cookies il place, quelle en est la raison, quelle est la durée de vie du cookie et quelles sont les mesures pour protéger votre vie privée.",
    ],
  },
  {
    title: "Remarques",
    text: [
      "Nous devrons mettre à jour cette politique d'utilisation des cookies régulièrement par exemple lorsque nous modifions notre site Web ou les règles le concernant. Nous vous prions de consulter cette page pour prendre connaissance de la dernière version de notre politique d'utilisation des cookies.",
      "Si vous avez des questions et/ou des commentaires, veuillez nous contacter à l'adresse e-mail suivante :  garage@garage_parrot.com.",
    ],
  },
];
