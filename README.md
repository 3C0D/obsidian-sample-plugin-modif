# Obsidian Plugin Development Guide

## Initial Setup

1. For SASS support, select the `sass-ready` branch in the repository.
2. Place `main.ts` and `styles.css` in the `src` folder.
3. Choose your development environment:
   - Inside your vault's plugins folder: Delete the `.env` file.
   - Outside the vault: Configure paths in the `.env` file.

## Recommended Development Workflow

1. `npm run start`: Initiates development.
2. `npm run bacp`: Builds, adds, commits, and pushes changes.
3. `npm run version`: Updates the version.
4. `npm run release`: Creates a new release on GitHub.

## Available Commands

- `npm run dev` / `npm start`: Starts development.
- `npm run build`: Builds the project.
- `npm run real`: Simulates a traditional installation in your REAL vault.
- `npm run bacp`: Builds, adds, commits, and pushes (with commit message).
- `npm run acp`: Adds, commits, and pushes (without building).
- `npm run version`: Updates version in relevant files.
- `npm run release`: Creates a new release on GitHub.

## Important Notes

- The `build` command places `styles.css` in the root folder for release preparation.
- Use `TestVault` for development and `RealVault` to simulate production in the `.env` file.
- Versions are automatically pushed with the message "updated to version x.x.x".
- Release titles can be multi-line using `\n`.

## Automation

This template automates:
- Development and publication processes on GitHub.
- Release creation.
- Copying necessary files to the targeted vault (if developed outside the vault).

Remember to check other branches for additional options like SASS.