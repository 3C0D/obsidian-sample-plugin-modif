import * as readline from 'readline';
import * as fs from 'fs/promises';
import path from 'path';

export function askQuestion(question: string, rl: readline.Interface): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (input) => {
            resolve(input.trim());
        });
    });
}

export function cleanInput(inputStr: string): string {
    return inputStr.trim().replace(/["`]/g, "'").replace(/\r\n/g, '\n');
}

export async function isValidPath(path: string) {
    try {
        await fs.access(path.trim());
        return true;
    } catch (error) {
        return false;
    }
}

export async function copyFilesToTargetDir(vaultDir: string, scss: boolean, manifestId: string, real = "0") {

    if (real === "-1") return

    const outdir = `${vaultDir}/.obsidian/plugins/${manifestId}`;

    const man = `${outdir}/manifest.json`;
    const css = `${outdir}/styles.css`;

    if (real === "1") {
        try {
            await fs.mkdir(outdir);
        } catch {
            null
        }
        try {
            await fs.copyFile("./styles.css", css);
        } catch  {
            null;
        }
        try {
            await fs.copyFile("./manifest.json", man);
        } catch (error) {
            console.log("erreur", error);
        }
        console.info(`\nInstalled in real vault ${outdir}\n`);
    }
    // real === "0"
    else {
        try {
            await fs.mkdir(outdir);
        } catch {
            null;
        }
        if (!scss) {
            try {
                await fs.copyFile("./styles.css", css);
            } catch {
                null;
            }
        }
        await fs.copyFile("./manifest.json", man);
        console.info(`\nSaving plugin to ${outdir}\n`);
    }

}

export async function removeMainCss(outdir: string): Promise<void> {
    const mainCssPath = path.join(outdir, 'main.css');
    try {
        await fs.access(mainCssPath);
        await fs.unlink(mainCssPath);
        console.log(`Removed ${mainCssPath}`);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            console.error(`Error removing main.css: ${error}`);
        }
    }
}

