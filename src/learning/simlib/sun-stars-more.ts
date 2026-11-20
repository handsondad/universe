import { BLUE, clamp, GOLD, n, noise, poly, r2, starBackdrop, txt, type SimDef } from './kit';

function glowAt(alt: number): { gas: string; light: string; hex: string } {
  if (alt < 100) return { gas: '氮', light: '蓝紫色的光', hex: '#b197fc' };
  if (alt <= 200) return { gas: '氧原子', light: '绿光', hex: '#69db7c' };
  return { gas: '更稀薄的氧原子', light: '红光', hex: '#ff6b6b' };
}

function stormText(kp: number): string {
  if (kp <= 3) return '平静：极光只在两极附近';
  if (kp === 4) return '活跃：极光变亮、范围变大';
  if (kp <= 6) return '地磁暴：极光带向低纬度扩展';
  if (kp <= 8) return '强地磁暴：极光带大幅南移';
  return '特大地磁暴（如 2024 年 5 月）';
}

/** 16. 太阳风、地球磁场与极光颜色 */
export const auroraField: SimDef = {
  params: [
    { key: 'kp', label: '太阳风强度（Kp 指数）', min: 1, max: 9, step: 1, value: 3 },
    { key: 'alt', label: '发光的高度', min: 80, max: 300, step: 10, value: 150, unit: ' km' },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const kp = clamp(Math.round(s.kp), 1, 9);
    const glow = glowAt(s.alt);
    const cx = 290;
    const cy = 165;
    const R = 34;
    const ovalLat = ((68 - 2.5 * (kp - 1)) * Math.PI) / 180;
    const L = 1 / Math.cos(ovalLat) ** 2;
    const daySquash = 1 - 0.025 * kp;
    const nightStretch = 1 + 0.04 * kp;
    const point = (shell: number, theta: number, side: number): [number, number] => {
      const rs = R * Math.pow(shell * Math.sin(theta) ** 2, 0.6);
      const sq = side < 0 ? daySquash : nightStretch;
      return [cx + side * Math.sin(theta) * (R + (rs - R) * sq), cy - rs * Math.cos(theta)];
    };
    const line = (shell: number, side: number): [number, number][] => {
      const foot = Math.asin(1 / Math.sqrt(shell));
      return Array.from({ length: 41 }, (_, i) => point(shell, foot + ((Math.PI - 2 * foot) * i) / 40, side));
    };

    let field = '';
    for (const shell of [1.8, 3, 5, 9]) {
      for (const side of [-1, 1]) field += `<polyline points="${poly(line(shell, side))}" fill="none" stroke="#748ffc" stroke-width="1.3" opacity="0.5"/>`;
    }
    for (const side of [-1, 1]) field += `<polyline points="${poly(line(L, side))}" fill="none" stroke="${glow.hex}" stroke-width="2.2" opacity="0.9"/>`;

    const foot = Math.asin(1 / Math.sqrt(L));
    let funnel = '';
    for (const side of [-1, 1]) {
      for (const end of [foot, Math.PI - foot]) {
        for (let i = 0; i < 3; i += 1) {
          const u = (t * (0.3 + kp * 0.05) + i / 3) % 1;
          const [x, y] = point(L, Math.PI / 2 + (end - Math.PI / 2) * u, side);
          funnel += `<circle cx="${n(x)}" cy="${n(y)}" r="2.6" fill="#ffe066"/>`;
        }
      }
    }

    const edge = cx - (R + (R * Math.pow(9, 0.6) - R) * daySquash) - 8;
    let wind = '';
    const count = 6 + kp * 2;
    for (let i = 0; i < count; i += 1) {
      const span = edge - 82;
      const x = 82 + ((t * (40 + kp * 12) + noise(i * 3 + 2) * 300) % span);
      const y = 44 + noise(i * 5 + 1) * 240;
      wind += `<circle cx="${n(x)}" cy="${n(y)}" r="2.2" fill="#ffd43b" opacity="${r2(0.4 + 0.5 * (1 - (x - 82) / span))}"/>`;
    }

    const ry = R * Math.cos(foot);
    const rx = R * Math.sin(foot);
    const bright = 0.5 + 0.05 * kp;
    const ovals = [cy - ry, cy + ry].map(y => `<ellipse cx="${cx}" cy="${n(y)}" rx="${n(rx)}" ry="4" fill="none" stroke="${glow.hex}" stroke-width="10" opacity="${r2(bright * 0.4)}"/>`
      + `<ellipse cx="${cx}" cy="${n(y)}" rx="${n(rx)}" ry="4" fill="none" stroke="${glow.hex}" stroke-width="3.5" opacity="${r2(bright)}"/>`).join('');

    const colY = (alt: number): number => 286 - ((alt - 80) / 220) * 246;
    const markY = colY(s.alt);

    return starBackdrop()
      + `<circle cx="46" cy="${cy}" r="30" fill="#f59f00"/><circle cx="46" cy="${cy}" r="38" fill="#f59f00" opacity="0.25"/>`
      + txt(46, cy + 5, '太阳', { size: 13, color: '#5d3200', bold: true, plain: true })
      + wind
      + `<path d="M ${n(edge + 34)} 30 Q ${n(edge - 26)} ${cy} ${n(edge + 34)} 300" fill="none" stroke="#a5d8ff" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.6"/>`
      + field
      + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${BLUE}"/>`
      + ovals
      + funnel
      + txt(cx, cy + 5, '地球', { size: 13, color: '#fff', bold: true, plain: true })
      + txt(110, 36, '太阳风（带电粒子）', { size: 12, color: GOLD, bold: true, plain: true })
      + txt(cx + 40, 36, '磁感线把粒子引向两极', { size: 12, color: '#a5d8ff', bold: true, plain: true })
      + txt(cx + rx + 8, cy - ry - 8, '极光带', { size: 11, anchor: 'start', color: glow.hex, bold: true, plain: true })
      + txt(200, 296, `Kp ${kp}：${stormText(kp)}`, { size: 12.5, color: '#fff8dc', bold: true, plain: true })
      + txt(500, 30, '发光高度', { size: 11.5, color: '#fff8dc', bold: true, plain: true })
      + `<rect x="472" y="${n(colY(300))}" width="58" height="${n(colY(200) - colY(300))}" fill="#ff6b6b" opacity="0.75"/>`
      + `<rect x="472" y="${n(colY(200))}" width="58" height="${n(colY(100) - colY(200))}" fill="#69db7c" opacity="0.75"/>`
      + `<rect x="472" y="${n(colY(100))}" width="58" height="${n(colY(80) - colY(100))}" fill="#b197fc" opacity="0.8"/>`
      + txt(501, 100, '氧·红', { size: 11, color: '#2b244d', bold: true, plain: true })
      + txt(501, 212, '氧·绿', { size: 11, color: '#2b244d', bold: true, plain: true })
      + txt(501, 279, '氮·紫', { size: 10, color: '#2b244d', bold: true, plain: true })
      + txt(468, colY(200) + 4, '200', { size: 9.5, anchor: 'end', color: '#c5b3e6', plain: true })
      + txt(468, colY(100) + 4, '100', { size: 9.5, anchor: 'end', color: '#c5b3e6', plain: true })
      + `<line x1="470" y1="${n(markY)}" x2="532" y2="${n(markY)}" stroke="#fff" stroke-width="2.5"/>`
      + `<polygon points="${n(536)},${n(markY)} 544,${n(markY - 5)} 544,${n(markY + 5)}" fill="#fff"/>`;
  },
  readout(s) {
    const kp = clamp(Math.round(s.kp), 1, 9);
    const glow = glowAt(s.alt);
    return `太阳风强度 Kp ${kp}（${stormText(kp)}）。带电粒子顺着地球磁感线钻进两极上空，在约 ${s.alt} 千米高处撞上${glow.gas}，让它发出${glow.light}。`;
  },
};

