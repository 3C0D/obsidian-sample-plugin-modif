#!/usr/bin/env tsx

console.log(`
Obsidian Plugin Config - Command Reference
(Run these commands from obsidian-plugin-config directory)

MIGRATION:
  yarn migrate, m <path>           Migrate plugin to centralized architecture
  yarn migrate --dry-run           Preview changes without applying (debugging)
  yarn migrate -i, --interactive   Interactive plugin selection

MAINTENANCE:
  yarn start                       Install dependencies and update exports
  yarn acp                         Add, commit, and push changes (with exports update)
  yarn acp -ne, --no-exports       Add, commit, and push without updating exports
  yarn update-version, v           Update version in centralized config
  yarn help, h                     Show this help

USAGE EXAMPLES:
  yarn migrate "C:\\Users\\dev\\plugins\\my-plugin"
  yarn migrate ../existing-plugin --dry-run
  yarn m -i                        # Short interactive mode

PATH CONVENTIONS:
  - Windows absolute paths: Use quotes "C:\\path\\to\\plugin"
  - Relative paths: No quotes needed ../plugin-name

For detailed documentation: ARCHITECTURE-SUMMARY.md
`);
