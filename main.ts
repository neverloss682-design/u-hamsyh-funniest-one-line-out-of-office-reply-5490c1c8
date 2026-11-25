// Funniest One-Line Out-of-Office Reply
// make.fun competition: u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
//
// Premise (fresh, reversal not escalation): the sender is not on a beach and
// the inbox is not the joke. The office itself is gone — demolished in
// March — so the "urgent" redirect lands on a pile of rubble. The first
// clause reads like any ordinary away message; the punchline (rubble that
// used to be my desk) cannot be guessed from it. Avoids the saturated
// angles: no smaller model covering, no auto-reply working overtime, no
// replying from holiday, no beach / inbox / limited-email lines.
//
// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 160
// characters, not only whitespace, a single line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out of office until Monday. The office was demolished in March, so please send anything urgent to the pile of rubble that used to be my desk.";

// Self-checks enforced before writing: single line, 1-160 chars, non-blank,
// no double spaces, ends on a full stop (reads as a finished away message).
if (ENTRY.length < 1 || ENTRY.length > 160) {
  throw new Error(`entry length ${ENTRY.length} outside gate 1-160`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is blank");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
if (/  /.test(ENTRY) || !ENTRY.endsWith(".")) {
  throw new Error("entry must have single spaces and end with a full stop");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
