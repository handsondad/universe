import type { Story } from './types';

export const cometMeteor: Story = {
  slug: 'comet-meteor',
  title: '彗星的尾巴为什么总背着太阳，流星雨又是从哪里来的？',
  trigger: '小念在科普书上看到一颗拖着长尾巴的彗星，像一把扫过夜空的扫帚，书上却说它飞离太阳时，尾巴会跑到前面去。',
  dialogue: [
    {
      nian: '爸爸，彗星的尾巴是不是像飞机的尾烟一样，是它飞得太快拖在身后的？',
      dad: '很多人都这么以为，其实不是！彗星本身是个“脏雪球”，由冰、尘土和石块冻在一起，平时待在离太阳很远的地方，又冷又暗，根本没有尾巴。只有飞近太阳、被晒热了，尾巴才会长出来。',
    },
    {
      nian: '脏雪球被太阳晒热了，会像冰棍一样化成水吗？',
      dad: '不会化成水，而是直接变成气体！太空里几乎没有空气压着，冰被晒热后会从固体直接变成气体，这叫升华。气体带着尘埃从彗核里喷出来，先在彗核周围裹成一团朦胧的“彗发”，再被推成长长的彗尾。',
    },
    {
      nian: '彗尾是被什么推出来的，为什么总是背着太阳？',
      dad: '推它的就是太阳！太阳不停地往外吹出带电粒子组成的“太阳风”，阳光本身也会轻轻推东西。所以彗尾总是指向背离太阳的方向，像风里飘扬的头发，和彗星往哪儿飞关系不大，飞离太阳时尾巴甚至会跑到前面。',
      figure: {
        kind: 'sim',
        sim: 'cometTail',
        caption: '拖动彗星过近日点前后的天数，看两条彗尾怎样始终背向太阳，靠近太阳时又怎样变长。',
      },
    },
    {
      nian: '我在照片里看到彗星有两条尾巴，一蓝一白，它们都是被太阳风吹的吗？',
      dad: '你观察得真仔细！蓝色的是离子尾，由带电的气体组成，被太阳风直直地吹开，所以又细又直，正对着背离太阳的方向。白色的是尘埃尾，尘粒比较“重”，主要被阳光推着，又舍不得离开原来的轨道，就弯成一条宽宽的弧线。',
    },
    {
      nian: '弯弯的尘埃尾留下的尘粒，会一直飘在太空里吗？',
      dad: '会留在彗星的轨道上，排成一条长长的“尘埃带”！地球每年绕太阳转到同一个地方，就会穿过这条尘埃带。比沙粒还小的尘粒飞快地冲进大气，被烧得发出亮光，一下子划出许多亮线，这就是流星雨。',
    },
    {
      nian: '原来流星雨是地球穿过尘埃带！每年八月的英仙座流星雨也是这样来的吗？',
      dad: '正是！英仙座流星雨的尘粒来自一颗叫 109P/斯威夫特-塔特尔的彗星，它的彗核约 26 千米宽，大约 133 年绕太阳一圈。每年 8 月 12、13 日前后地球穿过它的尘埃带，尘粒以每秒约 59 千米的速度冲进大气，比子弹快几十倍。',
    },
    {
      nian: '我明白了！彗尾不是飞行时拖出的尾烟，而是太阳风和阳光吹出来的，所以总背着太阳；彗星沿途撒下的尘粒留在轨道上，地球每年穿过去，尘粒烧起来就是流星雨！',
      dad: '说得太好了！每年 8 月中旬找个远离灯光的地方，躺下来看英仙座流星雨，每一道亮光都是一颗彗星留下的小尘粒。',
    },
  ],
  tip: '观看英仙座流星雨不需要望远镜：选择远离城市灯光、空旷安全的场地，后半夜躺在防潮垫上用肉眼看最好；带好外套和驱蚊用品，先让眼睛在黑暗里适应一会儿再开始数流星，不要一直看手机屏幕。',
  sources: [
    { title: '义务教育科学教科书 六年级下册·宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'What Is a Comet?', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/comets/en/' },
    { title: 'Perseids', by: 'NASA Science', url: 'https://science.nasa.gov/solar-system/meteors-meteorites/perseids/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '冰冷的脏雪球',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[600, 430]], symbol: '彗核', color: '#868e96', r: 90, from: 0 },
          { kind: 'particles', box: [520, 350, 160, 160], count: 10, color: '#e7f5ff', motion: 'jitter', size: 9, from: 0.8 },
          { kind: 'label', at: [660, 380], pos: [930, 230], text: '冰＋尘土＋石块', color: '#5b3e96', from: 1.4 },
          { kind: 'myth', wrong: '彗尾是飞太快拖出的尾烟', right: '彗尾是被太阳“吹”出来的', from: 3.0 },
        ],
      },
      {
        turn: 1,
        title: '冰直接变气体',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [640, 450], size: [260, 260], color: '#d0ebff', motion: 'grow', over: 2, from: 1.2 },
          { kind: 'shape', shape: 'circle', at: [130, 450], size: [180, 180], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'ray', path: [[230, 450], [500, 450]], color: '#ffd43b', from: 0.3 },
          { kind: 'atom', path: [[640, 450]], symbol: '彗核', color: '#868e96', r: 50, from: 0.4 },
          { kind: 'particles', box: [720, 360, 320, 180], count: 14, color: '#74c0fc', motion: 'gas', size: 7, from: 2.0 },
          { kind: 'label', at: [640, 400], pos: [640, 190], text: '升华：冰直接变气体', color: '#1c7ed6', from: 2.6 },
          { kind: 'label', at: [740, 520], pos: [860, 720], text: '朦胧的彗发', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '彗尾总背向太阳',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [160, 160], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'atom', path: [[300, 470]], symbol: '彗', color: '#868e96', r: 26, from: 0.4 },
          { kind: 'arrow', path: [[270, 470], [80, 470]], color: '#4dabf7', from: 0.8 },
          { kind: 'atom', path: [[600, 220]], symbol: '彗', color: '#868e96', r: 26, from: 1.6 },
          { kind: 'arrow', path: [[600, 190], [600, 60]], color: '#4dabf7', from: 2.0 },
          { kind: 'atom', path: [[900, 470]], symbol: '彗', color: '#868e96', r: 26, from: 2.8 },
          { kind: 'arrow', path: [[930, 470], [1130, 470]], color: '#4dabf7', text: '背离太阳', from: 3.2 },
          { kind: 'text', at: [600, 800], text: '飞离太阳时尾巴在前面', size: 's', color: '#e8590c', from: 4.4 },
        ],
      },
      {
        turn: 3,
        title: '一蓝一白两条尾',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [120, 450], size: [160, 160], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'flow', path: [[220, 380], [1100, 380]], color: '#ffd43b', count: 6, size: 7, from: 0.3 },
          { kind: 'atom', path: [[420, 450]], symbol: '彗', color: '#868e96', r: 30, from: 0.4 },
          { kind: 'ray', path: [[450, 450], [1150, 450]], color: '#4dabf7', draw: 1.5, from: 1.0 },
          { kind: 'ray', path: [[450, 462], [700, 520], [950, 610], [1120, 700]], color: '#adb5bd', draw: 1.5, from: 1.4 },
          { kind: 'label', at: [900, 450], pos: [900, 280], text: '蓝色离子尾：笔直', color: '#1c7ed6', from: 2.4 },
          { kind: 'label', at: [950, 610], pos: [720, 760], text: '白色尘埃尾：弯曲', color: '#5d4e37', from: 3.2 },
        ],
      },
      {
        turn: 4,
        title: '地球穿过尘埃带',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [600, 600], color: '#f8f9fa', outline: true, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [120, 120], color: '#f59f00', text: '太阳', from: 0.2 },
          { kind: 'particles', box: [860, 180, 80, 540], count: 20, color: '#868e96', motion: 'jitter', size: 5, from: 0.6 },
          { kind: 'label', at: [900, 240], pos: [1060, 150], text: '彗星尘埃带', color: '#5d4e37', from: 1.0 },
          { kind: 'atom', path: [[600, 150], [812, 238], [900, 450]], symbol: '地球', color: '#4dabf7', r: 30, travel: 3, from: 1.0 },
          { kind: 'sprite', icon: '🌠', path: [[1060, 600]], size: 64, from: 4.2 },
          { kind: 'text', at: [600, 840], text: '穿过尘埃带＝流星雨', size: 's', color: '#5b3e96', from: 4.6 },
        ],
      },
      {
        turn: 5,
        title: '英仙座流星雨',
        duration: 9,
        cues: [
          { kind: 'count', at: [300, 220], label: '彗核宽约', start: 0, end: 26, unit: '千米', from: 0 },
          { kind: 'count', at: [900, 220], label: '绕太阳一圈约', start: 0, end: 133, unit: '年', from: 0.8 },
          { kind: 'count', at: [600, 500], label: '冲进大气速度', start: 0, end: 59, unit: '千米/秒', from: 1.6 },
          { kind: 'sprite', icon: '🌠', path: [[150, 640], [400, 760]], size: 56, travel: 2, from: 2.6 },
          { kind: 'sprite', icon: '🌠', path: [[820, 640], [1070, 760]], size: 56, travel: 2, from: 3.2 },
          { kind: 'text', at: [600, 830], text: '每年8月12、13日前后', size: 's', color: '#5d4e37', from: 4.0 },
        ],
      },
    ],
  },
};
