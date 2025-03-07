import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { config } from "dotenv";
import path from "path";
import manifest from "../manifest.json" with { type: "json" };
import { rm } from "fs/promises";
import { isValidPath, copyFilesToTargetDir } from "./utils.ts";

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

async function validateEnvironment(): Promise<void> {
  if (!await isValidPath("./src/main.ts")) {
    throw new Error("Invalid path for src/main.ts. main.ts must be in the src directory");
  }
  if (!await isValidPath("./manifest.json")) {
    throw new Error("Invalid path for manifest.json");
  }
}

function getBuildPath(isProd: boolean): string {
  // If simple build or no paths provided
  if (isProd && !process.argv.includes("-r")) {
    return "./";
  }

  const vaultPath = process.argv.includes("-r")
    ? process.env.REAL_VAULT?.trim()
    : process.env.TEST_VAULT?.trim();

  return path.join(vaultPath ?? "./", ".obsidian", "plugins", manifest.id);
}

async function createBuildContext(buildPath: string, isProd: boolean, entryPoints: string[]): Promise<esbuild.BuildContext> {
  return await esbuild.context({
    banner: { js: BANNER },
    minify: isProd,
    entryPoints,
    bundle: true,
    external: EXTERNAL_DEPS,
    format: "cjs",
    target: "es2021",
    logLevel: "info",
    sourcemap: isProd ? false : "inline",
    treeShaking: true,
    outdir: buildPath,
    outbase: "src",
    plugins: [
      {
        name: "copy-to-plugins-folder",
        setup: (build): void => {
          build.onEnd(async () => {
            // if real or build
            if (isProd) {
              if (process.argv.includes("-r")) {
                await copyFilesToTargetDir(buildPath);
                console.log(`Successfully installed in ${buildPath}`);
              } else {
                const folderToRemove = path.join(buildPath, "_.._");
                if (await isValidPath(folderToRemove)) {
                  await rm(folderToRemove, { recursive: true });
                }
                console.log("Built done in initial folder");
              }
            }
            // if watch (dev)
            else {
              await copyFilesToTargetDir(buildPath);
            }
          });
        }
      }
    ]
  });
}

async function main(): Promise<void> {
  try {
    await validateEnvironment();
    const isProd = process.argv[2] === "production";
    const buildPath = getBuildPath(isProd);
    console.log(buildPath === "./"
      ? "Building in initial folder"
      : `Building in ${buildPath}`);
    const stylePath = await isValidPath("src/styles.css")? "src/styles.css" : "styles.css";	
    const entryPoints = ["src/main.ts", stylePath];
    const context = await createBuildContext(buildPath, isProd, entryPoints);

    if (isProd) {
      await context.rebuild();
      process.exit(0);
    } else {
      await context.watch();
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);
