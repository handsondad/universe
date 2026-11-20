import type { Story } from './types';

export const spaceTelescope: Story = {
  slug: 'space-telescope',
  title: '地上就能建超大望远镜，为什么还要花大钱把哈勃和韦布送上太空？',
  trigger: '小念看到韦布望远镜拍的璀璨深空照片，听说发射一台花了一百亿美元，觉得在地上建不是省钱多了吗。',
  dialogue: [
    {
      nian: '爸爸，地球上建超级大望远镜又便宜又好修，为什么非要把哈勃和韦布送上太空？',
      dad: '因为我们头顶的地球大气层，对天文学家来说像一扇既会晃动、又贴了深色滤膜的厚玻璃！你晚上看星星一闪一闪“眨眼睛”，其实就是冷热空气流动把笔直的星光搅模糊了。',
    },
    {
      nian: '大气层会把星光搅模糊！可除了模糊以外，大气层还会挡住什么星光吗？',
      dad: '挡得可狠了！地球大气虽然放进了大部分可见光和无线电波，却把绝大多数紫外线、X 射线和红外线死死吸收掉。这些波段对保护地球生命是好盾牌，可对想看黑洞、婴儿恒星的望远镜却等于蒙上了眼睛！',
      figure: {
        kind: 'sim',
        sim: 'spaceScopeWindow',
        caption: '切换可见光、红外线和紫外/X 射线波段，看看大气层放过了哪些、挡住了哪些。',
      },
    },
    {
      nian: '哈勃望远镜飞出大气层已经很厉害了，为什么还要发射更贵的韦布望远镜呢？',
      dad: '哈勃主要看可见光和紫外光，而宇宙膨胀把 130 多亿年前最早一批星系发出的光拉长成了“红外线”！韦布专门戴着镀金的 6.5 米超大红外主镜，能穿透尘埃、专看哈勃看不见的极早期红外宇宙！',
    },
    {
      nian: '听说韦布望远镜不绕着地球转，而是飞到了 150 万千米外，离那么远坏了怎么修呀？',
      dad: '因为它看的是极微弱的红外热信号！地球和太阳自身也在哗哗发红外热，离太近会把望远镜烤“瞎”。所以科学家把它送到 150 万千米外的日地 L2 点，还撑起五层网球场大的银色遮阳罩，让望远镜冷到零下 220 多度！',
    },
    {
      nian: '那地上的超大望远镜是不是就没用了，全要被太空望远镜淘汰啦？',
      dad: '才不会呢！它们是黄金搭档：太空望远镜清晰、波段全，但受火箭舱限制镜子不能无限大；地面望远镜能造到直径 30 多米，还装了“自适应光学”实时抵消大气抖动，天上地下联手探索宇宙！',
    },
    {
      nian: '我懂了！把望远镜送上太空是为了躲开地球大气层的气流抖动和波段遮挡，韦布飞到 L2 点防热看红外，就能看见百亿年前的早期星系！',
      dad: '说得真棒！我国也计划发射“巡天”空间望远镜（CSST），以后将和空间站共轨飞行，拍下更广阔的深空巡天画卷。',
    },
  ],
  tip: '哈勃运行在距地约 540 千米的近地轨道，航天飞机曾五次上去为它维修升级；韦布（JWST）运行在距地球约 150 万千米的日地拉格朗日 L2 点，依靠五层聚酰亚胺遮阳膜保持背阳面极低温。',
  sources: [
    { title: 'Why Put Telescopes in Space? — Webb & Hubble', by: 'NASA Science', url: 'https://science.nasa.gov/mission/webb/' },
    { title: 'James Webb Space Telescope Overview', by: 'ESA', url: 'https://www.esa.int/Science_Exploration/Space_Science/Webb' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '星星眨眼是大气在搅糊星光',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [880, 140], color: '#a5d8ff', text: '流动地球大气层', from: 0.2 },
          { kind: 'ray', path: [[600, 180], [600, 370]], color: '#ffd43b', from: 0.4 },
          { kind: 'wave', a: [600, 370], b: [600, 680], wavelength: 60, amplitude: 26, color: '#ff922b', from: 1.2 },
          { kind: 'text', at: [600, 740], text: '冷热气流把笔直星光折来折去', size: 'm', color: '#5d4e37', from: 2.4 },
        ],
      },
      {
        turn: 1,
        title: '大气挡住红外与紫外光',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [860, 120], color: '#74c0fc', text: '地球大气盾牌', from: 0.2 },
          { kind: 'arrow', path: [[300, 220], [300, 690]], color: '#ffd43b', text: '可见光穿过', from: 0.8 },
          { kind: 'arrow', path: [[600, 220], [600, 430]], color: '#ff6b6b', text: '红外大半被挡', from: 1.6 },
          { kind: 'arrow', path: [[900, 220], [900, 430]], color: '#9775fa', text: '紫外X线被拦', from: 2.4 },
        ],
      },
      {
        turn: 2,
        title: '哈勃看可见，韦布看红外',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 420], size: [260, 100], color: '#4dabf7', text: '哈勃可见光', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [860, 420], size: [280, 100], color: '#f59f00', text: '韦布深红外', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '穿透尘埃看早期古老星系', size: 'm', color: '#5b3e96', from: 2.4 },
        ],
      },
      {
        turn: 3,
        title: '远赴L2，五层罩保极冷',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [180, 440], size: [120, 120], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'atom', path: [[460, 440]], symbol: '地球', color: '#4dabf7', r: 38, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [790, 440], size: [34, 210], color: '#ced4da', from: 1.0 },
          { kind: 'atom', path: [[890, 440]], symbol: '韦布', color: '#ffd43b', r: 34, from: 1.2 },
          { kind: 'label', at: [890, 405], pos: [900, 240], text: '零下 220℃ 冰冷深空', color: '#1c7ed6', from: 2.0 },
        ],
      },
    ],
  },
};
