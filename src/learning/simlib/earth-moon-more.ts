import { arrow, GOLD, HOT, n, r1, r2, starBackdrop, txt, type SimDef } from './kit';

/** 1. 红月亮：地球大气把红橙光折进本影 */
const AXIS = 150;
const EX = 118;
const ER = 40;
const MX = 322;
const MR = 13;
const umbraHalf = (x: number): number => ER * (1 - (x - EX) / 1333);
const penumbraHalf = (x: number): number => ER + (x - EX) * 0.11;
const ECLIPSE_STAGES = ['影外满月', '半影食', '偏食', '全食'];
const STAGE_OFFSET = [96, 54, 34, 6];
const DUST = ['清澈', '普通', '火山灰多'];
const TOTAL_COLOR = ['#d9622b', '#a3321f', '#4f1c15'];
const TOTAL_NAME = ['明亮的铜橙色', '暗红色', '深褐红色，暗得几乎找不到'];
const RAY_OPACITY = [0.95, 0.7, 0.35];

function refractedPoint(side: 1 | -1, u: number): [number, number] {
  const y0 = AXIS - side * (ER + 3);
  if (u < 0.4) return [24 + (EX - 24) * (u / 0.4), y0];
  const v = (u - 0.4) / 0.6;
  const [ax, ay] = [EX, y0];
  const [cx, cy] = [EX + 90, y0 + side * 4];
  const [bx, by] = [MX + 34, AXIS - side * 2];
  const w = 1 - v;
  return [w * w * ax + 2 * w * v * cx + v * v * bx, w * w * ay + 2 * w * v * cy + v * v * by];
}

