# Obsidian Sample Plugin (Modified)

Self-contained Obsidian plugin with built-in scripts and update system.

## Installation

```bash
git clone https://github.com/3C0D/obsidian-sample-plugin-modif.git
cd obsidian-sample-plugin-modif
yarn install
```

## Configuration

Create a `.env` file with your vault paths:

```env
TEST_VAULT=C:\path\to\test\vault
REAL_VAULT=C:\path\to\real\vault
```

## Commands

```bash
yarn start      # Development with hot reload
yarn build      # Production build
yarn real       # Build + install real vault
yarn acp        # Add-commit-push Git
yarn bacp       # Build + add-commit-push
yarn v          # Update version
yarn h          # Help
```

## Update via obsidian-plugin-config

This plugin can be automatically updated:

```bash
# Global installation (one time)
npm install -g obsidian-plugin-config

# Update the plugin
cd your-plugin
obsidian-inject
```

This updates:

- Local scripts (esbuild, acp, etc.)
- package.json configuration
- Required dependencies

## SASS Support (Optional)

To add SASS/SCSS support to your plugin:

```bash
# With local obsidian-plugin-config
cd ../obsidian-plugin-config
yarn inject-sass ../your-plugin --yes

# Or with global NPM package
cd your-plugin
obsidian-inject --sass
```

**What SASS injection adds:**

- ✅ `esbuild-sass-plugin` dependency
- ✅ Automatic compilation of `.scss` files
- ✅ Priority detection: `src/styles.scss` > `src/styles.css` > `styles.css`
- ✅ Automatic cleanup of generated CSS

**Usage:**

1. Create `src/styles.scss` instead of `styles.css`
2. Use SASS variables, mixins and features
3. Build automatically compiles to CSS

## Architecture

**Self-contained** plugin with local scripts in `./scripts/`:

- `esbuild.config.ts` - Build configuration
- `acp.ts` - Git automation
- `update-version.ts` - Version management
- `utils.ts` - Utility functions

No external dependencies required to function.
