---
title: Données du site
description: Parcourez et modifiez les données que votre site enregistre pendant le développement. Le site en ligne garde ses propres données.
sidebar:
  order: 9
---

La plupart des sites enregistrent quelque chose : des réservations, des commandes, des messages. L'onglet **Data** liste ce que votre site a enregistré, pour que vous puissiez le consulter et le corriger sans le demander au builder.

1. Cliquez sur **Data** en haut du côté droit, à côté de **Preview**. Le titre de la page est **Data**, avec une carte pour chaque table et le nombre d'éléments qu'elle contient. Pour le café, les tables sont **bookings**, **orders** et **users**. Utilisez **Search tables…** pour en trouver une, et **A-Z** pour changer l'ordre de tri.
2. Cliquez sur une table pour l'ouvrir. Son nom et son nombre d'éléments sont en haut, par exemple **bookings (1)**, avec ses lignes en dessous. Utilisez **Search rows…** pour les filtrer, cliquez sur un en-tête de colonne pour trier, et utilisez les flèches en bas pour changer de page.
3. Cliquez sur une ligne pour la modifier, puis sur **Save changes**. Utilisez **+ Add item** pour ajouter une ligne. Chaque ligne a aussi un bouton pour la supprimer.
4. Cliquez sur la flèche de retour en haut à gauche pour revenir à la liste des tables.

![La table bookings dans l'onglet Data, avec la réservation de test faite dans Preview.](/images/build/data-1.webp)

## À savoir

- La réservation de la capture d'écran est apparue quand nous avons envoyé le formulaire de réservation dans [Preview](/fr/build/preview/). Une table se remplit à mesure que les gens utilisent le site.
- Ce sont des données de développement : celles que Preview lit et écrit. Après que vous avez [publié](/fr/build/go-live/), le site en ligne a ses propres données, séparées. Les réservations de test faites dans Preview n'atteignent pas le site en ligne, et les réservations faites sur le site en ligne n'apparaissent pas ici. **Publish** ne copie jamais les données de développement vers le site en ligne et n'efface jamais les données en ligne.
- Vous modifiez les lignes ici. Pour ajouter une table ou un nouveau champ, demandez au builder dans le chat. Il crée les tables au fil de la construction.
- Le propriétaire et les éditeurs peuvent modifier les lignes. Les lecteurs peuvent seulement regarder.

Suite : [Ce que votre site peut faire](/fr/build/what-your-site-can-do/).