export const bloodMoonLight: SimDef = {
  params: [
    { key: 'stage', label: '月食进程', min: 0, max: 3, step: 1, value: 3, labels: ECLIPSE_STAGES },
    { key: 'dust', label: '大气尘埃', min: 0, max: 2, step: 1, value: 1, labels: DUST },
  ],
  animated: true,
  draw(s, t) {
    const stage = Math.round(s.stage);
    const dust = Math.round(s.dust);
    const offset = STAGE_OFFSET[stage];
    const my = AXIS - offset;
    const reachX = 384;
    const uh = umbraHalf(reachX);
    const ph = penumbraHalf(reachX);
    const umbra = `${EX},${AXIS - ER} ${reachX},${n(AXIS - uh)} ${reachX},${n(AXIS + uh)} ${EX},${AXIS + ER}`;
    const penumbra = `${EX},${AXIS - ER} ${reachX},${n(AXIS - ph)} ${reachX},${n(AXIS + ph)} ${EX},${AXIS + ER}`;
    const inPenumbra = offset < penumbraHalf(MX) + MR * 0.5;
    const bright = stage === 0 ? '#f8f1d8' : inPenumbra ? '#d6cdb0' : '#f8f1d8';
    const red = TOTAL_COLOR[dust];
    const op = RAY_OPACITY[dust];

    const sunRays = [AXIS - 74, AXIS + 74].map(y => `<line x1="24" y1="${y}" x2="${reachX}" y2="${y}" stroke="${GOLD}" stroke-width="2" opacity="0.55"/>`
      + arrow(24, y, 64, y, GOLD, 2.5)).join('');
    const bent = ([1, -1] as const).map(side => {
      const y0 = AXIS - side * (ER + 3);
      return `<path d="M 24 ${y0} L ${EX} ${y0} Q ${EX + 90} ${y0 + side * 4} ${MX + 34} ${AXIS - side * 2}" fill="none" stroke="#ff7a50" stroke-width="3" opacity="${r2(op)}"/>`
        + `<line x1="24" y1="${y0}" x2="${EX}" y2="${y0}" stroke="#fff3bf" stroke-width="3" opacity="0.9"/>`;
    }).join('');
    let photons = '';
    for (const side of [1, -1] as const) {
      for (let i = 0; i < 4; i += 1) {
        const u = (t * 0.22 + i / 4) % 1;
        const [px, py] = refractedPoint(side, u);
        photons += `<circle cx="${n(px)}" cy="${n(py)}" r="3" fill="${u < 0.4 ? '#fff8dc' : '#ff8a5c'}" opacity="${r2(u < 0.4 ? 0.9 : op)}"/>`;
      }
    }
    const scatter = ([1, -1] as const).map(side => arrow(EX - 4, AXIS - side * (ER + 4), EX - 26, AXIS - side * (ER + 28), '#74c0fc', 2.5)
      + arrow(EX + 6, AXIS - side * (ER + 4), EX + 24, AXIS - side * (ER + 30), '#74c0fc', 2.5)).join('');

    const IX = 468;
    const IY = 152;
    const IR = 50;
    const k = IR / MR;
    const insetName = stage === 0 ? '明亮的满月' : stage === 1 ? '只是略微变暗' : stage === 2 ? '缺口泛着暗红' : TOTAL_NAME[dust].split('，')[0];

    return starBackdrop()
      + `<defs><clipPath id="bml-umbra"><polygon points="${umbra}"/></clipPath><clipPath id="bml-disk"><circle cx="${IX}" cy="${IY}" r="${IR}"/></clipPath></defs>`
      + sunRays
      + txt(46, 66, '阳光', { size: 12, color: GOLD, bold: true, plain: true })
      + `<polygon points="${penumbra}" fill="#3a3466" opacity="0.55"/>`
      + `<polygon points="${umbra}" fill="#09081a" opacity="0.9"/>`
      + `<polygon points="${umbra}" fill="${red}" opacity="${r2(op * 0.22)}"/>`
      + txt(232, AXIS + 4, '本影', { size: 12, color: '#c5b3e6', bold: true, plain: true })
      + txt(300, AXIS + 62, '半影', { size: 11, color: '#a99bd6', plain: true })
      + bent + photons + scatter
      + txt(EX, AXIS - ER - 34, '蓝光被散射', { size: 11, color: '#8fd3ff', bold: true, plain: true })
      + `<circle cx="${EX}" cy="${AXIS}" r="${ER + 5}" fill="none" stroke="#8fd3ff" stroke-width="5" opacity="0.45"/>`
      + `<circle cx="${EX}" cy="${AXIS}" r="${ER}" fill="#2f6fae"/>`
      + `<path d="M ${EX} ${AXIS - ER} A ${ER} ${ER} 0 0 0 ${EX} ${AXIS + ER} Z" fill="#4dabf7"/>`
      + txt(EX, AXIS + 5, '地球', { size: 13, color: '#fff', bold: true, plain: true })
      + txt(EX + 4, AXIS + ER + 56, '大气像一圈透镜', { size: 11, color: '#8fd3ff', plain: true })
      + `<circle cx="${MX}" cy="${my}" r="${MR}" fill="${bright}"/>`
      + `<circle cx="${MX}" cy="${my}" r="${MR}" fill="${red}" clip-path="url(#bml-umbra)"/>`
      + txt(MX, my - MR - 6, '月球', { size: 11, color: '#fff8dc', plain: true })
      + txt(200, 296, `${ECLIPSE_STAGES[stage]} · 大气${DUST[dust]}`, { size: 13, color: '#fff8dc', bold: true, plain: true })
      + `<rect x="398" y="28" width="142" height="262" rx="14" fill="#29234d" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(IX, 54, '从地球看月亮', { size: 13, color: '#fff8dc', bold: true, plain: true })
      + `<circle cx="${IX}" cy="${IY}" r="${IR}" fill="${bright}"/>`
      + (stage >= 1 ? `<circle cx="${IX}" cy="${IY}" r="${IR}" fill="#000" opacity="0.15"/>` : '')
      + `<circle cx="${IX}" cy="${n(IY + offset * k)}" r="${n(umbraHalf(MX) * k)}" fill="${red}" clip-path="url(#bml-disk)"/>`
      + txt(IX, 236, insetName, { size: 12, color: stage >= 2 ? '#ff9f7a' : GOLD, bold: true, plain: true })
      + txt(IX, 262, stage === 3 ? '肉眼可放心观看' : '月亮继续往影子里走', { size: 11, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const stage = Math.round(s.stage);
    const dust = Math.round(s.dust);
    const step = `（月食进程第 ${stage + 1}/4 段）`;
    if (stage === 0) return `月亮还在地球影子外面，是一轮明亮的满月${step}。`;
    if (stage === 1) return `月亮进入半影，只被挡掉一部分阳光，略微变暗，肉眼不太容易察觉${step}。`;
    if (stage === 2) return `月亮一部分钻进本影，像被咬了一口；缺口里只剩大气折进来的红光，大气${DUST[dust]}时偏${TOTAL_NAME[dust].split('，')[0]}${step}。`;
    return `月亮整个躲进本影，直射阳光全被地球挡住，只剩大气折进来、蓝光已被散射掉的红橙光；大气${DUST[dust]}时，红月亮呈${TOTAL_NAME[dust]}${step}。`;
  },
};

/** 2. 月亮错觉：相机量到的视大小几乎不变，大脑“感觉”的大小在变 */
const MOON_D = 384400;
const EARTH_R = 6371;
const MOON_R = 1737.4;
const toRad = (deg: number): number => (deg * Math.PI) / 180;
const moonDistance = (alt: number): number => Math.sqrt(MOON_D ** 2 - (EARTH_R * Math.cos(toRad(alt))) ** 2) - EARTH_R * Math.sin(toRad(alt));
const angularSize = (alt: number): number => (2 * Math.atan(MOON_R / moonDistance(alt)) * 180) / Math.PI;
const perceived = (alt: number, refs: number, tube: number): number => (tube === 1 ? 1 : 1 + (refs === 1 ? 0.55 : 0.28) * (1 - alt / 90) ** 2);
const squash = (alt: number): number => (alt < 6 ? 0.9 + (0.1 * alt) / 6 : 1);

export const moonIllusionSize: SimDef = {
  params: [
    { key: 'alt', label: '月亮高度', min: 0, max: 90, step: 5, value: 5, unit: '°' },
    { key: 'refs', label: '地平线参照物', min: 0, max: 1, step: 1, value: 1, labels: ['不显示', '显示楼房树木'] },
    { key: 'tube', label: '观察方式', min: 0, max: 1, step: 1, value: 0, labels: ['直接看', '透过纸筒'] },
  ],
  animated: false,
  draw(s) {
    const alt = s.alt;
    const refs = Math.round(s.refs);
    const tube = Math.round(s.tube);
    const ox = 188;
    const oy = 236;
    const rx = 150;
    const ry = 88;
    const a = toRad(alt);
    const reach = 1 / Math.sqrt((Math.cos(a) / rx) ** 2 + (Math.sin(a) / ry) ** 2);
    const mx = ox + reach * Math.cos(a);
    const my = oy - reach * Math.sin(a);
    const ratio = angularSize(alt) / angularSize(90);
    const f = perceived(alt, refs, tube);
    const sq = squash(alt);
    const base = 13;
    const feel = f > 1.3 ? '明显变大' : f > 1.08 ? '有点变大' : '和头顶时一样';

    const buildings = refs === 1
      ? [[240, 34, 22], [266, 52, 18], [288, 26, 20], [312, 44, 16]].map(([x, h, w]) => `<rect x="${x}" y="${244 - h}" width="${w}" height="${h}" fill="#151226"/>`
        + `<rect x="${x + 5}" y="${244 - h + 8}" width="4" height="4" fill="#ffd43b" opacity="0.6"/>`).join('')
        + [[92, 30], [118, 22], [336, 24]].map(([x, h]) => `<polygon points="${x - 10},244 ${x},${244 - h} ${x + 10},244" fill="#1a2a22"/>`).join('')
      : '';
    const mask = tube === 1
      ? `<path d="M 12 12 H 364 V 308 H 12 Z M ${n(mx - 30)} ${n(my)} a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0 Z" fill="#0d0b1a" fill-rule="evenodd" opacity="0.94"/>`
        + `<circle cx="${n(mx)}" cy="${n(my)}" r="31" fill="none" stroke="#c9a66b" stroke-width="5"/>`
        + txt(188, 296, '纸筒里只剩月亮，没东西可比', { size: 12, color: '#f2c879', bold: true, plain: true })
      : '';

    return starBackdrop(12, 12, 352, 296, 22)
      + `<path d="M ${ox - rx} ${oy} A ${rx} ${ry} 0 0 1 ${ox + rx} ${oy}" fill="none" stroke="#8d82c4" stroke-width="1.5" stroke-dasharray="6 5"/>`
      + txt(ox, oy - ry - 8, '大脑想象的“扁天穹”', { size: 11, color: '#a99bd6', plain: true })
      + `<line x1="${ox}" y1="${oy - 14}" x2="${n(mx)}" y2="${n(my)}" stroke="#fff3bf" stroke-width="1.2" stroke-dasharray="3 4" opacity="0.6"/>`
      + `<ellipse cx="${n(mx)}" cy="${n(my)}" rx="${n(base * ratio * f)}" ry="${n(base * ratio * f * sq)}" fill="#ffd97a"/>`
      + `<circle cx="${n(mx)}" cy="${n(my)}" r="${n(base * ratio)}" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="2 2" opacity="0.8"/>`
      + `<rect x="12" y="244" width="352" height="64" rx="0" fill="#2b2440"/>`
      + buildings
      + `<circle cx="${ox}" cy="${oy - 18}" r="5" fill="#fff8dc"/><line x1="${ox}" y1="${oy - 13}" x2="${ox}" y2="${oy + 2}" stroke="#fff8dc" stroke-width="2.5"/>`
      + `<line x1="${ox}" y1="${oy + 2}" x2="${ox - 5}" y2="${oy + 8}" stroke="#fff8dc" stroke-width="2.5"/><line x1="${ox}" y1="${oy + 2}" x2="${ox + 5}" y2="${oy + 8}" stroke="#fff8dc" stroke-width="2.5"/>`
      + (tube === 1 ? '' : txt(188, 290, '黄色=感觉的大小 · 白虚线=实际大小', { size: 11, color: '#c5b3e6', plain: true }))
      + mask
      + `<rect x="376" y="12" width="172" height="296" rx="14" fill="#29234d" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(462, 38, '相机量到的大小', { size: 13, color: '#fff8dc', bold: true, plain: true })
      + `<ellipse cx="462" cy="88" rx="${n(30 * ratio)}" ry="${n(30 * ratio * sq)}" fill="#fff1b8"/>`
      + txt(462, 140, `视直径约 ${r2(angularSize(alt))}°`, { size: 12, color: GOLD, bold: true, plain: true })
      + txt(462, 166, '大脑感觉的大小', { size: 13, color: '#fff8dc', bold: true, plain: true })
      + `<circle cx="462" cy="226" r="${n(30 * ratio)}" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="2 2" opacity="0.7"/>`
      + `<ellipse cx="462" cy="226" rx="${n(30 * ratio * f)}" ry="${n(30 * ratio * f * sq)}" fill="#ffd97a" opacity="0.92"/>`
      + txt(462, 292, feel, { size: 12, color: f > 1.08 ? HOT : '#c5b3e6', bold: true, plain: true });
  },
  readout(s) {
    const alt = s.alt;
    const refs = Math.round(s.refs);
    const tube = Math.round(s.tube);
    const dist = moonDistance(alt) / 10000;
    const flat = alt < 6 ? '，被大气压得稍微扁一点' : '';
    let feel: string;
    if (tube === 1) feel = '透过纸筒挡住了参照物，大脑不再“脑补”，月亮看起来和在头顶时一样大';
    else if (alt <= 20) feel = refs === 1 ? '旁边有楼房树木作比较，再加上“扁天穹”的错觉，大脑把它脑补得特别大' : '没有楼房树木，只剩“扁天穹”错觉，大脑仍会把它看大一些';
    else if (alt <= 50) feel = '离地平线远了，错觉减弱，看起来没那么大了';
    else feel = '高挂在空荡荡的天上没有参照物，看起来最“小”——其实这时它离你最近';
    return `月亮高度 ${alt}°：离你约 ${r1(dist)} 万千米，相机量到的视直径约 ${r2(angularSize(alt))}°${flat}；${feel}。`;
  },
};

