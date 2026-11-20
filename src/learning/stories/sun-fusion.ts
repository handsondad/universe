import type { Story } from './types';

export const sunFusion: Story = {
  slug: 'sun-fusion',
  title: '太空里没有氧气，太阳凭什么“烧”了 46 亿年还不灭？',
  trigger: '科学课上小念把玻璃杯罩在蜡烛上，火苗几秒就熄灭了，可太阳在没空气的太空里天天发烫。',
  dialogue: [
    {
      nian: '爸爸，蜡烛没了氧气马上就灭，太空里连空气都没有，太阳怎么烧了 46 亿年？',
      dad: '因为太阳压根就不是在“烧火”！蜡烛燃烧需要氧气参加化学反应，如果太阳真的是一大坨煤炭，哪怕烧完整个太阳质量也撑不过几千年。太阳发光的真正秘密，是核心里轰轰烈烈的“核聚变”。',
    },
    {
      nian: '核聚变不需要氧气吗？太阳核心里到底在发生什么？',
      dad: '太阳实在太重了，自身引力把核心压到比钢铁还密十多倍、温度飙到 1500 万摄氏度！在这种极端高压高温下，原本互相排斥的氢原子核被硬生生撞在一起，每四个氢核拼成一个氦核。',
      eq: '4 ¹H → ⁴He + 巨大能量（E = mc²）',
      figure: {
        kind: 'sim',
        sim: 'solarFusion',
        caption: '把太阳核心温度慢慢调高到 1500 万℃，看氢原子核冲破斥力聚变成氦核并释放光热。',
      },
    },
    {
      nian: '四个氢原子核拼成一个氦原子核，怎么就变出那么多光和热了呢？',
      dad: '你把拼完后的氦核称一下会大吃一惊：它比原来的四个氢核轻了大约千分之七！爱因斯坦的质能方程 E = mc² 告诉我们，这点消失的质量并没有白丢，而是乘以光速的平方，化成了滚滚光和热！',
    },
    {
      nian: '每秒消失一点质量，太阳会不会很快就把自己“瘦”没了？',
      dad: '太阳每秒大约把 400 万吨质量变成阳光撒向宇宙，听着吓人，但太阳总质量是地球的 33 万倍！照这个花法，太阳核心的氢燃料足够稳稳照耀大约 100 亿年，现在 46 亿岁刚好人到中年。',
    },
    {
      nian: '核心发出的阳光，是不是一瞬间就从太阳表面射到地球了？',
      dad: '这可有趣极了！光子从太阳表面飞到地球只需要 8 分 20 秒，可它从太阳核心挤到太阳表面却要磕磕绊绊走上几万甚至十几万年，因为太阳内部实在太拥挤，光子刚走一毫米就被撞歪方向。',
    },
    {
      nian: '我明白了！太阳不是靠氧气燃烧，而是靠核心 1500 万℃ 高温高压把氢核聚变成氦核，用一点点质量亏损换来能亮百亿年的光和热！',
      dad: '太棒了！现在全世界的科学家也在研究“人造太阳”可控核聚变，就是想向太阳学习这份清洁又无穷的能源本领。',
    },
  ],
  tip: '太阳发光不是氧化燃烧，因此太空无氧完全不影响恒星发光。切记提醒孩子不要用肉眼或望远镜直接看太阳，瞬间强光会永久灼伤视网膜。',
  sources: [
    { title: '义务教育物理教科书 九年级全一册·核能与太阳能', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Sun: Facts & Interior Nuclear Fusion', by: 'NASA Science', url: 'https://science.nasa.gov/sun/facts/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '太阳不是靠氧气烧煤炭',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [210, 210], color: '#f59f00', text: '太阳 46亿岁', from: 0 },
          { kind: 'pulse', at: [600, 420], color: '#ffd43b', radius: 190, from: 0.4 },
          { kind: 'myth', wrong: '太阳像烧煤一样需要氧气', right: '核心是无需氧气的氢核聚变', from: 2.0 },
        ],
      },
      {
        turn: 1,
        title: '核心高温撞出核聚变',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[260, 430], [560, 430]], symbol: 'H', color: '#4dabf7', r: 36, travel: 2.4, from: 0.4, to: 3.0 },
          { kind: 'atom', path: [[940, 430], [640, 430]], symbol: 'H', color: '#4dabf7', r: 36, travel: 2.4, from: 0.4, to: 3.0 },
          { kind: 'pulse', at: [600, 430], color: '#ff922b', radius: 170, from: 2.8 },
          { kind: 'atom', path: [[600, 430]], symbol: 'He', color: '#ffd43b', r: 52, from: 2.9 },
          { kind: 'formula', at: [600, 680], text: '4 H → He + 能量', color: '#e8590c', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '极小质量亏损换巨额能量',
        duration: 7,
        cues: [
          { kind: 'formula', at: [600, 340], text: 'E = mc²', color: '#5b3e96', from: 0.3 },
          { kind: 'count', at: [600, 520], label: '每秒转化质量', start: 0, end: 400, unit: '万吨', over: 2.6, from: 1.0 },
          { kind: 'text', at: [600, 710], text: '极小质量亏损点亮太阳系', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '46 亿岁正值稳稳中年',
        duration: 7,
        cues: [
          { kind: 'meter', at: [600, 410], label: '氢燃料进度', start: 0, end: 0.46, color: '#f59f00', over: 2.8, from: 0.4 },
          { kind: 'text', at: [600, 580], text: '还能稳定发光约 50 亿年', size: 'l', color: '#2f8a57', from: 2.2 },
        ],
      },
    ],
  },
};