const DIPPER = [
  { name: '天枢', ra: 11.06, dec: 61.75 },
  { name: '天璇', ra: 11.03, dec: 56.38 },
  { name: '天玑', ra: 11.9, dec: 53.69 },
  { name: '天权', ra: 12.26, dec: 57.03 },
  { name: '玉衡', ra: 12.9, dec: 55.96 },
  { name: '开阳', ra: 13.4, dec: 54.93 },
  { name: '摇光', ra: 13.79, dec: 49.31 },
] as const;
const DIPPER_LINES = [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]] as const;
const POLARIS = { ra: 2.53, dec: 89.3 };
/** 照片结束时的地方恒星时（小时），让北斗落在北极星右侧 */
const LST_END = 7;

/** 17. 星轨同心圆与几乎不动的北极星 */
export const polarisTrails: SimDef = {
  params: [
    { key: 'hours', label: '相机曝光时长', min: 1, max: 12, step: 1, value: 3, unit: ' 小时' },
    { key: 'lat', label: '观察地纬度（北纬）', min: 10, max: 60, step: 5, value: 40, unit: '°' },
  ],
  animated: false,
  draw(s) {
    const K = 3.1;
    const cx = 280;
    const horizon = 272;
    const py = horizon - s.lat * K;
    const at = (dec: number, ra: number, lst: number): [number, number] => {
      const rho = (90 - dec) * K;
      const h = ((lst - ra) * 15 * Math.PI) / 180;
      return [cx - rho * Math.sin(h), py - rho * Math.cos(h)];
    };
    const steps = Math.max(2, Math.ceil((s.hours * 15) / 3));
    const trail = (dec: number, ra: number): string => poly(Array.from({ length: steps + 1 }, (_, i) => at(dec, ra, LST_END - s.hours + (s.hours * i) / steps)));
    const tints = ['#cfe5f7', '#fff3bf', '#ffd8a8'];

    let sky = '';
    for (let i = 0; i < 44; i += 1) {
      const dec = 90 - (4 + noise(i * 13 + 2) * 66);
      const ra = noise(i * 7 + 9) * 24;
      const op = 0.35 + noise(i * 19 + 4) * 0.5;
      const [x, y] = at(dec, ra, LST_END);
      sky += `<polyline points="${trail(dec, ra)}" fill="none" stroke="${tints[i % 3]}" stroke-width="1.4" stroke-linecap="round" opacity="${r2(op)}"/>`
        + `<circle cx="${n(x)}" cy="${n(y)}" r="1.6" fill="#fff8dc" opacity="${r2(op)}"/>`;
    }
    const dipper = DIPPER.map(star => at(star.dec, star.ra, LST_END));
    for (const star of DIPPER) sky += `<polyline points="${trail(star.dec, star.ra)}" fill="none" stroke="${GOLD}" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>`;
    sky += DIPPER_LINES.map(([a, b]) => `<line x1="${n(dipper[a][0])}" y1="${n(dipper[a][1])}" x2="${n(dipper[b][0])}" y2="${n(dipper[b][1])}" stroke="#ffe066" stroke-width="1.2" opacity="0.6"/>`).join('');
    sky += dipper.map(([x, y]) => `<circle cx="${n(x)}" cy="${n(y)}" r="2.8" fill="#fff"/>`).join('');
    const [qx, qy] = at(POLARIS.dec, POLARIS.ra, LST_END);
    const [mx, my] = dipper[1];
    const [dx, dy] = dipper[0];
    sky += `<line x1="${n(mx)}" y1="${n(my)}" x2="${n(qx)}" y2="${n(qy)}" stroke="#ffa94d" stroke-width="1.6" stroke-dasharray="5 4"/>`
      + `<polyline points="${trail(POLARIS.dec, POLARIS.ra)}" fill="none" stroke="#fff" stroke-width="2"/>`
      + `<circle cx="${n(qx)}" cy="${n(qy)}" r="9" fill="#fff8dc" opacity="0.25"/><circle cx="${n(qx)}" cy="${n(qy)}" r="3.8" fill="#fff"/>`
      + txt(qx - 10, qy - 8, '北极星', { size: 12, anchor: 'end', color: '#fff', bold: true, plain: true })
      + txt(dx + 7, dy - 6, '天枢', { size: 10.5, anchor: 'start', color: '#ffe066', plain: true })
      + txt(mx + 7, my + 12, '天璇', { size: 10.5, anchor: 'start', color: '#ffe066', plain: true })
      + txt(dipper[5][0], dipper[5][1] + 18, '北斗七星', { size: 11, color: '#ffe066', bold: true, plain: true });

    return starBackdrop(12, 12, 536, 296, 0)
      + `<defs><clipPath id="polaris-sky"><rect x="12" y="12" width="536" height="${horizon - 12}" rx="14"/></clipPath></defs>`
      + `<g clip-path="url(#polaris-sky)">`
      + `<line x1="${cx}" y1="${horizon}" x2="${cx}" y2="${n(py + 12)}" stroke="#c5b3e6" stroke-width="1.2" stroke-dasharray="3 4" opacity="0.7"/>`
      + sky + `</g>`
      + `<rect x="12" y="${horizon}" width="536" height="${308 - horizon}" rx="14" fill="#23302a"/>`
      + `<rect x="12" y="${horizon}" width="536" height="14" fill="#23302a"/>`
      + txt(118, 293, `北极星高度 ≈ 纬度 ${s.lat}°`, { size: 12, color: '#fff8dc', bold: true, plain: true })
      + txt(cx, 293, '正北', { size: 12.5, color: GOLD, bold: true, plain: true })
      + txt(436, 293, `曝光 ${s.hours} 小时 · 每颗星转约 ${s.hours * 15}°`, { size: 12, color: '#fff8dc', bold: true, plain: true });
  },
  readout(s) {
    const sweep = s.hours * 15;
    return `北纬 ${s.lat}° 的地方，北极星挂在正北方约 ${s.lat}° 高；曝光 ${s.hours} 小时，每颗星绕北天极转了约 ${sweep}°，${sweep >= 180 ? '画出了大半圈' : '画出一段段'}同心圆弧，北极星只在半径约 0.7° 的小圈里挪动。离北天极不到 ${s.lat}° 的星星整夜都不会落下。`;
  },
};

