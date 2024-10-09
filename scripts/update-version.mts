import * as readline from 'readline';
import { execSync } from 'child_process';
import { readFile, writeFile } from "fs/promises";
import dedent from 'dedent';
import * as semver from 'semver';

const rl = readline.createInterface({
    input: process.stdin as NodeJS.ReadableStream,
    output: process.stdout as NodeJS.WritableStream
});

async function getTargetVersion(currentVersion: string): Promise<string> {
    const updateType = await new Promise<string>(resolve => {
        rl.question(dedent`
        kind of update:
            patch(1.0.1) -> type 1 or p
            minor(1.1.0) -> type 2 or min
            major(2.0.0) -> type 3 or maj
            or version number (e.g. 2.0.0)
        \n`, resolve);
    });

    switch (updateType.trim()) {
        case 'p':
        case '1':
            return semver.inc(currentVersion, 'patch') || '';
        case 'min':
        case '2':
            return semver.inc(currentVersion, 'minor') || '';
        case 'maj':
        case '3':
            return semver.inc(currentVersion, 'major') || '';
        default:
            return semver.valid(updateType.trim()) || '';
    }
}

async function updateJsonFile(filename: string, updateFn: (json: any) => void): Promise<void> {
    const content = JSON.parse(await readFile(filename, "utf8"));
    updateFn(content);
    await writeFile(filename, JSON.stringify(content, null, "\t"));
}

async function updateManifestVersions(targetVersion: string): Promise<void> {
    const manifest = JSON.parse(await readFile("manifest.json", "utf8"));
    const { minAppVersion } = manifest;

    await updateJsonFile("manifest.json", json => json.version = targetVersion);
    await updateJsonFile("versions.json", json => json[targetVersion] = minAppVersion);
    await updateJsonFile("package.json", json => json.version = targetVersion);
    await updateJsonFile("package-lock.json", json => json.version = targetVersion);
}

async function updateVersion(): Promise<void> {
    const currentVersion = process.env.npm_package_version || '1.0.0';
    const targetVersion = await getTargetVersion(currentVersion);

    if (!targetVersion) {
        console.log("Invalid version");
        process.exit(1);
    }

    await updateManifestVersions(targetVersion);

    execSync(`git add -A && git commit -m "Updated to version ${targetVersion}" && git push`);
    console.log(`Version updated to ${targetVersion}`);
    rl.close();
}

updateVersion().catch(console.error);