import type { Story } from './types';

export const marsRed: Story = {
  slug: 'mars-red',
  title: '火星为什么是红色的，它真的“生锈”了吗？',
  trigger: '小念在夜空里找到一颗橘红色的亮星，爸爸说那是火星，古人叫它“荧惑”，小念觉得它红得像一团小火苗。',
  dialogue: [
    {
      nian: '爸爸，火星红得像一团火，是因为它表面特别烫、正在燃烧吗？',
      dad: '一点也不烫！火星离太阳比地球还远，比地球冷得多。它发红，是因为身上“生锈”了：火星的岩石和沙土里含有很多铁，铁和氧结合变成了氧化铁，就像雨淋过的铁钉会长出一层红褐色的铁锈。',
    },
    {
      nian: '铁钉生锈要碰到水和空气，火星上的铁又是怎么锈起来的？',
      dad: '问到点子上了！科学家认为，很久以前火星上可能有过水，岩石里的铁和水、氧慢慢反应，一点点“锈”透了。日积月累，大风又把岩石磨成比面粉还细的锈尘，撒满了整个星球，于是远远看去，整颗火星都是铁锈红。',
    },
    {
      nian: '比面粉还细的锈尘被大风一吹，会不会飘到天上去？',
      dad: '会！火星上常刮沙尘暴，有时大到能裹住整颗星球。细细的红色尘埃飘进稀薄的大气里，让火星白天的天空也蒙着一层橘黄、黄褐色调，不像地球是蓝天。',
      figure: {
        kind: 'sim',
        sim: 'marsRustDust',
        caption: '拖动铁的氧化程度、大气尘埃和观察距离，看火星从太空远看和在地面近看颜色有什么不同。',
      },
    },
    {
      nian: '天空都是橘黄色的，那站在火星地面上看，沙子是不是红得更厉害？',
      dad: '恰好相反，近看反而没那么红！我国的祝融号火星车 2021 年降落在火星上，拍回的照片里，地面更像黄褐、金棕色的沙漠，有点像奶油糖的颜色。只有隔着很远，大片锈尘的颜色叠在一起，火星才显得红通通的。',
    },
    {
      nian: '祝融号拍到的黄褐色沙漠里，那层锈到底是什么样的锈呀？',
      dad: '2025 年的一项研究给了新答案：火星尘土里最主要的红色“锈”，可能是一种含水的氧化铁，叫水铁矿。它要在有冷水的环境里才容易形成，说明火星年轻时可能比现在湿润得多。',
    },
    {
      nian: '含水的水铁矿居然能告诉我们火星以前有水！那古人叫它“荧惑”，也是因为它红吗？',
      dad: '对！“荧”是说它亮闪闪、红荧荧；“惑”是说它在星空里一会儿往前走、一会儿往回退，行踪让人迷惑。古人看不清它的地面，却早就被它那抹红光吸引住了。',
    },
    {
      nian: '我明白了！火星的红是铁锈红：岩石和尘土里的铁被氧化成氧化铁，细细的锈尘被风吹满天空；近看地面其实是黄褐色的，而且这层锈里含水，说明火星以前可能很湿润！',
      dad: '完全正确！下次在夜空找到那颗不怎么眨眼、带点橘红色的亮星，就可以告诉大家：那是一颗“生了锈”的星球。',
    },
  ],
  tip: '可以和孩子做个对比小实验：把一枚铁钉放在湿纸巾上，另一枚放进干燥的密封袋，几天后看看哪一枚生了红褐色的锈，体会铁、水和氧气的作用。火星最亮的时候，用肉眼或双筒望远镜就能找到那颗橘红色的星。',
  sources: [
    { title: '义务教育教科书 化学 九年级下册·金属的锈蚀与防护', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Mars: Facts', by: 'NASA Science', url: 'https://science.nasa.gov/mars/facts/' },
    { title: 'Detection of ferrihydrite in Martian red dust records ancient cold and wet conditions on Mars', by: 'Nature Communications（2025）', url: 'https://www.nature.com/articles/s41467-025-56970-z' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '火星不是在燃烧',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [300, 300], color: '#c1440e', text: '火星', motion: 'pulse', from: 0 },
          { kind: 'sprite', icon: '🔥', path: [[860, 250]], size: 64, from: 0.8, to: 3.0 },
          { kind: 'label', at: [700, 520], pos: [930, 650], text: '其实很冷', color: '#3b6ea5', from: 2.2 },
          { kind: 'myth', wrong: '火星红是因为它在燃烧', right: '火星红是因为“生锈”了', from: 3.2 },
        ],
      },
      {
        turn: 0,
        title: '铁加氧变铁锈',
        duration: 9,
        cues: [
          { kind: 'atom', path: [[300, 450]], symbol: 'Fe', color: '#868e96', r: 62, from: 0 },
          { kind: 'atom', path: [[720, 300], [400, 390]], symbol: 'O', color: '#ff6b6b', r: 38, travel: 2, from: 0.6 },
          { kind: 'atom', path: [[720, 600], [400, 510]], symbol: 'O', color: '#ff6b6b', r: 38, travel: 2, from: 0.9 },
          { kind: 'arrow', path: [[520, 450], [760, 450]], color: '#e8590c', text: '慢慢氧化', from: 2.8 },
          { kind: 'shape', shape: 'circle', at: [900, 450], size: [190, 190], color: '#b5532a', text: '氧化铁', from: 3.4 },
          { kind: 'text', at: [600, 790], text: '和铁钉生锈是同一类变化', size: 's', color: '#5b3e96', from: 4.2 },
        ],
      },
      {
        turn: 1,
        title: '大风磨出锈尘',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [280, 560], size: [240, 160], color: '#8c4a2f', text: '岩石', motion: 'wiggle', from: 0 },
          { kind: 'flow', path: [[80, 400], [500, 420], [940, 380]], color: '#e9c46a', count: 8, from: 0.6 },
          { kind: 'particles', box: [600, 300, 460, 250], count: 22, color: '#c1440e', motion: 'gas', size: 6, from: 1.8 },
          { kind: 'label', at: [820, 420], pos: [880, 200], text: '比面粉还细的锈尘', color: '#c1440e', from: 2.6 },
          { kind: 'text', at: [600, 800], text: '锈尘撒满整个星球', size: 's', color: '#5d4e37', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '锈尘染黄天空',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 350], size: [1000, 400], color: '#a5d8ff', tint: { color: '#d9a066', at: 1.5, over: 2.5 }, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 650], size: [1000, 200], color: '#b5793f', from: 0.2 },
          { kind: 'particles', box: [150, 180, 900, 320], count: 26, color: '#c1440e', motion: 'gas', size: 5, amount: { at: 1, over: 3, from: 0, to: 26 }, from: 0.8 },
          { kind: 'label', at: [800, 300], pos: [900, 210], text: '天空变成橘黄色', color: '#7f5539', from: 3.0 },
          { kind: 'meter', at: [600, 820], label: '天上的尘埃', start: 0.1, end: 0.9, color: '#c1440e', over: 3, from: 1.0 },
        ],
      },
      {
        turn: 3,
        title: '近看是黄褐色',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [280, 430], size: [240, 240], color: '#c1440e', text: '远看', from: 0 },
          { kind: 'arrow', path: [[420, 430], [620, 460]], color: '#5b3e96', text: '拉近', from: 1.0 },
          { kind: 'shape', shape: 'rect', at: [860, 500], size: [420, 300], color: '#c8955a', text: '近看', from: 1.4 },
          { kind: 'sprite', icon: '🚙', path: [[860, 400]], size: 70, from: 2.0 },
          { kind: 'label', at: [860, 380], pos: [860, 180], text: '祝融号 2021年着陆', color: '#e8590c', from: 2.4 },
          { kind: 'text', at: [600, 800], text: '近看是黄褐、金棕色', size: 's', color: '#5d4e37', from: 3.4 },
        ],
      },
      {
        turn: 4,
        title: '锈里藏着水',
        duration: 9,
        cues: [
          { kind: 'atom', path: [[380, 450]], symbol: '水铁矿', color: '#b5532a', r: 100, from: 0 },
          { kind: 'particles', box: [300, 380, 160, 140], count: 8, color: '#4dabf7', motion: 'jitter', size: 10, from: 1.0 },
          { kind: 'label', at: [380, 360], pos: [380, 170], text: '含水的氧化铁', color: '#1c7ed6', from: 1.6 },
          { kind: 'arrow', path: [[520, 450], [740, 450]], color: '#e8590c', text: '暗示', from: 2.4 },
          { kind: 'shape', shape: 'rect', at: [920, 450], size: [300, 170], color: '#74c0fc', text: '古代有水', from: 3.0 },
          { kind: 'text', at: [600, 800], text: '火星年轻时更湿润', size: 's', color: '#5b3e96', from: 3.8 },
        ],
      },
    ],
  },
};
