import type { Story } from './types';

export const cmbAfterglow: Story = {
  slug: 'cmb-afterglow',
  title: '宇宙大爆炸留下的“余晖”，现在还能看到、听到吗？',
  trigger: '小念听说老电视没信号时满屏跳动的“雪花”里，竟然藏着一丁点宇宙大爆炸留下的信号。',
  dialogue: [
    {
      nian: '爸爸，听说老电视的“雪花”里有一丁点来自宇宙大爆炸，大爆炸的光到现在还能收到吗？',
      dad: '真的能收到！1965 年，美国贝尔实验室的彭齐亚斯和威尔逊用一架大喇叭天线做实验，总有一点去不掉的“嘶嘶”噪声，连天线里的鸽子粪都清理干净了，它还在。后来才明白，那是从天空每个方向均匀传来的宇宙微波背景——大爆炸留下的“余晖”，两人因此获得了 1978 年诺贝尔物理学奖。',
    },
    {
      nian: '大爆炸的余晖为什么叫“微波背景”？它是宇宙一出生就放出来的光吗？',
      dad: '不是一出生就有的！刚诞生的宇宙像一锅几千度的滚烫“浓雾汤”，光一出发就撞上到处乱跑的电子，被弹来弹去。大约 38 万年后，宇宙冷却到约 3000 K，电子被原子核抓住组成原子，浓雾一下子散开，光终于能笔直飞行——这批光就是宇宙微波背景。',
    },
    {
      nian: '3000 K 那么烫，应该像烧红的铁一样发橙光呀，为什么现在变成了看不见的微波？',
      dad: '因为宇宙一直在膨胀！这批光在路上飞了一百多亿年，波长被不断伸展的空间拉长了约 1100 倍，就像橡皮筋上画的波浪，一拉就变宽变平。波长变长，温度也跟着降到只有约 2.7 K，也就是约零下 270 ℃，从橙红色的光变成了肉眼看不见的微波。',
      figure: {
        kind: 'sim',
        sim: 'cmbStretch',
        caption: '拖动“拉长倍数”，看 3000 K 的橙光怎样被宇宙膨胀拉成只有约 2.7 K 的微波。',
      },
    },
    {
      nian: '零下 270 ℃ 的微波那么冷，它是从天上哪个方向传来的呢？',
      dad: '四面八方都有！宇宙微波背景不是从某颗星星射来的，而是那一刻整个宇宙到处都在发光，所以今天无论把天线对准哪个方向，都能收到几乎一模一样的微波。我们就像站在一场大雾的正中央，最远处那层“雾墙”在各个方向离我们都一样远。',
    },
    {
      nian: '各个方向的微波温度完全一样吗？那后来的星系又是从哪儿冒出来的？',
      dad: '问到关键了！COBE（1989 年发射）、WMAP（2001 年）和普朗克卫星（2009 年）一次比一次看得细，发现不同方向的温度有极小的起伏，只差大约十万分之一。物质稍微密一点的地方引力更强，慢慢把周围的物质聚拢过来，经过漫长岁月，就长成了星系和星系团。',
    },
    {
      nian: '十万分之一的起伏就能长出星系！那我在家里也能“听到”宇宙微波背景吗？',
      dad: '可以碰碰运气！老式模拟电视没有信号时满屏跳动的“雪花”，大部分来自电视机自己和周围的电子噪声，但其中确实有一小部分来自宇宙微波背景。也就是说，人们每次调到空台，都在不经意间瞄了一眼宇宙 38 万岁时的“婴儿照”！',
    },
    {
      nian: '我懂了！宇宙 38 万岁时变透明，放出的第一批光被膨胀拉长约 1100 倍，变成如今约 2.7 K、充满整个天空的微波，它上面十万分之一的冷热斑点就是星系的种子！',
      dad: '总结得太棒了！下次看到漂亮的星系照片，你可以想一想：它们的“种子”早在宇宙微波背景这张最古老的婴儿照上就埋下了。',
    },
  ],
  tip: '可以和孩子做“拉长波浪”小实验：在一根宽橡皮筋上用笔画几道密密的波浪线，再慢慢拉长，波浪会变宽变平，正好类比宇宙膨胀把光的波长拉长、温度变低。拉橡皮筋时别对着脸，防止弹到眼睛。',
  sources: [
    { title: '普通高中教科书 物理 选择性必修第二册·电磁波谱', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Planck and the cosmic microwave background', by: 'ESA', url: 'https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_and_the_cosmic_microwave_background' },
    { title: 'Tests of Big Bang: The CMB', by: 'NASA WMAP Science Team', url: 'https://map.gsfc.nasa.gov/universe/bb_tests_cmb.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '鸽子粪也赶不走的噪声',
        duration: 9,
        cues: [
          { kind: 'text', at: [600, 110], text: '1965 年贝尔实验室', size: 'm', color: '#5b3e96', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [380, 540], size: [300, 160], color: '#adb5bd', text: '喇叭天线', from: 0.4 },
          { kind: 'sprite', icon: '🐦', path: [[380, 440], [720, 220]], size: 64, travel: 2, wobble: true, from: 1.0 },
          { kind: 'wave', a: [1080, 220], b: [560, 500], wavelength: 70, amplitude: 18, color: '#74c0fc', from: 2.4 },
          { kind: 'label', at: [380, 540], pos: [380, 780], text: '去不掉的嘶嘶声', color: '#e8590c', from: 3.6 },
        ],
      },
      {
        turn: 1,
        title: '38 万岁：浓雾散开',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [340, 440], size: [440, 460], color: '#ffd8a8', text: '浓雾汤', from: 0, to: 4.6 },
          { kind: 'particles', box: [140, 230, 400, 420], count: 30, color: '#ff922b', motion: 'gas', size: 10, from: 0.2, to: 4.6 },
          { kind: 'count', at: [880, 220], label: '宇宙年龄', start: 0, end: 38, unit: '万年', over: 3.5, from: 0.6 },
          { kind: 'ray', path: [[180, 520], [1080, 520]], color: '#ff922b', draw: 1.6, from: 4.6 },
          { kind: 'text', at: [600, 780], text: '电子被抓进原子，光自由了', size: 'm', color: '#5d4e37', from: 5.4 },
        ],
      },
      {
        turn: 2,
        title: '被拉长 1100 倍的光',
        duration: 10,
        cues: [
          { kind: 'wave', a: [140, 330], b: [520, 330], wavelength: 40, amplitude: 26, color: '#ff922b', from: 0.3 },
          { kind: 'label', at: [330, 310], pos: [330, 170], text: '3000 K 橙光', color: '#e8590c', from: 0.9 },
          { kind: 'arrow', path: [[560, 330], [680, 330]], color: '#5b3e96', text: '空间膨胀', from: 2.0 },
          { kind: 'wave', a: [720, 330], b: [1080, 330], wavelength: 200, amplitude: 26, color: '#74c0fc', from: 3.0 },
          { kind: 'label', at: [900, 310], pos: [900, 170], text: '2.7 K 微波', color: '#1c7ed6', from: 3.8 },
          { kind: 'count', at: [600, 640], label: '波长拉长', start: 1, end: 1100, unit: '倍', over: 3, from: 4.6 },
        ],
      },
      {
        turn: 3,
        title: '四面八方都有微波',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [620, 620], color: '#e5dbff', outline: true, from: 0.2 },
          { kind: 'atom', path: [[600, 460]], symbol: '地球', color: '#4dabf7', r: 42, from: 0.3 },
          { kind: 'flow', path: [[600, 160], [600, 410]], color: '#74c0fc', count: 5, from: 1.0 },
          { kind: 'flow', path: [[600, 760], [600, 510]], color: '#74c0fc', count: 5, from: 1.2 },
          { kind: 'flow', path: [[300, 460], [550, 460]], color: '#74c0fc', count: 5, from: 1.4 },
          { kind: 'flow', path: [[900, 460], [650, 460]], color: '#74c0fc', count: 5, from: 1.6 },
          { kind: 'myth', wrong: '余晖来自天上某一颗星', right: '它从四面八方同时传来', from: 3.0 },
        ],
      },
      {
        turn: 4,
        title: '十万分之一的冷热斑',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 170], size: [440, 90], color: '#5b3e96', text: '普朗克卫星', from: 0.3 },
          { kind: 'particles', box: [200, 260, 800, 340], count: 36, color: '#ffa94d', motion: 'jitter', size: 15, from: 0.8 },
          { kind: 'particles', box: [230, 280, 760, 300], count: 28, color: '#74c0fc', motion: 'jitter', size: 13, from: 1.0 },
          { kind: 'text', at: [600, 700], text: '温度起伏只有十万分之一', size: 'm', color: '#5b3e96', from: 2.4 },
          { kind: 'text', at: [600, 810], text: '密一点的地方长成星系', size: 's', color: '#2f8a57', from: 4.4 },
        ],
      },
      {
        turn: 5,
        title: '电视雪花里的余晖',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [480, 340], color: '#495057', from: 0.2 },
          { kind: 'particles', box: [390, 290, 420, 280], count: 40, color: '#f1f3f5', motion: 'jitter', size: 6, from: 0.5 },
          { kind: 'particles', box: [400, 300, 400, 260], count: 4, color: '#74c0fc', motion: 'jitter', size: 10, from: 1.8 },
          { kind: 'label', at: [600, 430], pos: [960, 200], text: '一小部分来自宇宙', color: '#1c7ed6', from: 2.6 },
          { kind: 'text', at: [600, 790], text: '调到空台也能瞄见婴儿照', size: 'm', color: '#5d4e37', from: 3.6 },
        ],
      },
    ],
  },
};
