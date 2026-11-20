import { describe, expect, it } from 'vitest';
import { findLabDef, labDefs } from '../src/learning/labs';
import { renderLabCover } from '../src/learning/labs/covers';

const broken = /NaN|undefined|Infinity/;

describe('3D 宇宙实验台定义', () => {
  it('provides 6 complete labs with valid presets, metrics and SVG covers', () => {
    expect(labDefs).toHaveLength(6);
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
});
