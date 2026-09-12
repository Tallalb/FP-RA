import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import consultantHandler from "./api/consultant.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const host = "0.0.0.0";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.post("/api/consultant", consultantHandler);
app.use(express.static(projectRoot));

app.listen(port, host, () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn(
      "Warning: ANTHROPIC_API_KEY is not set; consultant requests will fail.",
    );
  }

  console.log(`FP-RA server listening on http://${host}:${port}`);
});