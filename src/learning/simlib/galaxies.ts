import { arrow, GOLD, HOT, n, r1, starBackdrop, txt, type SimDef } from './kit';

/** 13. 银河系视角：从外面看大风车 vs 从里面看一条带子 */
export const milkyWayView: SimDef = {
  params: [
    { key: 'view', label: '观察视角', min: 0, max: 1, step: 1, value: 1, labels: ['从银盘上方俯瞰', '站在银盘里平视(地球)'] },
  ],
  animated: false,
  draw(s) {
    const inside = s.view === 1;
    let body = '';
    if (!inside) {
      for (let arm = 0; arm < 2; arm += 1) {
        for (let i = 1; i <= 26; i += 1) {
          const a = arm * Math.PI + i * 0.25;
          const r = 10 + i * 3.9;
          body += `<circle cx="${n(280 + Math.cos(a) * r)}" cy="${n(164 + Math.sin(a) * r * 0.85)}" r="${i % 3 === 0 ? 3 : 2}" fill="${i % 2 === 0 ? '#d0bfff' : '#74c0fc'}" opacity="0.85"/>`;
        }
      }
      body += `<circle cx="280" cy="164" r="24" fill="#fff3bf" opacity="0.9"/>`;
      body += `<circle cx="348" cy="188" r="6" fill="${HOT}" stroke="#fff" stroke-width="2"/>`;
      body += txt(412, 194, '太阳系在此（距银心2.6万光年）', { size: 11.5, color: GOLD, bold: true, plain: true });
      body += txt(280, 42, '俯瞰银河系：千亿颗恒星排成旋涡大圆盘', { size: 14, color: '#fff8dc', bold: true, plain: true });
    } else {
      body += `<rect x="26" y="138" width="508" height="48" rx="24" fill="#d0bfff" opacity="0.22"/>`;
      body += `<rect x="46" y="150" width="468" height="24" rx="12" fill="#fff3bf" opacity="0.38"/>`;
      for (let i = 0; i < 42; i += 1) {
        const x = 44 + i * 11.4;
        const y = 162 + Math.sin(i * 1.9) * 14;
        body += `<circle cx="${n(x)}" cy="${n(y)}" r="${i % 4 === 0 ? 2.8 : 1.7}" fill="#fff8dc" opacity="0.85"/>`;
      }
      body += `<ellipse cx="280" cy="162" rx="88" ry="8" fill="#1c1836" opacity="0.55"/>`;
      body += txt(280, 42, '从地球抬头平视银盘：无数星星叠成一条发光带子！', { size: 13.5, color: '#fff8dc', bold: true, plain: true });
      body += txt(280, 268, '往饼盘上下看：星星稀少   ·   顺着饼盘方向看：密密麻麻连成银河', { size: 12, color: GOLD, bold: true, plain: true });
    }
    return starBackdrop() + body;
  },
  readout(s) {
    return s.view === 1
      ? '地球就在扁平的银河盘内部：顺着圆盘平面看过去，层层恒星连成一条乳白光带；朝圆盘上下方向看星星则稀疏得多。'
      : '如果能飞到银河系正上方俯瞰，它就是直径约 10 万光年的巨大棒旋星系，太阳系位于距中心约 2.6 万光年的旋臂边。';
  },
};

