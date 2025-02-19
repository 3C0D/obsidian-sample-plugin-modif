# Plugin Development Template

## Development

Now working with yarn. This plugin uses a template that automates the development and publication processes on GitHub, including releases. You can develop either inside or outside your Obsidian vault.

### Environment Setup

#### File Structure
- All source files must be in the `src` folder:
  - `main.ts`
  - `styles.css`

> **Note:** If `styles.css` is accidentally placed in the root folder instead of `src`, it will be automatically moved to the correct location when running any development command. After building, a copy of `styles.css` will appear in the root folder as part of the normal release process.

#### Development Options
1. **Inside the vault's plugins folder:**
   - Delete the `.env` file
   - Run npm commands as usual, except yarn install. Or rather use yarn to run them.

2. **Outside the vault:**
   - Set the paths in the `.env` file:
     - `TestVault` for development
     - `RealVault` for production simulation
   - Necessary files will be automatically copied to the targeted vault

### Available Commands

- `yarn run start`: Opens VS Code, runs `yarn install`, then `yarn run dev`
- `yarn run dev`: For development
- `yarn run build`: Builds the project
- `yarn run real`: Simulates a traditional plugin installation in your REAL vault
- `yarn run bacp`: Builds, adds, commits, and pushes (prompts for commit message)
- `yarn run acp`: Adds, commits, and pushes (without building)
- `yarn run version`: Updates version, modifies relevant files, then adds, commits, and pushes
- `yarn run release`: Creates a GitHub release (prompts for release title, can be multiline using `\n`)

### Recommended Workflow

1. `yarn run start`
2. `yarn run bacp`
3. `yarn run version`
4. `yarn run release`

### Additional Features

- **obsidian-typings**: This template automatically includes obsidian-typings, providing access to additional types not present in the official API.

### SASS Support

For SASS support, check out the `sass-ready` branch in the original template repository. 
When you are using the template for this branch, you need to check use all branchs option. then after you clone your new plugin, there is a batch in the root folder to replace the master branch by sass-ready one. run this once