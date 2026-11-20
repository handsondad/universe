import { arrow, BLUE, clamp, GOLD, GREEN, HOT, INK, n, poly, r1, r2, smooth, starBackdrop, txt, type SimDef } from './kit';

const WORLDS = [
  { name: '地球', g: 9.8, ground: '#3f7d4e' },
  { name: '月球', g: 1.62, ground: '#8d8a96' },
  { name: '火星', g: 3.71, ground: '#b8572f' },
] as const;

/** 小孩原地起跳的离地速度（m/s），在地球上约能跳起 25 cm */
const TAKEOFF = 2.2;

const world = (i: number) => WORLDS[clamp(Math.round(i), 0, WORLDS.length - 1)];

function kid(x: number, feet: number, opacity = 1): string {
  const c = '#ffd8a8';
  return `<g opacity="${r2(opacity)}" stroke="${INK}" stroke-width="3" stroke-linecap="round">`
    + `<line x1="${n(x)}" y1="${n(feet - 36)}" x2="${n(x)}" y2="${n(feet - 16)}"/>`
    + `<line x1="${n(x)}" y1="${n(feet - 16)}" x2="${n(x - 7)}" y2="${n(feet)}"/>`
    + `<line x1="${n(x)}" y1="${n(feet - 16)}" x2="${n(x + 7)}" y2="${n(feet)}"/>`
    + `<line x1="${n(x - 11)}" y1="${n(feet - 38)}" x2="${n(x + 11)}" y2="${n(feet - 38)}"/>`
    + `<circle cx="${n(x)}" cy="${n(feet - 46)}" r="9" fill="${c}" stroke-width="2"/></g>`;
}

/** 13. 月球上跳一跳：质量不变，重量（秤上读数）变了 */
export const moonJump: SimDef = {
  params: [
    { key: 'mass', label: '小朋友的质量', min: 20, max: 60, step: 5, value: 30, unit: ' kg' },
    { key: 'world', label: '站在哪个星球上', min: 0, max: 2, step: 1, value: 1, labels: ['地球', '月球', '火星'] },
  ],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const w = world(s.world);
    const m = s.mass;
    const height = (TAKEOFF * TAKEOFF) / (2 * w.g);
    const air = (2 * TAKEOFF) / w.g;
    const reading = (m * w.g) / 9.8;
    const ground = 268;
    const ppm = 135;
    const cycle = air + 0.9;
    const tau = ((t % cycle) + cycle) % cycle;
    const lift = tau < air ? TAKEOFF * tau - 0.5 * w.g * tau * tau : 0;
    const kx = 130;

    let ruler = '';
    for (const mark of [0.5, 1, 1.5]) {
      const y = ground - mark * ppm;
      ruler += `<line x1="34" y1="${n(y)}" x2="48" y2="${n(y)}" stroke="#c5b3e6" stroke-width="2"/>`
        + txt(56, y + 4, `${mark} m`, { size: 11, anchor: 'start', color: '#c5b3e6', plain: true });
    }
    const peakY = ground - height * ppm;
    const earthY = ground - ((TAKEOFF * TAKEOFF) / (2 * 9.8)) * ppm;

    return starBackdrop()
      + `<line x1="40" y1="${ground}" x2="40" y2="${n(ground - 1.55 * ppm)}" stroke="#c5b3e6" stroke-width="2"/>`
      + ruler
      + (w.name === '地球' ? '' : `<line x1="96" y1="${n(earthY)}" x2="288" y2="${n(earthY)}" stroke="#74c0fc" stroke-width="1.5" stroke-dasharray="3 4"/>`
        + txt(288, earthY - 5, '地球上只到这儿', { size: 10.5, anchor: 'end', color: '#74c0fc', plain: true }))
      + `<line x1="96" y1="${n(peakY)}" x2="288" y2="${n(peakY)}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6 4"/>`
      + txt(288, peakY - 6, `最高约 ${r2(height)} m`, { size: 12, anchor: 'end', color: GOLD, bold: true, plain: true })
      + kid(kx, peakY, 0.3)
      + `<rect x="24" y="${ground}" width="272" height="30" fill="${w.ground}"/>`
      + txt(160, ground + 20, `${w.name}表面`, { size: 13, color: '#fff', bold: true, plain: true })
      + kid(kx, ground - lift * ppm)
      + txt(420, 42, `在${w.name}上跳一跳`, { size: 16, color: GOLD, bold: true, plain: true })
      + txt(420, 68, `质量：${m} kg（到哪儿都不变）`, { size: 12.5, color: '#fff8dc', plain: true })
      + txt(420, 90, `重力 = m × g ≈ ${Math.round(m * w.g)} N`, { size: 12.5, color: '#fff8dc', plain: true })
      + `<rect x="345" y="104" width="150" height="70" rx="12" fill="#f1ece0" stroke="${INK}" stroke-width="2"/>`
      + `<rect x="362" y="114" width="116" height="34" rx="6" fill="#2b2f36"/>`
      + txt(420, 138, `${r1(reading)} kg`, { size: 20, color: '#69db7c', bold: true, plain: true })
      + txt(420, 166, '体重秤读数', { size: 11.5, color: INK, bold: true, plain: true })
      + txt(420, 200, `${w.name}表面 g ≈ ${w.g} m/s²`, { size: 12.5, color: '#c5b3e6', plain: true })
      + txt(420, 224, `跳高约 ${r2(height)} m · 滞空约 ${r2(air)} s`, { size: 12.5, color: '#fff8dc', bold: true, plain: true })
      + txt(420, 284, `（按同样起跳速度 ${TAKEOFF} m/s 计算）`, { size: 11, color: '#a9a3c4', plain: true });
  },
  readout(s) {
    const w = world(s.world);
    const height = (TAKEOFF * TAKEOFF) / (2 * w.g);
    const air = (2 * TAKEOFF) / w.g;
    return `${s.mass} kg 的你站在${w.name}上：质量还是 ${s.mass} kg，体重秤却显示约 ${r1((s.mass * w.g) / 9.8)} kg（重力约 ${Math.round(s.mass * w.g)} N）；同样起跳能升高约 ${r2(height)} m，在空中停留约 ${r2(air)} s。`;
  },
};

