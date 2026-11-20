import { GOLD, HOT, n, r1, starBackdrop, txt, type SimDef } from './kit';

/** 19. 宇宙膨胀：空间伸展与哈勃定律 */
export const expandingSpace: SimDef = {
  params: [
    { key: 'scale', label: '空间膨胀倍数', min: 1.0, max: 2.4, step: 0.1, value: 1.5, unit: ' 倍' },
  ],
  animated: false,
  draw(s) {
    const k = s.scale;
    const cx = 280;
    const cy = 166;
    const base = [
      { name: '我们', x: 0, y: 0, hot: true },
      { name: '星系A', x: 52, y: -14, hot: false },
      { name: '星系B', x: -64, y: 24, hot: false },
      { name: '星系C', x: 102, y: 22, hot: false },
      { name: '星系D', x: -96, y: -32, hot: false },
    ];
    let grid = '';
    for (let gx = -3; gx <= 3; gx += 1) {
      const x = cx + gx * 36 * k;
      if (x > 24 && x < 536) grid += `<line x1="${n(x)}" y1="54" x2="${n(x)}" y2="270" stroke="#453d78" stroke-width="1"/>`;
    }
    for (let gy = -2; gy <= 2; gy += 1) {
      const y = cy + gy * 34 * k;
      if (y > 54 && y < 270) grid += `<line x1="24" y1="${n(y)}" x2="536" y2="${n(y)}" stroke="#453d78" stroke-width="1"/>`;
    }
    const galaxies = base.map(g => {
      const px = cx + g.x * k;
      const py = cy + g.y * k;
      return `<ellipse cx="${n(px)}" cy="${n(py)}" rx="14" ry="8" fill="${g.hot ? HOT : '#b197fc'}" opacity="0.9"/>`
        + `<circle cx="${n(px)}" cy="${n(py)}" r="4" fill="#fff8dc"/>`
        + txt(px, py + 22, g.name, { size: 11.5, color: g.hot ? GOLD : '#fff8dc', bold: g.hot, plain: true });
    }).join('');

    return starBackdrop()
      + grid + galaxies
      + txt(280, 38, `网格（空间本身）拉长 ${r1(k)} 倍 · 星系本身大小不变`, { size: 13.5, color: GOLD, bold: true, plain: true })
      + txt(280, 292, `A 退行距离：${r1(52 * (k - 1))}  ·  更远的 C 退行距离：${r1(102 * (k - 1))}（越远退得越快！）`, { size: 12, color: '#fff8dc', plain: true });
  },
  readout(s) {
    return `空间放大到 ${r1(s.scale)} 倍：星系自己并没有变胖，是星系之间的空间网格一起伸长了；离我们原本越远的星系，远离得越快（哈勃定律）。`;
  },
};

/** 20. 奥伯斯佯谬：为什么夜空是黑的 */
export const olbersNight: SimDef = {
  params: [
    { key: 'age', label: '可见宇宙光程上限', min: 1, max: 14, step: 1, value: 14, unit: ' 十亿光年' },
    { key: 'redshift', label: '宇宙膨胀红移', min: 0, max: 1, step: 1, value: 1, labels: ['假设不膨胀', '真实膨胀红移'] },
  ],
  animated: false,
  draw(s) {
    const rVis = 22 + s.age * 7;
    const cx = 280;
    const cy = 166;
    let dots = '';
    for (let i = 0; i < 48; i += 1) {
      const a = i * 2.39996;
      const r = 16 + Math.sqrt(i / 48) * 130;
      const inside = r <= rVis;
      const far = r > rVis * 0.65;
      const color = !inside ? '#495057' : (s.redshift === 1 && far ? '#c92a2a' : '#fff3bf');
      const op = !inside ? 0.25 : (s.redshift === 1 && far ? 0.45 : 0.95);
      dots += `<circle cx="${n(cx + Math.cos(a) * r)}" cy="${n(cy + Math.sin(a) * r * 0.72)}" r="${inside ? 3 : 2}" fill="${color}" opacity="${op}"/>`;
    }

    return starBackdrop()
      + `<ellipse cx="${cx}" cy="${cy}" rx="${n(rVis)}" ry="${n(rVis * 0.72)}" fill="#2b244f" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6 5"/>`
      + dots
      + `<circle cx="${cx}" cy="${cy}" r="8" fill="#4dabf7" stroke="#fff" stroke-width="1.5"/>`
      + txt(280, 38, `宇宙约 138 亿岁：圈外更远恒星的光还没跑到地球`, { size: 13.5, color: '#fff8dc', bold: true, plain: true })
      + txt(280, 290, s.redshift === 1 ? '再加上膨胀红移：极远星光被拉长成肉眼看不见的红外与微波！' : '即使没有红移，有限年龄也挡住了无限远处的星光', { size: 12, color: GOLD, bold: true, plain: true });
  },
  readout(s) {
    return `视界光程 ${s.age}0 亿光年：圈外更远的光还没来得及抵达地球；${s.redshift === 1 ? '而且遥远星光因宇宙膨胀发生红移，能量变弱、波长超出人眼可见范围，夜空因此深邃漆黑。' : '关闭红移后远星依然亮，但受限于有限宇宙年龄，依然不会把整个夜空照白。'}`;
  },
};

