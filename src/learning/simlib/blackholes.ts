import { arrow, GOLD, HOT, n, r1, starBackdrop, txt, type SimDef } from './kit';

/** 16. 黑洞引力透镜与光子环 */
export const blackHoleLens: SimDef = {
  params: [
    { key: 'impact', label: '光线瞄准距离', min: 1.4, max: 4.5, step: 0.1, value: 2.6, unit: ' 倍视界半径' },
  ],
  animated: false,
  draw(s) {
    const b = s.impact;
    const cx = 290;
    const cy = 166;
    const rs = 26;
    const y0 = cy - b * rs;
    const captured = b < 2.6;
    let rayPath = '';
    let label = '';
    if (captured) {
      rayPath = `M 48 ${n(y0)} Q ${cx - 48} ${n(y0)} ${cx - 12} ${n(cy - 18)} Q ${cx + 22} ${n(cy)} ${cx} ${cy}`;
      label = '小于临界距离 (≈2.6 Rs) → 光被黑洞吞没，形成黑洞阴影！';
    } else {
      const bend = Math.min(130, 260 / (b - 1.3));
      rayPath = `M 48 ${n(y0)} Q ${cx} ${n(y0)} ${cx + 52} ${n(y0 + bend * 0.45)} L 520 ${n(Math.min(290, y0 + bend))}`;
      label = `绕过光子球被强烈折弯 → 在地球眼中勾出明亮的“光子环”！`;
    }

    return starBackdrop()
      + `<circle cx="${cx}" cy="${cy}" r="${n(rs * 2.6)}" fill="none" stroke="#ff922b" stroke-width="2" stroke-dasharray="5 5" opacity="0.7"/>`
      + `<circle cx="${cx}" cy="${cy}" r="${n(rs * 1.5)}" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.8"/>`
      + `<circle cx="${cx}" cy="${cy}" r="${rs}" fill="#080614" stroke="#ff9f43" stroke-width="3"/>`
      + `<path d="${rayPath}" fill="none" stroke="${captured ? '#ff6b6b' : GOLD}" stroke-width="3.5" stroke-linecap="round"/>`
      + txt(cx, cy + 5, '黑洞', { size: 12.5, color: '#fff', bold: true, plain: true })
      + txt(cx, 250, '虚线：阴影捕获边界（2.6 Rs）  ·  金圈：光子球（1.5 Rs）', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(280, 40, label, { size: 13, color: captured ? '#ffa8a8' : GOLD, bold: true, plain: true });
  },
  readout(s) {
    return s.impact < 2.6
      ? `瞄准距离仅 ${r1(s.impact)} 倍史瓦西半径：光子被弯曲的时空卷进事件视界，再也逃不出来——这片“无光区”就是照片中间的暗影。`
      : `瞄准距离 ${r1(s.impact)} 倍史瓦西半径：光线擦边绕过黑洞并大幅拐弯，让远方望远镜看到环绕阴影的明亮橘黄光环。`;
  },
};

/** 17. 太阳瞬间变成同等质量黑洞：地球轨道不变 */
export const sunToBlackHole: SimDef = {
  params: [
    { key: 'bh', label: '中心天体（质量同为 1 M☉）', min: 0, max: 1, step: 1, value: 1, labels: ['现在的太阳(半径70万km)', '等质量黑洞(半径3km)'] },
  ],
  animated: true,
  still: 1.0,
  draw(s, t) {
    const isBH = s.bh === 1;
    const cx = 240;
    const cy = 165;
    const rx = 148;
    const ry = 88;
    const a = t * 1.1;
    const ex = cx + Math.cos(a) * rx;
    const ey = cy + Math.sin(a) * ry;

    return starBackdrop()
      + `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#74c0fc" stroke-width="2" stroke-dasharray="6 5"/>`
      + (isBH
        ? `<circle cx="${cx}" cy="${cy}" r="16" fill="#080614" stroke="#ff9f43" stroke-width="3"/>`
        : `<circle cx="${cx}" cy="${cy}" r="36" fill="#f59f00"/><circle cx="${cx}" cy="${cy}" r="46" fill="${GOLD}" opacity="0.22"/>`)
      + txt(cx, cy + (isBH ? 34 : 54), isBH ? '1 M☉ 黑洞（半径仅 3 km）' : '1 M☉ 太阳（半径 70 万 km）', { size: 12.5, color: '#fff8dc', bold: true, plain: true })
      + `<circle cx="${n(ex)}" cy="${n(ey)}" r="12" fill="${isBH ? '#495057' : '#4dabf7'}" stroke="#fff" stroke-width="1.5"/>`
      + txt(ex, ey - 18, '地球', { size: 12, color: '#fff', bold: true, plain: true })
      + txt(280, 40, isBH ? '质量没变、距离没变 → 地球照样稳稳公转，不会被吸走！' : '地球在 1.5 亿千米外受太阳引力绕圈', { size: 13.5, color: isBH ? '#ff9f43' : GOLD, bold: true, plain: true })
      + txt(280, 290, isBH ? '只是没有阳光了，8 分多钟后地球会陷入漆黑严寒' : '万有引力只看质量与距离，和中心是不是黑洞无关', { size: 12, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    return s.bh === 1
      ? '把太阳换成同等质量的黑洞后，地球受到的万有引力大小一丁点都没变！地球绝不会被吸进去，只是会失去阳光迅速变冷。'
      : '太阳半径约 70 万千米，地球在 1.5 亿千米外绕它公转；牛顿万有引力只取决于中心天体的质量和距离。';
  },
};

/** 18. 引力时间膨胀与 GPS 卫星时钟 */
export const gravityClock: SimDef = {
  params: [
    { key: 'place', label: '把时钟放在哪里', min: 0, max: 2, step: 1, value: 1, labels: ['GPS卫星(2万km高空)', '地球海平面', '大黑洞视界外附近'] },
  ],
  animated: true,
  still: 1.5,
  draw(s, t) {
    const mode = Math.round(s.place);
    const rates = [1.35, 1.0, 0.35];
    const labels = ['GPS 卫星（引力更弱）', '地球地面（参考时钟）', '大黑洞附近（极强引力）'];
    const notes = ['每天比地面快 38 微秒，导航必须校准！', '作为地球上的标准 1 秒节奏', '这里过 1 小时，远处可能已过好几年！'];

    const drawClock = (cx: number, cy: number, rate: number, title: string, accent: string): string => {
      const ang = -Math.PI / 2 + t * rate * 2.1;
      const hx = cx + Math.cos(ang) * 34;
      const hy = cy + Math.sin(ang) * 34;
      return `<circle cx="${cx}" cy="${cy}" r="46" fill="#29234d" stroke="${accent}" stroke-width="3.5"/>`
        + `<line x1="${cx}" y1="${cy}" x2="${n(hx)}" y2="${n(hy)}" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>`
        + `<circle cx="${cx}" cy="${cy}" r="5" fill="#fff"/>`
        + txt(cx, cy + 68, title, { size: 13, color: '#fff8dc', bold: true, plain: true });
    };

    return starBackdrop()
      + drawClock(168, 148, 1.0, '地球地面表（基准）', '#74c0fc')
      + arrow(236, 148, 322, 148, GOLD, 3)
      + drawClock(392, 148, rates[mode], labels[mode], HOT)
      + txt(280, 44, '引力越强，时间流逝越慢（广义相对论效应）', { size: 14, color: GOLD, bold: true, plain: true })
      + txt(280, 276, notes[mode], { size: 13, color: '#ff9f43', bold: true, plain: true });
  },
  readout(s) {
    const mode = Math.round(s.place);
    if (mode === 0) return 'GPS 和北斗卫星在两万多千米高空，引力比地面弱，原子钟每天会比地面净快约 38 微秒；若不按相对论修正，一天定位就会偏 10 多千米！';
    if (mode === 1) return '放在同一个引力深度的两块钟走得完全同步。';
    return '靠近黑洞事件视界时引力极其强大，空间和时间被剧烈弯曲，那里的时钟相对远方观察者会明显变慢。';
  },
};
