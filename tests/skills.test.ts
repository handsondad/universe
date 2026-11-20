import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { simNames } from '../src/learning/sims';

const root = process.cwd();
const skill = join(root, 'skills', 'universe-explainer');
const files = readdirSync(skill).sort();
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { scripts: Record<string, string> };

describe('给后来的 Agent 的指导和工具', () => {
  it('keeps the .cursor and .agents copies of the skill identical to skills/ (npm run skills:sync)', () => {
    for (const mirror of ['.cursor/skills', '.agents/skills']) {
      const copy = join(root, mirror, 'universe-explainer');
      expect(existsSync(copy), `${mirror} 缺 universe-explainer`).toBe(true);
      expect(readdirSync(copy).sort(), mirror).toEqual(files);
      for (const file of files) {
        expect(readFileSync(join(copy, file), 'utf8'), `${mirror}/${file} 和 skills/ 不一样：npm run skills:sync`).toBe(readFileSync(join(skill, file), 'utf8'));
      }
    }
  });

  it('links every file the skill mentions, and lists every sim in figures.md', () => {
    const main = readFileSync(join(skill, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
    expect(main).toMatch(/^---\nname: universe-explainer\ndescription: /);
    for (const [, link] of main.matchAll(/\]\(([\w-]+\.md)\)/g)) expect(files, `SKILL.md 链到 ${link}`).toContain(link);
    const figures = readFileSync(join(skill, 'figures.md'), 'utf8');
    expect(simNames.filter(name => !figures.includes(`\`${name}\``)), 'figures.md 里没登记的互动图').toEqual([]);
  });

  it('only documents npm scripts that exist', () => {
    const docs = [readFileSync(join(root, 'AGENTS.md'), 'utf8'), ...files.map(file => readFileSync(join(skill, file), 'utf8'))].join('\n');
    const mentioned = new Set([...docs.matchAll(/npm run ([\w:]+)/g)].map(match => match[1]));
    expect([...mentioned].filter(name => !pkg.scripts[name])).toEqual([]);
  });
});
