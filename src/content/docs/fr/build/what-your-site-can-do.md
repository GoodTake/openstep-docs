---
title: Ce que votre site peut faire
description: Une carte en langage simple de ce que la plateforme ajoute à votre site, de l'IA et l'e-mail aux actions on-chain, aux paiements en SSU et aux tâches planifiées.
sidebar:
  order: 10
---

Un site peut être plus que des pages et un formulaire. La plateforme propose un ensemble de fonctions que le builder peut brancher sur votre site, et vous n'avez rien à configurer vous-même. Cette page est une carte de ce qui existe, pas un manuel : vous demandez ce que vous voulez dans le chat, et le builder sait comment le construire.

1. Dites ce que vous voulez en mots simples. Pour le café : *When someone books a table, email them a confirmation.*
2. Le builder l'ajoute. S'il a besoin d'une valeur que vous seul avez, comme une clé pour un service extérieur, il vous la demande dans une boîte de dialogue. Voir [Valeurs d'environnement](/fr/build/environment-values/).
3. Essayez-le dans [Preview](/fr/build/preview/), puis [publiez](/fr/build/go-live/).

## Fonctions d'IA

Votre site peut demander à une IA d'écrire ou de résoudre quelque chose pendant qu'un visiteur l'utilise. Le café pourrait suggérer une boisson à partir de quelques réponses, ou rédiger une réponse à un message. Chaque appel coûte un peu de SSU, après une allocation mensuelle gratuite.

## E-mail

Votre site peut envoyer des e-mails, comme la confirmation de réservation ci-dessus, un reçu ou un lien d'accès. Chaque message coûte un peu de SSU, après une allocation mensuelle gratuite, et il existe une limite quotidienne à ce que la plateforme envoie pour vous. Vous pouvez connecter votre propre service d'e-mail à la place, et la limite quotidienne ne s'applique alors plus.

## Actions on-chain

Votre site peut travailler avec des smart contracts sur Base : les lire, y écrire, et laisser les visiteurs se connecter en connectant un wallet. Il peut aussi envoyer des transactions depuis le back-end du site, par exemple pour enregistrer quelque chose sur un contrat. Le gas correspondant est facturé en SSU sur le solde du propriétaire.

## Paiements en SSU

Votre site peut encaisser des paiements de ses visiteurs en SSU, pour des produits, des commandes, des pourboires ou des adhésions. Le SSU est le seul canal de paiement d'un site. Ne demandez pas au builder d'ajouter un service de paiement extérieur.

## Tâches planifiées

Votre site peut exécuter des tâches à des heures fixes, une fois publié. Le café pourrait, par exemple, préparer chaque soir la liste des réservations du lendemain. Les heures sont en UTC. Ouvrez **Console** puis **Scheduled tasks** pour voir ce que chaque App a planifié, en développement et en ligne.

## Données enregistrées

Votre site peut conserver ses propres enregistrements, comme les réservations du café. Vous pouvez les consulter dans l'onglet **Data**. Voir [Données du site](/fr/build/data/).

## À savoir

- La construction, ces fonctions et l'exécution d'un site en ligne sont tous facturés en SSU. Chaque débit est listé sur la page [Balance](/fr/account/balance/). Voir aussi [Qu'est-ce que le SSU](/fr/account/what-is-ssu/).
- Si vous n'êtes pas sûr qu'une fonction existe, demandez au builder. Il dira ce qu'il peut faire et ce qu'il ne peut pas faire.

Suite : [Valeurs d'environnement](/fr/build/environment-values/).
