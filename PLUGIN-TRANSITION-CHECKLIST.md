# Plugin Transition Checklist - Architecture Autonome

## 📋 Liste Complète pour Script d'Injection

Cette liste documente **toutes les étapes** nécessaires pour transformer un plugin vers l'architecture autonome. Elle servira de référence pour le futur script `yarn inject-obsidian-config`.

---

## 🔧 1. Modifications Package.json

### Scripts à remplacer :
```json
{
  "scripts": {
    "start": "yarn install && yarn dev",
    "dev": "tsx scripts/esbuild.config.ts",
    "build": "tsc -noEmit -skipLibCheck && tsx scripts/esbuild.config.ts production",
    "real": "tsx scripts/esbuild.config.ts production real",
    "acp": "tsx scripts/acp.ts",
    "bacp": "tsx scripts/acp.ts -b",
    "update-version": "tsx scripts/update-version.ts",
    "v": "tsx scripts/update-version.ts",
    "release": "tsx scripts/release.ts",
    "r": "tsx scripts/release.ts",
    "help": "tsx scripts/help.ts",
    "h": "tsx scripts/help.ts"
  }
}
```

### Dépendances à ajouter :
```json
{
  "devDependencies": {
    "esbuild": "^0.24.0",
    "dedent": "^1.5.3",
    "semver": "^7.6.3",
    "@types/semver": "^7.5.8",
    "dotenv": "^16.4.5",
    "builtin-modules": "^4.0.0"
  }
}
```

### Dépendances à supprimer :
- `"obsidian-plugin-config": "file:../obsidian-plugin-config"`

### Configurations à conserver :
```json
{
  "engines": {
    "npm": "please-use-yarn",
    "yarn": ">=1.22.0"
  },
  "type": "module",
  "overrides": {
    "esbuild": "$esbuild"
  }
}
```

---

## 📁 2. Scripts à Créer dans ./scripts/

### Liste des fichiers requis :
1. **utils.ts** - Fonctions utilitaires de base
2. **esbuild.config.ts** - Configuration de build (sans alias plugin-config)
3. **acp.ts** - Add-commit-push automation
4. **update-version.ts** - Gestion des versions
5. **release.ts** - Automation des releases (optionnel)
6. **help.ts** - Aide locale

### Fonctionnalités critiques à préserver :
- ✅ Gestion des vaults (TEST_VAULT, REAL_VAULT)
- ✅ Protection yarn obligatoire
- ✅ Build avec watch mode
- ✅ Copy vers plugins folder
- ✅ Gestion des .env
- ✅ Git automation
- ✅ Version management (manifest.json, package.json, versions.json)

---

## 🔄 3. Adaptations du Code Source

### Imports à commenter/adapter :
```typescript
// AVANT (centralisé)
import { showTestMessage, getRandomEmoji } from "obsidian-plugin-config/tools";
import { NoticeHelper, SettingsHelper } from "obsidian-plugin-config/utils";

// APRÈS (autonome)
// import { showTestMessage, getRandomEmoji } from "obsidian-plugin-config/tools";
// import { NoticeHelper, SettingsHelper } from "obsidian-plugin-config/utils";
```

### Fonctionnalités à désactiver temporairement :
- Commandes utilisant les outils centralisés
- Modals centralisés
- Utils centralisés (NoticeHelper, SettingsHelper)
- Test imports

### Pattern de commentaire :
```typescript
// COMMENTED FOR AUTONOMOUS VERSION
// [code centralisé]

// OU

/*
[bloc de code centralisé]
*/
```

---

## 📂 4. Structure de Dossiers à Créer

### Dossiers requis :
```
./scripts/           # Scripts locaux
./.github/workflows/ # Pour releases (si yarn release utilisé)
```

### Fichiers à préserver :
- `.env` (configurations vault)
- `manifest.json`
- `package.json`
- `versions.json`
- `tsconfig.json`
- `eslint.config.ts`
- Tous les fichiers source existants

---

## ⚙️ 5. Configurations TypeScript/ESLint

### À conserver tel quel :
- `tsconfig.json` existant
- `eslint.config.ts` existant
- Configurations VSCode (si présentes)

### À adapter dans esbuild.config.ts :
- Supprimer les alias vers plugin-config :
```typescript
// SUPPRIMER ces alias :
build.onResolve({ filter: /^@config\// }, (args) => {
  const relativePath = args.path.replace(/^@config\//, "");
  return {
    path: path.resolve("../obsidian-plugin-config/src", relativePath)
  };
});
```

---

## 🧪 6. Tests de Validation

### Commandes à tester après transition :
1. `yarn install` - Installation des dépendances
2. `yarn build` - Build production
3. `yarn start` - Mode développement
4. `yarn real` - Installation vault réel
5. `yarn acp` - Git automation
6. `yarn bacp` - Build + git
7. `yarn h` - Aide locale

### Vérifications critiques :
- ✅ Aucune erreur TypeScript
- ✅ Build réussi
- ✅ Plugin fonctionne dans Obsidian
- ✅ Scripts git fonctionnels
- ✅ Gestion des vaults opérationnelle

---

## 🚀 7. Post-Transition

### Actions recommandées :
1. Commit des changements
2. Test complet du plugin
3. Documentation des changements
4. Préparation pour injection future

### Fichiers de référence :
- Ce checklist pour validation
- `ARCHITECTURE-SUMMARY.md` pour contexte
- Scripts dans `./scripts/` comme templates

---

## 💡 8. Notes pour Script d'Injection

### Le script `yarn inject-obsidian-config` devra :
1. **Analyser** le plugin existant
2. **Sauvegarder** les configurations locales
3. **Appliquer** toutes les étapes ci-dessus
4. **Préserver** les customisations existantes
5. **Valider** le fonctionnement post-injection
6. **Rollback** en cas d'erreur

### Stratégie d'injection :
- Réécriture par-dessus les fichiers existants
- Préservation des .env et configurations locales
- Mise à jour intelligente (pas de suppression brutale)
- Validation automatique post-injection

---

**📌 Cette liste est la référence complète pour automatiser la transition de n'importe quel plugin vers l'architecture autonome.**
