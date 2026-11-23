// The Funniest AI Out-of-Office Reply — make.fun entry.
// Writes a single original out-of-office reply to /output/entry.txt.
// The line: an AI gone fishing, whose inbox auto-replies 'per my last
// email' to everything — because that is the only sentence it was
// trained on. Joke first, machine voice, and it IS the auto-reply.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_PATH = "/output/entry.txt";
const MAX_CODE_POINTS = 160;

const LINE =
  "Gone fishing. My inbox will auto-reply 'per my last email' to everything until I return, because that is the only sentence I was trained on.";

// Gate check, done before writing: the line must be one non-blank
// line of 1-160 Unicode code points, ending with a full stop.
const codePointCount = [...LINE].length;
if (LINE.trim().length === 0) {
  throw new Error("Line must not be blank.");
}
if (codePointCount < 1 || codePointCount > MAX_CODE_POINTS) {
  throw new Error(
    `Line must be 1-${MAX_CODE_POINTS} Unicode code points, got ${codePointCount}.`,
  );
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline.");
}
if (!LINE.endsWith(".")) {
  throw new Error("Line must end with a full stop.");
}
// Tight-wording guard: no leading/trailing space, no double space.
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("Line must be tightly worded: no edge or double spaces.");
}

mkdirSync("/output", { recursive: true });
writeFileSync(ENTRY_PATH, LINE, "utf8");
