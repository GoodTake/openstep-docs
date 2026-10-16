---
title: Obtenir du SSU
description: Achetez du SSU en USDC ou par carte, rechargez-le depuis du SSU détenu dans votre wallet, ou utilisez un code de cours.
sidebar:
  order: 4
---

Le SSU est le solde qu'OpenStep débite pour la construction, pour les fonctions de plateforme que vos apps utilisent et pour l'exécution d'une app en ligne. Il y a trois façons d'en obtenir : l'acheter sur **Purchase SSU**, le recharger à partir du SSU que votre wallet détient déjà, ou utiliser un code de cours.

## Acheter du SSU

1. Ouvrez le menu du compte en bas du rail gauche et choisissez **Purchase SSU**. La page affiche **Base mainnet** en haut à droite.
2. Saisissez le montant sous **SSU AMOUNT**, ou cliquez sur un montant rapide : **100**, **500**, **1,000** ou **5,000**. Vous pouvez acheter de 100 à 10 000 SSU entiers à la fois.
3. Sous **PAYMENT**, choisissez **USDC** (**On Base**) ou **Card** (**Stripe**).
4. Vérifiez le récapitulatif : **You pay** et **You receive**. La page affiche le prix avant que vous payiez. **Destination** est votre **Builder Smart Account**, où le SSU arrive.
5. Cliquez sur le bouton correspondant à votre choix :
   - **Recharge with USDC** : votre wallet vous demande d'approuver le montant exact en USDC (**Approve exact USDC**), puis de **Confirm purchase**. La page passe par **Switching to Base**, **Confirming on Base** et **Sending SSU**, puis affiche **The destination balance is ready.**
   - **Continue to Stripe** : Stripe Checkout s'ouvre et vous payez par carte. Gardez la page ouverte pendant que le paiement se termine. Si vous annulez, la page affiche **Stripe Checkout was cancelled. No charge was made.**

![La page Purchase SSU avec 500 SSU saisis et USDC choisi, avant tout paiement.](/images/start/get-ssu-1.webp)

Quand l'achat est terminé, votre solde se met à jour. Vérifiez-le sur la page [Balance](/fr/account/balance/).

## Recharger à partir du SSU de votre wallet

Si votre wallet détient déjà du SSU, vous pouvez le déplacer vers votre solde de plateforme :

1. Cliquez sur **Balance** en bas du rail gauche.
2. Sous **Top up**, saisissez un montant sous **TOP UP AMOUNT**, ou cliquez sur **Max**. La page affiche votre **Wallet balance**.
3. Cliquez sur **Top up** et approuvez le transfert dans votre wallet.

Si vous avez déjà envoyé le SSU vous-même, collez le hash de la transaction sous **Already sent? Paste transaction hash** et cliquez sur **Submit**.

## Utiliser un code de cours

Si un cours vous a remis un code, l'utiliser vous inscrit au cours et vous donne le SSU qui accompagne votre place. Choisissez **+ Redeem a code** dans le menu du compte, ou **Have a course code? Redeem it →** sur la page de connexion. Voir [Utiliser un code](/fr/account/redeem/).

## À savoir

- Acheter en USDC demande des USDC dans votre wallet sur Base et un peu d'ETH sur Base pour le gas. S'il en manque, la page affiche **Your wallet does not have enough USDC.** ou **Your wallet needs more ETH on Base for gas.**
- **Card details stay with Stripe.** Vous les saisissez sur la page Stripe Checkout, pas sur OpenStep.
- Pendant qu'une construction ou un appel d'app s'exécute, une partie de votre SSU est **Held for running work**. Chaque débit apparaît sous **Activity** sur la page [Balance](/fr/account/balance/).
- Vous pouvez faire rembourser vers votre wallet le SSU que vous n'avez pas dépensé, depuis la page [Balance](/fr/account/balance/).

Suite : [Créer votre premier agent](/fr/start/create-agent/).
