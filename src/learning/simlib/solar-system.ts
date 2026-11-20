import { arrow, BLUE, GOLD, HOT, n, r1, r2, starBackdrop, SUN, txt, type SimDef } from './kit';

const PLANETS = [
  { name: '水星', au: 0.39, v: 47.4, period: 0.24, color: '#adb5bd', r: 6 },
  { name: '金星', au: 0.72, v: 35.0, period: 0.62, color: '#f4c97a', r: 9 },
  { name: '地球', au: 1.0, v: 29.8, period: 1.0, color: '#4dabf7', r: 9 },
  { name: '火星', au: 1.52, v: 24.1, period: 1.88, color: '#e8590c', r: 7 },
  { name: '木星', au: 5.2, v: 13.1, period: 11.86, color: '#e59966', r: 16 },
  { name: '土星', au: 9.54, v: 9.7, period: 29.46, color: '#f2c879', r: 14 },
  { name: '天王星', au: 19.2, v: 6.8, period: 84.0, color: '#74c0fc', r: 11 },
  { name: '海王星', au: 30.1, v: 5.4, period: 164.8, color: '#4c6ef5', r: 11 },
] as const;

/** 4. 八大行星轨道速度与周期（开普勒第三定律） */
export const keplerSpeed: SimDef = {
  params: [
    { key: 'planet', label: '选择行星', min: 0, max: 7, step: 1, value: 2, labels: ['水星', '金星', '地球', '火星', '木星', '土星', '天王星', '海王星'] },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const idx = Math.round(s.planet);
    const cur = PLANETS[idx];
    const cx = 195;
    const cy = 165;
    let orbits = '';
    PLANETS.forEach((p, i) => {
      const rx = 26 + i * 18;
      const ry = rx * 0.74;
      const ang = t * (1.8 / Math.sqrt(p.au)) + i * 0.9;
      const px = cx + Math.cos(ang) * rx;
      const py = cy + Math.sin(ang) * ry;
      const active = i === idx;
      orbits += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${n(ry)}" fill="none" stroke="${active ? HOT : '#5e568c'}" stroke-width="${active ? 2.4 : 1}"/>`;
      orbits += `<circle cx="${n(px)}" cy="${n(py)}" r="${active ? p.r * 0.75 + 2 : Math.max(4, p.r * 0.45)}" fill="${p.color}"${active ? ' stroke="#fff" stroke-width="2"' : ''}/>`;
    });

    const barW = (cur.v / 50) * 140;
    return starBackdrop()
      + `<circle cx="${cx}" cy="${cy}" r="16" fill="${SUN}"/>`
      + orbits
      + `<rect x="372" y="34" width="164" height="252" rx="14" fill="#29234d" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(454, 62, cur.name, { size: 18, color: GOLD, bold: true, plain: true })
      + txt(454, 94, `距太阳 ${cur.au} AU`, { size: 13, color: '#fff8dc', plain: true })
      + txt(454, 124, `公转速度 ${cur.v} km/s`, { size: 13, color: '#ffd43b', bold: true, plain: true })
      + `<rect x="384" y="138" width="140" height="12" rx="6" fill="#3f376e"/>`
      + `<rect x="384" y="138" width="${n(barW)}" height="12" rx="6" fill="${HOT}"/>`
      + txt(454, 184, `公转一年`, { size: 12, color: '#c5b3e6', plain: true })
      + txt(454, 212, `${cur.period} 地球年`, { size: 17, color: '#fff', bold: true, plain: true })
      + txt(454, 256, '越远引力越弱，跑越慢', { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    const cur = PLANETS[Math.round(s.planet)];
    return `${cur.name} 距太阳约 ${cur.au} 天文单位，平均公转速度 ${cur.v} km/s，绕太阳一圈需要 ${cur.period} 个地球年。`;
  },
};

/** 5. 金星温室效应 vs 水星与地球 */
export const venusGreenhouse: SimDef = {
  params: [
    { key: 'co2', label: '大气温室厚度', min: 0, max: 2, step: 1, value: 2, labels: ['几乎无(水星)', '适中(地球)', '极厚(金星)'] },
  ],
  animated: true,
  still: 0.8,
  draw(s, t) {
    const mode = Math.round(s.co2);
    const specs = [
      { name: '水星（距日 0.39 AU）', temp: '昼 +430℃ / 夜 −180℃', avg: 167, atm: 0, color: '#adb5bd', glow: '#6c757d', trap: 0 },
      { name: '地球（距日 1.00 AU）', temp: '均温约 +15℃', avg: 15, atm: 16, color: BLUE, glow: '#74c0fc', trap: 2 },
      { name: '金星（距日 0.72 AU）', temp: '昼夜恒温约 +465℃', avg: 465, atm: 36, color: '#e8a848', glow: '#ff922b', trap: 5 },
    ][mode];
    const bounce = Math.sin(t * 4) * 8;
    let traps = '';
    for (let i = 0; i < specs.trap; i += 1) {
      const bx = 175 + i * 44;
      traps += arrow(bx, 224, bx + 12, 140 + bounce, '#ff6b6b', 3);
      traps += arrow(bx + 16, 146 + bounce, bx + 26, 220, HOT, 3);
    }
    const escape = specs.trap < 5 ? arrow(410, 224, 460, 74, '#ffa8a8', 3) : '';

    return starBackdrop()
      + txt(280, 38, specs.name, { size: 16, color: '#fff8dc', bold: true, plain: true })
      + (specs.atm > 0 ? `<rect x="44" y="${150 - specs.atm}" width="472" height="${specs.atm + 74}" rx="16" fill="${specs.glow}" opacity="0.28"/>` : '')
      + `<rect x="44" y="224" width="472" height="58" rx="12" fill="${specs.color}"/>`
      + arrow(110, 56, 155, 220, GOLD, 4)
      + txt(92, 82, '太阳光', { size: 12, color: GOLD, bold: true, plain: true })
      + traps + escape
      + txt(280, 258, `地表温度：${specs.temp}`, { size: 16, color: '#fff', bold: true, plain: true })
      + txt(458, 62, specs.trap === 5 ? '红外热被死死锁住！' : '部分热量散回太空', { size: 11.5, color: specs.trap === 5 ? '#ff9f43' : '#cfe5f7', bold: true, plain: true });
  },
  readout(s) {
    const mode = Math.round(s.co2);
    if (mode === 0) return '水星虽然离太阳最近，但几乎没有大气保温，白天炙烤到 430℃，背阳面立刻跌到零下 180℃。';
    if (mode === 1) return '地球有薄厚恰到好处的大气，留住约 33℃ 的温和温室效应，平均温度约 15℃，正好保留液态海洋。';
    return '金星大气中 96.5% 是二氧化碳，气压是地球 92 倍，把红外热死死锁在地表，昼夜高达约 465℃，比水星还热！';
  },
};

/** 6. 土星光环与洛希极限 */
export const saturnRoche: SimDef = {
  params: [
    { key: 'dist', label: '冰卫星距土星距离', min: 1.4, max: 3.4, step: 0.1, value: 2.0, unit: ' 倍土星半径' },
  ],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const d = s.dist;
    const roche = 2.44;
    const broken = d < roche;
    const sx = 128;
    const sy = 166;
    const sr = 54;
    const rocheX = sx + roche * 82;
    const mx = sx + d * 82;
    let body = '';
    if (broken) {
      const spread = (roche - d) * 48 + 14;
      for (let i = 0; i < 18; i += 1) {
        const a = (i / 18) * Math.PI * 2 + t * 0.9;
        const dx = Math.cos(a) * spread;
        const dy = Math.sin(a) * (10 + (i % 4) * 4);
        body += `<circle cx="${n(mx + dx)}" cy="${n(sy + dy)}" r="${3 + (i % 3)}" fill="#dff4ff" opacity="0.9"/>`;
      }
    } else {
      const stretch = 1 + (3.4 - d) * 0.15;
      body = `<ellipse cx="${n(mx)}" cy="${sy}" rx="${n(18 * stretch)}" ry="${n(18 / stretch)}" fill="#dff4ff" stroke="#74c0fc" stroke-width="2"/>`;
    }

    return starBackdrop()
      + `<circle cx="${sx}" cy="${sy}" r="${sr}" fill="#f2c879"/>`
      + `<ellipse cx="${sx}" cy="${sy}" rx="74" ry="12" fill="none" stroke="#e8b263" stroke-width="5" opacity="0.7"/>`
      + txt(sx, sy + 5, '土星', { size: 15, color: '#5d3200', bold: true, plain: true })
      + `<line x1="${n(rocheX)}" y1="42" x2="${n(rocheX)}" y2="278" stroke="${HOT}" stroke-width="2" stroke-dasharray="6 5"/>`
      + txt(rocheX, 34, '洛希极限 (~2.44 R)', { size: 12.5, color: '#ff9f43', bold: true, plain: true })
      + body
      + txt(mx, 250, broken ? '潮汐力胜过自身引力 → 碎成冰环！' : '自身引力守住了 → 保持完整卫星', { size: 13.5, color: broken ? '#ff9f43' : '#a5d8ff', bold: true, plain: true })
      + txt(280, 294, `当前距离 ${r2(d)} 倍土星半径（土星主环厚度大多仅 10–100 米）`, { size: 12, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    return s.dist < 2.44
      ? `距离 ${r1(s.dist)} 倍土星半径（洛希极限以内）：土星近端和远端的引力拉扯差超过冰卫星自身聚合力，碎成亿万块水冰颗粒绕土星排成薄环。`
      : `距离 ${r1(s.dist)} 倍土星半径（洛希极限以外）：潮汐拉扯较弱，冰卫星可以保持完整球形不被撕碎。`;
  },
};
