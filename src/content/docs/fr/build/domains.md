---
title: URL et domaines personnalisés
description: Vérifiez le sous-domaine du projet et liez votre domaine dans Domains.
sidebar:
  order: 13
---

Ouvrez Console → PUBLISH → **Domains**.

**Default domain** est le nom d'hôte généré pour la version publiée du projet. Utilisez **Copy** sur le panneau.

Le propriétaire du projet peut saisir un nom d'hôte exact dans **Custom domain**, puis sélectionner
**Save domain**. Le statut est d'abord `DNS check needed` et le domaine n'est pas encore routé.

Créez le CNAME DNS-only affiché, désactivez le proxy ou le CNAME flattening du fournisseur DNS, puis
sélectionnez **Check DNS**. `Configured` n'apparaît qu'après la vérification du CNAME par STEPS. La
première visite HTTPS demande ensuite le certificat et ouvre la version Live actuelle. Saisissez
uniquement un hôte comme `app.example.com`, sans `https://`, port ni chemin.

Sélectionnez **Remove** pour le détacher, puis supprimez aussi l'enregistrement DNS afin qu'il ne pointe
plus vers STEPS.
