import { raw, type SafeHtml } from '../html';

const COVERS: Record<string, string> = {
  'earth-seasons-lab': `
    <svg viewBox="0 0 320 180" class="lab-cover-svg" aria-hidden="true">
      <rect width="320" height="180" fill="#1e1a3a"/>
      <circle cx="58" cy="90" r="34" fill="#ffb703"/><circle cx="58" cy="90" r="44" fill="#ffd43b" opacity="0.24"/>
      <ellipse cx="180" cy="90" rx="110" ry="42" fill="none" stroke="#9775fa" stroke-width="2" stroke-dasharray="5 5"/>
      <circle cx="242" cy="84" r="24" fill="#4dabf7"/>
      <line x1="254" y1="50" x2="230" y2="118" stroke="#ffe066" stroke-width="3" stroke-linecap="round"/>
      <text x="160" y="160" text-anchor="middle" fill="#fff8dc" font-size="13" font-weight="700">23.44° 地轴倾斜 · 四季公转</text>
    </svg>`,
  'moon-eclipse-lab': `
    <svg viewBox="0 0 320 180" class="lab-cover-svg" aria-hidden="true">
      <rect width="320" height="180" fill="#1e1a3a"/>
      <circle cx="48" cy="90" r="28" fill="#ffb703"/>
      <polygon points="154,68 290,82 290,98 154,112" fill="#0d0a1f" opacity="0.7"/>
      <circle cx="154" cy="90" r="22" fill="#4dabf7"/>
      <ellipse cx="154" cy="90" rx="88" ry="30" transform="rotate(-10 154 90)" fill="none" stroke="#b197fc" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="238" cy="74" r="12" fill="#ffe89e"/>
      <text x="160" y="160" text-anchor="middle" fill="#fff8dc" font-size="13" font-weight="700">月相盈亏 · 5.1° 日月食交角</text>
    </svg>`,
  'solar-system-lab': `
    <svg viewBox="0 0 320 180" class="lab-cover-svg" aria-hidden="true">
      <rect width="320" height="180" fill="#1e1a3a"/>
      <ellipse cx="160" cy="88" rx="44" ry="20" fill="none" stroke="#6c629e" stroke-width="1.4"/>
      <ellipse cx="160" cy="88" rx="82" ry="36" fill="none" stroke="#6c629e" stroke-width="1.4"/>
      <ellipse cx="160" cy="88" rx="126" ry="54" fill="none" stroke="#8d82c4" stroke-width="1.6"/>
      <circle cx="160" cy="88" r="18" fill="#ffb703"/>
      <circle cx="204" cy="88" r="6" fill="#4dabf7"/>
      <circle cx="94" cy="112" r="10" fill="#e59966"/>
      <g transform="translate(262 66) rotate(-18)">
        <ellipse cx="0" cy="0" rx="22" ry="6" fill="none" stroke="#f7d794" stroke-width="4"/>
        <circle cx="0" cy="0" r="10" fill="#f2c879"/>
      </g>
      <text x="160" y="164" text-anchor="middle" fill="#fff8dc" font-size="13" font-weight="700">太阳系八大行星 · 开普勒定律</text>
    </svg>`,
  'gravity-orbit-lab': `
    <svg viewBox="0 0 320 180" class="lab-cover-svg" aria-hidden="true">
      <rect width="320" height="180" fill="#1e1a3a"/>
      <circle cx="136" cy="90" r="32" fill="#3b82f6"/>
      <circle cx="136" cy="90" r="52" fill="none" stroke="#51cf66" stroke-width="2.2" stroke-dasharray="5 4"/>
      <ellipse cx="168" cy="90" rx="86" ry="56" fill="none" stroke="#ffd43b" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="254" cy="90" r="6" fill="#ffd43b"/>
      <text x="160" y="164" text-anchor="middle" fill="#fff8dc" font-size="13" font-weight="700">7.9 km/s 环绕 · 11.2 km/s 逃逸</text>
    </svg>`,
  'star-lifecycle-lab': `
    <svg viewBox="0 0 320 180" class="lab-cover-svg" aria-hidden="true">
      <rect width="320" height="180" fill="#1e1a3a"/>
      <circle cx="62" cy="86" r="18" fill="#ffd43b"/>
      <circle cx="152" cy="86" r="32" fill="#ff6b6b" opacity="0.88"/>
      <circle cx="248" cy="60" r="11" fill="#edf2ff"/>
      <circle cx="248" cy="112" r="16" fill="#06040f" stroke="#ff922b" stroke-width="3"/>
      <text x="160" y="164" text-anchor="middle" fill="#fff8dc" font-size="13" font-weight="700">主序星 → 红巨星 → 白矮星 / 黑洞</text>
    </svg>`,
  'black-hole-lab': `
    <svg viewBox="0 0 320 180" class="lab-cover-svg" aria-hidden="true">
      <rect width="320" height="180" fill="#1e1a3a"/>
      <ellipse cx="160" cy="88" rx="88" ry="22" fill="none" stroke="#e8590c" stroke-width="10" opacity="0.72"/>
      <circle cx="160" cy="88" r="34" fill="none" stroke="#ffd43b" stroke-width="5"/>
      <circle cx="160" cy="88" r="24" fill="#05030d"/>
      <text x="160" y="164" text-anchor="middle" fill="#fff8dc" font-size="13" font-weight="700">事件视界 · 吸积盘 · 引力透镜</text>
    </svg>`,
};

export function renderLabCover(slug: string): SafeHtml {
  return raw(COVERS[slug] ?? COVERS['solar-system-lab']);
}
