import { clamp, GOLD, HOT, n, noise, poly, r1, starBackdrop, txt, type SimDef } from './kit';

/** 未来 t（十亿年）内两大星系并合的累计概率：约 45 亿年内 2%、100 亿年内约一半、并合时间中位数约 76 亿年（Sawala 等 2025） */
const MERGE_ODDS: readonly (readonly [number, number])[] = [[0, 0], [3, 0], [4.5, 0.02], [6, 0.1], [7.6, 0.25], [9, 0.4], [10, 0.5]];

function mergeOdds(gyr: number): number {
  for (let i = 1; i < MERGE_ODDS.length; i += 1) {
    const [t0, p0] = MERGE_ODDS[i - 1];
    const [t1, p1] = MERGE_ODDS[i];
    if (gyr <= t1) return p0 + ((p1 - p0) * (gyr - t0)) / (t1 - t0);
  }
  return MERGE_ODDS[MERGE_ODDS.length - 1][1];
}

/** 概率 u（0–0.5）对应的并合时间（十亿年）；超过 100 亿年才并合或不并合的返回 null */
function mergeTime(u: number): number | null {
  for (let i = 1; i < MERGE_ODDS.length; i += 1) {
    const [t0, p0] = MERGE_ODDS[i - 1];
    const [t1, p1] = MERGE_ODDS[i];
    if (p1 > p0 && u <= p1) return t0 + ((t1 - t0) * (u - p0)) / (p1 - p0);
  }
  return null;
}

function spiralGalaxy(cx: number, cy: number, r: number, squash: number, rot: number, arm: string, core: string): string {
  let out = `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(r * 1.15)}" ry="${n(r * 1.15 * squash)}" fill="${arm}" opacity="0.16"/>`;
  for (let side = 0; side < 2; side += 1) {
    for (let i = 1; i <= 14; i += 1) {
      const a = rot + side * Math.PI + i * 0.42;
      const rr = r * (0.15 + (i / 14) * 0.85);
      out += `<circle cx="${n(cx + Math.cos(a) * rr)}" cy="${n(cy + Math.sin(a) * rr * squash)}" r="${i % 3 === 0 ? 2.4 : 1.6}" fill="${arm}" opacity="0.85"/>`;
    }
  }
  return out + `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(r * 0.28)}" ry="${n(r * 0.28 * squash)}" fill="${core}" opacity="0.95"/>`;
}

const TRACKS = 20;
const MW: readonly [number, number] = [118, 222];
const M31: readonly [number, number] = [452, 92];

