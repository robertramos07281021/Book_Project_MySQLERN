import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const environment = process.env.NODE_ENV;

router.get("/*", async (_req, res) => {
  const data = {
    environment,
    manifest: await parseManifest(),
  };

  res.render(
    path.join(__dirname, "../../client/views", "index.html.ejs"),
    data
  );
});

const parseManifest = async () => {
  if (environment !== "production") return {};

  const manifestPath = path.join(
    __dirname,
    "../../client",
    "dist",
    ".vite",
    "manifest.json"
  );
  const manifestFile = await fs.readFile(manifestPath);

  return JSON.parse(manifestFile);
};

export default router;
