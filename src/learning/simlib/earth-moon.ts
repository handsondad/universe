import { arrow, BLUE, GOLD, HOT, n, r1, starBackdrop, SUN, txt, type SimDef } from './kit';

/** 1. 地轴倾斜与四季阳光角度 */
export const seasonsTilt: SimDef = {
  params: [
    { key: 'month', label: '公转月份', min: 1, max: 12, step: 1, value: 6, unit: '月' },
    { key: 'tilt', label: '地轴倾角', min: 0, max: 40, step: 1, value: 23, unit: '°' },
  ],
  animated: false,
  draw(s) {
    const month = s.month;
    const tiltDeg = s.tilt;
    const angle = ((month - 3) / 12) * Math.PI * 2;
    const decl = tiltDeg * Math.sin(angle);
    const ex = 350;
    const ey = 162;
    const er = 68;
    const tiltRad = (decl * Math.PI) / 180;
    const ax1 = ex + Math.sin(tiltRad) * (er + 22);
    const ay1 = ey - Math.cos(tiltRad) * (er + 22);
    const ax2 = ex - Math.sin(tiltRad) * (er + 22);
    const ay2 = ey + Math.cos(tiltRad) * (er + 22);

    const rays = [-42, -14, 14, 42].map(dy => arrow(118, ey + dy, ex - er - 10, ey + dy, GOLD, 3)).join('');
    const hitY = ey - Math.sin(tiltRad) * er * 0.85;
    const northLat = 40;
    const noonAlt = Math.max(5, Math.min(90, 90 - Math.abs(northLat - decl)));
    const energyPct = Math.round(Math.sin((noonAlt * Math.PI) / 180) * 100);

    return starBackdrop()
      + `<circle cx="72" cy="${ey}" r="42" fill="${SUN}"/><circle cx="72" cy="${ey}" r="52" fill="${GOLD}" opacity="0.22"/>`
      + txt(72, ey + 5, '太阳', { size: 15, color: '#5d3200', bold: true, plain: true })
      + rays
      + `<circle cx="${ex}" cy="${ey}" r="${er}" fill="#2b5876"/>`
      + `<path d="M ${ex} ${ey - er} A ${er} ${er} 0 0 0 ${ex} ${ey + er} Z" fill="#4dabf7"/>`
      + `<line x1="${n(ax1)}" y1="${n(ay1)}" x2="${n(ax2)}" y2="${n(ay2)}" stroke="#ffe066" stroke-width="2.5" stroke-dasharray="5 4"/>`
      + `<line x1="${n(ex - Math.cos(tiltRad) * er)}" y1="${n(ey - Math.sin(tiltRad) * er)}" x2="${n(ex + Math.cos(tiltRad) * er)}" y2="${n(ey + Math.sin(tiltRad) * er)}" stroke="#fff3bf" stroke-width="1.5" opacity="0.7"/>`
      + `<circle cx="${n(ex - Math.cos(tiltRad) * er * 0.52)}" cy="${n(hitY)}" r="6" fill="${HOT}" stroke="#fff" stroke-width="2"/>`
      + txt(ax1, ay1 - 8, '北极', { size: 12, color: '#ffe066', bold: true, plain: true })
      + txt(ex, 40, `北纬40°正午太阳高度 ${Math.round(noonAlt)}°`, { size: 14, color: '#fff8dc', bold: true, plain: true })
      + txt(ex, 286, `地面单位面积受热效率 ≈ ${energyPct}%`, { size: 14, color: '#ffd43b', bold: true, plain: true });
  },
  readout(s) {
    const decl = s.tilt * Math.sin(((s.month - 3) / 12) * Math.PI * 2);
    const season = s.tilt === 0 ? '全年无四季变化' : decl > 8 ? '北半球夏季（阳光直射偏北、白昼长）' : decl < -8 ? '北半球冬季（阳光斜射、白昼短）' : '春分或秋分前后（昼夜接近平分）';
    return `${s.month} 月、地轴倾角 ${s.tilt}°：太阳直射纬度约 ${decl >= 0 ? '北纬' : '南纬'} ${r1(Math.abs(decl))}°，${season}。`;
  },
};

