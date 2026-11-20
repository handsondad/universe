import { arrow, BLUE, clamp, GOLD, GREEN, HOT, n, noise, r1, starBackdrop, txt, type SimDef } from './kit';

/** 28. 火箭反冲：推的是自己喷出的燃气 */
const rocketState = (s: Record<string, number>) => {
  const thrust = s.mdot * s.ve;
  return { thrust, kN: Math.round(thrust / 1000), tons: Math.round(thrust / 9800), vacuum: s.place === 1 };
};

export const rocketRecoil: SimDef = {
  params: [
    { key: 've', label: '燃气喷出速度', min: 1000, max: 4500, step: 500, value: 3000, unit: ' 米/秒' },
    { key: 'mdot', label: '每秒喷出燃气', min: 100, max: 1000, step: 100, value: 500, unit: ' 千克' },
    { key: 'place', label: '火箭在哪儿', min: 0, max: 1, step: 1, value: 1, labels: ['大气层里', '太空真空'] },
  ],
  animated: true,
  still: 0.6,
  draw(s, t) {
    const r = rocketState(s);
    const y = 118;
    const len = 24 + (r.thrust / 4.5e6) * 116;
    const backdrop = r.vacuum
      ? starBackdrop()
      : `<rect x="12" y="12" width="536" height="296" rx="14" fill="#d0ebff"/>`
        + Array.from({ length: 34 }, (_, i) => `<circle cx="${n(24 + noise(i * 13 + 2) * 512)}" cy="${n(50 + noise(i * 7 + 9) * 150)}" r="3" fill="#74c0fc" opacity="0.7"/>`).join('');
    const ink = r.vacuum ? '#fff8dc' : '#24332d';
    const puffs = clamp(Math.round(s.mdot / 50), 2, 20);
    const speed = s.ve / 12;
    let exhaust = '';
    for (let i = 0; i < puffs; i += 1) {
      const d = (t * speed + (i / puffs) * 200) % 200;
      const px = 244 - d;
      const py = y + (noise(i * 5 + 1) - 0.5) * (10 + d * 0.22);
      exhaust += `<circle cx="${n(px)}" cy="${n(py)}" r="${n(4 + d * 0.035)}" fill="${i % 2 ? '#ff922b' : '#ffd43b'}" opacity="${n(1 - d / 240)}"/>`;
    }
    const rocket = `<rect x="250" y="${y - 16}" width="110" height="32" rx="8" fill="#f1f3f5" stroke="#495057" stroke-width="1.5"/>`
      + `<polygon points="360,${y - 16} 392,${y} 360,${y + 16}" fill="${HOT}"/>`
      + `<polygon points="262,${y - 16} 248,${y - 30} 280,${y - 16}" fill="${BLUE}"/>`
      + `<polygon points="262,${y + 16} 248,${y + 30} 280,${y + 16}" fill="${BLUE}"/>`
      + `<rect x="240" y="${y - 9}" width="12" height="18" fill="#495057"/>`
      + txt(306, y + 5, '火箭', { size: 13, color: '#24332d', bold: true, plain: true });
    const drag = r.vacuum
      ? ''
      : arrow(392, y - 34, 360, y - 34, '#e03131', 3) + txt(398, y - 30, '空气阻力', { size: 11, color: '#c92a2a', anchor: 'start', plain: true });
    const ballX = 104 - ((t * 0.5) % 1) * 70;
    const boardX = 120 + ((t * 0.5) % 1) * 18;

    return backdrop
      + txt(280, 36, r.vacuum ? '太空真空：没有空气可推，照样加速！' : '大气层里：火箭也不是靠推空气前进', { size: 14, color: r.vacuum ? GOLD : '#1c4f82', bold: true, plain: true })
      + exhaust + rocket + drag
      + arrow(398, y, 398 + len, y, '#40c057', 5)
      + txt(398 + len / 2, y + 22, '燃气推火箭', { size: 12, color: r.vacuum ? '#8ce99a' : GREEN, bold: true, plain: true })
      + arrow(236, 168, 236 - len, 168, '#ff922b', 5)
      + txt(236 - len / 2, 190, '火箭推燃气', { size: 12, color: r.vacuum ? '#ffc078' : HOT, bold: true, plain: true })
      + txt(280, 218, `推力 F = ṁ × v = ${s.mdot} × ${s.ve} ≈ ${r.kN} 千牛`, { size: 14, color: ink, bold: true, plain: true })
      + `<rect x="${n(boardX - 22)}" y="272" width="44" height="6" rx="3" fill="#a9763e"/>`
      + `<circle cx="${n(boardX - 12)}" cy="282" r="4" fill="#495057"/><circle cx="${n(boardX + 12)}" cy="282" r="4" fill="#495057"/>`
      + `<line x1="${n(boardX)}" y1="270" x2="${n(boardX)}" y2="248" stroke="${ink}" stroke-width="3"/>`
      + `<circle cx="${n(boardX)}" cy="241" r="7" fill="${GOLD}"/>`
      + `<circle cx="${n(ballX)}" cy="252" r="8" fill="${HOT}"/>`
      + txt(330, 258, '滑板上把球往后扔，人就往前滑：', { size: 12, color: ink, plain: true })
      + txt(330, 280, '力的作用是相互的，火箭也一样', { size: 12, color: ink, plain: true });
  },
  readout(s) {
    const r = rocketState(s);
    return `每秒喷出 ${s.mdot} 千克燃气、喷速 ${s.ve} 米/秒：推力 F = ṁ·v ≈ ${r.kN} 千牛，约能托起 ${r.tons} 吨的重物。${r.vacuum
      ? '真空里没有空气可推，也没有空气阻力——火箭推的是自己喷出的燃气！'
      : '在大气层里火箭同样靠推燃气前进，空气只会带来阻力。'}`;
  },
};

