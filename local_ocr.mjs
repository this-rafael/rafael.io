import { createWorker } from "tesseract.js";
import fs from "fs";
import path from "path";

async function extractText(imagePath) {
  const worker = await createWorker("por");
  const {
    data: { text },
  } = await worker.recognize(imagePath);
  console.log("=== FILE: " + imagePath + " ===");
  console.log(text);
  console.log("===============================\n\n");
  await worker.terminate();
}

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error("Provide image path");
    process.exit(1);
  }

  const root = path.resolve(args[0]);
  if (fs.statSync(root).isDirectory()) {
    const files = fs
      .readdirSync(root)
      .filter((f) => f.endsWith(".jpg") || f.endsWith(".png"));
    for (let f of files) {
      await extractText(path.join(root, f));
    }
  } else {
    await extractText(root);
  }
}
main();
