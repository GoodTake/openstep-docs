---
title: Domaines
description: Chaque App reçoit une adresse sur openstep.academy. Connectez votre propre domaine pour une adresse à votre image.
sidebar:
  order: 13
---

Quand vous publiez, chaque App reçoit sa propre adresse. Vous pouvez garder cette adresse, ou connecter un domaine à vous, comme `cafe.example.com`. Ouvrez **Console** puis **Domains**. Cette section agit sur l'App nommée en haut, **App: The Cozy Coffee Table** : choisissez donc d'abord l'App dans l'en-tête si l'agent en a plusieurs.

![Console → Domains pour The Cozy Coffee Table : le domaine STEPS par défaut avec Open et Copy URL, et la ligne de domaine personnalisé vide en dessous.](/images/build/domains-1.webp)

## L'adresse par défaut

Sous **Default STEPS domain**, l'**HTTPS URL** est l'adresse de l'App, qui ressemble à `https://app-<id>.openstep.academy`. Elle est toujours disponible, même quand un domaine personnalisé est connecté. Elle montre votre site en ligne une fois que vous avez [publié](/fr/build/go-live/). Cliquez sur **Open** pour la visiter, ou sur **Copy URL** pour la copier.

## Connecter votre propre domaine

1. Sous **Custom domain**, saisissez le nom dans **CUSTOM HOSTNAME**. Donnez uniquement le nom d'hôte, sans `https://`, port ni chemin, et utilisez un sous-domaine comme `app.example.com`, pas le domaine nu.
2. Cliquez sur **Add domain**. Le badge indique **CUSTOM · DNS SETUP REQUIRED** et **Configure your DNS record** apparaît avec un tableau **DNS record** : **Type** est CNAME, **Name / Host** est votre nom d'hôte, **Target / Value** est la cible vers laquelle il doit pointer, et **TTL** est Auto. **Copy all** les copie ensemble.
3. Chez votre fournisseur DNS, créez cet enregistrement CNAME. Désactivez le proxy DNS et n'utilisez pas l'aplatissement à l'apex, afin que le CNAME public pointe directement vers OpenStep.
4. Revenez et cliquez sur **Check connection**. Quand le CNAME est trouvé, le badge indique **CUSTOM · DNS-MANAGED** et la ligne **Custom domain** indique **DNS connected · Opens the Live version after you publish**.

Si vous voyez **CNAME not detected**, patientez un peu et vérifiez à nouveau, car les changements DNS mettent du temps à se propager. **Having trouble?** liste les causes habituelles.

## Supprimer un domaine

Cliquez sur **Remove custom domain**, ou sur **Cancel setup** tant qu'il attend encore le DNS. La boîte de dialogue indique que le nom d'hôte cessera d'être routé vers l'App et que le domaine par défaut continue de fonctionner. Cliquez sur **Keep domain** pour changer d'avis. Supprimez aussi le CNAME devenu inutile chez votre fournisseur DNS.

## À savoir

- Seul le propriétaire peut connecter ou supprimer un domaine personnalisé.
- Chaque App a ses propres domaines. Un nom d'hôte ne peut pas être rattaché à deux Apps.
- Si l'agent est réglé sur **Learners only**, les domaines personnalisés ne sont pas servis. Réglez l'accès sur **Anyone with the link** dans **Settings** pour en utiliser un. Voir [Publier et partager](/fr/agent/publish-and-share/).

Suite : [Ce que fait la CLI](/fr/cli/what-it-does/).
