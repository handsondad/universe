import { arrow, BLUE, GOLD, GREEN, HOT, n, r1, starBackdrop, SUN, txt, type SimDef } from './kit';

/** 22. 大气层窗口与太空望远镜 */
export const spaceScopeWindow: SimDef = {
  params: [
    { key: 'band', label: '观测电磁波段', min: 0, max: 2, step: 1, value: 1, labels: ['可见光(有抖动)', '红外线(韦布看早期星系)', '紫外/X射线(高能天体)'] },
  ],
  animated: true,
  still: 0.7,
  draw(s, t) {
    const band = Math.round(s.band);
    const blocked = band !== 0;
    const wobble = Math.sin(t * 7) * 5;
    const beamColor = band === 0 ? '#ffd43b' : band === 1 ? '#ff6b6b' : '#b197fc';
    const bandName = band === 0 ? '可见光：能穿过大气，但被气流搅糊' : band === 1 ? '中远红外线：大部分被大气水汽和二氧化碳挡住' : '紫外线与 X 射线：几乎被高层大气完全吸收';

    return starBackdrop()
      + `<rect x="24" y="138" width="512" height="58" rx="10" fill="#74c0fc" opacity="0.24"/>`
      + txt(86, 172, '地球大气层', { size: 13, color: '#a5d8ff', bold: true, plain: true })
      + `<rect x="24" y="232" width="512" height="56" rx="10" fill="#3f8f4e" opacity="0.7"/>`
      + txt(86, 264, '地面天文台', { size: 13, color: '#fff', bold: true, plain: true })
      + `<rect x="192" y="64" width="46" height="24" rx="6" fill="#ffd43b"/>`
      + txt(215, 54, '太空望远镜', { size: 12, color: GOLD, bold: true, plain: true })
      + arrow(215, 22, 215, 62, beamColor, 4)
      + (blocked
        ? arrow(392, 22, 392, 152, beamColor, 4)
          + txt(392, 176, '✕ 被大气层挡住！', { size: 13.5, color: '#ff8787', bold: true, plain: true })
        : arrow(392, 22, 392, 138, beamColor, 4)
          + `<path d="M 392 138 Q ${n(392 + wobble)} 180 392 230" fill="none" stroke="${beamColor}" stroke-width="3.5"/>`
          + txt(392, 214, '气流扰动 → 星星眨眼变糊', { size: 12, color: '#ffe066', plain: true }))
      + txt(280, 298, bandName, { size: 12, color: '#fff8dc', bold: true, plain: true });
  },
  readout(s) {
    const band = Math.round(s.band);
    if (band === 0) return '可见光虽能到达地面，但大气冷热气流会让星光抖动变糊；在太空里的哈勃望远镜可以拍出极其锐利的星像。';
    if (band === 1) return '宇宙早期星系的光被红移拉长成了红外线，地面大气会挡住它，所以必须把韦布望远镜送到太空并在低温下观测！';
    return '紫外线和 X 射线会被地球高层大气吸收（保护了生命），因此研究黑洞和高温星云只能靠太空望远镜。';
  },
};

/** 23. 恒星宜居带与液态水 */
export const habitableBand: SimDef = {
  params: [
    { key: 'dist', label: '行星距恒星距离', min: 0.4, max: 2.2, step: 0.1, value: 1.0, unit: ' AU' },
  ],
  animated: false,
  draw(s) {
    const d = s.dist;
    const tooHot = d < 0.85;
    const tooCold = d > 1.45;
    const px = 94 + ((d - 0.4) / 1.8) * 412;
    const state = tooHot ? '太热 → 水全煮成水蒸气' : tooCold ? '太冷 → 水全冻成厚冰壳' : '宜居带 → 刚好留住液态水！';
    const pColor = tooHot ? '#ff6b6b' : tooCold ? '#a5d8ff' : BLUE;

    return starBackdrop()
      + `<circle cx="52" cy="162" r="42" fill="${SUN}"/>`
      + txt(52, 168, '恒星', { size: 14, color: '#5d3200', bold: true, plain: true })
      + `<rect x="197" y="66" width="138" height="192" rx="14" fill="${GREEN}" opacity="0.28" stroke="#69db7c" stroke-width="1.5" stroke-dasharray="5 5"/>`
      + txt(266, 90, '液态水宜居带', { size: 13.5, color: '#8ce99a', bold: true, plain: true })
      + `<line x1="94" y1="162" x2="516" y2="162" stroke="#8d82c4" stroke-width="2" stroke-dasharray="4 4"/>`
      + `<circle cx="${n(px)}" cy="162" r="20" fill="${pColor}" stroke="#fff" stroke-width="2.5"/>`
      + txt(px, 206, `${r1(d)} AU`, { size: 13, color: '#fff8dc', bold: true, plain: true })
      + txt(280, 40, state, { size: 14.5, color: tooHot ? '#ffa8a8' : tooCold ? '#a5d8ff' : '#8ce99a', bold: true, plain: true })
      + txt(280, 290, '除距离外，大气温室效应和磁场也共同决定一颗行星能不能孕育生命', { size: 11.5, color: '#c5b3e6', plain: true });
  },
  readout(s) {
    if (s.dist < 0.85) return `距恒星 ${r1(s.dist)} AU（过近）：光照太猛，海洋会沸腾蒸发成浓密水蒸气，像金星一样失控升温。`;
    if (s.dist > 1.45) return `距恒星 ${r1(s.dist)} AU（过远）：阳光稀薄，表面水会冻结成冰，生物化学反应极难进行。`;
    return `距恒星 ${r1(s.dist)} AU（落入宜居带）：温度不冷不热，配合合适大气压就能长久保留液态水（地球正好在 1.0 AU）。`;
  },
};

