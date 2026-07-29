import { cp, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(projectRoot, "public");
const exportDirectory = path.join(projectRoot, "dist");

await access(publicDirectory, constants.R_OK);
await access(exportDirectory, constants.W_OK);
await cp(publicDirectory, exportDirectory, { recursive: true, force: true });

console.log("Copied public assets to dist for the static export.");
