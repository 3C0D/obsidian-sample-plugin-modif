#!/usr/bin/env tsx

console.log(`
Obsidian Plugin Development - Command Reference
(Autonomous plugin with local scripts)

DEVELOPMENT:
  yarn start                       Install dependencies and start development
  yarn dev                         Build in development mode with hot reload
  yarn build                       Build for production
  yarn real                        Build and install in real Obsidian vault

VERSION MANAGEMENT:
  yarn update-version, v           Update plugin version in package.json and manifest.json
  yarn release, r                  Create release with automated changelog

GIT OPERATIONS:
  yarn acp                         Add, commit, and push changes
  yarn bacp                        Build + add, commit, and push

USAGE EXAMPLES:
  yarn start                       # First time setup
  yarn dev                         # Daily development
  yarn real                        # Build and test in real vault
  yarn update-version              # Update version before release
  yarn release                     # Publish new version

ENVIRONMENT:
  - Edit .env file to set TEST_VAULT and REAL_VAULT paths
  - All scripts are now local (autonomous plugin)

AUTONOMOUS ARCHITECTURE:
  - Scripts are local in ./scripts/ directory
  - No dependency on external obsidian-plugin-config
  - Can be updated via future injection system
  - Self-contained and portable
`);