/** 24. 鹊桥中继卫星：月球背面通信接力 */
export const relayMoonLink: SimDef = {
  params: [
    { key: 'relay', label: '是否部署“鹊桥”中继星', min: 0, max: 1, step: 1, value: 1, labels: ['没有中继星', '部署在地月L2点'] },
  ],
  animated: true,
  still: 0.9,
  draw(s, t) {
    const hasRelay = s.relay === 1;
    const ex = 98;
    const ey = 176;
    const mx = 312;
    const my = 176;
    const rx = 468;
    const ry = 88;
    const prog = (t * 0.7) % 1;
    let signal = '';
    if (hasRelay) {
      const p1x = mx + 34 + (rx - (mx + 34)) * prog;
      const p1y = my + (ry - my) * prog;
      const p2x = rx + (ex - rx) * prog;
      const p2y = ry + (ey - ry) * prog;
      signal = `<line x1="${mx + 34}" y1="${my}" x2="${rx}" y2="${ry}" stroke="#69db7c" stroke-width="2.5" stroke-dasharray="6 4"/>`
        + `<line x1="${rx}" y1="${ry}" x2="${ex + 30}" y2="${ey - 10}" stroke="#69db7c" stroke-width="2.5" stroke-dasharray="6 4"/>`
        + `<circle cx="${n(p1x)}" cy="${n(p1y)}" r="5" fill="${GOLD}"/>`
        + `<circle cx="${n(p2x)}" cy="${n(p2y)}" r="5" fill="#69db7c"/>`
        + `<rect x="${rx - 14}" y="${ry - 8}" width="28" height="16" rx="4" fill="${GOLD}"/>`
        + txt(rx, ry - 18, '鹊桥中继星 (L2)', { size: 12.5, color: GOLD, bold: true, plain: true });
    } else {
      signal = arrow(mx + 38, my, mx + 86, my, '#ff6b6b', 3)
        + txt(215, 134, '✕ 无线电穿不过 3474 km 厚的月球石头！', { size: 13, color: '#ff8787', bold: true, plain: true });
    }

    return starBackdrop()
      + `<circle cx="${ex}" cy="${ey}" r="34" fill="${BLUE}"/>`
      + txt(ex, ey + 52, '地球测控站', { size: 12.5, color: '#cfe5f7', plain: true })
      + `<circle cx="${mx}" cy="${my}" r="34" fill="#d9d2c0"/>`
      + `<path d="M ${mx} ${my - 34} A 34 34 0 0 1 ${mx} ${my + 34} Z" fill="#8b8478"/>`
      + `<circle cx="${mx + 34}" cy="${my}" r="6" fill="${HOT}" stroke="#fff" stroke-width="1.5"/>`
      + txt(mx, my + 52, '月球（右侧为背面）', { size: 12.5, color: '#fff8dc', plain: true })
      + txt(mx + 62, my + 24, '嫦娥着陆器', { size: 11.5, color: '#ff9f43', bold: true, plain: true })
      + signal
      + txt(280, 40, hasRelay ? '鹊桥同时看见月球背面和地球 → 搭起太空传话筒！' : '月球背对地球，无线电直线信号被月球本身彻底挡住', { size: 13.5, color: hasRelay ? '#8ce99a' : '#ffa8a8', bold: true, plain: true });
  },
  readout(s) {
    return s.relay === 1
      ? '“鹊桥”中继星绕地月 L2 点做晕轨道飞行，能同时看到月球背面和地球，把嫦娥四号、六号的指令与月背照片顺畅接力传回家！'
      : '月球永远背向地球的那一面被厚厚的月体完全遮挡，没有中继卫星时，嫦娥着陆器发出的无线电波无法直接传回地球。';
  },
};
