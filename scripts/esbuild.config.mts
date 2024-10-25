import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { config } from 'dotenv';
import path from "path";
import manifest from "../manifest.json" assert { type: "json" };
import { copyFilesToTargetDir, isValidPath, copyFile } from "./utils.mts";

config();

const EXTERNAL_DEPS = [
	"obsidian",
	"electron",
	"@codemirror/autocomplete",
	"@codemirror/collab",
	"@codemirror/commands",
	"@codemirror/language",
	"@codemirror/lint",
	"@codemirror/search",
	"@codemirror/state",
	"@codemirror/view",
	"@lezer/common",
	"@lezer/highlight",
	"@lezer/lr",
	...builtins
];

const BANNER = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/`;

interface BuildConfig {
	REAL: string;
	outdir: string;
}

async function validateEnvironment() {
	if (!await isValidPath("./src/main.ts")) {
		throw new Error("Invalid path for src/main.ts. main.ts must be in the src directory");
	}
	if (!await isValidPath("./manifest.json")) {
		throw new Error("Invalid path for manifest.json");
	}
}

async function setupStyles(): Promise<string[]> {
	const stylesFilePath = './src/styles.css';
	const altStylesFilePath = './styles.css';

	const stylesFileExists = await isValidPath(stylesFilePath);
	const altStylesFileExists = await isValidPath(altStylesFilePath);

	if (!stylesFileExists && !altStylesFileExists) {
		return ['src/main.ts'];
	}

	if (altStylesFileExists && !stylesFileExists) {
		await copyFile(
			altStylesFilePath,
			stylesFilePath,
			"styles.css have been copied to src/styles.css for esbuild compatibility"
		);
	}

	return ['src/main.ts', 'src/styles.css'];
}

function getBuildConfig(): BuildConfig {
	const REAL = process.env.REAL?.trim() || "-1";

	if (REAL === "-1" || (!process.env.REAL_VAULT && !process.env.TEST_VAULT)) {
		return { REAL: "-1", outdir: "./" };
	}

	const vaultPath = REAL === "1"
		? process.env.REAL_VAULT?.trim()
		: process.env.TEST_VAULT?.trim();

	const outdir = path.join(vaultPath ?? "./", '.obsidian', 'plugins', manifest.id);
	return { REAL, outdir };
}

async function createBuildContext(config: BuildConfig, isProd: boolean, entryPoints: string[]) {
	return await esbuild.context({
		banner: { js: BANNER },
		minify: isProd,
		entryPoints,
		bundle: true,
		external: EXTERNAL_DEPS,
		format: "esm",
		target: "es2021",
		logLevel: "info",
		sourcemap: isProd ? false : "inline",
		treeShaking: true,
		outdir: config.outdir,
		outbase: "./src",
	});
}

async function main() {
	try {
		await validateEnvironment();

		const entryPoints = await setupStyles();
		const isProd = process.argv[2] === "production";
		const buildConfig = getBuildConfig();

		console.log("Build configuration:", buildConfig);
		console.log("Entry points:", entryPoints);

		const context = await createBuildContext(buildConfig, isProd, entryPoints);

		if (isProd) {
			if (buildConfig.REAL === "1") {
				await copyFilesToTargetDir(buildConfig.outdir, manifest.id);
			}

			await context.rebuild();

			if (buildConfig.REAL === "1") {
				console.log("Successfully installed in the real vault");
			}

			process.exit(0);
		} else {
			await copyFilesToTargetDir(buildConfig.outdir, manifest.id);
			await context.watch();
		}
	} catch (error) {
		console.error("Build failed:", error);
		process.exit(1);
	}
}

main().catch(console.error);