const ORION = [
  { name: '参宿四', d: 550, x: -70, y: -85, r: 7, color: '#ff8c5a', place: 'above' },
  { name: '参宿五', d: 250, x: 60, y: -75, r: 5, color: '#dbe4ff', place: 'below' },
  { name: '参宿一', d: 1260, x: -22, y: 5, r: 5, color: '#a5d8ff', place: 'belt' },
  { name: '参宿二', d: 1340, x: 0, y: -2, r: 5, color: '#a5d8ff', place: 'belt' },
  { name: '参宿三', d: 1200, x: 22, y: -10, r: 4.5, color: '#a5d8ff', place: 'belt' },
  { name: '参宿六', d: 650, x: -55, y: 95, r: 4.5, color: '#dbe4ff', place: 'below' },
  { name: '参宿七', d: 860, x: 70, y: 85, r: 7, color: '#a5d8ff', place: 'above' },
] as const;
const ORION_LINES = [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]] as const;
const DEPTH = 0.3;
const PIVOT = 200;

/** 18. 猎户座是立体的：转个视角看星星远近 */
export const orionDepth: SimDef = {
  params: [
    { key: 'view', label: '转动观察视角', min: 0, max: 90, step: 5, value: 0, unit: '°' },
  ],
  animated: false,
  draw(s) {
    const a = (s.view * Math.PI) / 180;
    const [c, sn] = [Math.cos(a), Math.sin(a)];
    const X = (lateral: number, d: number): number => 280 + lateral * c + (d * DEPTH - PIVOT) * sn;
    const pts = ORION.map(star => [X(star.x, star.d), 160 + star.y] as const);
    const lineOp = Math.max(0, 1 - s.view / 50);
    const side = sn;

    let axis = '';
    if (s.view > 0) {
      axis += `<line x1="${n(X(0, 0))}" y1="284" x2="${n(X(0, 1400))}" y2="284" stroke="#c5b3e6" stroke-width="1.5" opacity="${r2(side)}"/>`;
      for (const d of [0, 500, 1000]) {
        axis += `<line x1="${n(X(0, d))}" y1="279" x2="${n(X(0, d))}" y2="289" stroke="#c5b3e6" stroke-width="1.5" opacity="${r2(side)}"/>`
          + `<g opacity="${r2(side)}">${txt(X(0, d), 302, `${d} 光年`, { size: 10.5, color: '#c5b3e6', plain: true })}</g>`;
      }
      const ex = X(0, 0);
      axis += `<g opacity="${r2(side)}"><circle cx="${n(ex)}" cy="160" r="10" fill="${BLUE}"/>`
        + txt(ex, 186, '地球', { size: 11.5, color: '#a5d8ff', bold: true, plain: true })
        + `<line x1="${n(ex + 14)}" y1="160" x2="${n(ex + 44)}" y2="160" stroke="#a5d8ff" stroke-width="2" stroke-dasharray="4 3"/></g>`;
    }

    const lines = ORION_LINES.map(([p, q]) => `<line x1="${n(pts[p][0])}" y1="${n(pts[p][1])}" x2="${n(pts[q][0])}" y2="${n(pts[q][1])}" stroke="#ffe066" stroke-width="1.5" stroke-dasharray="4 3" opacity="${r2(lineOp * 0.7)}"/>`).join('');
    const stars = ORION.map((star, i) => {
      const [x, y] = pts[i];
      let out = `<circle cx="${n(x)}" cy="${n(y)}" r="${star.r * 2}" fill="${star.color}" opacity="0.22"/><circle cx="${n(x)}" cy="${n(y)}" r="${star.r}" fill="${star.color}"/>`;
      if (star.place === 'above') out += txt(x, y - 14, `${star.name} 约${star.d}光年`, { size: 11, color: '#fff8dc', plain: true });
      if (star.place === 'below') out += txt(x, y + 22, `${star.name} 约${star.d}光年`, { size: 11, color: '#fff8dc', plain: true });
      return out;
    }).join('');
    const beltX = (pts[2][0] + pts[3][0] + pts[4][0]) / 3;
    const title = s.view < 10 ? '从地球望去：7 颗亮星连成一个猎人' : s.view >= 80 ? '侧面看：星星前后相差 1000 多光年' : '视角转动中：猎人开始“散架”';

    return starBackdrop()
      + txt(280, 34, title, { size: 14, color: GOLD, bold: true, plain: true })
      + axis + lines + stars
      + txt(beltX, 130, '腰带三星 约1200–1340光年', { size: 11, color: '#a5d8ff', bold: true, plain: true });
  },
  readout(s) {
    if (s.view < 10) return '从地球望去，猎户座 7 颗亮星方向相近，连成一个猎人；可它们离我们从约 250 光年（参宿五）到约 1340 光年（参宿二）不等，并不住在一起。';
    return `视角转了 ${s.view}°：最近的参宿五约 250 光年，参宿四约 550 光年，参宿七约 860 光年，腰带三星约 1200–1340 光年，猎人“散架”了。参宿七比参宿四远 300 多光年，看起来却通常更亮，因为它本身更会发光。`;
  },
};
