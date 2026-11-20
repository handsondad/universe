import { arrow, clamp, GOLD, HOT, n, noise, r2, starBackdrop, txt, type SimDef } from './kit';

function mix(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map(i => Number.parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map(i => Number.parseInt(b.slice(i, i + 2), 16));
  const k = clamp(t, 0, 1);
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * k).toString(16).padStart(2, '0')).join('')}`;
}

/** 1. 火星的铁锈红：氧化铁 + 飘满天空的锈尘，远看红、近看黄褐 */
const DUST_NAMES = ['晴朗', '普通尘雾', '全球沙尘暴'];
const SKY = ['#cdb498', '#c99a66', '#9c6a3f'];
const HAZE = [0.12, 0.3, 0.62];

export const marsRustDust: SimDef = {
  params: [
    { key: 'rust', label: '铁的氧化程度', min: 0, max: 100, step: 10, value: 80, unit: '%' },
    { key: 'dust', label: '大气尘埃', min: 0, max: 2, step: 1, value: 1, labels: DUST_NAMES },
    { key: 'view', label: '观察距离', min: 0, max: 1, step: 1, value: 0, labels: ['从太空远看', '祝融号地面近看'] },
  ],
  animated: true,
  draw(s, t) {
    const rust = s.rust / 100;
    const dust = Math.round(s.dust);
    const view = Math.round(s.view);
    const far = mix('#5f5a55', '#c1440e', rust);
    const near = mix('#6b6560', '#c8955a', rust);
    const sky = mix('#8a8f99', SKY[dust], rust);

    let scene: string;
    if (view === 0) {
      const cx = 186;
      const cy = 160;
      const r = 112;
      const patches = [[0, -20, 46, 18], [70, 30, 34, 14], [150, -50, 40, 12], [210, 50, 52, 20], [120, 70, 30, 10]].map(([base, dy, w, h]) => {
        const x = cx - r - 40 + ((base + t * 8) % (2 * r + 80));
        return `<ellipse cx="${n(x)}" cy="${cy + dy}" rx="${w}" ry="${h}" fill="${mix(far, '#000000', 0.3)}" opacity="${r2(0.8 - dust * 0.3)}"/>`;
      }).join('');
      scene = starBackdrop(12, 12, 348, 296, 22)
        + `<defs><clipPath id="mrd-disk"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`
        + `<circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="none" stroke="${mix(sky, '#ffffff', 0.15)}" stroke-width="8" opacity="${r2(HAZE[dust])}"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${far}"/>`
        + `<g clip-path="url(#mrd-disk)">${patches}`
        + `<ellipse cx="${cx}" cy="${cy - r + 8}" rx="40" ry="14" fill="#f8f9fa" opacity="${r2(0.9 - dust * 0.25)}"/>`
        + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${mix(sky, '#e0b07a', 0.4)}" opacity="${r2([0, 0.18, 0.6][dust])}"/>`
        + `<circle cx="${cx + 40}" cy="${cy + 40}" r="${r}" fill="#000" opacity="0.25"/></g>`
        + txt(cx, 296, '从太空远看：大片锈尘叠在一起', { size: 12, color: '#fff8dc', bold: true, plain: true });
    } else {
      const motes = Array.from({ length: [8, 20, 44][dust] }, (_, i) => {
        const x = 12 + ((noise(i * 7 + 1) * 348 + t * (18 + dust * 14) * (0.6 + noise(i * 5 + 2))) % 348);
        const y = 30 + noise(i * 3 + 9) * 230 + Math.sin(t * 1.5 + i) * 6;
        return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(1.2 + noise(i * 13) * 1.6)}" fill="${mix('#9a9a9a', '#b5532a', rust)}" opacity="0.7"/>`;
      }).join('');
      const rocks = [[60, 262, 18, 8], [150, 280, 26, 10], [300, 268, 14, 6], [330, 290, 22, 9], [110, 238, 10, 4]].map(([x, y, w, h]) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="${mix(near, '#000000', 0.28)}"/>`).join('');
      const wheels = [196, 216, 236].map(x => `<circle cx="${x}" cy="236" r="7" fill="#343a40" stroke="#adb5bd" stroke-width="1.5"/>`).join('');
      scene = `<rect x="12" y="12" width="348" height="296" rx="14" fill="${sky}"/>`
        + `<circle cx="300" cy="66" r="${dust === 2 ? 9 : 12}" fill="#fff8e1" opacity="${r2(0.95 - dust * 0.3)}"/>`
        + `<path d="M 12 214 Q 90 196 170 210 T 360 204 V 308 H 12 Z" fill="${near}"/>`
        + `<path d="M 12 214 Q 90 196 170 210 T 360 204" fill="none" stroke="${mix(near, '#000000', 0.15)}" stroke-width="2"/>`
        + rocks
        + `<rect x="188" y="208" width="58" height="22" rx="4" fill="#e9ecef" stroke="#868e96" stroke-width="1.5"/>`
        + `<rect x="160" y="200" width="30" height="8" fill="#3b5bdb"/><rect x="244" y="200" width="30" height="8" fill="#3b5bdb"/>`
        + `<line x1="236" y1="208" x2="236" y2="180" stroke="#868e96" stroke-width="3"/><rect x="228" y="172" width="16" height="10" rx="2" fill="#dee2e6"/>`
        + wheels
        + txt(216, 160, '祝融号', { size: 12, color: '#3d2a1a', bold: true, plain: true })
        + `<rect x="12" y="12" width="348" height="296" rx="14" fill="#7a4a2a" opacity="${r2([0, 0.1, 0.32][dust])}"/>`
        + motes
        + txt(186, 296, '地面近看：黄褐、金棕色的沙土', { size: 12, color: '#2b1d10', bold: true, plain: true });
    }

    const atoms = Array.from({ length: 12 }, (_, i) => {
      const x = 402 + (i % 4) * 36;
      const y = 66 + Math.floor(i / 4) * 30;
      const rusted = i < Math.round(rust * 12);
      return `<circle cx="${x}" cy="${y}" r="11" fill="${rusted ? '#b5532a' : '#868e96'}" stroke="#fff" stroke-width="1.2"/>`
        + txt(x, y + 4, rusted ? '锈' : '铁', { size: 10, color: '#fff', bold: true, plain: true });
    }).join('');

    return scene
      + `<rect x="372" y="12" width="176" height="296" rx="14" fill="#2a244f" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(460, 38, '岩石里的铁原子', { size: 13, color: '#fff8dc', bold: true, plain: true })
      + atoms
      + txt(460, 158, '铁 + 氧 → 氧化铁（锈）', { size: 12, color: GOLD, bold: true, plain: true })
      + `<circle cx="418" cy="206" r="22" fill="${far}" stroke="#fff" stroke-width="1.5"/>`
      + `<circle cx="502" cy="206" r="22" fill="${near}" stroke="#fff" stroke-width="1.5"/>`
      + txt(418, 244, '远看', { size: 12, color: '#fff8dc', plain: true })
      + txt(502, 244, '近看', { size: 12, color: '#fff8dc', plain: true })
      + `<rect x="388" y="258" width="144" height="34" rx="10" fill="${sky}"/>`
      + txt(460, 280, `天空：${DUST_NAMES[dust]}`, { size: 12, color: '#2b1d10', bold: true, plain: true });
  },
  readout(s) {
    const rust = s.rust;
    const dust = Math.round(s.dust);
    const view = Math.round(s.view);
    const tint = rust >= 60 ? '整颗火星呈铁锈红' : rust >= 30 ? '火星泛着淡淡的红褐色' : '火星更像一颗灰色的石头球';
    const storm = dust === 2 ? '，沙尘暴把地面的花纹都盖住了' : '';
    if (view === 0) return `铁被氧化 ${rust}%、${DUST_NAMES[dust]}，从太空远看：${tint}${storm}。`;
    const ground = rust >= 30 ? '地面是黄褐、金棕色的沙土，远没有远看那么红' : '地面是灰扑扑的碎石';
    const sky = rust >= 30 ? '飘浮的锈尘把天空染成橘黄色' : '尘土没生锈，天空也发灰';
    return `铁被氧化 ${rust}%、${DUST_NAMES[dust]}，站在祝融号旁近看：${ground}；${sky}。`;
  },
};

