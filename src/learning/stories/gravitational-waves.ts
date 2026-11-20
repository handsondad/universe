import type { Story } from './types';

export const gravitationalWaves: Story = {
  slug: 'gravitational-waves',
  title: '13 亿光年外两个黑洞相撞，地球上的科学家是怎么“听”到的？',
  trigger: '小念听说 2015 年科学家“听”到了 13 亿光年外两个黑洞相撞，可太空里没有空气，声音根本传不过来呀。',
  dialogue: [
    {
      nian: '爸爸，太空里没有空气传声音，13 亿光年外两个黑洞相撞，科学家怎么“听”到的？',
      dad: '好问题！科学家“听”的不是声音，而是时空本身的涟漪，叫作引力波。大约一百年前，爱因斯坦就根据广义相对论预言：大质量天体剧烈运动时，会让时空像被搅动的水面一样泛起一圈圈波纹，以光速传向四面八方。',
    },
    {
      nian: '时空的涟漪看不见也摸不着，它扫过地球的时候会发生什么？',
      dad: '它会把空间轻轻地一会儿拉长、一会儿压扁，而且一个方向拉长时，和它垂直的方向就压扁。只不过这种伸缩小得离谱：传到地球时，4 千米长的距离只会变化不到质子直径的百分之一，任何尺子和人的感觉都根本察觉不到。',
    },
    {
      nian: '不到质子直径的百分之一，到底要用什么尺子才量得出来？',
      dad: '用光当尺子！LIGO 激光干涉仪有两条各 4 千米长、互相垂直的真空管道。一束激光被分成两半，分别在两条臂里来回反射，再汇合到一起。平时两束光正好互相抵消；引力波一来，一条臂变长、另一条变短，两束光就对不齐了，探测器上马上闪出信号。',
    },
    {
      nian: '两束激光对不齐的那一刻，科学家看到的信号是什么样子的？',
      dad: '2015 年 9 月 14 日，美国两台相隔约 3000 千米的 LIGO 前后相差约 7 毫秒，记录到同一个波形：频率和幅度一起越升越高，最后戛然而止，像小鸟“啾”的一声，科学家叫它“啁啾”。这正是两个黑洞绕着转圈、越转越快、最后撞在一起的过程！',
      figure: {
        kind: 'sim',
        sim: 'gwChirp',
        caption: '改变两个黑洞的总质量和距离，看“啁啾”波形怎样变化，激光臂又伸缩了多少。',
      },
    },
    {
      nian: '两个黑洞撞在一起，到底有多大的威力，能让 13 亿光年外都感觉到？',
      dad: '大得惊人！这两个黑洞分别约是太阳质量的 29 倍和 36 倍，合并后只剩约 62 倍。少掉的约 3 个太阳质量，在不到一秒内全变成引力波的能量甩了出去！那一瞬间释放的功率，比整个可观测宇宙里所有恒星发光加起来还要猛。',
    },
    {
      nian: '把 3 个太阳质量变成能量甩出去，爱因斯坦的预言等了多少年才被证实？',
      dad: '整整等了约一百年！引力波实在太微弱，几代科学家花了几十年才把探测器做得足够灵敏。2017 年，为 LIGO 和引力波探测作出决定性贡献的韦斯、巴里什和索恩获得了诺贝尔物理学奖。从此，人类多了一只“听”宇宙的新耳朵。',
    },
    {
      nian: '我明白了！引力波是时空本身的涟漪：两个黑洞越转越快撞在一起，把约 3 个太阳质量变成引力波甩向四方；它扫过地球时，4 千米长的激光臂伸缩不到质子直径的百分之一，被 LIGO 精确“听”到了！',
      dad: '满分总结！以前天文学家只能用光“看”宇宙，现在还能用引力波“听”宇宙，说不定将来你会用它发现我们从没想到过的天体。',
    },
  ],
  tip: '可以在脸盆里装满水，让孩子用两根手指在水面中央快速画小圈，观察一圈圈向外扩散的水波，体会“绕转的天体搅动时空涟漪”。还可以一起上 LIGO 官网，听一听把 GW150914 信号转换成声音后那一声短促的“啾”。',
  sources: [
    { title: '普通高中教科书 物理 必修第二册·相对论时空观与牛顿力学的局限性', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Gravitational Waves Detected 100 Years After Einstein’s Prediction', by: 'LIGO Caltech', url: 'https://www.ligo.caltech.edu/news/ligo20160211' },
    { title: 'The Nobel Prize in Physics 2017 — Press release', by: 'NobelPrize.org', url: 'https://www.nobelprize.org/prizes/physics/2017/press-release/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '时空的涟漪',
        duration: 9,
        cues: [
          { kind: 'pulse', at: [600, 430], color: '#7a5cc4', radius: 420, rate: 0.7, from: 0.2 },
          { kind: 'flow', path: [[690, 430], [664, 494], [600, 520], [536, 494], [510, 430], [536, 366], [600, 340], [664, 366], [690, 430]], color: '#1c1836', loop: true, count: 2, speed: 300, size: 30, from: 0.2 },
          { kind: 'label', at: [690, 430], pos: [980, 250], text: '两个黑洞绕转', color: '#5b3e96', from: 1.2 },
          { kind: 'text', at: [600, 160], text: '爱因斯坦1916年预言', size: 'm', color: '#5d4e37', from: 2.2 },
          { kind: 'myth', wrong: '科学家听到了黑洞的撞击声', right: '探测到的是时空本身的涟漪', from: 4.5 },
        ],
      },
      {
        turn: 1,
        title: '一边拉长一边压扁',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [300, 300], color: '#d0bfff', text: '一块空间', motion: 'pulse', from: 0.2 },
          { kind: 'arrow', path: [[770, 420], [940, 420]], color: '#e8590c', text: '拉长', from: 1 },
          { kind: 'arrow', path: [[430, 420], [260, 420]], color: '#e8590c', from: 1 },
          { kind: 'arrow', path: [[600, 160], [600, 250]], color: '#3b6ea5', text: '压扁', from: 1.8 },
          { kind: 'arrow', path: [[600, 680], [600, 590]], color: '#3b6ea5', from: 1.8 },
          { kind: 'text', at: [600, 780], text: '变化不到质子的百分之一', size: 'm', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '用激光当尺子',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [660, 620], size: [600, 22], color: '#adb5bd', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [360, 390], size: [22, 460], color: '#adb5bd', from: 0.2 },
          { kind: 'ray', path: [[140, 620], [360, 620], [960, 620]], color: '#ff6b6b', draw: 1.5, from: 1 },
          { kind: 'ray', path: [[360, 620], [360, 160]], color: '#ff6b6b', draw: 1.5, from: 1.6 },
          { kind: 'label', at: [960, 620], pos: [1000, 480], text: '4千米激光臂', color: '#5b3e96', from: 2.6 },
          { kind: 'label', at: [360, 160], pos: [620, 170], text: '互相垂直', color: '#5b3e96', from: 3.2 },
          { kind: 'text', at: [700, 330], text: '两束光对不齐→出信号', size: 'm', color: '#e8590c', from: 4.6 },
        ],
      },
      {
        turn: 3,
        title: '“啾”的一声',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [320, 240], size: [260, 90], color: '#a5d8ff', text: '汉福德', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [880, 240], size: [260, 90], color: '#a5d8ff', text: '利文斯顿', from: 0.5 },
          { kind: 'wave', a: [140, 470], b: [1060, 470], amplitude: 40, wavelength: 130, speed: 320, color: '#7a5cc4', from: 1.2 },
          { kind: 'wave', a: [140, 620], b: [1060, 620], amplitude: 60, wavelength: 70, speed: 320, color: '#e8590c', from: 2.6 },
          { kind: 'label', at: [1000, 620], pos: [980, 760], text: '越来越快、越来越强', color: '#e8590c', from: 3.6 },
          { kind: 'text', at: [600, 120], text: '2015年9月14日', size: 'm', color: '#5d4e37', from: 0.8 },
          { kind: 'text', at: [600, 340], text: '两地相差约7毫秒', size: 's', color: '#5b3e96', from: 4.6 },
        ],
      },
      {
        turn: 4,
        title: '3个太阳化成波',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 430], size: [150, 150], color: '#1c1836', text: '29倍', slide: { to: [560, 430], at: 0.6, over: 2.2 }, from: 0, to: 3.2 },
          { kind: 'shape', shape: 'circle', at: [840, 430], size: [170, 170], color: '#1c1836', text: '36倍', slide: { to: [640, 430], at: 0.6, over: 2.2 }, from: 0, to: 3.2 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [220, 220], color: '#1c1836', text: '62倍', motion: 'grow', over: 1, from: 2.9 },
          { kind: 'pulse', at: [600, 430], color: '#7a5cc4', radius: 430, rate: 1.4, from: 3 },
          { kind: 'count', at: [600, 750], label: '化成引力波', start: 0, end: 3, unit: '个太阳质量', over: 2, from: 4 },
        ],
      },
      {
        turn: 5,
        title: '等了约一百年',
        duration: 8,
        cues: [
          { kind: 'count', at: [330, 400], label: '预言到证实', start: 0, end: 100, unit: '年', over: 2.5, from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [860, 400], size: [380, 120], color: '#ffd43b', text: '诺贝尔物理奖', from: 2 },
          { kind: 'text', at: [860, 560], text: '2017年韦斯等三人获奖', size: 's', color: '#5d4e37', from: 3 },
          { kind: 'text', at: [600, 740], text: '人类有了“听”宇宙的耳朵', size: 'm', color: '#5b3e96', from: 4.6 },
        ],
      },
    ],
  },
};
