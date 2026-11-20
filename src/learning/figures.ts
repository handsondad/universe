import { html, raw, escapeHtml, type SafeHtml } from './html';
import { renderSim, simNames, type SimName } from './sims';

export { simNames, type SimName };

/** 色阶横尺里的一档 */
export interface ScaleStop {
  readonly label: string;
  readonly note: string;
  readonly color: string;
  readonly hot?: boolean;
}

/** 对比柱状图里的一根柱子 */
export interface Bar {
  readonly label: string;
  readonly value: number;
  readonly text?: string;
  readonly hot?: boolean;
}

export type Figure =
  | { readonly kind: 'sim'; readonly sim: SimName; readonly caption: string }
  | { readonly kind: 'bars'; readonly caption: string; readonly unit: string; readonly bars: readonly Bar[] }
  | { readonly kind: 'scale'; readonly caption: string; readonly axis?: string; readonly stops: readonly ScaleStop[] }
  | { readonly kind: 'image'; readonly src: string; readonly alt: string; readonly caption: string; readonly credit?: string; readonly href?: string };

const INK = '#5d4e37';
const HOT = '#e8590c';
const BAR = '#c5b3e6';

const fmt = (value: number): string => String(Math.round(value * 10) / 10);
const esc = escapeHtml;

function darkSwatch(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map(i => Number.parseInt(clean.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 148;
}

function barsSvg(figure: Extract<Figure, { kind: 'bars' }>): string {
  const width = 560;
  const rowH = 40;
  const labelW = 110;
  const textW = 120;
  const top = 10;
  const max = Math.max(...figure.bars.map(bar => bar.value), 1e-9);
  const height = top * 2 + figure.bars.length * rowH;
  const body = figure.bars.map((bar, i) => {
    const y = top + i * rowH;
    const w = Math.max(4, ((width - labelW - textW - 10) * bar.value) / max);
    const color = bar.hot ? HOT : BAR;
    const style = bar.hot ? ` style="fill:${HOT};font-weight:700"` : '';
    return `<text x="${labelW - 10}" y="${y + rowH / 2 + 5}" text-anchor="end" class="fig-label"${style}>${esc(bar.label)}</text>`
      + `<rect x="${labelW}" y="${y + 8}" width="${fmt(w)}" height="${rowH - 16}" rx="8" fill="${color}"/>`
      + `<text x="${fmt(labelW + w + 8)}" y="${y + rowH / 2 + 5}" class="fig-note"${style}>${esc(bar.text ?? `${bar.value} ${figure.unit}`)}</text>`;
  }).join('');
  return `<svg class="fig-svg is-bars" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(figure.caption)}">${body}</svg>`;
}

function scaleSvg(figure: Extract<Figure, { kind: 'scale' }>): string {
  const width = 560;
  const padX = 14;
  const gap = 10;
  const count = figure.stops.length;
  const cellW = (width - padX * 2 - gap * (count - 1)) / count;
  const barTop = figure.axis ? 30 : 12;
  const barH = 44;
  const height = barTop + barH + 34;
  const header = figure.axis
    ? `<text x="${width / 2}" y="18" text-anchor="middle" class="fig-note">${esc(figure.axis)}</text>`
    : '';
  const body = figure.stops.map((stop, i) => {
    const x = padX + i * (cellW + gap);
    const cx = x + cellW / 2;
    const ink = darkSwatch(stop.color) ? '#ffffff' : INK;
    const ring = stop.hot
      ? `<rect x="${fmt(x - 2.5)}" y="${barTop - 2.5}" width="${fmt(cellW + 5)}" height="${barH + 5}" rx="14" fill="none" stroke="${HOT}" stroke-width="2.5"/>`
      : '';
    const sep = i > 0
      ? `<text x="${fmt(x - gap / 2)}" y="${barTop + barH / 2 + 4}" text-anchor="middle" class="fig-axis">›</text>`
      : '';
    return sep + ring
      + `<rect x="${fmt(x)}" y="${barTop}" width="${fmt(cellW)}" height="${barH}" rx="11" fill="${stop.color}" stroke="#d8c9b0" stroke-width="1"/>`
      + `<text x="${fmt(cx)}" y="${barTop + barH / 2 + 5}" text-anchor="middle" class="fig-scale-label" style="fill:${ink}">${esc(stop.label)}</text>`
      + `<text x="${fmt(cx)}" y="${barTop + barH + 21}" text-anchor="middle" class="fig-scale-note"${stop.hot ? ` style="fill:${HOT};font-weight:700"` : ''}>${esc(stop.note)}</text>`;
  }).join('');
  return `<svg class="fig-svg is-scale" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(figure.caption)}">${header}${body}</svg>`;
}

/** 画在爸爸气泡里的图；`sim` 先画出默认那一帧，由文章页 mountSims 接上滑块和动画 */
export function renderFigure(figure: Figure, index: number): SafeHtml {
  if (figure.kind === 'image') {
    const src = figure.src.startsWith('/') && !figure.src.startsWith('//')
      ? `${import.meta.env.BASE_URL}${figure.src.slice(1)}`
      : figure.src;
    const credit = figure.credit
      ? html`<small class="fig-credit">📷 ${figure.href ? html`<a href="${figure.href}" target="_blank" rel="noopener noreferrer">${figure.credit}</a>` : figure.credit}</small>`
      : '';
    return html`<figure class="fig"><img class="fig-img" src="${src}" alt="${figure.alt}" loading="lazy"><figcaption>${figure.caption}${credit}</figcaption></figure>`;
  }
  if (figure.kind === 'sim') return renderSim(figure.sim, figure.caption, `sim-${index}`);
  const svg = figure.kind === 'bars' ? barsSvg(figure) : scaleSvg(figure);
  return html`
    <figure class="fig fig-${figure.kind}" data-figure="${index}">
      ${raw(svg)}
      <figcaption>${figure.caption}</figcaption>
    </figure>`;
}
