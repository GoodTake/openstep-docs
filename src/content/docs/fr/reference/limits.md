---
title: Notes de la plateforme
description: Les limites du produit à connaître en utilisant OpenStep.
sidebar:
  order: 2
---

- La construction se fait dans un environnement isolé fourni par la plateforme. Vous n'avez pas besoin de votre propre hôte pour commencer.
- Si le chat indique **This chat got too long**, renvoyez votre message. Le tour suivant repart de zéro, et tout ce que vous avez construit est en sécurité.
- Vous ne pouvez pas publier tant que l'agent est encore en train de construire. **Publish** dans l'en-tête est grisé jusqu'à ce que la construction s'arrête. Voir [Mettre en ligne](/fr/build/go-live/).
- Seul le propriétaire d'un agent peut le publier, changer qui peut l'ouvrir et le supprimer. Les éditeurs peuvent discuter et construire, et les lecteurs peuvent seulement regarder. Voir [Travailler à plusieurs](/fr/agent/work-with-others/).
- **Publish** met toutes les Apps d'un agent en ligne ensemble. Si une App échoue, rien ne change et la version en ligne reste telle qu'elle était.
- Pour un domaine personnalisé, utilisez la cible DNS affichée sous **Domains** dans la **Console** à ce moment-là. Chaque App a ses propres domaines. Voir [Domaines](/fr/build/domains/).
- L'exécution d'une app en ligne et la construction dépensent toutes deux du SSU. Voir [Qu'est-ce que le SSU](/fr/account/what-is-ssu/).
- Ce site documente le produit builder. Ne traitez pas les spécifications d'ingénierie internes ni les notes de déploiement comme de la documentation utilisateur.
