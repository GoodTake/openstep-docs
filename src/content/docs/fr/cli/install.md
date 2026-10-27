---
title: Installer et se connecter
description: Installez la commande openstep et autorisez cet ordinateur avec votre wallet.
sidebar:
  order: 2
---

Installez la commande avec npm, puis connectez-vous une seule fois. La connexion utilise votre wallet dans Chrome : le terminal ne voit donc jamais votre wallet ni un mot de passe.

Vous avez besoin de Node.js 24 ou d'une version plus récente. Vérifiez avec `node --version`.

## Installer

1. Installez le paquet.

   ```sh
   npm install -g openstep
   ```

2. Vérifiez que cela fonctionne.

   ```sh
   openstep --version
   ```

   Les commandes de ces pages de la CLI exigent que `openstep --version` affiche 0.3.0 ou une version plus récente.

## Se connecter

1. Dans le terminal, exécutez :

   ```sh
   openstep login https://builder.openstep.academy
   ```

2. La CLI affiche une URL d'autorisation d'appareil. Ouvrez-la dans Chrome avec votre extension de wallet. La CLI n'ouvre pas de navigateur à votre place.
3. Si vous n'êtes pas encore connecté, connectez votre wallet et signez. Voir [Se connecter](/fr/start/sign-in/). La page revient ensuite au lien d'autorisation.
4. Vérifiez le cadre **Requesting device**. Il doit montrer l'ordinateur sur lequel vous venez d'exécuter `openstep login`.
5. Cliquez sur **Authorize openstep CLI**. La page indique que vous pouvez retourner à votre terminal.

![La page d'autorisation de la CLI OpenStep dans le navigateur, affichée avant que vous approuviez.](/images/cli/install-1.webp)

6. Retournez au terminal. Il confirme la connexion et la commande se termine.

## Se déconnecter

```sh
openstep logout https://builder.openstep.academy
```

Cela révoque l'autorisation de cet ordinateur. Pour utiliser de nouveau la CLI, connectez-vous à nouveau.

Vous pouvez aussi déconnecter un appareil depuis le navigateur. Ouvrez **Settings** dans le rail gauche et trouvez la section **CLI ACCESS**. Elle liste chaque appareil que vous avez autorisé. Cliquez sur **Revoke** à côté d'un appareil pour le déconnecter. Faites-le si vous avez perdu un ordinateur ou si vous ne reconnaissez plus un appareil.

## À savoir

- Approuver donne au terminal les permissions de votre compte. Si **Requesting device** n'est pas votre ordinateur, ou si vous n'avez pas exécuté `openstep login`, fermez la page.
- Si la page indique qu'elle n'a pas pu autoriser la session, le lien a expiré ou a déjà été utilisé. Exécutez de nouveau `openstep login` et utilisez le nouveau lien.
- La CLI conserve votre connexion dans `~/.openstep/credentials.json`. Gardez ce fichier privé. Ne le copiez jamais dans des fichiers source et ne le partagez pas.
- En dehors d'un dossier d'agent, ajoutez `--origin https://builder.openstep.academy` à une commande si vous êtes connecté à plus d'une adresse OpenStep. Dans un dossier d'agent, l'adresse enregistrée lors du checkout est utilisée.

Suite : [Récupérer un agent](/fr/cli/checkout/).