/** 29. 发射场纬度：地球自转白送的速度 */
const SITES = [
  { name: '赤道', lat: 0 },
  { name: '文昌', lat: 19.3 },
  { name: '西昌', lat: 28.2 },
  { name: '太原', lat: 38.8 },
  { name: '酒泉', lat: 40.9 },
];
const groundSpeed = (lat: number): number => Math.round(465 * Math.cos((lat * Math.PI) / 180));

export const launchLatitude: SimDef = {
  params: [
    { key: 'site', label: '发射场', min: 0, max: 4, step: 1, value: 1, labels: SITES.map(site => (site.lat ? `${site.name} 北纬${site.lat}°` : '赤道 0°')) },
    { key: 'dir', label: '发射方向', min: 0, max: 1, step: 1, value: 0, labels: ['向东发射', '向西发射'] },
  ],
  animated: false,
  draw(s) {
    const idx = clamp(Math.round(s.site), 0, SITES.length - 1);
    const site = SITES[idx];
    const east = s.dir === 0;
    const v = groundSpeed(site.lat);
    const cx = 130;
    const cy = 160;
    const R = 92;
    const rad = (site.lat * Math.PI) / 180;
    const ry = 10 * Math.cos(rad);
    const sy = cy - R * Math.sin(rad) + ry;
    const globe = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${BLUE}" stroke="#a5d8ff" stroke-width="1.5"/>`
      + `<line x1="${cx}" y1="${cy - R - 10}" x2="${cx}" y2="${cy + R + 10}" stroke="#cfe5f7" stroke-width="1.5" stroke-dasharray="4 3"/>`
      + txt(cx, cy - R - 14, '北极', { size: 11, color: '#cfe5f7', plain: true })
      + `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="10" fill="none" stroke="#ffd8a8" stroke-width="1.5"/>`
      + (site.lat ? `<ellipse cx="${cx}" cy="${n(cy - R * Math.sin(rad))}" rx="${n(R * Math.cos(rad))}" ry="${n(ry)}" fill="none" stroke="${GOLD}" stroke-width="2"/>` : '')
      + `<circle cx="${cx}" cy="${n(sy)}" r="6" fill="${HOT}" stroke="#fff" stroke-width="1.5"/>`
      + arrow(cx, sy, cx + (v / 465) * 70, sy, GOLD, 3)
      + arrow(cx, sy, cx + (east ? 52 : -52), sy - 58, east ? '#40c057' : '#ff6b6b', 4)
      + arrow(cx - 70, cy + R + 22, cx + 70, cy + R + 22, '#ffd8a8', 3)
      + txt(cx, cy + R + 40, '地球自西向东转', { size: 11.5, color: '#ffd8a8', plain: true });

    const bars = SITES.map((item, i) => {
      const y = 70 + i * 30;
      const w = (groundSpeed(item.lat) / 465) * 120;
      const on = i === idx;
      return txt(298, y + 5, item.name, { size: 12.5, color: on ? GOLD : '#c5b3e6', bold: on, anchor: 'start', plain: true })
        + `<rect x="340" y="${y - 7}" width="${n(w)}" height="14" rx="5" fill="${on ? GOLD : '#6c63a8'}"/>`
        + txt(346 + w, y + 5, `${groundSpeed(item.lat)} 米/秒`, { size: 11.5, color: on ? GOLD : '#c5b3e6', anchor: 'start', plain: true });
    }).join('');

    const pct = r1((v / 7900) * 100);
    const budget = east
      ? [`向东：白捡 ${v} 米/秒`, `约占第一宇宙速度的 ${pct}%`]
      : [`向西：先倒贴 ${v} 米/秒`, `比向东多付出约 ${v * 2} 米/秒`];

    return starBackdrop()
      + txt(280, 34, `${site.lat ? `${site.name}（北纬 ${site.lat}°）` : '赤道上'} · ${east ? '向东发射' : '向西发射'}`, { size: 14.5, color: GOLD, bold: true, plain: true })
      + globe
      + txt(400, 52, '地面随地球自转向东的速度', { size: 12, color: '#fff8dc', plain: true })
      + bars
      + txt(400, 238, budget[0], { size: 13.5, color: east ? '#8ce99a' : '#ffa8a8', bold: true, plain: true })
      + txt(400, 260, budget[1], { size: 12.5, color: east ? '#8ce99a' : '#ffa8a8', plain: true })
      + txt(400, 290, '越靠近赤道，地面转得越快', { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const idx = clamp(Math.round(s.site), 0, SITES.length - 1);
    const site = SITES[idx];
    const v = groundSpeed(site.lat);
    const where = site.lat ? `${site.name}位于北纬 ${site.lat}°` : '赤道上';
    if (s.dir === 1) return `${where}，向西发射要先抵消地面向东的 ${v} 米/秒，和向东相比多付出约 ${v * 2} 米/秒，非常不划算。`;
    const bonus = idx === 1 ? '同一枚火箭往地球同步转移轨道可多运约 10%～15% 的载荷。' : '';
    return `${where}，地面随地球自转向东约 ${v} 米/秒；向东发射能白捡这份速度，约占第一宇宙速度 7.9 千米/秒的 ${r1((v / 7900) * 100)}%。${bonus}`;
  },
};

/** 30. 中国天眼：锅越大，越能听见微弱的脉冲星 */
const FAINT = [
  { name: '较强的脉冲星', base: 0.6 },
  { name: '很弱的脉冲星', base: 0.08 },
  { name: '极弱的脉冲星', base: 0.02 },
];

const dishState = (s: Record<string, number>) => {
  const star = FAINT[clamp(Math.round(s.weak), 0, FAINT.length - 1)];
  const gain = (s.D / 30) ** 2;
  const snr = star.base * gain;
  return {
    star,
    gain,
    snr,
    gainText: gain < 10 ? r1(gain) : `${Math.round(gain)}`,
    resText: r1(s.D / 30),
    snrText: snr < 10 ? r1(snr) : `${Math.round(snr)}`,
    heard: snr >= 5,
  };
};

export const fastDish: SimDef = {
  params: [
    { key: 'D', label: '天线口径', min: 30, max: 500, step: 10, value: 500, unit: ' 米' },
    { key: 'weak', label: '要听的信号', min: 0, max: 2, step: 1, value: 1, labels: FAINT.map(item => item.name) },
  ],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const d = dishState(s);
    const cx = 140;
    const y0 = 200;
    const w = s.D * 0.44;
    const depth = w * 0.18;
    const focusY = y0 - w * 0.22;
    const rays = clamp(Math.round(w / 28), 1, 8);
    let beams = '';
    for (let k = 0; k < rays; k += 1) {
      const x = cx - w / 2 + ((k + 0.5) * w) / rays;
      const u = (x - cx) / (w / 2);
      const hit = y0 + depth * (1 - u * u);
      beams += `<line x1="${n(x)}" y1="60" x2="${n(x)}" y2="${n(hit)}" stroke="#74c0fc" stroke-width="1.5" stroke-dasharray="6 5" stroke-dashoffset="${n(-t * 30)}"/>`
        + `<line x1="${n(x)}" y1="${n(hit)}" x2="${cx}" y2="${n(focusY)}" stroke="#a5d8ff" stroke-width="1" opacity="0.7"/>`;
    }
    const towers = w > 80
      ? [cx - w / 2 - 6, cx + w / 2 + 6].map(x => clamp(x, 26, 262)).map(x => `<line x1="${n(x)}" y1="236" x2="${n(x)}" y2="86" stroke="#adb5bd" stroke-width="2"/>`
        + `<line x1="${n(x)}" y1="86" x2="${cx}" y2="${n(focusY)}" stroke="#adb5bd" stroke-width="1"/>`).join('')
      : '';
    const dish = `<path d="M ${n(cx - w / 2)} ${y0} Q ${cx} ${n(y0 + 2 * depth)} ${n(cx + w / 2)} ${y0}" fill="none" stroke="#e9ecef" stroke-width="4"/>`
      + `<rect x="${cx - 7}" y="${n(focusY - 5)}" width="14" height="10" rx="2" fill="${GOLD}"/>`;
    const hills = `<polygon points="20,236 50,196 84,226 120,214 160,222 200,210 236,224 268,200 268,300 20,300" fill="#3d5a3f"/>`;

    const scale = 64 / Math.max(d.snr + 3, 6);
    const frame = Math.floor(t * 12);
    const shift = Math.floor(t * 20);
    const trace: string[] = [];
    for (let i = 0; i < 120; i += 1) {
      const pulse = (i + shift) % 30 < 2 ? 1 : 0;
      const hiss = (noise(i * 7 + frame * 131) + noise(i * 11 + frame * 37 + 5) + noise(i * 3 + frame * 71 + 9) - 1.5) * 2;
      const y = clamp(196 - (d.snr * pulse + hiss) * scale, 64, 226);
      trace.push(`${n(290 + i * 2.1)},${n(y)}`);
    }

    return starBackdrop()
      + txt(280, 34, '口径越大，接住的微弱射电波越多', { size: 14.5, color: GOLD, bold: true, plain: true })
      + hills + towers + beams + dish
      + txt(cx, 272, `口径 ${s.D} 米`, { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + (s.D === 500 ? txt(cx, 294, '中国天眼 FAST 的大小', { size: 12, color: GOLD, bold: true, plain: true }) : txt(cx, 294, '射电望远镜：一只“宇宙大耳朵”', { size: 11.5, color: '#c5b3e6', plain: true }))
      + `<rect x="284" y="58" width="258" height="174" rx="8" fill="#14112a" stroke="#6c63a8" stroke-width="1.5"/>`
      + txt(413, 76, '接收机里的信号（示意）', { size: 11.5, color: '#c5b3e6', plain: true })
      + `<polyline points="${trace.join(' ')}" fill="none" stroke="${d.heard ? '#69db7c' : '#adb5bd'}" stroke-width="1.5"/>`
      + txt(413, 254, d.snr >= 10 ? '脉冲“嘀—嘀—”清楚冒出来了！' : d.heard ? '脉冲刚好能听出来' : '脉冲淹没在噪声里，听不清', { size: 13, color: d.heard ? '#8ce99a' : '#ffa8a8', bold: true, plain: true })
      + txt(413, 276, `面积 = 30 米天线的 ${d.gainText} 倍 · 分辨 ${d.resText} 倍`, { size: 11.5, color: '#fff8dc', plain: true })
      + txt(413, 296, `信噪比约 ${d.snrText}（约 5 以上才算听清）`, { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const d = dishState(s);
    const fast = s.D === 500 ? '这正是 FAST 的口径（观测时用其中约 300 米拼成抛物面）。' : '';
    return `口径 ${s.D} 米：收集面积是 30 米天线的 ${d.gainText} 倍，分辨细节提高到 ${d.resText} 倍；这颗${d.star.name}信噪比约 ${d.snrText}，${d.snr >= 10 ? '脉冲信号清清楚楚！' : d.heard ? '刚好能把脉冲听出来。' : '还淹没在噪声里，需要更大的锅。'}${fast}`;
  },
};
