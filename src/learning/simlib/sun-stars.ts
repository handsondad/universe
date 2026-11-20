import { arrow, GOLD, HOT, n, r1, starBackdrop, SUN, txt, type SimDef } from './kit';

/** 10. 太阳核心核聚变门槛（温度与碰撞） */
export const solarFusion: SimDef = {
  params: [
    { key: 'temp', label: '核心温度（百万℃）', min: 1, max: 20, step: 1, value: 15, unit: ' 百万℃' },
  ],
  animated: true,
  still: 1.0,
  draw(s, t) {
    const temp = s.temp;
    const ignited = temp >= 10;
    const speed = 0.6 + temp * 0.14;
    const approach = ignited ? Math.abs(Math.sin(t * speed)) : 0.4 + 0.35 * Math.abs(Math.sin(t * speed));
    const dx = ignited ? 14 + approach * 120 : 48 + approach * 105;
    const burst = ignited && approach < 0.22;

    return starBackdrop()
      + `<circle cx="280" cy="156" r="${burst ? 74 : 44}" fill="${ignited ? '#ff922b' : '#495057'}" opacity="${burst ? 0.45 : 0.18}"/>`
      + `<circle cx="${n(280 - dx)}" cy="156" r="20" fill="#4dabf7"/>`
      + txt(280 - dx, 162, 'H⁺', { size: 15, color: '#fff', bold: true, plain: true })
      + `<circle cx="${n(280 + dx)}" cy="156" r="20" fill="#4dabf7"/>`
      + txt(280 + dx, 162, 'H⁺', { size: 15, color: '#fff', bold: true, plain: true })
      + (burst
        ? `<circle cx="280" cy="156" r="28" fill="${GOLD}"/><text x="280" y="162" text-anchor="middle" font-size="16" font-weight="700" fill="#5d3200">He + 光</text>`
        : arrow(280 - dx + 26, 156, 280 - 24, 156, ignited ? GOLD : '#adb5bd', 3)
          + arrow(280 + dx - 26, 156, 280 + 24, 156, ignited ? GOLD : '#adb5bd', 3))
      + txt(280, 42, ignited ? `核心 ${temp}00 万℃：撞破斥力 → 4个氢核聚变成氦核！` : `核心 ${temp}00 万℃：冲得不够猛，两个带正电的氢核互相弹开`, { size: 13.5, color: ignited ? GOLD : '#ced4da', bold: true, plain: true })
      + txt(280, 286, ignited ? '无需氧气 · E = mc² 每秒约 400 万吨质量化作光和热' : '提示：太阳核心温度约 1500 万℃ 才能稳定点火', { size: 12.5, color: '#fff8dc', plain: true });
  },
  readout(s) {
    return s.temp >= 10
      ? `温度达到 ${s.temp}00 万℃：氢原子核高速撞破同性相斥的屏障，聚变成氦核并释放巨量辐射，全程不需要一丝氧气。`
      : `温度仅 ${s.temp}00 万℃：两个带正电的氢核还没撞上就被静电斥力弹开，无法发生核聚变。`;
  },
};

