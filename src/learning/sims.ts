import { html, raw, setHtml, type SafeHtml } from './html';
import { H, W, n, type SimDef, type SimParam, type State } from './simlib/kit';
import { seasonsTilt, moonPhases, tidalLock } from './simlib/earth-moon';
import { keplerSpeed, venusGreenhouse, saturnRoche } from './simlib/solar-system';
import { newtonCannon, oceanTidesSim, slingshotBoost } from './simlib/gravity-orbits';
import { solarFusion, starTempColor, starFateMass } from './simlib/sun-stars';
import { milkyWayView, lightYearLookback, galaxyRotation } from './simlib/galaxies';
import { blackHoleLens, sunToBlackHole, gravityClock } from './simlib/blackholes';
import { expandingSpace, olbersNight, cosmicElements } from './simlib/bigbang';
import { spaceScopeWindow, habitableBand, relayMoonLink } from './simlib/exploration';
import { bloodMoonLight, moonIllusionSize, timeZoneSpin } from './simlib/earth-moon-more';
import { marsRustDust, jupiterDive, cometTail } from './simlib/solar-system-more';
import { moonJump, geoOrbitSync, roundPlanetShape } from './simlib/gravity-orbits-more';
import { auroraField, polarisTrails, orionDepth } from './simlib/sun-stars-more';
import { andromedaMerge, deepFieldCount, galaxyFork } from './simlib/galaxies-more';
import { gwChirp, pulsarBeam, wormholeFold } from './simlib/blackholes-more';
import { cmbStretch, darkEnergyPie, horizonGrow } from './simlib/bigbang-more';
import { rocketRecoil, launchLatitude, fastDish } from './simlib/exploration-more';

/**
 * 文章里能拖滑块的宇宙互动图。每一种只由「滑块的值」和「时间 t」决定画面，
 * 静态页面先画默认帧，离开视野就暂停，尊重减少动态效果。画布固定 560×320。
 */

export type { SimParam };

const SIMS = {
  seasonsTilt, moonPhases, tidalLock,
  keplerSpeed, venusGreenhouse, saturnRoche,
  newtonCannon, oceanTidesSim, slingshotBoost,
  solarFusion, starTempColor, starFateMass,
  milkyWayView, lightYearLookback, galaxyRotation,
  blackHoleLens, sunToBlackHole, gravityClock,
  expandingSpace, olbersNight, cosmicElements,
  spaceScopeWindow, habitableBand, relayMoonLink,
  bloodMoonLight, moonIllusionSize, timeZoneSpin,
  marsRustDust, jupiterDive, cometTail,
  moonJump, geoOrbitSync, roundPlanetShape,
  auroraField, polarisTrails, orionDepth,
  andromedaMerge, deepFieldCount, galaxyFork,
  gwChirp, pulsarBeam, wormholeFold,
  cmbStretch, darkEnergyPie, horizonGrow,
  rocketRecoil, launchLatitude, fastDish,
} satisfies Record<string, SimDef>;

export type SimName = keyof typeof SIMS;
export const simNames = Object.keys(SIMS) as SimName[];

function defaults(def: SimDef): State {
  return Object.fromEntries(def.params.map(p => [p.key, p.value]));
}

export function simParams(name: SimName): readonly SimParam[] {
  return SIMS[name].params;
}

export function simSnapshot(name: SimName, values: State, t?: number): { svg: string; readout: string } {
  const def = SIMS[name];
  const state = { ...defaults(def), ...values };
  return {
    svg: `<svg class="sim-svg" viewBox="0 0 ${W} ${H}">${frame(def, state, t ?? def.still ?? 0, `snap-${name}`)}</svg>`,
    readout: def.readout(state),
  };
}

function valueText(p: SimParam, value: number): string {
  return p.labels ? p.labels[Math.round(value)] ?? '' : `${Number.isInteger(p.step) ? value : n(value)}${p.unit ?? ''}`;
}

function scopeSvgIds(markup: string, scope: string): string {
  return markup
    .replace(/\bid="([^"]+)"/g, `id="${scope}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${scope}-$1)`);
}

function frame(def: SimDef, s: State, t: number, scope: string): string {
  return `<rect width="${W}" height="${H}" rx="12" fill="#fffdf8"/>${scopeSvgIds(def.draw(s, t), scope)}`;
}

export function renderSim(name: SimName, caption: string, id: string): SafeHtml {
  const def = SIMS[name];
  const state = defaults(def);
  return html`
    <figure class="fig fig-sim" data-sim="${name}" data-id="${id}">
      <svg class="sim-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${caption}">${raw(frame(def, state, def.still ?? 0, id))}</svg>
      <div class="sim-controls">
        ${def.params.map(p => html`
          <label class="sim-param">
            <span>${p.label}</span>
            <input type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.value}" data-key="${p.key}" aria-valuetext="${valueText(p, p.value)}">
            <output>${valueText(p, p.value)}</output>
          </label>`)}
      </div>
      <p class="sim-readout" aria-live="polite">${def.readout(state)}</p>
      <figcaption>👆 拖一拖滑块 · ${caption}</figcaption>
    </figure>`;
}

export function mountSims(root: ParentNode): () => void {
  const stops = [...root.querySelectorAll<HTMLElement>('figure[data-sim]')].map(mountOne);
  return () => stops.forEach(stop => stop());
}

function mountOne(figure: HTMLElement): () => void {
  const name = figure.dataset.sim as SimName;
  const def = SIMS[name];
  const svg = figure.querySelector<SVGSVGElement>('.sim-svg');
  const readout = figure.querySelector<HTMLElement>('.sim-readout');
  if (!def || !svg || !readout) return () => undefined;
  const state = defaults(def);
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let visible = false;
  let raf = 0;
  let started = 0;
  let last = 0;

  const scope = figure.dataset.id || name;
  const draw = (t: number): void => setHtml(svg, raw(frame(def, state, t, scope)));
  const tick = (now: number): void => {
    raf = 0;
    if (!visible) return;
    if (!started) started = now;
    if (now - last > 30) {
      draw((now - started) / 1000);
      last = now;
    }
    raf = requestAnimationFrame(tick);
  };
  const play = (): void => {
    if (!raf && visible && def.animated && !still && typeof requestAnimationFrame === 'function') raf = requestAnimationFrame(tick);
  };

  const inputs = [...figure.querySelectorAll<HTMLInputElement>('input[data-key]')];
  const onInput = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement;
    const param = def.params.find(p => p.key === input.dataset.key);
    if (!param) return;
    state[param.key] = Number(input.value);
    const text = valueText(param, state[param.key]);
    input.setAttribute('aria-valuetext', text);
    const output = input.parentElement?.querySelector('output');
    if (output) output.textContent = text;
    readout.textContent = def.readout(state);
    started = 0;
    if (!def.animated || still || !raf) draw(def.still ?? 0);
  };
  inputs.forEach(input => input.addEventListener('input', onInput));

  const observer = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) play();
    }, { threshold: 0.15 })
    : null;
  observer?.observe(figure);

  return () => {
    observer?.disconnect();
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    visible = false;
    inputs.forEach(input => input.removeEventListener('input', onInput));
  };
}
