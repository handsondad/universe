import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findLesson } from '../src/learning/catalog';
import { findLabDef, labDefs } from '../src/learning/labs';
import { renderLabCover } from '../src/learning/labs/covers';

const broken = /NaN|undefined|Infinity/;
const scenesSource = readFileSync(join(process.cwd(), 'src/learning/labs/scenes.ts'), 'utf8');
const coversSource = readFileSync(join(process.cwd(), 'src/learning/labs/covers.ts'), 'utf8');

describe('3D 宇宙实验台定义', () => {
  it('provides at least 6 complete labs with valid presets, metrics and SVG covers', () => {
    expect(labDefs.length).toBeGreaterThanOrEqual(6);
    expect(new Set(labDefs.map(lab => lab.slug)).size).toBe(labDefs.length);
    for (const lab of labDefs) {
      expect(findLabDef(lab.slug)).toBe(lab);
      expect(lab.steps.length).toBeGreaterThanOrEqual(4);
      expect(lab.controls.length).toBeGreaterThanOrEqual(2);
      const cover = renderLabCover(lab.slug).value;
      expect(cover).not.toMatch(broken);
      expect(cover).toContain('<svg');

      for (const step of lab.steps) {
        const values = Object.fromEntries(lab.controls.map(c => [c.key, step.preset[c.key] ?? c.value]));
        const m = lab.metric(values);
        expect(m.label.length).toBeGreaterThan(1);
        expect(m.value).not.toMatch(broken);
        expect(m.note).not.toMatch(broken);
      }

      const minVals = Object.fromEntries(lab.controls.map(c => [c.key, c.min]));
      const maxVals = Object.fromEntries(lab.controls.map(c => [c.key, c.max]));
      expect(lab.metric(minVals).value).not.toMatch(broken);
      expect(lab.metric(maxVals).value).not.toMatch(broken);
    }
  });

  it('wires every lab to a curriculum question, its own 3D scene builder and its own cover', () => {
    for (const lab of labDefs) {
      expect(findLesson(lab.slug), `curriculum.ts 里要有 ${lab.slug} 这一题`).toBeDefined();
      expect(scenesSource, `scenes.ts 的 BUILDERS 里要登记 '${lab.slug}'`).toContain(`'${lab.slug}': build`);
      expect(coversSource, `covers.ts 的 COVERS 里要画 '${lab.slug}' 的封面`).toContain(`'${lab.slug}': \``);
      for (const step of lab.steps) {
        for (const key of Object.keys(step.preset)) {
          expect(lab.controls.some(control => control.key === key), `${lab.slug}「${step.title}」的 preset 用了不存在的滑块 ${key}`).toBe(true);
        }
      }
    }
  });
});
