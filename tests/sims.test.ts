import { describe, expect, it } from 'vitest';
import { html, setHtml } from '../src/learning/html';
import { mountSims, renderSim, simNames } from '../src/learning/sims';

const broken = /NaN|undefined|Infinity/;

function combos(inputs: HTMLInputElement[]): number[][] {
  const levels = inputs.map(input => {
    const [min, max, step] = [Number(input.min), Number(input.max), Number(input.step)];
    const mid = min + Math.round((max - min) / 2 / step) * step;
    return [...new Set([min, mid, max])];
  });
  return levels.reduce<number[][]>((all, values) => all.flatMap(prefix => values.map(value => [...prefix, value])), [[]]);
}

describe('能拖滑块的宇宙互动图', () => {
  it.each(simNames)('%s draws a clean picture and readout for every slider setting', name => {
    const host = document.createElement('div');
    setHtml(host, renderSim(name, '说明', 'sim-0'));
    const stop = mountSims(host);
    const svg = host.querySelector('.sim-svg')!;
    const readout = host.querySelector('.sim-readout')!;
    const inputs = [...host.querySelectorAll<HTMLInputElement>('input[data-key]')];
    expect(inputs.length).toBeGreaterThan(0);
    expect(svg.innerHTML).not.toMatch(broken);

    for (const values of combos(inputs)) {
      values.forEach((value, i) => {
        inputs[i].value = String(value);
        inputs[i].dispatchEvent(new Event('input'));
      });
      const where = `${name} ${values.join(' / ')}`;
      expect(svg.innerHTML, where).not.toMatch(broken);
      expect(svg.querySelectorAll('*').length, where).toBeGreaterThan(3);
      expect(readout.textContent, where).not.toMatch(broken);
      expect(readout.textContent!.length, where).toBeGreaterThan(6);
      for (const input of inputs) expect(input.parentElement!.querySelector('output')!.textContent, where).not.toBe('');
    }
    stop();
  });

  it('scopes internal SVG <defs> IDs so multiple sims on one page never collide', () => {
    const host = document.createElement('div');
    setHtml(host, html`${simNames.map((name, i) => renderSim(name, '说明', `sim-${i}`))}`);
    const ids = [...host.querySelectorAll('[id]')].map(el => el.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
