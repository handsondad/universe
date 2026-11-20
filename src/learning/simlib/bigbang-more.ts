import { BLUE, clamp, GOLD, HOT, n, PURPLE, r2, SPACE_MID, starBackdrop, txt, type SimDef } from './kit';

const wavePath = (x0: number, x1: number, y: number, wavelength: number, amplitude: number, phase: number): string => {
  const pts: string[] = [];
  for (let x = x0; x <= x1; x += 3) pts.push(`${n(x)},${n(y + amplitude * Math.sin(((x - x0 - phase) / wavelength) * Math.PI * 2))}`);
  return pts.join(' ');
};

/** 25. 宇宙微波背景：38 万岁的光被膨胀拉长 */
const CMB_STRETCH = [1, 3, 10, 30, 100, 300, 1100];
const CMB_LOOK = [
  { color: '#ff9a3c', visible: true, note: '刚放出：像烧红的铁，发出橙红色的光' },
  { color: '#e8590c', visible: true, note: '只剩暗红微光，大部分已是红外线' },
  { color: '#c2255c', visible: false, note: '和教室温度差不多，全是看不见的红外线' },
  { color: '#9c36b5', visible: false, note: '远红外线，肉眼完全看不见了' },
  { color: '#7048e8', visible: false, note: '越来越冷，还在被膨胀继续拉长' },
  { color: '#4c6ef5', visible: false, note: '快要变成微波了' },
  { color: '#74c0fc', visible: false, note: '今天：约 2.7 K 的微波，充满整个天空' },
];

const cmbState = (s: Record<string, number>) => {
  const i = clamp(Math.round(s.stage), 0, CMB_STRETCH.length - 1);
  const stretch = CMB_STRETCH[i];
  const kelvin = 3000 / stretch;
  const peak = 2898 / kelvin;
  return {
    i,
    stretch,
    look: CMB_LOOK[i],
    kelvinText: kelvin >= 100 ? `${Math.round(kelvin)}` : n(kelvin),
    celsius: Math.round(kelvin - 273.15) < 0 ? `约零下 ${-Math.round(kelvin - 273.15)}` : `约 ${Math.round(kelvin - 273.15)}`,
    peak,
    peakText: peak < 1000 ? `${peak < 10 ? n(peak) : Math.round(peak)} 微米` : `${n(peak / 1000)} 毫米`,
  };
};

export const cmbStretch: SimDef = {
  params: [
    { key: 'stage', label: '光被宇宙膨胀拉长', min: 0, max: 6, step: 1, value: 0, labels: CMB_STRETCH.map(k => (k === 1100 ? '1100 倍（今天）' : k === 1 ? '1 倍（38 万岁时）' : `${k} 倍`)) },
  ],
  animated: true,
  still: 0,
  draw(s, t) {
    const c = cmbState(s);
    const wavelength = 14 * Math.pow(c.stretch, 0.4);
    const color = c.look.color;
    const ball = c.look.visible
      ? `<circle cx="104" cy="140" r="${c.i === 0 ? 62 : 56}" fill="${color}" opacity="0.25"/><circle cx="104" cy="140" r="46" fill="${color}"/>`
        + txt(104, 145, '还看得见', { size: 13, color: '#1c1836', bold: true, plain: true })
      : `<circle cx="104" cy="140" r="46" fill="${SPACE_MID}" stroke="${color}" stroke-width="2" stroke-dasharray="5 4"/>`
        + txt(104, 145, '肉眼看不见', { size: 12.5, color: '#fff8dc', plain: true });

    const lo = Math.log10(0.3);
    const hi = Math.log10(5000);
    const sx = (um: number): number => 40 + ((Math.log10(um) - lo) / (hi - lo)) * 480;
    const marker = clamp(sx(c.peak), 40, 520);
    const band = `<rect x="40" y="236" width="480" height="14" rx="4" fill="#3b335f"/>`
      + `<rect x="${n(sx(0.38))}" y="236" width="${n(sx(0.75) - sx(0.38))}" height="14" fill="#ffd43b"/>`
      + `<rect x="${n(sx(0.75))}" y="236" width="${n(sx(1000) - sx(0.75))}" height="14" fill="#c2255c" opacity="0.55"/>`
      + `<rect x="${n(sx(1000))}" y="236" width="${n(520 - sx(1000))}" height="14" fill="#74c0fc" opacity="0.7"/>`
      + txt(sx(0.5), 268, '可见光', { size: 11, color: GOLD, plain: true })
      + txt(260, 268, '红外线', { size: 11, color: '#ffa8c5', plain: true })
      + txt(482, 268, '微波', { size: 11, color: '#a5d8ff', plain: true })
      + `<polygon points="${n(marker)},234 ${n(marker - 7)},222 ${n(marker + 7)},222" fill="#fff8dc"/>`;

    return starBackdrop()
      + txt(280, 36, `宇宙 38 万岁时放出的光 · 已被拉长 ${c.stretch} 倍`, { size: 14.5, color: GOLD, bold: true, plain: true })
      + ball
      + txt(104, 210, `约 ${c.kelvinText} K（${c.celsius} ℃）`, { size: 13, color: '#fff8dc', bold: true, plain: true })
      + `<polyline points="${wavePath(190, 530, 140, wavelength, 26, t * 50)}" fill="none" stroke="${color}" stroke-width="3"${c.look.visible ? '' : ' stroke-dasharray="7 4"'}/>`
      + txt(360, 92, `峰值波长约 ${c.peakText}`, { size: 13, color: '#fff8dc', plain: true })
      + txt(360, 194, '波长画在对数尺上：每拉长一档，波浪就舒展一截', { size: 11, color: '#c5b3e6', plain: true })
      + band
      + txt(280, 294, c.look.note, { size: 13, color: c.look.visible ? GOLD : '#a5d8ff', bold: true, plain: true });
  },
  readout(s) {
    const c = cmbState(s);
    return `拉长 ${c.stretch} 倍：温度约 ${c.kelvinText} K（${c.celsius} ℃），峰值波长约 ${c.peakText}。${c.look.note}。`;
  },
};

