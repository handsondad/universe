import { html, raw, type SafeHtml } from './html';

const paths: Record<string, string> = {
  home: '<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
  book: '<path d="M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1v15"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  play: '<path d="m8 4 12 8-12 8Z"/>',
  expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/>',
};

export function icon(name: string, className = ''): SafeHtml {
  return html`<svg class="icon ${className}" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${raw(paths[name] ?? paths.book)}</svg>`;
}
