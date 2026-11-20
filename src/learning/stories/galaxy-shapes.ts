import type { Story } from './types';

export const galaxyShapes: Story = {
  slug: 'galaxy-shapes',
  title: '星系为什么有的像风车、有的像鸡蛋，还有的乱糟糟？',
  trigger: '小念翻看一本星系照片集，发现星系有的像旋转的风车，有的像毛茸茸的鸡蛋，还有的歪歪扭扭像揉皱的纸团。',
  dialogue: [
    {
      nian: '爸爸，星系有的像风车、有的像鸡蛋，还有的乱糟糟，它们为什么长得这么不一样？',
      dad: '一百年前，天文学家哈勃也被这个问题迷住了！1926 年，他把星系按形状分成三大类：圆圆扁扁像鸡蛋的“椭圆星系”，带着旋臂像风车的“旋涡星系”，还有没有固定样子的“不规则星系”。他的分类图画出来像一把音叉，所以叫“哈勃音叉图”。',
    },
    {
      nian: '音叉图上那些旋涡星系，旋臂为什么看起来蓝蓝的？',
      dad: '因为旋臂是星系的“育婴房”！那里有大量气体和尘埃，正在不停地诞生新恒星。刚出生的大质量恒星又热又亮，发出蓝白色的光，把旋臂点缀成一串串蓝色。旋涡星系中间还有一个由老恒星组成、偏黄的核球。',
      figure: {
        kind: 'sim',
        sim: 'galaxyFork',
        caption: '沿着哈勃音叉图拖动星系类型，比较形状、气体多少和蓝色年轻恒星的比例。',
      },
    },
    {
      nian: '那椭圆星系里也有育婴房吗，它为什么偏红偏黄？',
      dad: '椭圆星系里的气体几乎用光了，很难再造出新恒星。蓝色的大质量恒星寿命短，早就“退休”了，剩下的多是寿命长、温度低、偏红偏黄的老恒星，就像一个住满爷爷奶奶的老社区。',
    },
    {
      nian: '椭圆星系是旋涡星系慢慢变老，才变成老社区的吗？',
      dad: '不是自己慢慢“变老”变的！音叉图只是分类，并不是成长顺序。椭圆星系常常是星系碰撞的结果：两个旋涡星系撞到一起，引力把整齐的圆盘和旋臂搅乱，气体被大量消耗，最后揉成一个圆鼓鼓的大椭圆星系。',
    },
    {
      nian: '星系碰撞能把旋臂搅乱，那些乱糟糟的不规则星系也是被扯乱的吗？',
      dad: '很多是这样！不规则星系大多个头小，容易被大星系的引力拉扯变形。在南半球的夜空里，用肉眼就能看到两个：大麦哲伦云和小麦哲伦云。它们是银河系的小伙伴，身形被引力扯得歪歪扭扭，里面还在热热闹闹地造星。',
    },
    {
      nian: '银河系的小伙伴是不规则星系，那我们自己住的银河系是哪一种？',
      dad: '银河系是一个棒旋星系！它中间有一根由恒星组成的“棒子”，旋臂从棒子两端甩出来，在音叉图上属于棒旋星系那根叉子。太阳就住在一条旋臂边上，银河系的旋臂里至今还在不断诞生新恒星。',
    },
    {
      nian: '我明白了！星系的形状记录了它的成长史：旋涡星系气体多，旋臂里不停诞生蓝色新星；椭圆星系多是老恒星，常是碰撞并合出来的；不规则星系多是被引力扯乱的小星系，而银河系是棒旋星系！',
      dad: '完全正确！下次看星系照片，先看颜色再看形状，你就能当一回宇宙小侦探，猜猜它经历过怎样的成长故事。',
    },
  ],
  tip: '可以把几张星系照片打印出来，和孩子一起按“椭圆、旋涡、棒旋、不规则”分类，再观察颜色：蓝色多的地方正在造星，黄红色多的地方住着老恒星。秋冬季到郊外，用双筒望远镜还能找到仙女座星系这个旋涡星系。',
  sources: [
    { title: '义务教育教科书 科学 六年级下册·宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Types of Galaxies', by: 'NASA Science', url: 'https://science.nasa.gov/universe/galaxies/types/' },
    { title: 'Hubble tuning fork — classification of galaxies (heic9902o)', by: 'ESA/Hubble', url: 'https://esahubble.org/images/heic9902o/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '风车、鸡蛋和纸团',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [260, 420], size: [210, 140], color: '#ffc078', text: '椭圆', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [210, 210], color: '#74c0fc', text: '旋涡', motion: 'pulse', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [940, 420], size: [190, 140], color: '#b2f2bb', text: '不规则', motion: 'wiggle', from: 1.4 },
          { kind: 'text', at: [600, 220], text: '哈勃1926年分成三类', size: 'm', color: '#5b3e96', from: 2.4 },
          { kind: 'text', at: [600, 660], text: '画出来像一把音叉', size: 'm', color: '#5d4e37', from: 4 },
        ],
      },
      {
        turn: 1,
        title: '旋臂是育婴房',
        duration: 9,
        cues: [
          { kind: 'flow', path: [[600, 250], [820, 330], [850, 500], [700, 620], [480, 620], [350, 500], [380, 330]], color: '#74c0fc', loop: true, count: 16, speed: 200, size: 9, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [150, 150], color: '#ffd43b', text: '老核球', from: 0.4 },
          { kind: 'label', at: [835, 420], pos: [1000, 260], text: '蓝色新星诞生', color: '#3b6ea5', from: 1.6 },
          { kind: 'label', at: [600, 440], pos: [250, 230], text: '偏黄的老恒星', color: '#e8590c', from: 2.8 },
          { kind: 'text', at: [600, 760], text: '气体多，不停造新星', size: 'm', color: '#5b3e96', from: 4 },
        ],
      },
      {
        turn: 2,
        title: '椭圆：老人社区',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [400, 270], color: '#ffa94d', text: '椭圆星系', from: 0.2 },
          { kind: 'meter', at: [330, 200], label: '剩下的气体', start: 0.8, end: 0.05, color: '#9775fa', over: 2.5, from: 1 },
          { kind: 'meter', at: [870, 200], label: '年轻蓝星', start: 0.7, end: 0.05, color: '#4dabf7', over: 2.5, from: 1.6 },
          { kind: 'text', at: [600, 740], text: '住满偏红的老恒星', size: 'm', color: '#e8590c', from: 3.8 },
        ],
      },
      {
        turn: 3,
        title: '撞一撞，揉成椭圆',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [330, 430], size: [190, 190], color: '#74c0fc', text: '旋涡', slide: { to: [560, 430], at: 0.6, over: 2.4 }, from: 0, to: 3.8 },
          { kind: 'shape', shape: 'circle', at: [870, 430], size: [190, 190], color: '#74c0fc', text: '旋涡', slide: { to: [640, 430], at: 0.6, over: 2.4 }, from: 0, to: 3.8 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [360, 260], color: '#ffa94d', text: '大椭圆', motion: 'grow', over: 2, from: 3.4 },
          { kind: 'arrow', path: [[600, 220], [600, 300]], color: '#e8590c', text: '气体被耗光', from: 4.2 },
          { kind: 'myth', wrong: '音叉图是星系长大的顺序', right: '并合常把旋涡揉成椭圆', from: 5 },
        ],
      },
      {
        turn: 5,
        title: '银河系：棒旋星系',
        duration: 9,
        cues: [
          { kind: 'flow', path: [[740, 430], [800, 300], [680, 220], [520, 250]], color: '#74c0fc', count: 7, speed: 150, size: 9, from: 0.6 },
          { kind: 'flow', path: [[460, 430], [400, 560], [520, 640], [680, 610]], color: '#74c0fc', count: 7, speed: 150, size: 9, from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [300, 70], color: '#ffd43b', text: '恒星“棒子”', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [430, 560], size: [30, 30], color: '#e8590c', motion: 'pulse', from: 2.2 },
          { kind: 'label', at: [430, 560], pos: [220, 680], text: '太阳在旋臂边', color: '#e8590c', from: 2.6 },
          { kind: 'text', at: [600, 120], text: '银河系是棒旋星系', size: 'm', color: '#5b3e96', from: 3.8 },
        ],
      },
    ],
  },
};
