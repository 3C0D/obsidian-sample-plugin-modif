import * as fs from 'fs/promises';
import process from "process";
import { config } from 'dotenv';
import manifest from "./../manifest.json" assert { type: "json" };

config();

const vaultDir = process.env.LINKED_VAULT
const targetDir = `${vaultDir}/.obsidian/plugins/${manifest.id}`;
const man = `${targetDir}/manifest.json`;
const css = `${targetDir}/styles.css`;
//copy manifest.json and styles.css
await fs.copyFile("./manifest.json", man);
await fs.copyFile("./styles.css", css);
