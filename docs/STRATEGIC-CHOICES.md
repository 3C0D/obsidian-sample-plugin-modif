# Strategic Choices & Architecture Decisions

## 🎯 Overview
This document explains the key strategic decisions made in building the centralized Obsidian plugin architecture.

## 🏗️ Architecture Principles

### Centralized Configuration
- **Choice:** Single `obsidian-plugin-config` repo for shared components
- **Why:** Avoid code duplication across multiple plugins
- **How:** File dependency with `file:../obsidian-plugin-config`

### Import Strategy
- **Choice:** Relative imports with alias (`obsidian-plugin-config/tools`)
- **Why:** Simpler than npm packages, direct file access
- **Alternative rejected:** Publishing to npm (too complex for personal use)

## 🛡️ Package Manager Protection

### Yarn-Only Strategy
- **Problem:** Accidental `npm install` corrupts `yarn.lock`
- **Solutions implemented:**
  1. `.npmrc` with `engine-strict=true`
  2. `package.json` engines: `"npm": "please-use-yarn"`
  3. VSCode settings: `"npm.packageManager": "yarn"`
  4. VSCode auto-import disabled: `"typescript.preferences.includePackageJsonAutoImports": "off"`

### VSCode Protection
- **Problem:** Quick fix suggestions trigger `npm install`
- **Solution:** Project-level `.vscode/settings.json` forces yarn usage
- **Benefit:** Prevents accidental package manager mixing

## 📦 Dependency Management

### Dependency Placement Logic
- **Rule:** Install dependencies WHERE the code uses them
- **Template needs:** `tsx`, `obsidian-typings` (for scripts and types)
- **Plugin-config needs:** `fs-extra` (for update-exports), `lodash` (for components)
- **Why:** Clear separation, no confusion about what's needed where

### TypeScript Types
- **Choice:** `obsidian-typings` in both repos
- **Why:** VSCode needs types where code is written
- **Effect:** Clean IDE experience, no red squiggles

## 🔄 Export Automation

### Auto-Generated Exports
- **Tool:** `update-exports.js` script
- **Function:** Scans `src/` folders, generates `package.json` exports
- **Benefit:** No manual export management
- **Trigger:** Runs on `yarn start` in plugin-config

## 🎯 Discoverability Strategy

### GitHub Topics
- **Applied to:** All Obsidian plugin repos
- **Keywords:** obsidian, obsidian-plugin, typescript, productivity
- **Goal:** Combat potential shadow banning

### Package Keywords
- **Added to:** package.json in both repos
- **Purpose:** npm search, development tool discovery
- **Inspiration:** Following mnaoumov's best practices

## 🚀 Development Workflow

### Build Process
- **Command:** `yarn real` (build + install to Obsidian)
- **Scripts:** Centralized in plugin-config, executed from template
- **Architecture:** Template calls scripts from plugin-config via tsx

### Git Strategy
- **Include:** `yarn.lock` (version consistency)
- **Exclude:** `package-lock.json` (prevent npm/yarn conflicts)
- **VSCode:** Include `.vscode/settings.json` (share yarn protection)

## 🔧 Tools Created

### Generic Components
- **Confirmation Modal:** Reusable across plugins
- **Test Tools:** Simple functions for architecture validation
- **Utilities:** Shared helper functions

### Scripts
- **esbuild.config.ts:** Centralized build configuration
- **update-exports.js:** Automatic export generation
- **acp.ts:** Git automation (add, commit, push)

## 💡 Key Insights

### What Works
- File dependencies for personal projects
- Triple protection against npm accidents
- Centralized scripts with tsx execution
- Auto-generated exports

### Lessons Learned
- TypeScript types must be installed where code exists
- VSCode quick fixes can break package manager consistency
- Cache issues (yarn/electron) require manual intervention
- GitHub topics may help discoverability

## 🎯 Future Improvements

### Migration Tool
- **Goal:** Convert existing plugins to centralized architecture
- **Challenge:** Automated dependency detection and migration
- **Approach:** Template scanning + mapping dependencies

### Enhanced Documentation
- **README improvements:** Clear setup instructions
- **Architecture diagrams:** Visual representation
- **Best practices:** Guidelines for new plugins

---

*This architecture balances simplicity with functionality, prioritizing developer experience and maintainability.*