/** 3. 从北极上空看地球自转：北京与纽约的钟点和昼夜 */
const BEIJING = { lon: 116.4, lat: 39.9 };
const NEW_YORK = { lon: -74, lat: 40.7 };
const pad = (h: number): string => `${h < 10 ? '0' : ''}${h}:00`;
const wrap24 = (h: number): number => ((h % 24) + 24) % 24;
const partOfDay = (solar: number): string => {
  const h = wrap24(solar);
  if (h < 5) return '深夜';
  if (h < 8) return '清晨';
  if (h < 17) return '白天';
  if (h < 20) return '傍晚';
  return '夜里';
};

function clockFace(x: number, y: number, hour: number, color: string): string {
  const a = toRad((hour % 12) * 30 - 90);
  const marks = Array.from({ length: 12 }, (_, i) => {
    const m = toRad(i * 30);
    return `<line x1="${n(x + Math.cos(m) * 20)}" y1="${n(y + Math.sin(m) * 20)}" x2="${n(x + Math.cos(m) * 24)}" y2="${n(y + Math.sin(m) * 24)}" stroke="${color}" stroke-width="1.5"/>`;
  }).join('');
  return `<circle cx="${x}" cy="${y}" r="27" fill="#fffdf8" stroke="${color}" stroke-width="2.5"/>` + marks
    + `<line x1="${x}" y1="${y}" x2="${n(x + Math.cos(a) * 14)}" y2="${n(y + Math.sin(a) * 14)}" stroke="#24332d" stroke-width="3.5" stroke-linecap="round"/>`
    + `<line x1="${x}" y1="${y}" x2="${x}" y2="${y - 20}" stroke="#24332d" stroke-width="2" stroke-linecap="round"/>`
    + `<circle cx="${x}" cy="${y}" r="2.5" fill="#24332d"/>`;
}