/** 21. 我们身上的元素从哪儿来 */
export const cosmicElements: SimDef = {
  params: [
    { key: 'elem', label: '选一种身体里的元素', min: 0, max: 3, step: 1, value: 2, labels: ['氢(H·水分子)', '碳/氧(C/O·呼吸)', '钙/铁(Ca/Fe·骨骼血液)', '金(Au·重金属)'] },
  ],
  animated: false,
  draw(s) {
    const idx = Math.round(s.elem);
    const items = [
      { sym: 'H', name: '氢元素', src: '宇宙大爆炸（138 亿年前）', body: '占人体水分子里所有氢原子', color: '#74c0fc', icon: '💥' },
      { sym: 'C · O', name: '碳与氧元素', src: '中小与大质量恒星内部核聚变', body: '构成 DNA、蛋白质和呼吸的氧气', color: '#ffd43b', icon: '⭐' },
      { sym: 'Ca · Fe', name: '钙与铁元素', src: '大质量恒星演化与超新星爆发', body: '撑起骨骼的钙、运送氧气的血红蛋白铁', color: '#ff8787', icon: '🌟' },
      { sym: 'Au', name: '金与重元素', src: '两颗中子星激烈并合抛撒', body: '极度稀有的重元素被撒进太阳系星云', color: '#f59f00', icon: '🌀' },
    ][idx];

    return starBackdrop()
      + `<circle cx="146" cy="162" r="64" fill="${items.color}" opacity="0.22"/>`
      + `<circle cx="146" cy="162" r="46" fill="${items.color}"/>`
      + txt(146, 170, items.sym, { size: 22, color: '#1c1836', bold: true, plain: true })
      + txt(376, 98, `${items.icon} ${items.name}`, { size: 20, color: GOLD, bold: true, plain: true })
      + txt(376, 146, `宇宙锻造炉：`, { size: 12.5, color: '#c5b3e6', plain: true })
      + txt(376, 174, items.src, { size: 14.5, color: '#fff8dc', bold: true, plain: true })
      + txt(376, 222, `在你身体/地球里的角色：`, { size: 12.5, color: '#c5b3e6', plain: true })
      + txt(376, 250, items.body, { size: 13.5, color: '#a5d8ff', bold: true, plain: true });
  },
  readout(s) {
    const msgs = [
      '氢（H）诞生于 138 亿年前的宇宙大爆炸最初几分钟——你喝下的每口水里都带着宇宙开端的原初原子！',
      '碳（C）和氧（O）是恒星内部核聚变把氦原子核进一步拼出来的，恒星老去时吹进星云。',
      '钙（Ca）和铁（Fe）来自大质量恒星核心与超新星爆发，炸回星际云后才汇成地球和你的骨骼血液。',
      '比铁更重的金（Au）需要两颗中子星激烈并合时的极端环境才能炼成！',
    ];
    return msgs[Math.round(s.elem)];
  },
};