/** 26. 暗能量：膨胀曲线从刹车到踩油门 */
const HUBBLE_TIME = 977.8 / 67.4;
const DE_TODAY = 0.685;

const deModel = (f: number) => {
  const lambda = DE_TODAY * f;
  const matter = 1 - lambda;
  const age = lambda < 1e-6 ? (2 / 3) * HUBBLE_TIME : (2 / (3 * Math.sqrt(lambda))) * HUBBLE_TIME * Math.asinh(Math.sqrt(lambda / matter));
  const scale = (cosmicTime: number): number => {
    if (cosmicTime <= 0) return 0;
    if (lambda < 1e-6) return Math.pow((1.5 * cosmicTime) / HUBBLE_TIME, 2 / 3);
    return Math.cbrt(matter / lambda) * Math.pow(Math.sinh((1.5 * Math.sqrt(lambda) * cosmicTime) / HUBBLE_TIME), 2 / 3);
  };
  const accelerating = (a: number): boolean => lambda > 1e-6 && a * a * a > matter / (2 * lambda);
  const turnTime = lambda < 1e-6 ? Infinity : (2 / (3 * Math.sqrt(lambda))) * HUBBLE_TIME * Math.asinh(Math.SQRT1_2);
  return { lambda, matter, age, scale, accelerating, turnTime };
};

const PLOT = { x0: 46, w: 290, y0: 266, h: 196, from: -14, span: 24, top: 2 };
const plotX = (tau: number): number => PLOT.x0 + ((tau - PLOT.from) / PLOT.span) * PLOT.w;
const plotY = (a: number): number => PLOT.y0 - (clamp(a, 0, PLOT.top) / PLOT.top) * PLOT.h;

const curve = (model: ReturnType<typeof deModel>): string => {
  const pts: string[] = [];
  const start = Math.max(PLOT.from, -model.age);
  if (start > PLOT.from) pts.push(`${n(plotX(start))},${n(plotY(0))}`);
  for (let tau = Math.ceil(start * 5) / 5; tau <= PLOT.from + PLOT.span + 1e-9; tau += 0.2) {
    pts.push(`${n(plotX(tau))},${n(plotY(model.scale(model.age + tau)))}`);
  }
  return pts.join(' ');
};

const whenText = (when: number): string => (when < 0 ? `${-when} 亿年前` : when > 0 ? `${when} 亿年后` : '今天');

