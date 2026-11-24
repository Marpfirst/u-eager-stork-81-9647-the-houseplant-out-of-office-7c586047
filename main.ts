// The Houseplant Out-of-Office — make.fun bounty entry.
// Writes one out-of-office auto-reply, as if a houseplant wrote it,
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// Node 22, stdlib only, deterministic: the same line every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Chosen line (103 chars) — see README.md for the three candidates
// and why this one won.
const LINE =
  "Out of office. Last watered in March. I have held my breath ever since. Your email can wait — so can I.";

// The gate allows 1–120 characters; refuse to write anything else.
const length = [...LINE].length;
if (length < 1 || length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
