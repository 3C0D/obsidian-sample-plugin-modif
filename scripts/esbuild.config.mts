import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { config } from 'dotenv';
import manifest from "../manifest.json" assert { type: "json" };
import { copyFilesToTargetDir, removeMainCss } from "./utils.mts";
import { sassPlugin } from 'esbuild-sass-plugin'
import glob from 'glob';


config();

const banner =
	`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;
const prod = process.argv[2] === "production";
//@ts-ignore
const REAL = process.env.REAL.trim() || "-1";//trim because SET REAL=1 add a space

let vaultDir: string;
let outdir = "";

console.log("REAL", REAL)

switch (REAL) {
	case "1":
		vaultDir = process.env.REAL_VAULT ?? "./";
		outdir = `${vaultDir}/.obsidian/plugins/${manifest.id}`
		break;
	case "0":
		vaultDir = process.env.TEST_VAULT ?? "./";
		outdir = `${vaultDir}/.obsidian/plugins/${manifest.id}`
		break;
	default:
		vaultDir = "";
		outdir = "./"
}

const entryPoints = ['src/main.ts'];
const scssFiles = glob.sync('src/**/*.scss');

if (scssFiles.length) {
	entryPoints.push(...scssFiles);
}

const isScss = (!!(scssFiles.length > 0));

if (!prod) {
	await copyFilesToTargetDir(vaultDir, isScss, manifest.id, REAL);
}

const context = await esbuild.context({
	banner: {
		js: banner,
	},
	minify: prod ? true : false,
	entryPoints,
	bundle: true,
	external: [
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
		...builtins],
	plugins: [
		sassPlugin({
			syntax: 'scss',
			style: 'expanded',
		}),
		{
			name: 'remove-main-css',
			setup(build) {
				build.onEnd(async (result) => {
					if (result.errors.length === 0) {
						await removeMainCss(outdir);
					}
				});
			},
		},
	],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outdir: outdir,
	outbase: "./src",
});

if (prod) {
	await context.rebuild();
	if (REAL === "1") {
		await copyFilesToTargetDir(vaultDir, isScss, manifest.id, REAL);
	}
	// await removeMainCss(outdir);
	process.exit(0);
} else {
	await copyFilesToTargetDir(vaultDir, isScss, manifest.id, REAL);
	await context.watch();
}