export const darkEnergyPie: SimDef = {
  params: [
    { key: 'de', label: '暗能量强度（100% = 实测值）', min: 0, max: 100, step: 10, value: 100, unit: '%' },
    { key: 'when', label: '时间（负数 = 过去）', min: -130, max: 100, step: 10, value: 0, unit: ' 亿年' },
  ],
  animated: false,
  draw(s) {
    const f = s.de / 100;
    const model = deModel(f);
    const none = deModel(0);
    const tau = s.when / 10;
    const cosmicTime = model.age + tau;
    const born = cosmicTime > 0;
    const a = model.scale(cosmicTime);

    let axes = `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0 + PLOT.w}" y2="${PLOT.y0}" stroke="#8d82c4" stroke-width="1.5"/>`
      + `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y0 - PLOT.h}" stroke="#8d82c4" stroke-width="1.5"/>`
      + `<line x1="${n(plotX(0))}" y1="${PLOT.y0}" x2="${n(plotX(0))}" y2="${PLOT.y0 - PLOT.h}" stroke="#c5b3e6" stroke-width="1" stroke-dasharray="4 4"/>`
      + txt(plotX(0), PLOT.y0 + 16, '今天', { size: 11, color: '#c5b3e6', plain: true })
      + txt(PLOT.x0 + 4, PLOT.y0 + 16, '过去', { size: 11, color: '#c5b3e6', anchor: 'start', plain: true })
      + txt(PLOT.x0 + PLOT.w, PLOT.y0 + 16, '未来', { size: 11, color: '#c5b3e6', anchor: 'end', plain: true })
      + txt(PLOT.x0 - 6, PLOT.y0 - 60, '宇宙', { size: 11, color: '#c5b3e6', anchor: 'end', plain: true })
      + txt(PLOT.x0 - 6, PLOT.y0 - 46, '尺度', { size: 11, color: '#c5b3e6', anchor: 'end', plain: true });
    axes += `<line x1="58" y1="80" x2="80" y2="80" stroke="${GOLD}" stroke-width="3"/>`
      + txt(86, 84, `暗能量 ${s.de}%`, { size: 11.5, color: GOLD, anchor: 'start', plain: true })
      + `<line x1="58" y1="100" x2="80" y2="100" stroke="#adb5bd" stroke-width="2" stroke-dasharray="5 4"/>`
      + txt(86, 104, '没有暗能量', { size: 11.5, color: '#ced4da', anchor: 'start', plain: true });

    let turn = '';
    const turnTau = model.turnTime - model.age;
    if (Number.isFinite(turnTau) && turnTau > PLOT.from && turnTau < PLOT.from + PLOT.span) {
      const tx = plotX(turnTau);
      const ty = plotY(model.scale(model.turnTime));
      turn = `<circle cx="${n(tx)}" cy="${n(ty)}" r="5" fill="none" stroke="#ff8787" stroke-width="2"/>`
        + txt(tx - 4, ty - 12, '开始加速', { size: 11, color: '#ffa8a8', bold: true, anchor: 'end', plain: true });
    }

    const mx = plotX(clamp(tau, PLOT.from, PLOT.from + PLOT.span));
    const marker = born
      ? `<circle cx="${n(mx)}" cy="${n(plotY(a))}" r="7" fill="${HOT}" stroke="#fff" stroke-width="2"/>`
      : `<line x1="${n(mx)}" y1="${PLOT.y0 - 6}" x2="${n(mx)}" y2="${PLOT.y0 + 6}" stroke="${HOT}" stroke-width="3"/>`;

    const darkShare = 68 * f;
    const rest = 100 - darkShare;
    const slices = [
      { value: darkShare, color: PURPLE, name: '暗能量' },
      { value: (rest * 27) / 32, color: BLUE, name: '暗物质' },
      { value: (rest * 5) / 32, color: GOLD, name: '普通物质' },
    ];
    const cx = 452;
    const cy = 126;
    const r = 56;
    let angle = -Math.PI / 2;
    let pie = '';
    slices.forEach(slice => {
      if (slice.value < 0.5) return;
      const sweep = (slice.value / 100) * Math.PI * 2;
      const end = angle + sweep;
      pie += `<path d="M ${cx} ${cy} L ${n(cx + r * Math.cos(angle))} ${n(cy + r * Math.sin(angle))} A ${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${n(cx + r * Math.cos(end))} ${n(cy + r * Math.sin(end))} Z" fill="${slice.color}" stroke="#1c1836" stroke-width="1.5"/>`;
      angle = end;
    });
    const legend = slices.map((slice, i) => `<rect x="398" y="${206 + i * 22}" width="12" height="12" rx="2" fill="${slice.color}"/>`
      + txt(416, 216 + i * 22, `${slice.name} ${Math.round(slice.value)}%`, { size: 12, color: '#fff8dc', anchor: 'start', plain: true })).join('');

    return starBackdrop(12, 12, 536, 296, 14)
      + txt(190, 38, model.lambda > 0 ? '膨胀先减速、后加速' : '引力一路踩刹车：膨胀一直减速', { size: 14, color: GOLD, bold: true, plain: true })
      + axes
      + `<polyline points="${curve(none)}" fill="none" stroke="#adb5bd" stroke-width="2" stroke-dasharray="5 4"/>`
      + `<polyline points="${curve(model)}" fill="none" stroke="${GOLD}" stroke-width="3"/>`
      + turn + marker
      + txt(452, 50, f === 1 ? '我们的宇宙（实测）' : '假想宇宙的成分', { size: 13, color: f === 1 ? GOLD : '#c5b3e6', bold: true, plain: true })
      + pie + legend;
  },
  readout(s) {
    const model = deModel(s.de / 100);
    const age = Math.round(model.age * 10);
    const cosmicTime = model.age + s.when / 10;
    const head = `暗能量强度 ${s.de}%：这个宇宙今天约 ${age} 亿岁。`;
    if (cosmicTime <= 0) return `${head}${whenText(s.when)}它还没有诞生。`;
    const a = model.scale(cosmicTime);
    const size = s.when === 0 ? '今天' : `${whenText(s.when)}宇宙尺度是今天的 ${r2(a)} 倍，`;
    return `${head}${size}膨胀正在${model.accelerating(a) ? '加速（暗能量占上风）' : '减速（引力占上风）'}。`;
  },
};

