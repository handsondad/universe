// skills/ 是正本；Cursor 读 .cursor/skills/，Codex 等读 .agents/skills/。改完正本跑 npm run skills:sync，
// tests/skills.test.ts 会查三份是否一字不差。
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'skills');
for (const mirror of ['.cursor/skills', '.agents/skills']) {
  for (const skill of readdirSync(source)) {
    const target = join(root, mirror, skill);
    if (existsSync(target)) rmSync(target, { recursive: true });
    cpSync(join(source, skill), target, { recursive: true });
  }
  console.log(`已同步到 ${mirror}/`);
}