/** 2. 往木星深处下潜：没有地面，压力和温度一路飙升 */
const LAYERS = [
  { name: '云顶', top: 24, bottom: 64, color: '#e8c39a', pressure: '1 倍左右', temp: '约 −110°C', state: '翻滚的氨冰云和氢氦气体', p: 0.06, T: 0.06 },
  { name: '深层云', top: 64, bottom: 104, color: '#c98e5a', pressure: '几倍', temp: '接近 0°C', state: '水冰云和越来越浓的氢氦气体', p: 0.18, T: 0.2 },
  { name: '伽利略号止步', top: 104, bottom: 140, color: '#b9cbd8', pressure: '二十多倍', temp: '一百多°C', state: '又浓又热的氢氦气体', p: 0.32, T: 0.33 },
  { name: '液态氢', top: 140, bottom: 200, color: '#5c9fe0', pressure: '上万倍以上', temp: '几千°C', state: '被压得像液体一样的氢“海洋”', p: 0.58, T: 0.58 },
  { name: '金属氢', top: 200, bottom: 262, color: '#3b4fc4', pressure: '几百万倍', temp: '近万°C', state: '能导电、像液态金属一样流动的金属氢', p: 0.84, T: 0.82 },
  { name: '核心附近', top: 262, bottom: 284, color: '#7a5c4a', pressure: '几千万倍', temp: '上万°C', state: '可能由岩石和冰混成的“模糊”核心', p: 1, T: 1 },
];
const PROBE = ['探测器还完好，周围全是云', '外壳开始承受重压', '伽利略号探头大约在这附近失联', '探测器早已被压扁、烤化'];

