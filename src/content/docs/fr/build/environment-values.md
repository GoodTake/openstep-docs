---
title: Valeurs d'environnement
description: Définissez les valeurs que lit votre site, comme son nom ou une clé pour un service extérieur, séparément pour le développement et la mise en ligne.
sidebar:
  order: 11
---

Une valeur d'environnement est un réglage nommé que lit votre site, comme son nom affiché ou une clé pour un service extérieur. Chaque valeur a un réglage pour le développement, que Preview utilise, et un pour la mise en ligne, que le site publié utilise. Vous les définissez indépendamment dans **Console** → **Environment**.

Il n'y a plus d'étape Deploy séparée pour le back-end. Les valeurs de développement sont utilisées par Preview immédiatement, et les valeurs en ligne suivent **Publish**.

1. Cliquez sur **Console** dans l'en-tête, puis sur **Environment**. La page s'intitule **Environment Values** et indique **Values for The Cozy Coffee Table.** Elle montre l'App choisie dans le sélecteur d'App de l'en-tête.
2. Lisez la liste. Chaque valeur est une carte avec son nom, l'endroit où elle est disponible (par exemple **Public bundle**, **Frontend**), son type (**Variable** ou **Secret**), et deux réglages côte à côte : **Development · Preview** et **Production · Live**. Les puces de filtre **All**, **Frontend**, **Backend**, **Secrets** et **Needs attention** réduisent la liste.
3. Pour ajouter une valeur, cliquez sur **+ Add value**. Dans le panneau **Add App value**, saisissez un nom, choisissez **Available to**, choisissez **Value type**, renseignez la valeur pour **Preview**, **Live** ou les deux, puis cliquez sur **Add value**.
4. Pour modifier une valeur plus tard, cliquez sur le bouton ⋯ de sa carte, modifiez-la et cliquez sur **Save changes**.

![Console → Environment pour The Cozy Coffee Table : deux valeurs, chacune avec un réglage Development · Preview et un réglage Production · Live.](/images/build/environment-values-1.webp)

## Où une valeur est disponible

- Les valeurs **Frontend** sont intégrées à la page web. Chaque visiteur peut les lire : ne mettez donc ici que des choses publiques, comme le nom du site. Leurs noms commencent par `VITE_`, et le formulaire ajoute le préfixe pour vous.
- Les valeurs **Backend** restent sur le serveur et n'arrivent jamais au navigateur. Les clés pour des services extérieurs vont ici.
- Les valeurs **Builder** sont des variables que le builder peut lire pendant qu'il construit. Les secrets ne sont jamais disponibles pour le builder.

## Variable ou secret

Une **Variable** peut être relue après son enregistrement. Un **Secret** est en écriture seule : une fois enregistré, la page indique seulement qu'il est défini, et quand, mais jamais sa valeur. Pour changer un secret, remplacez-le. Les secrets ne sont disponibles que pour le back-end, et le type ne peut plus être changé après la création de la valeur.

## Développement et mise en ligne

- **Development · Preview** prend effet immédiatement. Changer une valeur **Frontend** redémarre Preview.
- Les variables **Production · Live** sont **Applied with the next Publish.** Après en avoir changé une, cliquez sur **Publish**. La boîte de dialogue montre l'App comme **Live values changed** même si aucun code n'a changé.
- Les secrets **Production** sont **Available to the live backend runtime** dès que vous les enregistrez. Un secret ne fait jamais partie d'une version publiée : [revenir en arrière](/fr/build/go-live/) ne ramène donc pas un ancien secret.
- Le propriétaire et les éditeurs définissent les valeurs de développement. Seul le propriétaire change les valeurs en ligne.

## Quand le builder demande une valeur

Certaines fonctions ont besoin de quelque chose que vous seul pouvez donner, comme une clé pour un service d'e-mail. Dans ce cas, une boîte de dialogue s'ouvre avec le nom de la valeur et son utilité. Saisissez la valeur et cliquez sur **Provide and continue** : elle est enregistrée pour le développement et la mise en ligne, et le builder continue. Cliquez sur **Not now** pour repousser. Le chat indique alors que le builder a besoin de la valeur, avec un bouton **Provide**. Une valeur qu'un plan approuvé a demandée et que vous n'avez pas encore donnée est aussi listée sous **Requested by the build** en haut d'**Environment**, avec un bouton **View request**. Pour les plans, voir [Approuver le plan](/fr/agent/approve-plan/).

## À savoir

- Le builder a lui-même créé les valeurs de la capture d'écran : le nom du site et un identifiant public de connexion de wallet. Il ne vous demande que ce qu'il ne peut pas savoir.
- Vous n'avez jamais besoin de coller un secret dans le chat. Utilisez **Environment**, ou la boîte de dialogue que le builder ouvre.
- Les fonctions qui peuvent avoir besoin d'une valeur, comme l'e-mail, sont décrites dans [Ce que votre site peut faire](/fr/build/what-your-site-can-do/).

Suite : [Mettre en ligne](/fr/build/go-live/).
