import type { Story } from './types';

export const darkNightSky: Story = {
  slug: 'dark-night-sky',
  title: '宇宙里有那么多亿颗星星，为什么夜晚的天空还是黑的？',
  trigger: '夏夜数星星时，小念听说宇宙里有比地球所有沙粒还多的恒星，疑惑为什么夜空没有亮成白昼。',
  dialogue: [
    {
      nian: '爸爸，宇宙里恒星多得数不清，照理说望向天空哪儿都有一颗星星，夜空为什么是黑的？',
      dad: '小念一下子问出了困扰天文学家几百年的经典名题——“奥伯斯佯谬”！如果宇宙既无限大、又存在了无限久、星星还密密麻麻分布，你站在大森林里一眼望去全是树干，夜空确实应该像太阳表面一样刺眼！',
    },
    {
      nian: '既然森林里一眼望去全是树干，那夜空发黑是不是说明宇宙里的“树”离得太远暗掉了？',
      dad: '单靠距离变暗还不够解释！星星远 10 倍，单颗虽暗了 100 倍，但那个更远圆壳里的星星数量也正好多了 100 倍，一抵消每一层总亮度居然一样！夜空发黑的第一个真正原因，是宇宙只有约 138 亿岁——更远恒星的光还在路上，还没跑到地球！',
      figure: {
        kind: 'sim',
        sim: 'olbersNight',
        caption: '调节可见宇宙光程上限与膨胀红移开关，看有限年龄和红移如何共同造就深邃黑夜。',
      },
    },
    {
      nian: '宇宙只有 138 亿岁，所以更远的光还没来得及跑到地球！那还有第二个原因吗？',
      dad: '有！就是咱们刚聊过的“宇宙膨胀红移”。极遥远的星系发出的可见光，在奔向地球的几十亿年里被不断伸展的空间拉得越来越长，等抵达地球时已经被拉成了人眼根本看不见的红外线甚至微波！',
    },
    {
      nian: '哇，照这么说，要是戴上能看见微波的特殊眼镜，夜晚的天空其实一点也不黑吗？',
      dad: '你猜得太准了！如果用射电望远镜看微波波段，整个天空各个方向真的都发出均匀微弱的“宇宙微波背景辐射”——那就是宇宙诞生 38 万年后发出的炽热光芒，被膨胀一路拉长冷却到了今天！',
    },
    {
      nian: '难怪古人觉得天黑很平常，原来连黑夜里都藏着宇宙大爆炸的线索吗？',
      dad: '没错！天文学家常说：“夜空为什么是黑的”看起来像个小孩子随口问的问题，其实正是最先证明宇宙有开端、而且正在演化的惊人线索。',
    },
    {
      nian: '我懂了！夜空不是亮成一片，一方面因为宇宙只有约 138 亿岁、更远的星光还没跑到地球，另一方面因为宇宙膨胀把极远星光拉红成了肉眼看不见的红外和微波！',
      dad: '讲得太透彻了！以后每次看见深邃的黑色夜空，都可以自豪地想起它正是宇宙有起点、会膨胀的安静证明。',
    },
  ],
  tip: '“奥伯斯佯谬”以 19 世纪德国天文学家奥伯斯命名，有趣的是，著名作家爱伦·坡在 1848 年的散文诗《我发现了》里就凭直觉猜出了“宇宙年龄有限，远光未至”这一核心答案。',
  sources: [
    { title: 'Why Is the Night Sky Dark? (Olbers’ Paradox)', by: 'NASA Science', url: 'https://science.nasa.gov/universe/overview/' },
    { title: 'Olbers’ Paradox & Cosmic Redshift', by: 'ESA / Hubble', url: 'https://esahubble.org/wordbank/redshift/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '无限森林里全是树干',
        duration: 8,
        cues: [
          { kind: 'particles', box: [220, 220, 760, 420], count: 40, color: '#ffd43b', motion: 'jitter', size: 12, from: 0.2 },
          { kind: 'text', at: [600, 430], text: '如果宇宙无限大又永恒…', size: 'l', color: '#e8590c', from: 1.0 },
          { kind: 'myth', wrong: '星星太远变暗才让夜空发黑', right: '年龄有限 + 膨胀红移才是真原因', from: 2.2 },
        ],
      },
      {
        turn: 1,
        title: '宇宙有限，远光仍在路上',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [360, 360], color: '#e5dbff', text: '可见宇宙边界', outline: true, from: 0.3 },
          { kind: 'atom', path: [[600, 450]], symbol: '地球', color: '#4dabf7', r: 34, from: 0.2 },
          { kind: 'atom', path: [[980, 450], [830, 450]], symbol: '远光', color: '#ffd43b', r: 24, travel: 4, from: 1.0 },
          { kind: 'label', at: [900, 420], pos: [930, 250], text: '还没来得及跑到地球！', color: '#e8590c', from: 1.8 },
        ],
      },
      {
        turn: 2,
        title: '膨胀把星光拉出可见范围',
        duration: 8,
        cues: [
          { kind: 'wave', a: [160, 340], b: [560, 340], wavelength: 48, amplitude: 24, color: '#ffd43b', from: 0.3 },
          { kind: 'arrow', path: [[580, 340], [660, 340]], color: '#5b3e96', text: '空间拉长', from: 1.2 },
          { kind: 'wave', a: [680, 340], b: [1040, 340], wavelength: 145, amplitude: 24, color: '#e03131', from: 1.6 },
          { kind: 'text', at: [600, 620], text: '变成人眼看不见的红外线和微波', size: 'm', color: '#5b3e96', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '微波眼下，全天都在微亮',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 440], size: [260, 96], color: '#1c1836', text: '人眼看漆黑', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [860, 440], size: [280, 96], color: '#74c0fc', text: '微波眼微亮', from: 1.4 },
          { kind: 'text', at: [600, 680], text: '黑色夜空藏着宇宙有起点的铁证', size: 'm', color: '#2f8a57', from: 2.6 },
        ],
      },
    ],
  },
};