/** 14. 光年与回望过去 */
export const lightYearLookback: SimDef = {
  params: [
    { key: 'target', label: '望向哪个天体', min: 0, max: 3, step: 1, value: 1, labels: ['太阳(8分20秒)', '比邻星(4.2光年)', '猎户星云(1344光年)', '仙女座(250万光年)'] },
  ],
  animated: true,
  still: 1.0,
  draw(s, t) {
    const idx = Math.round(s.target);
    const items = [
      { name: '太阳', dist: '1.5 亿千米', ago: '8 分 20 秒前', era: '刚才那杯水还没凉', color: '#ffd43b' },
      { name: '比邻星', dist: '约 4.2 光年', ago: '4.2 年前', era: '那时候你还在上幼儿园或低年级', color: '#ff8787' },
      { name: '猎户座大星云', dist: '约 1344 光年', ago: '1300 多年前', era: '中国正值盛唐时期', color: '#d0bfff' },
      { name: '仙女座星系', dist: '约 250 万光年', ago: '250 万年前', era: '地球上早期人类才刚出现', color: '#74c0fc' },
    ][idx];
    const px = 420 - ((t * 140) % 280);

    return starBackdrop()
      + `<circle cx="96" cy="162" r="24" fill="#4dabf7"/>`
      + txt(96, 206, '地球眼睛', { size: 12.5, color: '#cfe5f7', plain: true })
      + `<circle cx="456" cy="162" r="32" fill="${items.color}"/>`
      + txt(456, 214, items.name, { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + `<line x1="130" y1="162" x2="416" y2="162" stroke="#ffd43b" stroke-width="2" stroke-dasharray="6 5"/>`
      + `<circle cx="${n(px)}" cy="162" r="7" fill="${GOLD}" stroke="#fff" stroke-width="2"/>`
      + arrow(px + 20, 144, px - 14, 144, GOLD, 2.5)
      + txt(275, 50, `距离：${items.dist}   ·   你看到的是 ${items.ago} 的它`, { size: 14, color: GOLD, bold: true, plain: true })
      + txt(275, 276, `光速每秒约 30 万千米 · 此时对应的地球记忆：${items.era}`, { size: 12.5, color: '#fff8dc', plain: true });
  },
  readout(s) {
    const idx = Math.round(s.target);
    const msgs = [
      '光从太阳跑到地球需要约 8 分 20 秒，所以我们看到的太阳其实是 8 分多钟之前的样子。',
      '比邻星离我们约 4.2 光年（约 40 万亿千米），你今晚看到的星光是它 4 年多前发出的！',
      '猎户座大星云距地球约 1344 光年，到达你眼里的那束光出发时，中国正好在唐朝！',
      '仙女座星系距我们约 250 万光年，这束光出发时地球上还没有现代城市和文字。',
    ];
    return msgs[idx];
  },
};

/** 15. 星系自转曲线与暗物质晕 */
export const galaxyRotation: SimDef = {
  params: [
    { key: 'dm', label: '是否加入暗物质晕', min: 0, max: 1, step: 1, value: 1, labels: ['只有可见恒星', '可见恒星 + 暗物质晕'] },
  ],
  animated: true,
  still: 0.8,
  draw(s, t) {
    const hasDM = s.dm === 1;
    const gx = 165;
    const gy = 164;
    const rings = [28, 56, 86];
    let disc = hasDM ? `<circle cx="${gx}" cy="${gy}" r="112" fill="#7c52b8" opacity="0.24"/>` : '';
    rings.forEach((r, i) => {
      const omega = hasDM ? 1.6 / (1 + i * 0.45) : 1.8 / Math.pow(i + 1, 1.4);
      const a = t * omega + i * 2.1;
      disc += `<circle cx="${gx}" cy="${gy}" r="${r}" fill="none" stroke="#8d82c4" stroke-dasharray="4 4" stroke-width="1.2"/>`;
      disc += `<circle cx="${n(gx + Math.cos(a) * r)}" cy="${n(gy + Math.sin(a) * r)}" r="6" fill="${i === 2 ? HOT : GOLD}"/>`;
    });

    const curveExpected = 'M 332 232 Q 368 122 414 148 Q 456 184 514 214';
    const curveObserved = 'M 332 232 Q 368 122 414 126 L 514 124';
    return starBackdrop()
      + disc
      + `<circle cx="${gx}" cy="${gy}" r="14" fill="#fff3bf"/>`
      + txt(gx, 42, hasDM ? '紫色光晕：看不见的暗物质' : '只算看得见的恒星质量', { size: 13, color: hasDM ? '#d0bfff' : '#ced4da', bold: true, plain: true })
      + `<line x1="332" y1="242" x2="520" y2="242" stroke="#fff8dc" stroke-width="2"/>`
      + `<line x1="332" y1="90" x2="332" y2="242" stroke="#fff8dc" stroke-width="2"/>`
      + `<path d="${curveExpected}" fill="none" stroke="#adb5bd" stroke-width="2.5" stroke-dasharray="5 4"/>`
      + (hasDM ? `<path d="${curveObserved}" fill="none" stroke="${HOT}" stroke-width="3.5"/>` : '')
      + txt(426, 76, '星系自转速度曲线', { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + txt(490, 114, hasDM ? '实测：外圈不减速！' : '预测：越外越慢', { size: 11.5, color: hasDM ? '#ff9f43' : '#adb5bd', bold: true, plain: true })
      + txt(426, 266, '距星系中心越来越远 →', { size: 11.5, color: '#c5b3e6', plain: true })
      + txt(426, 290, `外圈恒星速度 ≈ ${r1(hasDM ? 220 : 95)} km/s`, { size: 12.5, color: GOLD, bold: true, plain: true });
  },
  readout(s) {
    return s.dm === 1
      ? '实测发现星系外圈恒星仍以约 220 km/s 飞转却没被甩飞，证明外围包裹着质量远超可见恒星的“暗物质晕”提供额外引力。'
      : '如果星系里只有发光恒星，按照牛顿引力计算，外圈星星的速度应该随距离明显下降，与真实天文观测严重不符！';
  },
};
