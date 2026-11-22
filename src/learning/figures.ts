import { html, type SafeHtml } from './html';
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

function darkSwatch(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map(i => Number.parseInt(clean.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 148;
}

/** 柱状对比用 HTML 排：柱长按数值等比伸缩，名字和数字在手机上也保持正常字号 */
function barsHtml(figure: Extract<Figure, { kind: 'bars' }>): SafeHtml {
  const max = Math.max(...figure.bars.map(bar => bar.value), 1e-9);
  return html`
    <ul class="fig-barlist">
      ${figure.bars.map(bar => html`
        <li class="${bar.hot ? 'is-hot' : ''}" style="--f:${(bar.value / max).toFixed(3)}">
          <b>${bar.label}</b><span><i></i><small>${bar.text ?? `${bar.value} ${figure.unit}`}</small></span>
        </li>`)}
    </ul>`;
}

/** 色阶横尺用 HTML 排：宽的时候横着一排，窄到放不下就竖着一档一行，字始终是真字号 */
function scaleHtml(figure: Extract<Figure, { kind: 'scale' }>): SafeHtml {
  const axis = figure.axis?.replace(/\s*→\s*$/, '');
  const directed = axis !== figure.axis;
  return html`
    ${axis ? html`<p class="fig-stops-axis ${directed ? 'is-directed' : ''}">${axis}</p>` : ''}
    <ol class="fig-stops" style="--n:${figure.stops.length}">
      ${figure.stops.map(stop => html`
        <li class="${stop.hot ? 'is-hot' : ''}" style="--stop:${stop.color};--ink:${darkSwatch(stop.color) ? '#ffffff' : INK}">
          <b>${stop.label}</b><small>${stop.note}</small>
        </li>`)}
    </ol>`;
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
  return html`
    <figure class="fig fig-${figure.kind}" data-figure="${index}">
      ${figure.kind === 'bars' ? barsHtml(figure) : scaleHtml(figure)}
      <figcaption>${figure.caption}</figcaption>
    </figure>`;
}