/** 27. 可观测宇宙：光在路上时空间一直在伸展 */
const HORIZON_TABLE = (() => {
  const hubble = 977.8 / 67.7;
  const matter = 0.31;
  const radiation = 9.1e-5;
  const lambda = 1 - matter - radiation;
  const steps = 3000;
  const lnMin = Math.log(1e-8);
  const du = -lnMin / steps;
  const lookback: number[] = [0];
  const comoving: number[] = [0];
  const scale: number[] = [1];
  for (let i = 0; i < steps; i += 1) {
    const a = Math.exp(-(i + 0.5) * du);
    const e = Math.sqrt(radiation / a ** 4 + matter / a ** 3 + lambda);
    lookback.push(lookback[i] + du / e);
    comoving.push(comoving[i] + du / (a * e));
    scale.push(Math.exp(-(i + 1) * du));
  }
  const age = lookback[steps] * hubble;
  const horizon = comoving[steps] * hubble;
  return {
    lookback: lookback.map(v => (v * hubble * 13.8) / age),
    comoving: comoving.map(v => (v * hubble * 46.5) / horizon),
    scale,
  };
})();

/** 光走了 years（十亿年）后：光源现在的距离、发光时的距离（十亿光年） */
const horizonAt = (years: number): { now: number; then: number } => {
  const { lookback, comoving, scale } = HORIZON_TABLE;
  const last = lookback.length - 1;
  if (years >= lookback[last]) return { now: comoving[last], then: comoving[last] * scale[last] };
  let lo = 0;
  let hi = last;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (lookback[mid] <= years) lo = mid;
    else hi = mid;
  }
  const k = (years - lookback[lo]) / Math.max(lookback[hi] - lookback[lo], 1e-12);
  const now = comoving[lo] + (comoving[hi] - comoving[lo]) * k;
  const a = scale[lo] + (scale[hi] - scale[lo]) * k;
  return { now, then: now * a };
};

const yiText = (gly: number): string => {
  const yi = gly * 10;
  if (yi >= 10) return `${Math.round(yi)}`;
  return yi >= 1 || yi === 0 ? n(yi) : '不到 1';
};

const horizonState = (s: Record<string, number>) => {
  const years = s.look / 10;
  const expanding = s.expand === 1;
  const { now, then } = expanding ? horizonAt(years) : { now: years, then: years };
  const edge = expanding ? horizonAt(13.8).now : 13.8;
  return { years, expanding, now, then, edge };
};