/** 2. 月相盈亏与 5.1° 轨道倾角 */
export const moonPhases: SimDef = {
  params: [
    { key: 'day', label: '农历日期', min: 1, max: 30, step: 1, value: 15, unit: '日' },
    { key: 'inclined', label: '轨道倾角', min: 0, max: 1, step: 1, value: 1, labels: ['0°(平齐)', '5.1°(真实)'] },
  ],
  animated: false,
  draw(s) {
    const phase = ((s.day - 1) / 29.5) * Math.PI * 2;
    const cx = 215;
    const cy = 165;
    const orbitR = 92;
    const mx = cx - Math.cos(phase) * orbitR;
    const my = cy + Math.sin(phase) * orbitR * 0.85;
    const illum = (1 - Math.cos(phase)) / 2;
    const vx = 445;
    const vy = 152;
    const vr = 54;
    const rx = Math.abs(Math.cos(phase)) * vr;
    const waxing = Math.sin(phase) >= 0;
    const darkSweep = waxing ? 0 : 1;
    const midSweep = illum > 0.5 ? (waxing ? 1 : 0) : (waxing ? 0 : 1);

    const aligned = s.inclined === 0 && (s.day <= 2 || s.day >= 29 || Math.abs(s.day - 15) <= 1);
    const eclipseTag = aligned ? (Math.abs(s.day - 15) <= 1 ? '⚡ 撞上地球阴影 → 月食！' : '⚡ 挡住太阳 → 日食！') : (s.inclined === 1 ? '真实倾角 5.1°：多数时候上下错开' : '0° 轨道：初一十五必食');

    return starBackdrop()
      + [110, 165, 220].map(y => arrow(22, y, 78, y, GOLD, 2.5)).join('')
      + txt(52, 92, '太阳光', { size: 13, color: GOLD, bold: true, plain: true })
      + `<ellipse cx="${cx}" cy="${cy}" rx="${orbitR}" ry="${n(orbitR * 0.85)}" fill="none" stroke="#8d82c4" stroke-dasharray="5 5" stroke-width="1.5"/>`
      + `<circle cx="${cx}" cy="${cy}" r="22" fill="#4dabf7"/>`
      + `<path d="M ${cx} ${cy - 22} A 22 22 0 0 1 ${cx} ${cy + 22} Z" fill="#1e3a5f"/>`
      + txt(cx, cy + 38, '地球', { size: 12, color: '#cfe5f7', plain: true })
      + `<circle cx="${n(mx)}" cy="${n(my)}" r="12" fill="#ffe89e"/>`
      + `<path d="M ${n(mx)} ${n(my - 12)} A 12 12 0 0 1 ${n(mx)} ${n(my + 12)} Z" fill="#4b4766"/>`
      + `<rect x="358" y="42" width="174" height="236" rx="14" fill="#29234d" stroke="#5b3e96" stroke-width="1.5"/>`
      + txt(vx, 68, '从地球抬头看', { size: 14, color: '#fff8dc', bold: true, plain: true })
      + `<circle cx="${vx}" cy="${vy}" r="${vr}" fill="#3a355c"/>`
      + `<path d="M ${vx} ${vy - vr} A ${vr} ${vr} 0 0 ${1 - darkSweep} ${vx} ${vy + vr} A ${n(rx)} ${vr} 0 0 ${midSweep} ${vx} ${vy - vr} Z" fill="#fff1b8"/>`
      + txt(vx, 232, `亮面占比 ${Math.round(illum * 100)}%`, { size: 13, color: GOLD, bold: true, plain: true })
      + txt(vx, 258, eclipseTag, { size: 11, color: aligned ? '#ff9f43' : '#c5b3e6', bold: aligned, plain: true });
  },
  readout(s) {
    const d = s.day;
    const name = d <= 2 || d >= 29 ? '新月（朔）' : d < 7 ? '蛾眉月' : d <= 9 ? '上弦月' : d < 14 ? '盈凸月' : d <= 16 ? '满月（望）' : d < 22 ? '亏凸月' : d <= 24 ? '下弦月' : '残月';
    const note = s.inclined === 1 ? '月球公转轨道倾角 5.1°，所以并非每个初一十五都会撞上日月食' : '若倾角为 0°，每个初一都会日食、每个十五都会月食';
    return `农历 ${d} 日：${name}。${note}。`;
  },
};

/** 3. 潮汐锁定：同步自转 vs 不自转 */
export const tidalLock: SimDef = {
  params: [
    { key: 'angle', label: '月球公转角度', min: 0, max: 360, step: 15, value: 90, unit: '°' },
    { key: 'locked', label: '月球是否自转', min: 0, max: 1, step: 1, value: 1, labels: ['假设不自转', '真实同步自转'] },
  ],
  animated: false,
  draw(s) {
    const cx = 280;
    const cy = 165;
    const orbitR = 102;
    const rad = (s.angle * Math.PI) / 180;
    const mx = cx + Math.cos(rad) * orbitR;
    const my = cy - Math.sin(rad) * orbitR;
    const faceRad = s.locked === 1 ? rad + Math.PI : Math.PI;
    const fx = mx + Math.cos(faceRad) * 20;
    const fy = my - Math.sin(faceRad) * 20;

    return starBackdrop()
      + `<circle cx="${cx}" cy="${cy}" r="${orbitR}" fill="none" stroke="#8d82c4" stroke-dasharray="6 5" stroke-width="1.5"/>`
      + `<circle cx="${cx}" cy="${cy}" r="30" fill="${BLUE}"/>`
      + txt(cx, cy + 5, '地球', { size: 14, color: '#fff', bold: true, plain: true })
      + `<line x1="${cx}" y1="${cy}" x2="${n(mx)}" y2="${n(my)}" stroke="#ffd43b" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>`
      + `<circle cx="${n(mx)}" cy="${n(my)}" r="20" fill="#e9e2d0"/>`
      + `<line x1="${n(mx)}" y1="${n(my)}" x2="${n(fx)}" y2="${n(fy)}" stroke="${HOT}" stroke-width="5" stroke-linecap="round"/>`
      + `<circle cx="${n(fx)}" cy="${n(fy)}" r="5" fill="${HOT}" stroke="#fff" stroke-width="1.5"/>`
      + txt(280, 40, s.locked === 1 ? '红点（正面）随公转同步自转 → 永远朝向地球' : '如果月球真的不自转 → 转到后面时红点会背对地球！', { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + txt(280, 294, `公转 ${s.angle}° · 自转 ${s.locked === 1 ? s.angle : 0}°`, { size: 13, color: GOLD, bold: true, plain: true });
  },
  readout(s) {
    return s.locked === 1
      ? `月球公转了 ${s.angle}°，同时也正好自转了 ${s.angle}°（周期约 27.3 天），所以红点标记的月球正面永远对着地球。`
      : `假设月球不自转：当它公转到 ${s.angle}° 时，红点方向保持不变，地球上的人就会看到月球的侧面和背面——这和事实不符！`;
  },
};
