# ECF Garage Parrot

## Présentation

Cette application est un projet bootstrapé avec [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

Cette application a été faite dans le cadre d'une ECF (évaluation en cours de formation) ayant pour object la réalisation d'un site web fullstack pour un garagiste.

Les données intégrées au site ne sont que des données fictives et ne concernent aucune personne réelle.
L'ensemble des images présentes sur le site sont libres de droits et utlisées grace au site [Unsplash.com](https://unsplash.com/fr).

La base de données ainsi que les images sont stockées sur le site de [Supabase](https://supabase.com/). La base de données est en PostgresSQL et donc peut être utilisée en local (grâce à SQLite) tout comme en ligne.

- [Lancer le projet](#lancer-le-projet)
  - [Installation](#installation)
  - [Définir les variables](#variables)
  - [Lancer le serveur](#lancer-le-serveur)
- [Initialiser la base de données](#initialiser-la-base-de-données)
  - [Changer de type de base de données](#changer-de-base-de-données)
  - [Insérer un premier utilisateur](#insérer-un-premier-utilisateur)
  - [Commencer à remplir le site web](#commencer-à-remplir-le-site-web)
- [Informations complémentaires](#informations-complémentaires)
  - [Supabse](#supabase)
  - [Sendgrid](#sendgrid)

## Lancer le projet

Une fois, le projet téléchargé ou **_forké_**, rendez-vous sur le terminal à la racine du projet.

### Installation

Vous devrez installer toutes les dépendences **_NODE_MODULES_** via les commandes suivantes

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Variables

Il faudra définir les variables d'environnement suivantes dans le fichier `.env` :

```bash
# variable de connection à la base de données
DATABASE_URL

# variable d'identification pour next auth
NEXTAUTH_SECRET   # -->Vous devez définir un secret (peut importe le texte)
NEXTAUTH_URL      # -->L'adresse racine de votre site web ou 'http://localhost:3000' en local

# variables identification à supabase (obligatoire pour les images stockées)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_STORAGE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET

# variable interne au projet
NEXT_PUBLIC_API_KEY   # --> Vous devez définir une clef afin de protéger l'accès à l'API du site
NEXT_PUBLIC_BASE_URL  # --> L'adresse racine de votre site web ou 'http://localhost:3000' en local

# variable pour envoyer des mail via Sengrid
NEXT_PUBLIC_SENDGRID_API_KEY
```

### Lancer le serveur

Vous pouvez lancer le serveur avec les commandes suivantes :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Vous pouvez ouvrir votre navigateur à l'adresse suivante [http://localhost:3000](http://localhost:3000) pour observer le rendu du site.

## Initialiser la base de données

Ce projet utilise [Prisma](https://www.prisma.io/) comme ORM.

Les schémas sont déjà établis. Il faudra juste connecter [Prisma](https://www.prisma.io/) à votre base de données.

Pour connecter Prisma, vous devrez utiliser la commande suivante :

```bash
npx prisma migrate dev
```

Cette commande permet d'ajouter les tables à votre base de données.

### Changer de base de données

Si vous souhaitez changer de type de base de données, vous pouvez modifier la variable d'environnement:

```bash
# variable de connection à la base de données
DATABASE_URL="file:./db/dev.db"
```

Ainsi que vous rendre sur le fichier **_schema.prisma_** (/prisma/schema.prisma)

`provider = "sqlite"`

### Insérer un premier utilisateur

Afin de pouvoir utiliser le site, il vous faudra un premier utilisateur en tant qu'administrateur pour pouvoir se connecter et rajouter des données.
En effet, il n'est pas possible dans ce projet de se créer un compte via une page particulière (les visiteurs ne sont pas invités à créer un compte).

Il faudra donc définir deux nouvelles variables (afin que vous puissiez définir par vous même mot de passe et email de connexion).

```bash
NEXT_PUBLIC_ADMIN_PASSWORD #le mot de passe en clair (il sera crypté après)
NEXT_PUBLIC_ADMIN_MAIL
```

Vous pouvez alors lancer le processus d'intégration dans la base de données via :

```bash
npx prisma db seed
```

Vous pourrez apercevoir le résultat dans la console. Le mot de passe apparaît bien crypté.

### Commencer à remplir le site web

Vous pouvez commencer à utiliser la partie administrateur du site. Vous pouvez vous rendre sur [http://localhost:3000/login](http://localhost:3000/login) pour vous connecter avec les identifiants que vous avez renseigné dans vos variables d'environnement.

## Informations complémentaires

### Supabase

Si vous pouvez tester l'ensemble de l'application en local, certaines fonctionnalités se retrouveront perturbées. L'upload d'image, dû au fonctionnement même de NextJS peut se faire en local mais pas en environnement de production. C'est la raison pour laquelle a été privilégié la solution avec [Supabase Storage](https://supabase.com/storage). Vous pouvez assez facilement créer un compte et récuérer les éléments nécessaires :

```bash
NEXT_PUBLIC_SUPABASE_URL #correspond à l'url d'acc§s à votre projet Supabase
NEXT_PUBLIC_SUPABASE_STORAGE_URL #correspond à l'url d'accès à votre projet Supabse Storage
NEXT_PUBLIC_SUPABASE_ANON_KEY #votre anon key sur Supabase
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET # le nom de votre bucket storage
```

Attention ⚠️ Pensez à bien mettre votre projet storage en public

Attention ⚠️⚠️ La clef annon doit être celle qui permet de surpasser les régles de sécurité (RLS) de votre projet nommée `service role`

### Sendgrid

La fonction de réponse aux messages de contact repose sur l'utilisaire Sendgrid. De même que pour Supabase, vous ne pourrez pas tester en local le service d'envoi de mail. Pour cela, il faudra relier un compte [SendGrid](https://sendgrid.com) (gratuit) à l'application. Vous devrez renseigner les éléments suivants :

```bash
NEXT_PUBLIC_SENDGRID_API_KEY #correpond à la clef d'API de Sendgrid (vous devez en créer une si pas encore fait)
```
