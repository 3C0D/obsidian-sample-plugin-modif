# Obsidian Plugin Config - Centralized Architecture

🎯 **Centralized configuration and shared components for Obsidian plugin development.**

## 🏗️ What This Is

This repository provides **shared components, scripts, and configuration** for building multiple Obsidian plugins with consistent architecture and zero code duplication.

### Key Components

```
src/
├── modals/              # Reusable modal components
│   ├── generic-confirm-modal.ts
│   └── centralized-modal.ts
├── tools/               # Simple utility functions
│   └── index.ts         # Test functions and helpers
├── utils/               # Advanced utilities (future)
└── index.ts             # Main exports

scripts/
├── esbuild.config.ts    # Centralized build configuration
├── update-exports.js    # Auto-generates package.json exports
└── acp.ts              # Git automation (add, commit, push)
```

## 🚀 Quick Start

### Setup
```bash
# Clone this repository
git clone https://github.com/3C0D/obsidian-plugin-config.git
cd obsidian-plugin-config

# Install dependencies and generate exports
yarn start
```

### Using with Template
```bash
# Clone the template in the same parent directory
cd ..
git clone https://github.com/3C0D/obsidian-sample-plugin-modif.git
cd obsidian-sample-plugin-modif

# Install and build
yarn install
yarn real  # Builds and installs to Obsidian
```

### Development Options

**Inside the vault's plugins folder:**
- Delete the `.env` file or put empty paths

**From another folder:**
- Set vault paths in `.env` file:
  - `TestVault` for development
  - `RealVault` for production simulation
- Files automatically copied to targeted vault

## 🛠️ Available Commands

### Development
```bash
yarn start         # Bootstrap: install + dev mode (watch)
yarn dev           # Build in development mode (watch)
yarn build         # Production build
yarn real          # Build + install in real Obsidian vault
```

### Version Control (Centralized Scripts)
```bash
yarn acp           # Add-commit-push (from centralized config)
yarn bacp          # Build + add-commit-push
yarn release       # Release automation (from centralized config)
yarn update-version # Version management (from centralized config)
```

### Code Quality
```bash
yarn lint          # Lint the project
```

## 🛡️ Yarn Protection Features

This template **prevents accidental npm usage** that would corrupt yarn.lock:

- **`.npmrc`**: Forces engine-strict mode
- **`package.json` engines**: Blocks npm with helpful error message
- **VSCode settings**: Prevents auto-install suggestions via quick fixes
- **Result**: `npm install` shows clear error instead of corrupting project

### VSCode Integration
Project includes `.vscode/settings.json` that:
- Forces yarn for package management
- Disables auto-import suggestions that trigger npm
- Provides consistent development experience across team

**Tip:** Add these settings to your global VSCode config for all projects:
```json
{
  "npm.packageManager": "yarn",
  "typescript.preferences.includePackageJsonAutoImports": "off"
}
yarn lint:fix      # Fix linting issues
```

## 🔄 Recommended Workflow

1. **Development:** `yarn start`
2. **Commit changes:** `yarn bacp`
3. **Version bump:** `yarn update-version`
4. **Release:** `yarn release`

## 🏗️ Architecture

### Centralized Configuration
This template uses the **obsidian-plugin-config** centralized architecture:

- ✅ **Automatic dependency management** - All libraries installed transparently
- ✅ **Centralized scripts** - Build, release, and development tools
- ✅ **Rich components** - UI components can use any external library
- ✅ **Zero configuration** - You don't need to know internal dependencies

### How It Works
```
Your Plugin (this template):
├── package.json          ← Declares "obsidian-plugin-config": "file:../..."
├── yarn install          ← Automatically installs ALL dependencies
└── node_modules/         ← Contains esbuild, tsx, lodash, fs-extra, etc.

Centralized Config:
├── scripts/              ← Build and development scripts
├── src/modals/           ← UI components using external libraries
└── package.json          ← Defines ALL required dependencies
```

## 🧩 Using Centralized Components

### Generic Confirm Modal
```typescript
import { GenericConfirmModal } from '@/obsidian-plugin-config/modals';

// Simple usage
new GenericConfirmModal(this.app, {
    title: "Delete File",
    message: "Are you sure you want to delete this file?",
    confirmText: "Delete",
    cancelText: "Cancel",
    onConfirm: () => {
        // Delete the file
        console.log("File deleted");
    },
    onCancel: () => {
        console.log("Cancelled");
    }
}).open();
```

## 📦 Additional Features

- **obsidian-typings**: Automatically included for additional API types
- **Centralized dependencies**: lodash, fs-extra, and more available automatically
- **Professional build system**: esbuild with optimized configuration

## 🔧 Advanced Configuration

### Type Definitions Synchronization
Dependencies are automatically managed, but if you need additional types:

```bash
# Install typesync globally
npm install -g typesync

# In your project
typesync
yarn install
```

### Git Aliases (Optional)
The template provides centralized scripts, but you can also use Git aliases:

```bash
# Add + Commit + Push
git config --global alias.acp '!f() { git add -A && git commit -m "$@" && git push; }; f'

# Build + Add + Commit + Push
git config --global alias.bacp '!f() { yarn build && git add -A && git commit -m "$@" && git push; }; f'
```

Usage:
```bash
git acp "Your commit message"
git bacp "Your commit message after build"
```

## 🎯 Migration from Old Template

If you're migrating from an older template:

1. **Add centralized dependency:**
   ```json
   {
     "dependencies": {
       "obsidian-plugin-config": "file:../obsidian-plugin-config"
     }
   }
   ```

2. **Remove local scripts folder:**
   ```bash
   rm -rf scripts/
   ```

3. **Update package.json scripts** to use centralized ones

4. **Install:**
   ```bash
   yarn install  # Automatically installs ALL dependencies!
   ```

**That's it!** Everything else is automatic. 🎉