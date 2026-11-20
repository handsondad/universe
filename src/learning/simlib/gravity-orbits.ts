import { arrow, BLUE, GOLD, GREEN, HOT, n, r1, starBackdrop, txt, type SimDef } from './kit';

/** 7. 牛顿大炮与卫星轨道速度 */
export const newtonCannon: SimDef = {
  params: [
    { key: 'speed', label: '水平发射速度', min: 4.0, max: 12.0, step: 0.2, value: 7.9, unit: ' km/s' },
  ],
  animated: true,
  still: 1.5,
  draw(s, t) {
    const v = s.speed;
    const cx = 240;
    const cy = 165;
    const er = 64;
    const r0 = er + 16;
    let pathD = '';
    let stateText = '';
    let color = '#ff9f43';

    if (v < 7.8) {
      stateText = '太慢 → 坠落地面';
      color = '#ff6b6b';
      const reach = ((v - 3.5) / 4.4) * Math.PI * 0.9;
      const pts: string[] = [];
      for (let i = 0; i <= 24; i += 1) {
        const f = i / 24;
        const a = -Math.PI / 2 + f * reach;
        const r = r0 - (r0 - er) * f * f;
        pts.push(`${n(cx + Math.cos(a) * r)},${n(cy + Math.sin(a) * r)}`);
      }
      pathD = `M ${pts.join(' L ')}`;
    } else if (v <= 8.2) {
      stateText = '7.9 km/s → 绕地球画圆！';
      color = GREEN;
      pathD = '';
    } else if (v < 11.2) {
      stateText = '椭圆轨道 → 跑得更远但仍被拉回';
      color = GOLD;
    } else {
      stateText = '≥11.2 km/s → 挣脱地球飞向深空！';
      color = '#74c0fc';
    }

    let orbitSvg = '';
    let sx = cx;
    let sy = cy - r0;
    if (v < 7.8) {
      orbitSvg = `<path d="${pathD}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="6 4"/>`;
      const f = (t * 0.55) % 1;
      const reach = ((v - 3.5) / 4.4) * Math.PI * 0.9;
      const a = -Math.PI / 2 + f * reach;
      const r = r0 - (r0 - er) * f * f;
      sx = cx + Math.cos(a) * r;
      sy = cy + Math.sin(a) * r;
    } else if (v < 11.2) {
      const stretch = 1 + ((v - 7.9) / 3.3) * 0.95;
      const aSemi = r0 * stretch;
      const bSemi = r0 * Math.sqrt(stretch);
      const offset = aSemi - r0;
      orbitSvg = `<ellipse cx="${cx}" cy="${n(cy + offset)}" rx="${n(bSemi)}" ry="${n(aSemi)}" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6 4"/>`;
      const ang = -Math.PI / 2 + t * 1.4;
      sx = cx + Math.cos(ang) * bSemi;
      sy = cy + offset + Math.sin(ang) * aSemi;
    } else {
      const pts: string[] = [];
      for (let i = 0; i <= 24; i += 1) {
        const f = i / 24;
        pts.push(`${n(cx + f * 260)},${n(cy - r0 + f * f * 52)}`);
      }
      orbitSvg = `<path d="M ${pts.join(' L ')}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="6 4"/>`;
      const f = (t * 0.45) % 1;
      sx = cx + f * 260;
      sy = cy - r0 + f * f * 52;
    }

    return starBackdrop()
      + `<circle cx="${cx}" cy="${cy}" r="${er}" fill="${BLUE}"/>`
      + txt(cx, cy + 5, '地球', { size: 15, color: '#fff', bold: true, plain: true })
      + orbitSvg
      + `<circle cx="${n(sx)}" cy="${n(sy)}" r="7" fill="${GOLD}" stroke="#fff" stroke-width="2"/>`
      + txt(448, 72, `${r1(v)} km/s`, { size: 22, color, bold: true, plain: true })
      + txt(448, 106, stateText, { size: 13, color: '#fff8dc', bold: true, plain: true })
      + txt(448, 152, '第一宇宙速度 7.9 km/s', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(448, 174, '第二宇宙速度 11.2 km/s', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(448, 224, '400 km 高空引力 ≈ 地面的 88%', { size: 11.5, color: '#ffd43b', plain: true });
  },
  readout(s) {
    if (s.speed < 7.8) return `发射速度 ${r1(s.speed)} km/s 低于第一宇宙速度（7.9 km/s），弯度赶不上地球弧度，最终落回地面。`;
    if (s.speed <= 8.2) return `达到第一宇宙速度约 ${r1(s.speed)} km/s：一边受引力往下掉，地球表面一边往下弯，刚好绕成圆轨道，舱内呈现失重！`;
    if (s.speed < 11.2) return `速度 ${r1(s.speed)} km/s 介于 7.9 与 11.2 km/s 之间，卫星甩出椭圆轨道，但依然被地球引力牵着回来。`;
    return `达到第二宇宙速度 ${r1(s.speed)} km/s（≥11.2 km/s）：航天器彻底挣脱地球引力束缚，飞向行星际深空！`;
  },
};

/** 8. 潮汐双水包与大小潮 */
export const oceanTidesSim: SimDef = {
  params: [
    { key: 'moonDeg', label: '月球方向', min: 0, max: 360, step: 30, value: 0, unit: '°' },
  ],
  animated: false,
  draw(s) {
    const cx = 240;
    const cy = 162;
    const rad = (s.moonDeg * Math.PI) / 180;
    const mx = cx + Math.cos(rad) * 142;
    const my = cy - Math.sin(rad) * 105;
    const spring = s.moonDeg % 180 === 0;
    const bulgeX = spring ? 76 : 64;
    const bulgeY = spring ? 46 : 52;

    return starBackdrop()
      + `<circle cx="54" cy="${cy}" r="26" fill="#f59f00"/>`
      + txt(54, cy + 4, '太阳', { size: 12, color: '#5d3200', bold: true, plain: true })
      + `<g transform="translate(${cx} ${cy}) rotate(${-s.moonDeg})">`
      + `<ellipse cx="0" cy="0" rx="${bulgeX}" ry="${bulgeY}" fill="#74c0fc" opacity="0.45"/>`
      + `<circle cx="0" cy="0" r="42" fill="${BLUE}"/>`
      + arrow(44, 0, 74, 0, HOT, 3)
      + arrow(-44, 0, -74, 0, '#ff9f43', 3)
      + `</g>`
      + txt(cx, cy + 5, '地球', { size: 13, color: '#fff', bold: true, plain: true })
      + `<circle cx="${n(mx)}" cy="${n(my)}" r="15" fill="#ffe89e"/>`
      + txt(mx, my + 28, '月球', { size: 12, color: '#ffe89e', plain: true })
      + txt(455, 118, spring ? '日地月一线' : '日地月成角', { size: 15, color: GOLD, bold: true, plain: true })
      + txt(455, 148, spring ? '大潮（潮差最大）' : '潮差较小', { size: 14, color: spring ? '#ff9f43' : '#cfe5f7', bold: true, plain: true })
      + txt(455, 198, '面向月亮和背向月亮', { size: 12, color: '#fff8dc', plain: true })
      + txt(455, 220, '两头同时鼓起涨潮包！', { size: 12, color: '#ffd43b', bold: true, plain: true });
  },
  readout(s) {
    const spring = s.moonDeg % 180 === 0;
    return `月球位于 ${s.moonDeg}°：地球面对月球和背对月球的两端同时鼓起水包（一天两次涨潮）。${spring ? '此时太阳与月球排成一线，引力叠加形成“大潮”。' : '此时太阳与月球拉力不在同一直线，潮差相对平缓。'}`;
  },
};

/** 9. 引力弹弓加速原理 */
export const slingshotBoost: SimDef = {
  params: [
    { key: 'side', label: '绕飞行星的哪一侧', min: 0, max: 1, step: 1, value: 1, labels: ['从行星前方绕(减速)', '从行星后方绕(加速)'] },
    { key: 'planetV', label: '行星公转速度', min: 5, max: 20, step: 1, value: 13, unit: ' km/s' },
  ],
  animated: true,
  still: 1.0,
  draw(s, t) {
    const boost = s.side === 1;
    const vin = 10;
    const vout = boost ? vin + s.planetV * 1.2 : Math.max(2, vin - s.planetV * 0.5);
    const px = 260;
    const py = 160;
    const pathD = boost
      ? 'M 62 248 Q 285 245 312 162 Q 325 84 486 76'
      : 'M 62 76 Q 285 80 312 162 Q 325 240 486 248';
    const prog = (t * 0.45) % 1;
    const dotX = 62 + prog * 424;
    const dotY = boost ? 248 - prog * 172 - Math.sin(prog * Math.PI) * 28 : 76 + prog * 172 + Math.sin(prog * Math.PI) * 28;

    return starBackdrop()
      + arrow(px - 20, py - 58, px + 88, py - 58, GOLD, 4)
      + txt(px + 34, py - 70, `木星高速公转 ${s.planetV} km/s →`, { size: 12.5, color: GOLD, bold: true, plain: true })
      + `<circle cx="${px}" cy="${py}" r="34" fill="#e59966"/>`
      + txt(px, py + 5, '木星', { size: 14, color: '#5d3200', bold: true, plain: true })
      + `<path d="${pathD}" fill="none" stroke="${boost ? GREEN : '#ff6b6b'}" stroke-width="3" stroke-dasharray="7 5"/>`
      + `<circle cx="${n(dotX)}" cy="${n(dotY)}" r="7" fill="#fff" stroke="${boost ? GREEN : '#ff6b6b'}" stroke-width="2.5"/>`
      + txt(110, 286, `入场速度 ${vin} km/s`, { size: 13, color: '#cfe5f7', plain: true })
      + txt(426, 286, `离场速度 ≈ ${r1(vout)} km/s`, { size: 14, color: boost ? '#69db7c' : '#ffa8a8', bold: true, plain: true });
  },
  readout(s) {
    const vout = s.side === 1 ? 10 + s.planetV * 1.2 : Math.max(2, 10 - s.planetV * 0.5);
    return s.side === 1
      ? `从高速公转的行星后方绕过：探测器顺着行星运动方向被“拽”走，离场速度暴涨到约 ${r1(vout)} km/s，不烧一滴推进剂！`
      : `从行星前方绕过：探测器反而被向后拉慢，离场速度降到约 ${r1(vout)} km/s（探测水星时就会反过来用引力刹车）。`;
  },
};