export const jupiterDive: SimDef = {
  params: [
    { key: 'depth', label: '下潜到', min: 0, max: 5, step: 1, value: 0, labels: LAYERS.map(layer => layer.name) },
  ],
  animated: true,
  draw(s, t) {
    const depth = Math.round(s.depth);
    const layer = LAYERS[depth];
    const x0 = 36;
    const w = 190;
    const bands = LAYERS.map((l, i) => {
      let extra = '';
      if (i === 0) extra = [32, 44, 56].map((y, j) => `<rect x="${x0}" y="${y}" width="${w}" height="5" fill="${j % 2 ? '#b07a4f' : '#f4dcbc'}" opacity="0.8"/>`).join('');
      if (i === 1) extra = [0, 1, 2, 3].map(j => `<ellipse cx="${n(x0 + ((j * 60 + t * 14) % (w + 40)) - 20)}" cy="${80 + (j % 2) * 10}" rx="22" ry="7" fill="#f1d3a5" opacity="0.7"/>`).join('');
      if (i === 4) extra = [0, 1, 2].map(j => `<path d="M ${x0} ${214 + j * 16} q 32 ${n(-6 * Math.sin(t * 2 + j))} 64 0 t 64 0 t 62 0" fill="none" stroke="#a5b4fc" stroke-width="1.5" opacity="0.6"/>`).join('');
      return `<rect x="${x0}" y="${l.top}" width="${w}" height="${l.bottom - l.top}" fill="${l.color}"/>${extra}`;
    }).join('');
    const names = LAYERS.map((l, i) => txt(x0 + w + 10, (l.top + l.bottom) / 2 + 4, l.name, {
      size: i === depth ? 13 : 11, color: i === depth ? GOLD : '#c5b3e6', bold: i === depth, anchor: 'start', plain: true,
    })).join('');
    const py = (layer.top + layer.bottom) / 2 + Math.sin(t * 2) * 3;
    const px = x0 + w / 2;
    const crushed = depth >= 3;
    const probe = crushed
      ? `<ellipse cx="${n(px)}" cy="${n(py)}" rx="16" ry="5" fill="#495057"/><circle cx="${n(px)}" cy="${n(py)}" r="18" fill="${HOT}" opacity="0.35"/>`
      : `<circle cx="${n(px)}" cy="${n(py)}" r="${depth === 2 ? 14 : 12}" fill="${depth === 2 ? HOT : '#fff'}" opacity="0.3"/>`
        + `<path d="M ${n(px - 9)} ${n(py - 4)} L ${n(px + 9)} ${n(py - 4)} L ${n(px + 6)} ${n(py + 7)} L ${n(px - 6)} ${n(py + 7)} Z" fill="#ced4da" stroke="#495057" stroke-width="1.5"/>`
        + `<line x1="${n(px)}" y1="${n(py - 4)}" x2="${n(px)}" y2="${n(py - 14)}" stroke="#495057" stroke-width="1.5"/>`;
    const gauge = (y: number, label: string, value: number, text: string, color: string): string => txt(344, y, label, { size: 12, color: '#fff8dc', bold: true, anchor: 'start', plain: true })
      + `<rect x="344" y="${y + 8}" width="190" height="14" rx="7" fill="#1c1836" stroke="#8d82c4" stroke-width="1"/>`
      + `<rect x="344" y="${y + 8}" width="${n(190 * value)}" height="14" rx="7" fill="${color}"/>`
      + txt(344, y + 40, text, { size: 12, color, bold: true, anchor: 'start', plain: true });

    return starBackdrop()
      + `<rect x="${x0 - 2}" y="22" width="${w + 4}" height="264" rx="6" fill="none" stroke="#8d82c4" stroke-width="1.5"/>`
      + `<defs><clipPath id="jd-column"><rect x="${x0}" y="24" width="${w}" height="260"/></clipPath></defs>`
      + `<g clip-path="url(#jd-column)">${bands}</g>` + names + probe
      + txt(x0 + w / 2, 301, '深度示意，未按比例', { size: 10, color: '#a99bd6', plain: true })
      + `<rect x="332" y="22" width="214" height="276" rx="14" fill="#29234d" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(344, 46, `第 ${depth + 1}/6 层：${layer.name}`, { size: 13, color: GOLD, bold: true, anchor: 'start', plain: true })
      + gauge(72, '压力（和地球海平面比）', layer.p, layer.pressure, HOT)
      + gauge(138, '温度', layer.T, layer.temp, '#ff8787')
      + txt(344, 210, layer.state.length > 14 ? layer.state.slice(0, 14) : layer.state, { size: 11.5, color: '#fff8dc', anchor: 'start', plain: true })
      + (layer.state.length > 14 ? txt(344, 228, layer.state.slice(14), { size: 11.5, color: '#fff8dc', anchor: 'start', plain: true }) : '')
      + txt(344, 256, PROBE[Math.min(depth, 3)], { size: 11.5, color: crushed ? '#ff8787' : '#c5b3e6', bold: crushed, anchor: 'start', plain: true })
      + txt(344, 282, '一路往下，找不到能站的地面', { size: 11.5, color: '#a5d8ff', anchor: 'start', plain: true });
  },
  readout(s) {
    const depth = Math.round(s.depth);
    const layer = LAYERS[depth];
    return `第 ${depth + 1}/6 层「${layer.name}」：压力约是地球海平面气压的${layer.pressure}，温度${layer.temp}；这里是${layer.state}，${PROBE[Math.min(depth, 3)]}。`;
  },
};

/** 3. 彗尾背向太阳：用一颗近日距 0.6 天文单位的抛物线彗星做模型 */
const GAUSS_K = 0.01720209895;
const PERI = 0.6;
const SUN_X = 250;
const SUN_Y = 160;
const SCALE = 85;
const MAX_TAIL = 150;

function cometAt(day: number): { nu: number; r: number } {
  const w = (3 * GAUSS_K * day) / Math.sqrt(2 * PERI ** 3);
  const y = Math.cbrt(w / 2 + Math.sqrt((w * w) / 4 + 1));
  const s = y - 1 / y;
  return { nu: 2 * Math.atan(s), r: PERI * (1 + s * s) };
}

const toScreen = (nu: number, r: number): [number, number] => [SUN_X - r * Math.cos(nu) * SCALE, SUN_Y + r * Math.sin(nu) * SCALE];

function taper(points: readonly (readonly [number, number])[], w0: number, w1: number): string {
  const left: string[] = [];
  const right: string[] = [];
  points.forEach(([x, y], i) => {
    const [ax, ay] = points[Math.max(i - 1, 0)];
    const [bx, by] = points[Math.min(i + 1, points.length - 1)];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const half = (w0 + ((w1 - w0) * i) / Math.max(points.length - 1, 1)) / 2;
    const [nx, ny] = [(-(by - ay) / len) * half, ((bx - ax) / len) * half];
    left.push(`${n(x + nx)},${n(y + ny)}`);
    right.unshift(`${n(x - nx)},${n(y - ny)}`);
  });
  return [...left, ...right].join(' ');
}

function tailFacts(day: number): { r: number; length: number; lead: number } {
  const { nu, r } = cometAt(day);
  const [px, py] = toScreen(nu, r);
  const away = Math.hypot(px - SUN_X, py - SUN_Y) || 1;
  const [vx, vy] = [Math.sin(nu), 1 + Math.cos(nu)];
  const speed = Math.hypot(vx, vy) || 1;
  return {
    r,
    length: clamp(MAX_TAIL * (PERI / r) ** 2, 6, MAX_TAIL),
    lead: (((px - SUN_X) / away) * vx + ((py - SUN_Y) / away) * vy) / speed,
  };
}

export const cometTail: SimDef = {
  params: [
    { key: 'day', label: '距近日点', min: -80, max: 80, step: 10, value: -20, unit: '天' },
  ],
  animated: true,
  draw(s, t) {
    const { nu, r } = cometAt(s.day);
    const [cx, cy] = toScreen(nu, r);
    const away = Math.hypot(cx - SUN_X, cy - SUN_Y) || 1;
    const [ax, ay] = [(cx - SUN_X) / away, (cy - SUN_Y) / away];
    const speed = Math.hypot(Math.sin(nu), 1 + Math.cos(nu)) || 1;
    const [vx, vy] = [Math.sin(nu) / speed, (1 + Math.cos(nu)) / speed];
    const { length, lead } = tailFacts(s.day);

    const orbit = Array.from({ length: 37 }, (_, i) => toScreen(((-108 + i * 6) * Math.PI) / 180, (2 * PERI) / (1 + Math.cos(((-108 + i * 6) * Math.PI) / 180))));
    const grains = orbit.map(([x, y], i) => `<circle cx="${n(x + (noise(i) - 0.5) * 6)}" cy="${n(y + (noise(i + 50) - 0.5) * 6)}" r="1.6" fill="#ced4da" opacity="0.55"/>`).join('');
    const wind = Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const d = 26 + ((t * 40 + i * 23) % 80);
      return `<line x1="${n(SUN_X + Math.cos(a) * d)}" y1="${n(SUN_Y + Math.sin(a) * d)}" x2="${n(SUN_X + Math.cos(a) * (d + 8))}" y2="${n(SUN_Y + Math.sin(a) * (d + 8))}" stroke="${GOLD}" stroke-width="1.5" opacity="0.35"/>`;
    }).join('');

    const ionEnd: [number, number] = [cx + ax * length * 1.1, cy + ay * length * 1.1];
    const ion = Array.from({ length: 8 }, (_, i) => [cx + (ionEnd[0] - cx) * (i / 7), cy + (ionEnd[1] - cy) * (i / 7)] as const);
    const bend = 0.55;
    const dl = Math.hypot(ax - vx * bend, ay - vy * bend) || 1;
    const [dx, dy] = [(ax - vx * bend) / dl, (ay - vy * bend) / dl];
    const ctrl = [cx + ax * length * 0.5, cy + ay * length * 0.5];
    const end = [cx + dx * length * 0.9, cy + dy * length * 0.9];
    const dustPts = Array.from({ length: 10 }, (_, i) => {
      const u = i / 9;
      const w = 1 - u;
      return [w * w * cx + 2 * w * u * ctrl[0] + u * u * end[0], w * w * cy + 2 * w * u * ctrl[1] + u * u * end[1]] as const;
    });
    const spread = 4 + (length / MAX_TAIL) * 22;
    const coma = 3 + 12 * (PERI / r) ** 1.5;
    const status = s.day < 0 ? '正飞向太阳' : s.day === 0 ? '正在近日点' : '正飞离太阳';
    const leadText = lead > 0.35 ? '尾巴跑到前面了！' : lead < -0.35 ? '尾巴拖在身后' : '尾巴横在一侧';

    return starBackdrop()
      + `<defs><clipPath id="ct-sky"><rect x="12" y="12" width="384" height="296" rx="14"/></clipPath></defs>`
      + `<g clip-path="url(#ct-sky)">`
      + `<circle cx="${SUN_X}" cy="${SUN_Y}" r="${SCALE}" fill="none" stroke="#4dabf7" stroke-width="1.2" stroke-dasharray="5 5" opacity="0.6"/>`
      + `<polyline points="${orbit.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')}" fill="none" stroke="#8d82c4" stroke-width="1.2" stroke-dasharray="3 5"/>`
      + grains + wind
      + `<circle cx="${SUN_X}" cy="${SUN_Y}" r="26" fill="${GOLD}" opacity="0.25"/><circle cx="${SUN_X}" cy="${SUN_Y}" r="17" fill="#f59f00"/>`
      + txt(SUN_X, SUN_Y + 5, '太阳', { size: 12, color: '#5d3200', bold: true, plain: true })
      + `<polygon points="${taper(dustPts, 3, spread)}" fill="#f1f3f5" opacity="0.55"/>`
      + `<polygon points="${taper(ion, 3, 4 + spread * 0.25)}" fill="#74c0fc" opacity="0.8"/>`
      + `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(coma)}" fill="#dff3ff" opacity="0.35"/>`
      + `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(coma * 0.5)}" fill="#e7f5ff" opacity="0.7"/>`
      + `<circle cx="${n(cx)}" cy="${n(cy)}" r="3" fill="#868e96"/>`
      + arrow(cx + vx * 12, cy + vy * 12, cx + vx * 38, cy + vy * 38, '#8ce99a', 3)
      + `</g>`
      + txt(SUN_X + 72, SUN_Y + 78, '地球轨道', { size: 10, color: '#74c0fc', anchor: 'start', plain: true })
      + `<rect x="404" y="24" width="140" height="272" rx="14" fill="#29234d" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(474, 50, status, { size: 14, color: GOLD, bold: true, plain: true })
      + txt(474, 76, `离太阳 ${r2(r)} AU`, { size: 12, color: '#fff8dc', plain: true })
      + txt(474, 104, '彗尾长度', { size: 12, color: '#fff8dc', plain: true })
      + `<rect x="418" y="112" width="112" height="10" rx="5" fill="#1c1836" stroke="#8d82c4" stroke-width="1"/>`
      + `<rect x="418" y="112" width="${n((112 * length) / MAX_TAIL)}" height="10" rx="5" fill="#74c0fc"/>`
      + `<rect x="418" y="146" width="24" height="5" rx="2" fill="#74c0fc"/>`
      + txt(448, 152, '离子尾：笔直', { size: 11, color: '#a5d8ff', anchor: 'start', plain: true })
      + `<rect x="418" y="170" width="24" height="7" rx="3" fill="#f1f3f5" opacity="0.8"/>`
      + txt(448, 178, '尘埃尾：弯曲', { size: 11, color: '#f1f3f5', anchor: 'start', plain: true })
      + `<line x1="418" y1="200" x2="440" y2="200" stroke="#8ce99a" stroke-width="3"/>`
      + txt(448, 204, '运动方向', { size: 11, color: '#8ce99a', anchor: 'start', plain: true })
      + txt(474, 238, leadText, { size: 13, color: lead > 0.35 ? HOT : '#c5b3e6', bold: true, plain: true })
      + txt(474, 266, '灰点=沿途撒下的尘粒', { size: 10.5, color: '#ced4da', plain: true });
  },
  readout(s) {
    const { r, length, lead } = tailFacts(s.day);
    const when = s.day < 0 ? `离近日点还有 ${-s.day} 天` : s.day === 0 ? '正经过近日点' : `已过近日点 ${s.day} 天`;
    const motion = s.day < 0 ? '正飞向太阳' : s.day === 0 ? '离太阳最近' : '正飞离太阳';
    const where = lead > 0.35 ? '，两条尾巴都跑到了彗星前方' : lead < -0.35 ? '，尾巴拖在彗星身后' : '';
    return `${when}：彗星离太阳约 ${r2(r)} 天文单位，${motion}；彗尾长度约为最长时的 ${Math.round((length / MAX_TAIL) * 100)}%，蓝色离子尾笔直背向太阳，白色尘埃尾向后弯曲${where}。`;
  },
};