/** 19. 银河系与仙女座：许多次模拟里有几次真的并合 */
export const andromedaMerge: SimDef = {
  params: [
    { key: 'time', label: '从现在往后', min: 0, max: 100, step: 5, value: 50, unit: ' 亿年' },
    { key: 'zoom', label: '观察尺度', min: 0, max: 1, step: 1, value: 0, labels: ['星系尺度：很多次模拟', '放大到恒星尺度'] },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const gyr = s.time / 10;
    const odds = mergeOdds(gyr);
    if (s.zoom === 1) {
      let stars = '';
      for (let i = 0; i < 14; i += 1) {
        const y = 70 + noise(i * 13 + 2) * 170;
        const xa = 40 + ((noise(i * 7 + 1) * 480 + t * 26) % 480);
        const xb = 520 - ((noise(i * 5 + 9) * 480 + t * 22) % 480);
        stars += `<circle cx="${n(xa)}" cy="${n(y)}" r="2.2" fill="#74c0fc"/>`;
        stars += `<circle cx="${n(xb)}" cy="${n(y + 9)}" r="2.2" fill="${GOLD}"/>`;
      }
      return starBackdrop(12, 12, 536, 296, 10)
        + stars
        + txt(280, 40, '两个星系的恒星互相穿过（蓝：银河系  黄：仙女座）', { size: 13, color: '#fff8dc', bold: true, plain: true })
        + `<circle cx="70" cy="272" r="6" fill="#fff"/><circle cx="490" cy="272" r="6" fill="#fff"/>`
        + `<line x1="82" y1="272" x2="478" y2="272" stroke="#fff8dc" stroke-width="1.5" stroke-dasharray="6 5"/>`
        + txt(280, 264, '太阳 = 一只乒乓球，最近的恒星 = 上千千米外的另一只', { size: 12, color: GOLD, bold: true, plain: true })
        + txt(280, 292, '恒星直接相撞：几乎一次都不会发生', { size: 12.5, color: '#ffa8a8', bold: true, plain: true });
    }
    let tracks = '';
    let dots = '';
    let merged = 0;
    const [mx, my] = [(MW[0] + M31[0]) / 2, (MW[1] + M31[1]) / 2];
    const len = Math.hypot(MW[0] - M31[0], MW[1] - M31[1]);
    const [px, py] = [(MW[1] - M31[1]) / len, -(MW[0] - M31[0]) / len];
    for (let i = 0; i < TRACKS; i += 1) {
      const u = (i + 0.5) / TRACKS;
      const when = mergeTime(u);
      const side = i % 2 === 0 ? 1 : -1;
      const reach = (Math.floor(i / 2) + 1) / (TRACKS / 2);
      const miss = when === null ? 34 + reach * 50 : 0;
      const end: readonly [number, number] = [MW[0] + px * side * miss, MW[1] + py * side * miss];
      const ctrl: readonly [number, number] = [mx + px * side * reach * 95, my + py * side * reach * 95];
      const done = when !== null && gyr >= when;
      if (done) merged += 1;
      tracks += `<path d="M ${M31[0]} ${M31[1]} Q ${n(ctrl[0])} ${n(ctrl[1])} ${n(end[0])} ${n(end[1])}" fill="none" stroke="${done ? HOT : '#9775fa'}" stroke-width="1.2" opacity="${done ? 0.6 : 0.28}"/>`;
      const k = done ? 1 : clamp(gyr / (when ?? 11.5), 0, 1) * (when === null ? 0.9 : 1);
      const x = (1 - k) * (1 - k) * M31[0] + 2 * (1 - k) * k * ctrl[0] + k * k * end[0];
      const y = (1 - k) * (1 - k) * M31[1] + 2 * (1 - k) * k * ctrl[1] + k * k * end[1];
      if (!done) dots += `<circle cx="${n(x)}" cy="${n(y)}" r="3.2" fill="#d0bfff"/>`;
    }
    const bar = 220 * odds;
    return starBackdrop()
      + tracks
      + spiralGalaxy(MW[0], MW[1], 44, 0.55, t * 0.3, '#b197fc', '#fff3bf')
      + spiralGalaxy(M31[0], M31[1], 40, 0.42, -t * 0.3 + 1, '#74c0fc', '#fff3bf')
      + (merged ? `<circle cx="${MW[0]}" cy="${MW[1]}" r="${n(8 + merged * 1.5)}" fill="${HOT}" opacity="0.55"/>` : '')
      + dots
      + txt(MW[0], 288, '银河系', { size: 12.5, color: '#fff8dc', bold: true, plain: true })
      + txt(M31[0], 152, '仙女座（250 万光年外）', { size: 12, color: '#cfe5f7', bold: true, plain: true })
      + txt(452, 40, '每条细线 = 一次电脑模拟', { size: 12, color: '#c5b3e6', plain: true })
      + txt(140, 40, s.time === 0 ? '现在：每秒约 110 千米靠近' : `${n(s.time)} 亿年内：${merged}/${TRACKS} 次撞到一起`, { size: 13.5, color: GOLD, bold: true, plain: true })
      + `<rect x="300" y="236" width="220" height="14" rx="7" fill="#3b335f"/>`
      + `<rect x="300" y="236" width="${n(Math.max(bar, 0))}" height="14" rx="7" fill="${HOT}"/>`
      + txt(410, 276, `合并概率约 ${Math.round(odds * 100)}%`, { size: 13.5, color: '#ffa8a8', bold: true, plain: true });
  },
  readout(s) {
    const odds = Math.round(mergeOdds(s.time / 10) * 100);
    if (s.zoom === 1) {
      return `就算 ${n(s.time)} 亿年后两大星系真的交会，恒星之间也空旷得像相隔上千千米的两只乒乓球，太阳几乎不可能被别的恒星撞上。`;
    }
    if (s.time === 0) return '现在仙女座星系离我们约 250 万光年，正以每秒约 110 千米的速度靠近，但未来走哪条路还要算。';
    return `用哈勃和盖亚的数据模拟：未来 ${n(s.time)} 亿年内两大星系合并的概率约 ${odds}%；45 亿年内只有约 2%，100 亿年内也才约一半。`;
  },
};

const UDF_DAYS = 11.57;

/** 某次曝光能拍到的星系数：哈勃超深场（约 100 万秒、宽约满月直径的 10%）约 1 万个；曝光更短时按示意比例减少 */
function galaxyCount(days: number, sidePct: number): number {
  return 10000 * Math.pow(days / UDF_DAYS, 0.375) * (sidePct / 10) ** 2;
}

