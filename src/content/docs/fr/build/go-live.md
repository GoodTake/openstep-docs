---
title: Mettre en ligne
description: Publish met toutes les Apps en ligne ensemble. Revenez à une version antérieure, mettez le site hors ligne, ou remettez-le en ligne.
sidebar:
  order: 12
---

**Publish** transforme ce que vous voyez dans Preview en un site en ligne avec sa propre adresse. Il met toutes les Apps de l'agent en ligne ensemble, et seul le propriétaire peut le faire. Tant que vous n'avez pas publié, votre site n'existe que dans Preview.

1. Attendez que le builder ait terminé. **Publish** dans l'en-tête est grisé pendant qu'il travaille.
2. Cliquez sur **Publish** dans l'en-tête. La boîte de dialogue **Publish your agent** s'ouvre et indique **Every app of this agent goes live together.** Elle montre la suite, **Check**, **Build** et **Go live**, et une ligne comme **Publish 1 app · Data and learner progress stay as they are.** Chaque App est listée avec son état : **Not live yet** pour une première publication, et **Code changed** ou **No changes** pour une publication ultérieure.
3. Cliquez sur **Publish** dans la boîte de dialogue. Une carte avec les étapes **Check your agent**, **Build and test every app** et **Switch every app live together** suit la progression. Vous pouvez continuer à travailler pendant ce temps. Une App a pris environ deux minutes.
4. Quand c'est terminé, une carte indique **Your agent is live** avec l'adresse de l'App, et des boutons pour l'ouvrir ou la copier.

![La boîte de dialogue Publish your agent pour The Cozy Coffee Table, avec ses trois étapes et l'App listée comme Not live yet.](/images/build/go-live-2.webp)

Ouvrez ensuite **Console** puis **Production**. Elle affiche **Live since** avec la date, l'adresse de chaque App, **Copy invitation**, qui copie l'adresse prête à envoyer, et **Versions**, une liste de toutes les versions que vous avez publiées. La version actuelle est marquée **Live**.

![Console → Production après le premier Publish : Live since la date, l'adresse de The Cozy Coffee Table, et une version marquée Live.](/images/build/go-live-1.webp)

## Ce que Publish fait et ne fait pas

- Toutes les Apps passent en ligne ensemble. Si une App échoue, tout le Publish échoue, rien ne change, et le site en ligne reste tel qu'il était. Le statut dit ce qui s'est mal passé et se termine par **The live version did not change.**
- Si la vérification trouve un problème dans une App, le builder peut le corriger et publier à nouveau tout seul. S'il a besoin de quelque chose de votre part, comme une valeur, le statut indique **Publishing waits for you.**
- Publish n'efface jamais vos données. Les réservations et autres enregistrements en ligne restent. La seule exception est une mise à jour qui supprime volontairement une table ou un champ que le site en ligne possède déjà. La boîte de dialogue vous dit de quelle App il s'agit avant que vous publiiez, et ce qui est supprimé reste supprimé.
- Après la publication, Preview continue comme votre brouillon. Les changements ultérieurs n'atteignent pas le site en ligne tant que vous n'avez pas publié à nouveau.
- Qui peut ouvrir le site, **Anyone with the link** ou **Learners only**, est un réglage de l'agent. Voir [Publier et partager](/fr/agent/publish-and-share/).

## Revenir à une version antérieure

1. Ouvrez **Console** puis **Production**, et trouvez la version dans **Versions**.
2. Cliquez sur **Roll back** à côté. La boîte de dialogue **Roll back** demande s'il faut revenir à la version publiée à cette date. Les données et la progression des apprenants restent telles quelles.
3. Cliquez sur **Roll back to this version**. Toutes les Apps basculent ensemble.

Le retour en arrière remet en place le code de la version antérieure. Il n'annule pas les changements apportés à vos données, et il ne change pas votre brouillon dans Preview. Il est refusé quand une version plus récente a supprimé des données que lit la version plus ancienne. La plateforme garde les cinq versions en ligne les plus récentes. Une version plus ancienne affiche **No longer kept**. Le retour en arrière attend aussi pendant qu'une construction est en cours : mettez donc d'abord la construction en pause ou arrêtez-la.

## Mettre le site hors ligne

1. Ouvrez **Console** puis **Production**, et cliquez sur **Unpublish** à côté de **Live since**.
2. Dans la boîte de dialogue **Unpublish**, cliquez sur **Take it offline**.

Toutes les Apps cessent de répondre. La dernière version en ligne, ses données, ses domaines et ses réglages sont tous conservés.

## Remettre en ligne

Tant que le site est hors ligne, **Production** indique **This agent is offline. Its data is kept.** Cliquez sur **Put the last version back**. La plateforme appelle cela Republish. Cela ramène la dernière version en ligne sans la reconstruire. Si vous avez modifié le site depuis, cliquez plutôt sur **Publish** pour mettre la nouvelle version en ligne.

## À savoir

- Seul le propriétaire peut faire **Publish**, **Roll back**, **Unpublish** et remettre une version en ligne. Les éditeurs et les lecteurs peuvent voir **Production**.
- Pour repartir avec des données vides, utilisez **Start a new session** dans **Console** → **Sessions**. Publish ne le fait jamais. Voir [Publier et partager](/fr/agent/publish-and-share/).
- Pour donner au site votre propre adresse, voir [Domaines](/fr/build/domains/).

Suite : [Domaines](/fr/build/domains/).
