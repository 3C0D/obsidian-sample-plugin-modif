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

## Support SASS (Optionnel)

Pour ajouter le support SASS/SCSS à votre plugin :

```bash
# Avec obsidian-plugin-config local
cd ../obsidian-plugin-config
yarn inject-sass ../votre-plugin --yes

# Ou avec le package NPM global
cd votre-plugin
obsidian-inject --sass
```

**Ce que l'injection SASS ajoute :**

- ✅ Dépendance `esbuild-sass-plugin`
- ✅ Compilation automatique des fichiers `.scss`
- ✅ Détection prioritaire : `src/styles.scss` > `src/styles.css` > `styles.css`
- ✅ Nettoyage automatique du CSS généré

**Utilisation :**

1. Créer `src/styles.scss` au lieu de `styles.css`
2. Utiliser les variables, mixins et fonctionnalités SASS
3. Le build compile automatiquement vers CSS

## Architecture

Plugin **autonome** avec scripts locaux dans `./scripts/` :

- `esbuild.config.ts` - Configuration build
- `acp.ts` - Automation Git
- `update-version.ts` - Gestion versions
- `utils.ts` - Fonctions utilitaires

Aucune dépendance externe requise pour fonctionner.
