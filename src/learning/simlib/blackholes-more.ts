import { clamp, GOLD, HOT, n, poly, r1, starBackdrop, txt, type SimDef } from './kit';

const CYCLE = 6.5;
const MERGE_AT = 5.2;
const PROTON = 1.7e-15;

/** GW150914：总质量约 65 倍太阳质量、约 13 亿光年外，峰值应变约 1e-21，并合时频率升到约 250 赫兹 */
function chirpNumbers(mass: number, dist: number): { peakHz: number; radiated: number; strain: number; protonShare: number } {
  const strain = 1e-21 * (mass / 65) * (13 / dist);
  return {
    peakHz: Math.round((250 * 65) / mass),
    radiated: (mass * 3) / 65,
    strain,
    protonShare: PROTON / (strain * 4000),
  };
}

/** 啁啾波形：并合前频率和振幅一起升高，并合后迅速衰减 */
function chirpWave(tau: number, mass: number): number {
  const c = 26 * Math.pow(65 / mass, 0.625);
  if (tau < MERGE_AT) {
    const left = Math.max(MERGE_AT - tau, 0.02);
    return Math.min(1, Math.pow(0.02 / left, 0.25)) * Math.cos(c * Math.pow(left, 0.625));
  }
  const omega = 0.625 * c * Math.pow(0.02, -0.375);
  return Math.exp(-(tau - MERGE_AT) / 0.08) * Math.cos(c * Math.pow(0.02, 0.625) - omega * (tau - MERGE_AT));
}

const sig = (v: number): string => (v >= 100 ? String(Math.round(v / 10) * 10) : String(Math.round(v)));

/** 22. 引力波啁啾：两个黑洞越转越快并合，LIGO 激光臂极微小伸缩 */
export const gwChirp: SimDef = {
  params: [
    { key: 'mass', label: '两个黑洞总质量', min: 20, max: 120, step: 5, value: 65, unit: ' 倍太阳质量' },
    { key: 'dist', label: '离地球', min: 5, max: 50, step: 1, value: 13, unit: ' 亿光年' },
  ],
  animated: true,
  still: 4.6,
  draw(s, t) {
    const tau = ((t % CYCLE) + CYCLE) % CYCLE;
    const { strain } = chirpNumbers(s.mass, s.dist);
    const ratio = strain / 1e-21;
    const amp = 6 + 30 * clamp((Math.log10(ratio) + 1.2) / 1.9, 0, 1);
    const c = 26 * Math.pow(65 / s.mass, 0.625);
    const merged = tau >= MERGE_AT;
    const left = Math.max(MERGE_AT - tau, 0.02);
    const sep = merged ? 0 : 66 * Math.pow(left / MERGE_AT, 0.25);
    const orbit = merged ? 0 : (c * Math.pow(left, 0.625)) / 2;
    const [cx, cy] = [140, 104];
    const m1 = s.mass * 0.45;
    const m2 = s.mass - m1;
    const rad = (m: number): number => 5 + 8 * Math.sqrt(m / 60);
    let ripples = '';
    for (let k = 0; k < 4; k += 1) {
      const r = (tau * 60 + k * 38) % 150;
      ripples += `<circle cx="${cx}" cy="${cy}" r="${n(r + 4)}" fill="none" stroke="#9775fa" stroke-width="1.6" opacity="${n(0.6 * (1 - r / 150))}"/>`;
    }
    const holes = merged
      ? `<circle cx="${cx}" cy="${cy}" r="${n(rad(s.mass - (s.mass * 3) / 65))}" fill="#080614" stroke="#ff9f43" stroke-width="2.5"/>`
      : [[m1, m2 / s.mass], [m2, -m1 / s.mass]].map(([m, share]) => {
        const x = cx + Math.cos(orbit) * sep * share;
        const y = cy + Math.sin(orbit) * sep * share * 0.6;
        return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rad(m))}" fill="#080614" stroke="#ff9f43" stroke-width="2"/>`;
      }).join('');

    const points: [number, number][] = [];
    for (let i = 0; i <= 260; i += 1) {
      const u = (i / 260) * 6;
      points.push([40 + (i / 260) * 480, 248 + amp * chirpWave(u, s.mass)]);
    }
    const cursor = 40 + (Math.min(tau, 6) / 6) * 480;
    const stretch = 7 * chirpWave(tau, s.mass) * (amp / 36);
    return starBackdrop()
      + ripples
      + holes
      + txt(cx, 30, merged ? '并合完成！时空涟漪传向四方' : '两个黑洞越转越快、越靠越近', { size: 12.5, color: '#fff8dc', bold: true, plain: true })
      + `<line x1="400" y1="150" x2="${n(520 + stretch)}" y2="150" stroke="#ff6b6b" stroke-width="3"/>`
      + `<line x1="400" y1="150" x2="400" y2="${n(60 + stretch)}" stroke="#ff6b6b" stroke-width="3"/>`
      + `<rect x="392" y="142" width="16" height="16" fill="#adb5bd"/>`
      + txt(470, 44, 'LIGO：两条 4 千米激光臂', { size: 11.5, color: '#cfe5f7', plain: true })
      + txt(470, 172, '（伸缩已放大亿亿倍）', { size: 10.5, color: '#c5b3e6', plain: true })
      + `<line x1="40" y1="248" x2="520" y2="248" stroke="#3b335f" stroke-width="1"/>`
      + `<polyline points="${poly(points)}" fill="none" stroke="${GOLD}" stroke-width="2"/>`
      + `<line x1="${n(cursor)}" y1="206" x2="${n(cursor)}" y2="292" stroke="${HOT}" stroke-width="2"/>`
      + txt(280, 198, '“啁啾”信号：频率和幅度越升越高，然后戛然而止', { size: 11.5, color: '#ffa8a8', bold: true, plain: true })
      + txt(280, 302, `${s.mass} 倍太阳质量 · ${s.dist} 亿光年外`, { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const { peakHz, radiated, protonShare } = chirpNumbers(s.mass, s.dist);
    return `总质量 ${s.mass} 倍太阳质量、${s.dist} 亿光年外：信号最后升到约 ${peakHz} 赫兹，约 ${r1(radiated)} 个太阳质量化成引力波；扫过地球时 4 千米激光臂只伸缩约质子直径的 1/${sig(protonShare)}。`;
  },
};

