# Obsidian Sample Plugin (Modified)

Plugin Obsidian autonome avec scripts intégrés et système de mise à jour.

## Installation

```bash
git clone https://github.com/3C0D/obsidian-sample-plugin-modif.git
cd obsidian-sample-plugin-modif
yarn install
```

## Configuration

Créer un fichier `.env` avec vos chemins de vaults :

```env
TEST_VAULT=C:\chemin\vers\vault\test
REAL_VAULT=C:\chemin\vers\vault\reel
```

## Commandes

```bash
yarn start      # Développement avec hot reload
yarn build      # Build production
yarn real       # Build + installation vault réel
yarn acp        # Add-commit-push Git
yarn bacp       # Build + add-commit-push
yarn v          # Mise à jour version
yarn h          # Aide
```

## Mise à jour via obsidian-plugin-config

Ce plugin peut être mis à jour automatiquement :

```bash
# Installation globale (une seule fois)
npm install -g obsidian-plugin-config

# Mise à jour du plugin
cd votre-plugin
obsidian-inject
```

Cela met à jour :

- Scripts locaux (esbuild, acp, etc.)
- Configuration package.json
- Dépendances requises

## Architecture

Plugin **autonome** avec scripts locaux dans `./scripts/` :

- `esbuild.config.ts` - Configuration build
- `acp.ts` - Automation Git
- `update-version.ts` - Gestion versions
- `utils.ts` - Fonctions utilitaires

Aucune dépendance externe requise pour fonctionner.
