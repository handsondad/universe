import type { Story } from './types';

export const habitableZone: Story = {
  slug: 'habitable-zone',
  title: '科学家找“第二个地球”时，为什么总先看那里有没有液态水？',
  trigger: '小念看到新闻说科学家在几十光年外发现了一颗“落在宜居带的超级地球”，好奇为什么总先找水。',
  dialogue: [
    {
      nian: '爸爸，新闻里一说找到“第二个地球”，总先提有没有液态水，外星生命不能不喝水吗？',
      dad: '理论上有可能有完全不同的外星生命，但科学家先找液态水是最靠谱的线索！液态水是宇宙里罕见的“万能小搬运工”：它能溶解营养物质让化学反应发生，还能吸收储存大量热量，帮行星稳住温差。',
    },
    {
      nian: '液态水这么重要！那一颗行星离恒星多远，才能刚好留住液态水呢？',
      dad: '就像童话里金发姑娘选粥——不能太烫也不能太凉！离恒星太近，海水会被烤沸蒸发；离得太远，海洋会冻成死冰块。中间这圈温度刚好让水保持液态的距离，天文学家就叫它“宜居带”。',
      figure: {
        kind: 'sim',
        sim: 'habitableBand',
        caption: '拖动行星与恒星的距离，看看过近沸腾、过远结冰和落入宜居带时的表面状态。',
      },
    },
    {
      nian: '那只要一颗行星正好落在宜居带里，上面就一定有海洋和外星人了吗？',
      dad: '可没那么简单！比如火星就在太阳宜居带的外边缘，可火星太小、磁场又弱，大气早被太阳风吹跑大半，地表又冷又干；金星在宜居带内边缘，却因温室效应失控热成了烤箱。所以大气和磁场同样关键！',
    },
    {
      nian: '宜居带还要挑大气和磁场！可遥远的系外行星又不发光，科学家怎么发现它们的？',
      dad: '最常用的一招叫“凌星法”！盯紧一颗遥远的恒星，如果每隔固定几天它的亮度就极其微小地暗掉万分之一，就像一只小飞虫定期从大灯泡前面飞过，那就说明有颗行星正绕着它转！',
    },
    {
      nian: '那到现在为止，人类已经找到多少颗太阳系以外的行星啦？',
      dad: '从 1995 年确认第一颗绕类太阳恒星运行的系外行星到现在，NASA 在 2025 年 9 月宣布确认的系外行星已经超过 6000 颗！韦布望远镜还能分析星光穿过它们大气层留下的光谱指纹，寻找水蒸气、二氧化碳和甲烷的踪迹。',
    },
    {
      nian: '我明白了！因为液态水最适合孕育生命，科学家会先用凌星法找落在恒星宜居带里的行星，再看它有没有合适的大气和磁场！',
      dad: '说得非常严谨！宇宙里有几千亿个星系，保持好奇心，说不定不久的将来我们就会听到太阳系外生命线索的好消息。',
    },
  ],
  tip: '除了恒星周围的宜居带，太阳系里的木卫二（欧罗巴）和土卫二（恩克拉多斯）虽然远离太阳、表面是厚冰壳，却靠潮汐加热在冰下藏着液态海洋，同样是寻找地外微生物的热门目标。',
  sources: [
    { title: 'Exoplanets — The Habitable Zone & Transit Method', by: 'NASA Science', url: 'https://science.nasa.gov/exoplanets/habitable-zone/' },
    { title: '普通高中地理教科书 必修第一册·宇宙中的地球', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '为什么液态水是生命摇篮',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [190, 190], color: '#4dabf7', text: '液态水 H₂O', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [260, 430], size: [210, 82], color: '#51cf66', text: '溶解运送养分', from: 1.0 },
          { kind: 'shape', shape: 'pill', at: [940, 430], size: [210, 82], color: '#ffd43b', text: '缓冲昼夜温差', from: 1.8 },
          { kind: 'text', at: [600, 680], text: '地球已知生命全都离不开水', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 1,
        title: '不冷不热的恒星宜居带',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [160, 440], size: [150, 150], color: '#f59f00', text: '恒星', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [260, 320], color: '#b2f2bb', text: '宜居带', from: 0.4 },
          { kind: 'atom', path: [[360, 440]], symbol: '太烫', color: '#ff6b6b', r: 34, from: 1.0 },
          { kind: 'atom', path: [[600, 440]], symbol: '地球', color: '#4dabf7', r: 40, from: 1.6 },
          { kind: 'atom', path: [[920, 440]], symbol: '太冷', color: '#a5d8ff', r: 34, from: 2.2 },
        ],
      },
      {
        turn: 2,
        title: '除宜居带外还要看大气',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [360, 420], size: [250, 96], color: '#e8590c', text: '火星气太薄', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [840, 420], size: [250, 96], color: '#ffd43b', text: '地球大气全', from: 1.2 },
          { kind: 'myth', wrong: '只要在宜居带就一定有生命', right: '还需合适大气、磁场与漫长演化', from: 2.2 },
        ],
      },
      {
        turn: 3,
        title: '凌星法：盯住星光微微变暗',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 390], size: [210, 210], color: '#ffd43b', text: '遥远恒星', from: 0 },
          { kind: 'atom', path: [[340, 390], [860, 390]], symbol: '行星', color: '#1c1836', r: 22, travel: 4.5, from: 0.8 },
          { kind: 'meter', at: [600, 660], label: '测得星光亮度', start: 0.95, end: 0.88, color: '#5b3e96', over: 2.0, from: 2.2 },
          { kind: 'text', at: [600, 760], text: '行星挡住微弱星光现身形', size: 'm', color: '#5d4e37', from: 3.4 },
        ],
      },
    ],
  },
};