/** 20. 哈勃深空：曝光越久、越暗越远的星系越多 */
export const deepFieldCount: SimDef = {
  params: [
    { key: 'days', label: '累计曝光', min: 0.5, max: 11.5, step: 0.5, value: 11.5, unit: ' 天' },
    { key: 'side', label: '天区边长', min: 5, max: 20, step: 5, value: 10, unit: '% 满月直径' },
  ],
  animated: false,
  draw(s) {
    const depth = Math.pow(s.days / UDF_DAYS, 0.375);
    const side = 80 + ((s.side - 5) / 15) * 180;
    const x0 = 160 - side / 2;
    const y0 = 165 - side / 2;
    const full = Math.max(170 * (side / 260) ** 2, 1);
    const shown = Math.round(full * depth);
    let field = `<rect x="${n(x0)}" y="${n(y0)}" width="${n(side)}" height="${n(side)}" fill="#0b0920" stroke="#c5b3e6" stroke-width="1.5"/>`;
    for (let i = 0; i < shown; i += 1) {
      const faint = i / full;
      const x = x0 + 6 + noise(i * 19 + 4) * (side - 12);
      const y = y0 + 6 + noise(i * 23 + 8) * (side - 12);
      const size = 1.2 + 3.4 * (1 - clamp(faint, 0, 1));
      const color = faint < 0.3 ? '#e7f5ff' : faint < 0.6 ? '#ffd8a8' : '#ff8787';
      const tilt = Math.round(noise(i * 29 + 1) * 180);
      field += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(size)}" ry="${n(size * 0.6)}" transform="rotate(${tilt} ${n(x)} ${n(y)})" fill="${color}" opacity="${n(0.95 - 0.45 * clamp(faint, 0, 1))}"/>`;
    }
    const count = Math.round(galaxyCount(s.days, s.side) / 10) * 10;
    const lookback = Math.round(100 + (30 * Math.log(s.days / 0.5)) / Math.log(UDF_DAYS / 0.5));
    const patch = Math.max(s.side * 0.84, 2);
    return starBackdrop(12, 12, 536, 296, 12)
      + field
      + txt(160, 30, '对准一小块“空”天空长时间曝光', { size: 12.5, color: '#fff8dc', bold: true, plain: true })
      + `<circle cx="430" cy="82" r="42" fill="#fff3bf" opacity="0.9"/>`
      + `<rect x="${n(430 - patch / 2)}" y="${n(82 - patch / 2)}" width="${n(patch)}" height="${n(patch)}" fill="#1c1836" stroke="${HOT}" stroke-width="1.5"/>`
      + txt(430, 142, '满月 vs 拍摄天区（黑方块）', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(430, 176, `曝光约 ${Math.round((s.days * 86400) / 10000)} 万秒`, { size: 13, color: '#fff8dc', bold: true, plain: true })
      + txt(430, 202, `拍到约 ${count} 个星系`, { size: 14, color: GOLD, bold: true, plain: true })
      + txt(430, 228, `最暗的光走了约 ${lookback} 亿年`, { size: 12.5, color: '#ffa8a8', bold: true, plain: true })
      + txt(430, 262, '越暗越小越红 = 越远越古老', { size: 12, color: '#cfe5f7', plain: true })
      + txt(430, 286, '（星系数为示意估算）', { size: 11, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const count = Math.round(galaxyCount(s.days, s.side) / 10) * 10;
    const sky = Math.round((galaxyCount(s.days, s.side) * 41253) / ((0.005 * s.side) ** 2) / 1e8);
    return `曝光 ${r1(s.days)} 天，这块宽约满月直径 ${s.side}% 的天区约有 ${count} 个星系；按比例铺满全天约 ${sky} 亿个，还有更暗的没拍到，实际是数千亿甚至更多。`;
  },
};

const FORK = ['E0 椭圆', 'E3 椭圆', 'E7 椭圆', 'S0 透镜状', 'Sa 旋涡', 'Sb 旋涡', 'Sc 旋涡', 'SBa 棒旋', 'SBb 棒旋', 'SBc 棒旋', 'Irr 不规则'] as const;
/** 示意：气体多少、年轻蓝色恒星的比例（0–1） */
const GAS = [0.03, 0.03, 0.03, 0.1, 0.35, 0.5, 0.65, 0.35, 0.5, 0.65, 0.8];
const YOUNG = [0.04, 0.04, 0.04, 0.08, 0.35, 0.5, 0.65, 0.35, 0.5, 0.65, 0.75];

function ellipticalGalaxy(cx: number, cy: number, r: number, q: number): string {
  let out = '';
  for (const [k, op] of [[1.05, 0.12], [0.7, 0.2], [0.4, 0.35]] as const) {
    out += `<ellipse cx="${cx}" cy="${cy}" rx="${n(r * k)}" ry="${n(r * k * q)}" fill="#ffc078" opacity="${op}"/>`;
  }
  for (let i = 0; i < 110; i += 1) {
    const a = noise(i * 7 + 3) * Math.PI * 2;
    const rr = r * Math.pow(noise(i * 11 + 5), 1.4);
    out += `<circle cx="${n(cx + Math.cos(a) * rr)}" cy="${n(cy + Math.sin(a) * rr * q)}" r="1.3" fill="${i % 3 ? '#ffd8a8' : '#ff8787'}" opacity="0.85"/>`;
  }
  return out + `<ellipse cx="${cx}" cy="${cy}" rx="${n(r * 0.16)}" ry="${n(r * 0.16 * q)}" fill="#fff3bf"/>`;
}

function spiralArms(cx: number, cy: number, r: number, start: number, pitch: number, rot: number, young: number): string {
  let out = '';
  const turns = Math.log(r / start) / pitch;
  for (let side = 0; side < 2; side += 1) {
    const lane: [number, number][] = [];
    for (let i = 0; i <= 24; i += 1) {
      const th = (turns * i) / 24;
      const rr = start * Math.exp(pitch * th);
      const a = rot + side * Math.PI + th;
      lane.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.78]);
    }
    out += `<polyline points="${poly(lane)}" fill="none" stroke="#74c0fc" stroke-width="9" stroke-linecap="round" opacity="0.22"/>`;
    for (let i = 0; i <= 36; i += 1) {
      const th = (turns * i) / 36;
      const rr = start * Math.exp(pitch * th);
      const a = rot + side * Math.PI + th;
      const jx = (noise(i * 13 + side * 101) - 0.5) * 6;
      const jy = (noise(i * 17 + side * 103) - 0.5) * 6;
      const x = cx + Math.cos(a) * rr + jx;
      const y = cy + Math.sin(a) * rr * 0.78 + jy;
      const blue = noise(i * 5 + side * 7) < young + 0.25;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="${i % 4 === 0 ? 2.6 : 1.7}" fill="${blue ? '#74c0fc' : '#ffd8a8'}" opacity="0.9"/>`;
      if (blue && i % 6 === 3) out += `<circle cx="${n(x)}" cy="${n(y)}" r="3.2" fill="#f783ac" opacity="0.7"/>`;
    }
  }
  return out;
}

/** 21. 哈勃音叉图：星系形态、气体和年轻恒星 */
export const galaxyFork: SimDef = {
  params: [
    { key: 'type', label: '星系类型', min: 0, max: 10, step: 1, value: 8, labels: FORK },
  ],
  animated: true,
  still: 0,
  draw(s, t) {
    const idx = clamp(Math.round(s.type), 0, 10);
    const cx = 150;
    const cy = 170;
    const r = 105;
    const rot = t * 0.12;
    let galaxy = '';
    if (idx <= 2) {
      galaxy = ellipticalGalaxy(cx, cy, r, 1 - [0, 3, 7][idx] / 10);
    } else if (idx === 3) {
      galaxy = `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${n(r * 0.36)}" fill="#ffd8a8" opacity="0.3"/>`
        + `<ellipse cx="${cx}" cy="${cy}" rx="${n(r * 0.7)}" ry="${n(r * 0.24)}" fill="#ffc078" opacity="0.4"/>`
        + `<ellipse cx="${cx}" cy="${cy}" rx="${n(r * 0.3)}" ry="${n(r * 0.2)}" fill="#fff3bf"/>`;
    } else if (idx <= 9) {
      const barred = idx >= 7;
      const k = (idx - (barred ? 7 : 4));
      const bulge = r * [0.36, 0.25, 0.14][k];
      const pitch = [0.16, 0.26, 0.4][k];
      const start = barred ? r * 0.36 : bulge * 0.9;
      galaxy = `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${n(r * 0.78)}" fill="#4dabf7" opacity="0.1"/>`;
      galaxy += spiralArms(cx, cy, r, start, pitch, rot, YOUNG[idx]);
      galaxy += `<ellipse cx="${cx}" cy="${cy}" rx="${n(bulge * (barred ? 0.7 : 1))}" ry="${n(bulge * (barred ? 0.6 : 0.85))}" fill="#ffe8a1" opacity="0.95"/>`;
      if (barred) {
        const [bx, by] = [Math.cos(rot) * start, Math.sin(rot) * start * 0.78];
        galaxy += `<line x1="${n(cx - bx)}" y1="${n(cy - by)}" x2="${n(cx + bx)}" y2="${n(cy + by)}" stroke="#ffd8a8" stroke-width="16" stroke-linecap="round" opacity="0.85"/>`;
      }
    } else {
      for (let i = 0; i < 26; i += 1) {
        const x = cx - 70 + noise(i * 31 + 2) * 140 + Math.sin(i) * 10;
        const y = cy - 55 + noise(i * 37 + 6) * 110;
        const rr = 4 + noise(i * 41 + 1) * 10;
        galaxy += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rr)}" fill="${i % 4 === 0 ? '#ffd8a8' : i % 3 === 0 ? '#f783ac' : '#74c0fc'}" opacity="0.6"/>`;
      }
    }

    const node = (x: number, y: number, label: string, i: number): string =>
      `<circle cx="${x}" cy="${y}" r="${i === idx ? 7 : 4}" fill="${i === idx ? HOT : '#c5b3e6'}" stroke="#fff" stroke-width="${i === idx ? 2 : 0}"/>`
      + txt(x, y + (y > 84 ? 18 : -10), label, { size: 10, color: i === idx ? GOLD : '#cfe5f7', bold: i === idx, plain: true });
    const fork = '<path d="M 322 84 L 420 84 M 420 84 L 446 52 L 530 52 M 420 84 L 446 116 L 530 116" fill="none" stroke="#8d82c4" stroke-width="2"/>'
      + node(326, 84, 'E0', 0) + node(358, 84, 'E3', 1) + node(390, 84, 'E7', 2) + node(420, 84, 'S0', 3)
      + node(462, 52, 'Sa', 4) + node(494, 52, 'Sb', 5) + node(526, 52, 'Sc', 6)
      + node(462, 116, 'SBa', 7) + node(494, 116, 'SBb', 8) + node(526, 116, 'SBc', 9)
      + node(340, 132, 'Irr', 10);
    const bar = (y: number, label: string, value: number, color: string): string =>
      txt(322, y + 11, label, { size: 11.5, color: '#fff8dc', anchor: 'start', plain: true })
      + `<rect x="400" y="${y}" width="130" height="13" rx="6" fill="#3b335f"/>`
      + `<rect x="400" y="${y}" width="${n(130 * value)}" height="13" rx="6" fill="${color}"/>`;
    const notes = idx <= 2 ? '多是年老偏红的恒星' : idx === 3 ? '有圆盘、几乎没有旋臂' : idx <= 6 ? '旋臂里正诞生蓝色新星' : idx <= 9 ? '银河系就是棒旋星系！' : '常被引力扯乱的小星系';
    return starBackdrop()
      + galaxy
      + txt(cx, 300, FORK[idx], { size: 14, color: GOLD, bold: true, plain: true })
      + txt(432, 30, '哈勃音叉图（1926）', { size: 12, color: '#fff8dc', bold: true, plain: true })
      + fork
      + bar(176, '气体尘埃', GAS[idx], '#9775fa')
      + bar(204, '年轻蓝星', YOUNG[idx], '#74c0fc')
      + txt(432, 252, notes, { size: 13, color: '#ffa8a8', bold: true, plain: true })
      + txt(432, 280, '音叉图是分类，不是成长顺序', { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const idx = clamp(Math.round(s.type), 0, 10);
    if (idx <= 2) {
      const e = [0, 3, 7][idx];
      const look = e === 0 ? '看上去几乎是正圆' : `短轴只有长轴的约 ${(10 - e) * 10}%`;
      return `E${e} 椭圆星系：${look}；气体几乎用光，很少再造新星，住的多是年老偏红的恒星，常是星系并合的产物。`;
    }
    if (idx === 3) return 'S0 透镜状星系：有核球和圆盘，却几乎没有旋臂和造星气体，在 1926 年的哈勃音叉图里正好位于分叉处。';
    if (idx <= 6) return `${FORK[idx]}星系：气体丰富，旋臂里不断诞生又热又亮的蓝色新恒星；从 Sa 到 Sc，核球变小、旋臂变得越来越松散。`;
    if (idx <= 9) return `${FORK[idx]}星系：中间有一根由恒星组成的“棒”，旋臂从棒的两端甩出——我们的银河系就是一个棒旋星系。`;
    return 'Irr 不规则星系：没有固定形状，常是被大星系引力扯乱的小星系，比如大、小麦哲伦云，里面气体多、造星活跃。';
  },
};
