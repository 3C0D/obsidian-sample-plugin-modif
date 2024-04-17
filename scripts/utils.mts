import * as readline from 'readline';
import * as fs from 'fs/promises';

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