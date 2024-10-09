## Development

This plugin uses a template that automates the development and publication processes on GitHub, including releases. You can develop either inside or outside your Obsidian vault.

### Environment Setup

- `main.ts` and `styles.css` must be in the `src` folder.
- After building, `styles.css` will appear in the root folder (this is normal for the release process).

#### Development Options:
1. **Inside the vault's plugins folder:**
   - Delete the `.env` file.
   - Run npm commands as usual.

2. **Outside the vault:**
   - Set the paths in the `.env` file:
     - `TestVault` for development
     - `RealVault` for production simulation
   - Necessary files will be automatically copied to the targeted vault.

### Available Commands

- `npm run start`: Opens VS Code, runs `npm install`, then `npm run dev`
- `npm run dev`: For development
- `npm run build`: Builds the project
- `npm run real`: Simulates a traditional plugin installation in your REAL vault
- `npm run bacp`: Builds, adds, commits, and pushes (prompts for commit message)
- `npm run acp`: Adds, commits, and pushes (without building)
- `npm run version`: Updates version, modifies relevant files, then adds, commits, and pushes
- `npm run release`: Creates a GitHub release (prompts for release title, can be multiline using `\n`)

### Recommended Workflow

1. `npm run start`
2. `npm run bacp`
3. `npm run version`
4. `npm run release`

### Additional Features

- **obsidian-typings**: This template automatically includes obsidian-typings, providing access to additional types not present in the official API.

### SASS Support

For SASS support, check out the `sass-ready` branch in the original template repository. Note that this feature is not included in the standard template and won't be automatically available in derived plugins.