/** 11. 恒星表面温度与星光颜色 */
export const starTempColor: SimDef = {
  params: [
    { key: 'temp', label: '恒星表面温度', min: 3000, max: 25000, step: 500, value: 5800, unit: ' K' },
  ],
  animated: false,
  draw(s) {
    const T = s.temp;
    const color = T >= 14000 ? '#74c0fc' : T >= 8500 ? '#edf2ff' : T >= 5200 ? '#ffe066' : T >= 4000 ? '#ffa94d' : '#ff6b6b';
    const type = T >= 14000 ? '蓝巨星（如参宿七）' : T >= 8500 ? '蓝白星（如天狼星）' : T >= 5200 ? '黄矮星（如太阳）' : T >= 4000 ? '橙矮星' : '红巨星 / 红矮星（如参宿四）';
    const peakX = 480 - ((T - 3000) / 22000) * 320;

    return starBackdrop()
      + `<circle cx="155" cy="156" r="76" fill="${color}" opacity="0.22"/>`
      + `<circle cx="155" cy="156" r="52" fill="${color}"/>`
      + txt(155, 162, `${T} K`, { size: 16, color: T >= 5200 ? '#2b244d' : '#fff', bold: true, plain: true })
      + txt(155, 258, type, { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + `<defs><linearGradient id="spec" x1="0" x2="1"><stop offset="0%" stop-color="#4dabf7"/><stop offset="45%" stop-color="#ffffff"/><stop offset="72%" stop-color="#ffd43b"/><stop offset="100%" stop-color="#ff6b6b"/></linearGradient></defs>`
      + txt(395, 72, '星光能量峰值位置', { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + `<rect x="275" y="108" width="240" height="24" rx="12" fill="url(#spec)"/>`
      + `<polygon points="${n(Math.max(280, Math.min(510, peakX)))},136 ${n(Math.max(280, Math.min(510, peakX)) - 8)},152 ${n(Math.max(280, Math.min(510, peakX)) + 8)},152" fill="${HOT}"/>`
      + txt(295, 174, '高能蓝光', { size: 11.5, color: '#74c0fc', plain: true })
      + txt(495, 174, '低能红光', { size: 11.5, color: '#ff8787', plain: true })
      + txt(395, 224, '温度越高 → 光波越短 → 越偏蓝白', { size: 12.5, color: GOLD, bold: true, plain: true });
  },
  readout(s) {
    const T = s.temp;
    const label = T >= 14000 ? '耀眼的蓝白色' : T >= 8500 ? '明亮的白色' : T >= 5200 ? '温暖的黄白色（接近太阳 5778 K）' : '柔和的橙红色';
    return `表面温度 ${T} K：星光呈${label}。恒星和烧热的铁块一样，温度越高发出的蓝光比例越大！`;
  },
};

/** 12. 恒星质量决定归宿 */
export const starFateMass: SimDef = {
  params: [
    { key: 'mass', label: '恒星出生质量', min: 1, max: 25, step: 1, value: 1, unit: ' 倍太阳质量' },
  ],
  animated: false,
  draw(s) {
    const m = s.mass;
    const path = m < 8
      ? { mid: '红巨星', midC: '#ff8787', end: '白矮星', endC: '#edf2ff', life: `${r1(10 / Math.pow(m, 2.2))} 十亿年`, note: '温和褪去外层，形成行星状星云' }
      : m < 20
        ? { mid: '红超巨星', midC: '#ff6b6b', end: '超新星 → 中子星', endC: '#74c0fc', life: '仅数千万年', note: '核心坍缩引发超新星大爆发！' }
        : { mid: '蓝/红超巨星', midC: '#ffa94d', end: '超新星 → 黑洞', endC: '#111122', life: '仅数百万年', note: '引力彻底压垮核心，塌成黑洞！' };

    const rStar = Math.min(34, 16 + m * 0.9);
    return starBackdrop()
      + `<circle cx="96" cy="152" r="${n(rStar)}" fill="${m >= 8 ? '#74c0fc' : SUN}"/>`
      + txt(96, 212, `${m} M☉ 主序星`, { size: 13, color: '#fff8dc', bold: true, plain: true })
      + arrow(144, 152, 218, 152, GOLD, 3)
      + `<circle cx="276" cy="152" r="${m >= 8 ? 48 : 38}" fill="${path.midC}" opacity="0.85"/>`
      + txt(276, 158, path.mid, { size: 13.5, color: '#fff', bold: true, plain: true })
      + arrow(336, 152, 404, 152, HOT, 3)
      + (m >= 20
        ? `<circle cx="462" cy="152" r="34" fill="#ff922b" opacity="0.45"/><circle cx="462" cy="152" r="22" fill="#0d0a1a" stroke="#ffd43b" stroke-width="2.5"/>`
        : `<circle cx="462" cy="152" r="30" fill="${path.endC}" opacity="0.25"/><circle cx="462" cy="152" r="14" fill="${path.endC}"/>`)
      + txt(462, 212, path.end, { size: 13, color: GOLD, bold: true, plain: true })
      + txt(280, 44, `质量越大烧得越猛 · 主序寿命约 ${path.life}`, { size: 14, color: '#fff8dc', bold: true, plain: true })
      + txt(280, 282, path.note, { size: 13, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    if (s.mass < 8) return `${s.mass} 倍太阳质量（中小质量）：不会变成黑洞！老后会膨胀为红巨星，最后蜕变成一颗安静的白矮星。`;
    if (s.mass < 20) return `${s.mass} 倍太阳质量（大质量）：寿命短得多，核燃料耗尽后猛烈超新星爆发，核心压缩成密度惊人的中子星。`;
    return `${s.mass} 倍太阳质量（特大质量）：几百万年就燃尽燃料，超新星爆发后残骸核心继续坍缩形成恒星级黑洞！`;
  },
};