const GM = 398600;
const EARTH_R = 6371;
const SIDEREAL_HOURS = 23.934;
const GEO_ALT = 35786;

const periodHours = (alt: number): number => (2 * Math.PI * Math.sqrt((EARTH_R + alt) ** 3 / GM)) / 3600;
const orbitSpeed = (alt: number): number => Math.sqrt(GM / (EARTH_R + alt));
function hoursText(h: number): string {
  const minutes = Math.round(h * 60);
  return minutes < 120 ? `${minutes} 分钟` : `${Math.floor(minutes / 60)} 时 ${minutes % 60} 分`;
}
const isSync = (alt: number): boolean => Math.abs(periodHours(alt) - SIDEREAL_HOURS) < 0.15;

/** 14. 同步卫星：轨道越高，绕一圈越久 */
export const geoOrbitSync: SimDef = {
  params: [
    { key: 'alt', label: '卫星离地高度', min: 400, max: 42000, step: 200, value: 400, unit: ' km' },
  ],
  animated: true,
  still: 2,
  draw(s, t) {
    const alt = s.alt;
    const T = periodHours(alt);
    const sync = isSync(alt);
    const cx = 160;
    const cy = 162;
    const er = 40;
    const rpx = (a: number): number => er + 100 * Math.sqrt(a / 42000);
    const ro = rpx(alt);
    const hours = t * 1.2;
    const turnE = Math.PI / 2 + (2 * Math.PI * hours) / SIDEREAL_HOURS;
    const turnS = Math.PI / 2 + (2 * Math.PI * hours) / T;
    const gx = cx + Math.cos(turnE) * er;
    const gy = cy - Math.sin(turnE) * er;
    const sx = cx + Math.cos(turnS) * ro;
    const sy = cy - Math.sin(turnS) * ro;
    const spin = -((turnE - Math.PI / 2) * 180) / Math.PI;
    const status = sync ? '同步！从地面看它一动不动' : T < SIDEREAL_HOURS ? '比地球转得快：地面看它往东跑' : '比地球转得慢：地面看它往西落后';
    const barW = 200 * Math.min(T / 30, 1);

    return starBackdrop()
      + `<circle cx="${cx}" cy="${cy}" r="${n(rpx(GEO_ALT))}" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.8"/>`
      + `<circle cx="${cx}" cy="${cy}" r="${n(ro)}" fill="none" stroke="#cfe5f7" stroke-width="1.6" opacity="0.7"/>`
      + `<g transform="rotate(${n(spin)} ${cx} ${cy})"><circle cx="${cx}" cy="${cy}" r="${er}" fill="${BLUE}"/>`
      + `<ellipse cx="${cx - 14}" cy="${cy - 10}" rx="13" ry="9" fill="${GREEN}"/><ellipse cx="${cx + 16}" cy="${cy + 12}" rx="10" ry="14" fill="${GREEN}"/>`
      + `<ellipse cx="${cx + 6}" cy="${cy - 22}" rx="7" ry="5" fill="${GREEN}"/></g>`
      + txt(cx, cy + 5, '北极', { size: 11, color: '#fff', bold: true, plain: true })
      + `<line x1="${n(gx)}" y1="${n(gy)}" x2="${n(sx)}" y2="${n(sy)}" stroke="${sync ? '#69db7c' : '#868e96'}" stroke-width="1.8" stroke-dasharray="4 3"/>`
      + `<circle cx="${n(gx)}" cy="${n(gy)}" r="5" fill="${HOT}" stroke="#fff" stroke-width="1.5"/>`
      + `<rect x="${n(sx - 7)}" y="${n(sy - 4)}" width="14" height="8" rx="2" fill="${GOLD}" stroke="#fff" stroke-width="1.5"/>`
      + txt(410, 40, `离地 ${alt} km`, { size: 14, color: '#fff8dc', bold: true, plain: true })
      + txt(410, 70, `绕地球一圈：${hoursText(T)}`, { size: 17, color: sync ? '#69db7c' : GOLD, bold: true, plain: true })
      + txt(410, 96, `飞行速度 ≈ ${r2(orbitSpeed(alt))} km/s`, { size: 13, color: '#fff8dc', plain: true })
      + `<rect x="310" y="112" width="200" height="12" rx="6" fill="#3d3566"/>`
      + `<rect x="310" y="112" width="${n(barW)}" height="12" rx="6" fill="${sync ? '#69db7c' : '#74c0fc'}"/>`
      + `<line x1="${n(310 + (200 * SIDEREAL_HOURS) / 30)}" y1="106" x2="${n(310 + (200 * SIDEREAL_HOURS) / 30)}" y2="130" stroke="${GOLD}" stroke-width="2.5"/>`
      + txt(410, 146, '金线 = 地球自转一圈 23 时 56 分', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(410, 180, status, { size: 13.5, color: sync ? '#69db7c' : '#ffd8a8', bold: true, plain: true })
      + txt(410, 222, '红点：地面上的你  黄块：卫星', { size: 11.5, color: '#fff8dc', plain: true })
      + txt(410, 244, '金色虚线：赤道上空 35786 km 同步轨道', { size: 11.5, color: GOLD, plain: true })
      + txt(410, 284, '俯视北极 · 动画 1 秒 ≈ 1.2 小时', { size: 11, color: '#a9a3c4', plain: true });
  },
  readout(s) {
    const T = periodHours(s.alt);
    const tail = isSync(s.alt)
      ? '和地球自转一圈（约 23 时 56 分）几乎一样，卫星跟着地面一起转，从地上看就“停”在天上。'
      : T < SIDEREAL_HOURS
        ? '比地球自转快，从地面看它会往东跑走。'
        : '比地球自转慢，从地面看它会往西落后。';
    return `卫星离地 ${s.alt} km：绕地球一圈约 ${hoursText(T)}，速度约 ${r2(orbitSpeed(s.alt))} km/s，${tail}`;
  },
};

const MATERIALS = [
  { name: '冰质', limit: 400, fill: '#cfe5f7', edge: '#8fb8d8' },
  { name: '岩石', limit: 800, fill: '#a68a6d', edge: '#6f5a45' },
] as const;

const material = (i: number) => MATERIALS[clamp(Math.round(i), 0, MATERIALS.length - 1)];
const roundness = (d: number, limit: number): number => smooth((d / limit - 0.3) / 0.7);

/** 15. 天体够大才会被自己的引力捏圆 */
export const roundPlanetShape: SimDef = {
  params: [
    { key: 'diam', label: '天体直径', min: 50, max: 1500, step: 50, value: 200, unit: ' km' },
    { key: 'mat', label: '天体材料', min: 0, max: 1, step: 1, value: 1, labels: ['冰质', '岩石'] },
    { key: 'spin', label: '自转快慢', min: 0, max: 1, step: 1, value: 0, labels: ['慢慢转', '飞快自转'] },
  ],
  animated: false,
  draw(s) {
    const mat = material(s.mat);
    const d = s.diam;
    const q = roundness(d, mat.limit);
    const bumpy = 0.32 * (1 - q);
    const flat = s.spin >= 1 ? 0.12 * q : 0;
    const size = Math.sqrt((d - 50) / 1450);
    const R = 28 + 72 * size;
    const cx = 170;
    const cy = 165;
    const bump = (a: number): number => 0.55 * Math.cos(2 * a + 0.8) + 0.35 * Math.sin(3 * a + 0.3) + 0.25 * Math.cos(5 * a + 2.1) + 0.12 * Math.sin(7 * a + 1);
    const at = (a: number, extra = 0): [number, number] => {
      const r = R * (1 + bumpy * bump(a)) + extra;
      return [cx + r * Math.cos(a) * (1 + flat), cy + r * Math.sin(a) * (1 - flat)];
    };
    const outline = Array.from({ length: 72 }, (_, i) => at((i / 72) * Math.PI * 2));
    const pull = 8 + 22 * size;
    let arrows = '';
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * Math.PI * 2 + 0.2;
      const [x1, y1] = at(a, 6 + pull);
      const [x2, y2] = at(a, 5);
      arrows += arrow(x1, y1, x2, y2, HOT, 2.5);
    }
    const craters = [[-0.35, -0.2, 0.16], [0.3, 0.25, 0.12], [0.1, -0.45, 0.09]]
      .map(([dx, dy, rr]) => `<circle cx="${n(cx + dx * R)}" cy="${n(cy + dy * R * (1 - flat))}" r="${n(rr * R)}" fill="${mat.edge}" opacity="0.45"/>`).join('');
    const status = q < 0.35 ? '引力 < 材料硬度 → 土豆形' : q < 0.99 ? '引力变强：尖角正被慢慢压平' : '引力胜出 → 接近球形';
    const spinNote = s.spin < 1 ? '自转慢：没有明显的赤道鼓包'
      : q < 0.99 ? '还不够圆，看不出赤道鼓包' : '自转快：赤道被甩得鼓起来（已夸大）';
    const gBar = 110 * Math.min(d / mat.limit, 1.6);

    return starBackdrop()
      + (q > 0.5 ? `<circle cx="${cx}" cy="${cy}" r="${n(R)}" fill="none" stroke="#fff8dc" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.6"/>` : '')
      + `<polygon points="${poly(outline)}" fill="${mat.fill}" stroke="${mat.edge}" stroke-width="2.5" stroke-linejoin="round"/>`
      + craters
      + arrows
      + txt(cx, 300, '红箭头：引力把物质拉向中心', { size: 11.5, color: '#ffd8a8', plain: true })
      + txt(425, 42, `直径 ${d} km 的${mat.name}天体`, { size: 15, color: GOLD, bold: true, plain: true })
      + txt(425, 68, `${mat.name}天体约 ${mat.limit} km 以上会被捏圆`, { size: 12, color: '#c5b3e6', plain: true })
      + txt(330, 102, '引力', { size: 12, anchor: 'start', color: '#ffd8a8', bold: true, plain: true })
      + `<rect x="368" y="92" width="${n(gBar)}" height="12" rx="6" fill="${HOT}"/>`
      + txt(330, 128, '硬度', { size: 12, anchor: 'start', color: '#cfe5f7', bold: true, plain: true })
      + `<rect x="368" y="118" width="110" height="12" rx="6" fill="${mat.edge}"/>`
      + txt(425, 166, status, { size: 14, color: q >= 0.99 ? '#69db7c' : '#fff8dc', bold: true, plain: true })
      + txt(425, 196, spinNote, { size: 12, color: '#fff8dc', plain: true })
      + txt(425, 240, '地球：赤道直径 12756 km', { size: 11.5, color: '#a9a3c4', plain: true })
      + txt(425, 260, '两极方向 12712 km（略扁）', { size: 11.5, color: '#a9a3c4', plain: true });
  },
  readout(s) {
    const mat = material(s.mat);
    const q = roundness(s.diam, mat.limit);
    const shape = q < 0.35
      ? '引力太弱，拗不过材料的硬度，只能保持坑坑洼洼的土豆形'
      : q < 0.99
        ? `引力已经开始把尖角压平，再长到约 ${mat.limit} km 就能被捏圆`
        : `超过约 ${mat.limit} km 的门槛，引力压过硬度，被捏成了球`;
    const spin = s.spin >= 1 && q >= 0.99 ? '；飞快自转还会把赤道甩得鼓起来，变成略扁的球' : '';
    return `直径 ${s.diam} 千米的${mat.name}天体：${shape}${spin}。`;
  },
};