const PULSARS = [
  { name: 'PSR B1919+21', rate: 1 / 1.337, shown: 0.748, period: '1.337 秒' },
  { name: '蟹状星云脉冲星', rate: 30, shown: 1.5, period: '约 0.033 秒' },
  { name: '最快的脉冲星', rate: 716, shown: 3, period: '约 0.0014 秒' },
] as const;
const EARTH_ANGLE = 60;
const BEAM_HALF = 12;

/** 23. 脉冲星灯塔：光束扫过地球才收到“嘀” */
export const pulsarBeam: SimDef = {
  params: [
    { key: 'kind', label: '自转快慢', min: 0, max: 2, step: 1, value: 0, labels: ['1.337 秒转 1 圈（第一颗）', '每秒约 30 圈（蟹状星云）', '每秒 716 圈（最快）'] },
    { key: 'tilt', label: '光束（磁极）倾斜', min: 0, max: 90, step: 5, value: 60, unit: '°' },
  ],
  animated: true,
  still: 2.6,
  draw(s, t) {
    const p = PULSARS[clamp(Math.round(s.kind), 0, 2)];
    const alpha = (s.tilt * Math.PI) / 180;
    const earth = (EARTH_ANGLE * Math.PI) / 180;
    const psi = 2 * Math.PI * p.shown * t;
    const [cx, cy] = [130, 150];
    const seen = Math.abs(s.tilt - EARTH_ANGLE) <= BEAM_HALF;
    const beam = (sign: number): string => {
      const bx = sign * Math.sin(alpha) * Math.cos(psi);
      const by = sign * Math.cos(alpha);
      const bz = sign * Math.sin(alpha) * Math.sin(psi);
      const len = 120;
      const [tx, ty] = [cx + bx * len, cy - by * len];
      const norm = Math.hypot(bx, by) || 1;
      const [px, py] = [(by / norm) * 16, (bx / norm) * 16];
      return `<polygon points="${poly([[cx, cy], [tx + px, ty + py], [tx - px, ty - py]])}" fill="${GOLD}" opacity="${n(0.25 + 0.4 * (1 + bz) / 2)}"/>`;
    };
    const facing = Math.sin(alpha) * Math.cos(psi) * Math.sin(earth) + Math.cos(alpha) * Math.cos(earth);
    const flash = facing >= Math.cos((BEAM_HALF * Math.PI) / 180);
    const [ex, ey] = [cx + Math.sin(earth) * 190, cy - Math.cos(earth) * 190];

    let timeline = '<line x1="30" y1="292" x2="530" y2="292" stroke="#cfe5f7" stroke-width="1.5"/>';
    if (seen) {
      const c = (Math.cos((BEAM_HALF * Math.PI) / 180) - Math.cos(alpha) * Math.cos(earth)) / Math.max(Math.sin(alpha) * Math.sin(earth), 1e-6);
      const width = Math.max(3, ((Math.acos(clamp(c, -1, 1)) / (Math.PI * p.shown)) / 4) * 500);
      for (let k = Math.ceil((t - 4) * p.shown); k <= Math.floor(t * p.shown); k += 1) {
        const x = 530 - ((t - k / p.shown) / 4) * 500;
        if (x < 30) continue;
        timeline += `<polygon points="${poly([[x - width / 2, 292], [x, 266], [x + width / 2, 292]])}" fill="${HOT}"/>`;
      }
    } else {
      timeline += txt(280, 284, '收不到脉冲：光束扫不到地球', { size: 12, color: '#ffa8a8', bold: true, plain: true });
    }

    return starBackdrop()
      + `<line x1="${cx}" y1="34" x2="${cx}" y2="250" stroke="#c5b3e6" stroke-width="1.5" stroke-dasharray="5 5"/>`
      + txt(cx, 26, '自转轴', { size: 11, color: '#c5b3e6', plain: true })
      + beam(1) + beam(-1)
      + `<circle cx="${cx}" cy="${cy}" r="13" fill="#e5dbff" stroke="#fff" stroke-width="2"/>`
      + `<line x1="${cx}" y1="${cy}" x2="${n(ex)}" y2="${n(ey)}" stroke="#4dabf7" stroke-width="1" stroke-dasharray="3 5" opacity="0.6"/>`
      + (flash ? `<circle cx="${n(ex)}" cy="${n(ey)}" r="24" fill="${GOLD}" opacity="0.5"/>` : '')
      + `<circle cx="${n(ex)}" cy="${n(ey)}" r="11" fill="#4dabf7" stroke="#fff" stroke-width="1.5"/>`
      + txt(ex + 34, ey + 5, '地球', { size: 12, color: '#cfe5f7', bold: true, plain: true })
      + txt(cx, 238, '中子星：直径约 20 千米', { size: 11, color: '#fff8dc', plain: true })
      + txt(450, 96, p.name, { size: 14, color: GOLD, bold: true, plain: true })
      + txt(450, 122, `自转周期 ${p.period}`, { size: 12.5, color: '#fff8dc', plain: true })
      + txt(450, 148, `光束倾斜 ${s.tilt}°（地球在 ${EARTH_ANGLE}°）`, { size: 11.5, color: '#cfe5f7', plain: true })
      + txt(450, 174, seen ? '每转一圈扫过地球一次' : '光束总从地球旁边扫过', { size: 12.5, color: seen ? '#8ce99a' : '#ffa8a8', bold: true, plain: true })
      + txt(450, 200, p.rate > 1 ? `画面已放慢约 ${Math.round(p.rate / p.shown)} 倍` : '画面是真实速度', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(140, 262, '地球收到的信号 →', { size: 11, color: '#cfe5f7', plain: true })
      + timeline;
  },
  readout(s) {
    const p = PULSARS[clamp(Math.round(s.kind), 0, 2)];
    const seen = Math.abs(s.tilt - EARTH_ANGLE) <= BEAM_HALF;
    const spin = p.rate < 1 ? '每 1.337 秒自转 1 圈' : `每秒自转约 ${Math.round(p.rate)} 圈`;
    return seen
      ? `${p.name}：${spin}；光束倾斜 ${s.tilt}°，每转一圈扫过地球一次，我们就收到一声准时的“嘀”。`
      : `${p.name}：${spin}；光束倾斜 ${s.tilt}°，和地球方向差了 ${Math.abs(s.tilt - EARTH_ANGLE)}°，光束扫不到地球——它照样在转，只是我们看不到它“闪”。`;
  },
};

const SEG = 200;
const BEND = 50;

/** 时空纸面沿弧长 s 的位置：直段 → 半径 BEND、转角 theta 的弯段 → 直段 */
function sheetPoint(s: number, theta: number): [number, number] {
  if (s <= SEG) return [s, 0];
  const arc = BEND * theta;
  if (s <= SEG + arc) {
    const phi = (s - SEG) / BEND;
    return [SEG + BEND * Math.sin(phi), -BEND + BEND * Math.cos(phi)];
  }
  const u = s - SEG - arc;
  return [SEG + BEND * Math.sin(theta) + u * Math.cos(theta), -BEND + BEND * Math.cos(theta) - u * Math.sin(theta)];
}

function foldNumbers(fold: number): { along: number; straight: number; share: number; theta: number } {
  const theta = (Math.PI * fold) / 100;
  const total = SEG * 2 + BEND * theta;
  const [ax, ay] = sheetPoint(25, theta);
  const [bx, by] = sheetPoint(total - 25, theta);
  const along = total - 50;
  const straight = Math.hypot(bx - ax, by - ay);
  return { along, straight, share: Math.round((straight / along) * 100), theta };
}

/** 24. 虫洞折纸：对折时空让两点靠近，没有奇异物质隧道就夹断 */
export const wormholeFold: SimDef = {
  params: [
    { key: 'fold', label: '把时空纸面折弯', min: 0, max: 100, step: 5, value: 100, unit: '%' },
    { key: 'exotic', label: '隧道里', min: 0, max: 1, step: 1, value: 0, labels: ['没有奇异物质', '假想：有负能量奇异物质'] },
  ],
  animated: true,
  still: 1.6,
  draw(s, t) {
    const { theta, share } = foldNumbers(s.fold);
    const total = SEG * 2 + BEND * theta;
    const raw: [number, number][] = [];
    for (let i = 0; i <= 60; i += 1) raw.push(sheetPoint((total * i) / 60, theta));
    const xs = raw.map(([x]) => x);
    const ys = raw.map(([, y]) => y);
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const scale = Math.min(320 / Math.max(maxX - minX, 1), 190 / Math.max(maxY - minY, 1), 1.2);
    const ox = 195 - ((minX + maxX) / 2) * scale;
    const oy = 170 - ((minY + maxY) / 2) * scale;
    const map = ([x, y]: [number, number]): [number, number] => [ox + x * scale, oy + y * scale];
    const sheet = raw.map(map);
    const a = map(sheetPoint(25, theta));
    const b = map(sheetPoint(total - 25, theta));
    const tunnel = s.fold >= 60;
    const open = s.exotic === 1;
    const phase = (t % 2.4) / 2.4;
    const half = open ? 14 : 14 * Math.max(0, 1 - phase * 2.2);
    let throat = '';
    if (tunnel) {
      const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const [nx, ny] = [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
      for (const side of [1, -1]) {
        throat += `<path d="M ${n(a[0] + nx * side * 22)} ${n(a[1] + ny * side * 22)} Q ${n(mx + nx * side * half)} ${n(my + ny * side * half)} ${n(b[0] + nx * side * 22)} ${n(b[1] + ny * side * 22)}" fill="none" stroke="#e599f7" stroke-width="2.5"/>`;
      }
      const go = open ? Math.min(phase * 1.6, 1) : Math.min(phase * 1.6, 0.42);
      throat += `<circle cx="${n(a[0] + (b[0] - a[0]) * go)}" cy="${n(a[1] + (b[1] - a[1]) * go)}" r="5" fill="${GOLD}" opacity="${n(open || phase < 0.5 ? 1 : 0.3)}"/>`;
      if (half < 2) throat += txt(mx + 34, my + 4, '夹断！', { size: 12.5, color: '#ff6b6b', bold: true, plain: true });
    }
    const status = !tunnel
      ? ['还没折到能“戳洞”', '只能沿纸面慢慢走']
      : open
        ? ['奇异物质撑住了隧道', '光点钻过去了（纯属假想）']
        : ['隧道一形成就夹断', '连光都来不及通过'];
    return starBackdrop()
      + txt(280, 34, '虫洞：广义相对论方程允许的“折纸捷径”，至今从未观测到', { size: 12, color: '#fff8dc', bold: true, plain: true })
      + `<polyline points="${poly(sheet)}" fill="none" stroke="#9775fa" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>`
      + throat
      + `<circle cx="${n(a[0])}" cy="${n(a[1])}" r="7" fill="#4dabf7" stroke="#fff" stroke-width="2"/>`
      + `<circle cx="${n(b[0])}" cy="${n(b[1])}" r="7" fill="${HOT}" stroke="#fff" stroke-width="2"/>`
      + txt(a[0], a[1] + 24, 'A', { size: 13, color: '#cfe5f7', bold: true, plain: true })
      + txt(b[0], b[1] - 14, 'B', { size: 13, color: '#ffc078', bold: true, plain: true })
      + txt(460, 92, '（假想示意图）', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(460, 122, '沿纸面走：100 份路', { size: 12.5, color: '#fff8dc', plain: true })
      + txt(460, 148, `A、B 直线距离：${share} 份`, { size: 12.5, color: GOLD, bold: true, plain: true })
      + txt(460, 196, status[0], { size: 12.5, color: open && tunnel ? '#8ce99a' : '#ffa8a8', bold: true, plain: true })
      + txt(460, 220, status[1], { size: 11.5, color: '#cfe5f7', plain: true })
      + txt(460, 270, '负能量奇异物质：是否存在未知', { size: 11, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const { share } = foldNumbers(s.fold);
    if (s.fold < 60) return `纸面折弯 ${s.fold}%：A、B 的直线距离还有沿纸面路程的 ${share}%，两点离得不够近，只能沿着时空“纸面”走。`;
    if (s.exotic === 1) return `纸面折弯 ${s.fold}%：钻隧道只需沿纸面路程的 ${share}%；假想中负能量奇异物质撑住了隧道——但这种物质够不够、存不存在，目前没人知道。`;
    return `纸面折弯 ${s.fold}%：钻隧道只需沿纸面路程的 ${share}%，可没有奇异物质，爱因斯坦—罗森桥一形成就夹断，连光都过不去。`;
  },
};