export const horizonGrow: SimDef = {
  params: [
    { key: 'look', label: '光在路上走了多久', min: 0, max: 138, step: 2, value: 100, unit: ' 亿年' },
    { key: 'expand', label: '空间', min: 0, max: 1, step: 1, value: 1, labels: ['假想：空间不膨胀', '真实：空间在膨胀'] },
  ],
  animated: true,
  still: 0.3,
  draw(s, t) {
    const h = horizonState(s);
    const x0 = 58;
    const px = (gly: number): number => x0 + gly * 10;
    const lightEnd = px(h.years);
    const photonX = lightEnd - ((t * 0.35) % 1) * (lightEnd - x0);
    const galaxy = (x: number, y: number, ghost: boolean): string => (ghost
      ? `<ellipse cx="${n(x)}" cy="${y}" rx="11" ry="6" fill="none" stroke="#b197fc" stroke-width="1.5" stroke-dasharray="3 2"/>`
      : `<ellipse cx="${n(x)}" cy="${y}" rx="12" ry="7" fill="#b197fc"/><circle cx="${n(x)}" cy="${y}" r="3" fill="#fff8dc"/>`);

    return starBackdrop()
      + txt(280, 36, h.expanding ? '光在路上飞，空间也在一路伸展' : '假想：空间不膨胀，光走多远就是多远', { size: 14, color: GOLD, bold: true, plain: true })
      + `<line x1="${n(px(h.edge))}" y1="58" x2="${n(px(h.edge))}" y2="248" stroke="#ff8787" stroke-width="2" stroke-dasharray="6 5"/>`
      + `<circle cx="36" cy="160" r="13" fill="${BLUE}" stroke="#fff" stroke-width="1.5"/>`
      + txt(36, 188, '地球', { size: 11.5, color: '#cfe5f7', plain: true })
      + txt(x0, 82, `① 光走过的路：${yiText(h.years)} 亿光年`, { size: 12, color: GOLD, anchor: 'start', plain: true })
      + `<rect x="${x0}" y="92" width="${n(Math.max(lightEnd - x0, 0))}" height="8" rx="4" fill="${GOLD}" opacity="0.85"/>`
      + (lightEnd - x0 > 4 ? `<circle cx="${n(photonX)}" cy="96" r="5" fill="#fff8dc"/>` : '')
      + txt(x0, 132, `② 光出发时，光源离我们：${yiText(h.then)} 亿光年`, { size: 12, color: '#c5b3e6', anchor: 'start', plain: true })
      + `<line x1="${x0}" y1="154" x2="${n(px(h.then))}" y2="154" stroke="#8d82c4" stroke-width="2" stroke-dasharray="4 3"/>`
      + galaxy(px(h.then), 154, true)
      + txt(x0, 188, `③ 光源现在离我们：${yiText(h.now)} 亿光年`, { size: 12.5, color: '#e5dbff', bold: true, anchor: 'start', plain: true })
      + `<rect x="${x0}" y="206" width="${n(Math.max(px(h.now) - x0, 0))}" height="8" rx="4" fill="${PURPLE}"/>`
      + galaxy(px(h.now), 210, false)
      + txt(px(h.edge) - 4, 266, `可观测宇宙的边（视界）：${yiText(h.edge)} 亿光年`, { size: 12, color: '#ffa8a8', bold: true, anchor: h.expanding ? 'end' : 'start', plain: true })
      + txt(280, 292, '视界不是墙：边外的宇宙照样存在，只是光还没来得及到达', { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const h = horizonState(s);
    if (h.years === 0) return '光在路上的时间为 0：那就是我们身边，距离还没有被宇宙膨胀拉长。';
    if (!h.expanding) {
      return `假如空间不膨胀：光走了 ${s.look} 亿年，光源现在就在 ${s.look} 亿光年外，可观测宇宙半径只有 138 亿光年；真实宇宙在膨胀，所以实际约有 465 亿光年。`;
    }
    const edge = h.years >= 13.8 ? '这已经到了可观测宇宙的边——视界。' : '';
    const then = yiText(h.then);
    return `光在路上走了 ${s.look} 亿年：它出发时光源离我们${then.startsWith('不') ? '' : '约 '}${then} 亿光年，空间一路伸展，如今光源已在约 ${yiText(h.now)} 亿光年外。${edge}`;
  },
};