export const timeZoneSpin: SimDef = {
  params: [
    { key: 'hour', label: '北京时间', min: 0, max: 23, step: 1, value: 7, unit: '时' },
    { key: 'dst', label: '纽约用', min: 0, max: 1, step: 1, value: 0, labels: ['冬令时 UTC−5', '夏令时 UTC−4'] },
  ],
  animated: false,
  draw(s) {
    const hour = Math.round(s.hour);
    const dst = Math.round(s.dst);
    const utc = hour - 8;
    const cx = 196;
    const cy = 164;
    const R = 112;
    const phi = (lon: number): number => toRad(180 + (utc + lon / 15 - 12) * 15);
    const at = (lon: number, lat: number): [number, number] => {
      const rr = (R * (90 - lat)) / 90;
      return [cx + rr * Math.cos(phi(lon)), cy - rr * Math.sin(phi(lon))];
    };
    const meridians = Array.from({ length: 24 }, (_, i) => {
      const lon = -180 + i * 15;
      const p = phi(lon);
      return `<line x1="${cx}" y1="${cy}" x2="${n(cx + R * Math.cos(p))}" y2="${n(cy - R * Math.sin(p))}" stroke="#fff" stroke-width="${lon === 120 ? 2 : 1}" opacity="${lon === 120 ? 0.6 : 0.2}"/>`;
    }).join('');
    const [o1, o2, i1, i2] = [at(73, 18), at(135, 18), at(135, 53), at(73, 53)];
    const ro = (R * 72) / 90;
    const ri = (R * 37) / 90;
    const china = `<path d="M ${n(o1[0])} ${n(o1[1])} A ${n(ro)} ${n(ro)} 0 0 0 ${n(o2[0])} ${n(o2[1])} L ${n(i1[0])} ${n(i1[1])} A ${n(ri)} ${n(ri)} 0 0 1 ${n(i2[0])} ${n(i2[1])} Z" fill="#ff6b6b" opacity="0.4" stroke="#ffa8a8" stroke-width="1.2"/>`;
    const [bx, by] = at(BEIJING.lon, BEIJING.lat);
    const [nx, ny] = at(NEW_YORK.lon, NEW_YORK.lat);
    const pin = (x: number, y: number, label: string, color: string): string => {
      const dx = x - cx;
      const dy = y - cy;
      const len = Math.hypot(dx, dy) || 1;
      return `<circle cx="${n(x)}" cy="${n(y)}" r="6" fill="${color}" stroke="#fff" stroke-width="2"/>`
        + txt(x + (dx / len) * 22, y + (dy / len) * 22 + 4, label, { size: 12, color: '#fff', bold: true, plain: true });
    };
    const arc = Array.from({ length: 13 }, (_, i) => {
      const p = toRad(292 + i * 4);
      return [cx + (R + 12) * Math.cos(p), cy - (R + 12) * Math.sin(p)] as const;
    });
    const spin = `<polyline points="${arc.slice(0, -1).map(([x, y]) => `${n(x)},${n(y)}`).join(' ')}" fill="none" stroke="${GOLD}" stroke-width="3"/>`
      + arrow(arc[10][0], arc[10][1], arc[12][0], arc[12][1], GOLD, 3);

    const offset = dst === 1 ? 12 : 13;
    const nyClock = hour - offset;
    const nyHour = wrap24(nyClock);
    const nyDay = nyClock < 0 ? '前一天' : '同一天';
    const bjPart = partOfDay(utc + BEIJING.lon / 15);
    const nyPart = partOfDay(utc + NEW_YORK.lon / 15);
    const card = (y: number, title: string, h: number, line: string, color: string): string => `<rect x="352" y="${y}" width="188" height="118" rx="14" fill="#29234d" stroke="${color}" stroke-width="2"/>`
      + clockFace(390, y + 62, h, color)
      + txt(428, y + 30, title, { size: 13, color: '#fff8dc', bold: true, anchor: 'start', plain: true })
      + txt(428, y + 68, pad(h), { size: 24, color: GOLD, bold: true, anchor: 'start', plain: true })
      + txt(428, y + 96, line, { size: 12, color: '#c5b3e6', anchor: 'start', plain: true });

    return starBackdrop()
      + [96, 164, 232].map(y => arrow(22, y, 62, y, GOLD, 2.5)).join('')
      + txt(42, 80, '阳光', { size: 12, color: GOLD, bold: true, plain: true })
      + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#1e3a5f"/>`
      + `<path d="M ${cx} ${cy - R} A ${R} ${R} 0 0 0 ${cx} ${cy + R} Z" fill="#3d8fd1"/>`
      + meridians + china
      + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#a5d8ff" stroke-width="1.5"/>`
      + `<circle cx="${cx}" cy="${cy}" r="4" fill="#fff"/>`
      + txt(cx, cy - 8, '北极', { size: 11, color: '#fff', plain: true })
      + txt(cx - 62, 40, '白天', { size: 13, color: GOLD, bold: true, plain: true })
      + txt(cx + 62, 40, '黑夜', { size: 13, color: '#a5b4fc', bold: true, plain: true })
      + spin
      + txt(cx + 96, 296, '自西向东转', { size: 12, color: GOLD, bold: true, plain: true })
      + txt(cx - 76, 296, '红色扇面=中国', { size: 11, color: '#ffa8a8', plain: true })
      + pin(bx, by, '北京', HOT) + pin(nx, ny, '纽约', '#9775fa')
      + card(30, '北京 · 东八区', hour, `今天 · ${bjPart}`, HOT)
      + card(160, `纽约 · ${dst === 1 ? 'UTC−4' : 'UTC−5'}`, nyHour, `${nyDay} · ${nyPart}`, '#9775fa')
      + txt(446, 298, `相差 ${offset} 小时 · 每小时转 15°`, { size: 11, color: '#fff8dc', plain: true });
  },
  readout(s) {
    const hour = Math.round(s.hour);
    const dst = Math.round(s.dst);
    const offset = dst === 1 ? 12 : 13;
    const nyClock = hour - offset;
    const tag = nyClock < 0 ? '前一天' : '当天';
    return `北京时间 ${pad(hour)}（东八区），纽约是${tag} ${pad(wrap24(nyClock))}（${dst === 1 ? '夏令时 UTC−4' : '冬令时 UTC−5'}），两地相差 ${offset} 小时；地球每小时自西向东转过 15°，太阳总是先照到东边。`;
  },
};
