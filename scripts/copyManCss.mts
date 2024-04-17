import * as fs from 'fs/promises';
import process from "process";
import { config } from 'dotenv';
import manifest from "../manifest.json" assert { type: "json" };

config();

const vaultDir = process.env.REAL ? process.env.REAL_VAULT : process.env.TEST_VAULT;
const targetDir = `${vaultDir}/.obsidian/plugins/${manifest.id}`;
const man = `${targetDir}/manifest.json`;
const css = `${targetDir}/styles.css`;

await copyFilesToTargetDir(targetDir, man, css);

export async function copyFilesToTargetDir(targetDir: string, man: string, css: string) {
    // Create the target directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });
    // Copy manifest.json and styles.css
    await fs.copyFile("./manifest.json", man);
    await fs.copyFile("./styles.css", css);
}