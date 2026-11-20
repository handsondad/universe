import type { Story } from './types';

export const stardustElements: Story = {
  slug: 'stardust-elements',
  title: '科学家说“我们都是星尘做的”，我身体里的铁和钙真是星星造的吗？',
  trigger: '小念在天文馆墙上看到卡尔·萨根的名言“我们都是星尘”，盯着自己的手背觉得很难相信。',
  dialogue: [
    {
      nian: '爸爸，书上说我们每个人都是“星尘做的”，可我明明吃米饭喝牛奶长大，怎么会是星星造的？',
      dad: '一点也不夸张，从原子层面看你真的是一颗行走的小星尘！138 亿年前宇宙大爆炸刚结束时，整个宇宙里几乎只有最轻的两种元素——氢和氦，压根没有碳、氧、钙和铁！',
    },
    {
      nian: '大爆炸只造出了氢和氦，那地球上的石头和我身体里的碳、氧、钙、铁从哪儿冒出来的？',
      dad: '全都是古老恒星用核聚变“炼”出来的！恒星核心像超级熔炉：先用氢聚变成氦，老了以后再把氦聚变成碳和氧；比太阳重得多的大质量恒星还能一层层炼出氖、硅、钙，一直炼到铁！',
      figure: {
        kind: 'sim',
        sim: 'cosmicElements',
        caption: '切换身体和地球里常见的四种元素，查看它们分别是在宇宙哪个熔炉里诞生的。',
      },
    },
    {
      nian: '就算恒星在肚子里炼出了碳、氧和铁，它们锁在恒星里面，怎么跑进地球和我们身体里的？',
      dad: '靠绚丽的恒星谢幕！中小恒星老去时会把含碳、氧的外壳吹成星云；大质量恒星更直接轰隆发生“超新星爆发”，把一生炼出的钙、铁等重元素全部炸撒进太空，混进下一代星云！',
    },
    {
      nian: '那比铁还重的黄金、铂金呢，也是超新星爆发顺手炼出来的吗？',
      dad: '铁是普通恒星聚变的“终点站”，再往重处拼不仅不放能反而吸能。科学家通过引力波观测发现，宇宙里大部分黄金和白金，竟是两颗超高密度的“中子星”狠狠撞在一起并合时瞬间炼成撒向宇宙的！',
    },
    {
      nian: '太神奇了！那我左手里的铁原子和右手里的碳原子，说不定还来自两颗不同的远古恒星？',
      dad: '极有可能！46 亿年前太阳系诞生的那片星云里，混合了好多代死去恒星留下的“遗产”。你喝的水里有大爆炸的氢，你呼吸的氧和血液里的铁，都曾经在几十亿年前的恒星深处闪闪发光！',
    },
    {
      nian: '我懂了！大爆炸最初只造了氢和氦，我身体里的碳、氧、钙、铁都是古老恒星和超新星炼出来撒进星云再拼成地球的，我们真的都是星尘！',
      dad: '每次想到这里都会觉得生命和宇宙紧紧相连！抬头看星空时，其实我们也是宇宙用来欣赏自己的一双眼睛。',
    },
  ],
  tip: '“星尘”并非诗意夸张，而是天体物理学中的“恒星核合成（Stellar Nucleosynthesis）”理论。2017 年 LIGO/Virgo 首次探测到双中子星并合引力波事件 GW170817，直接用光谱证实了金、铂等重元素的宇宙来源。',
  sources: [
    { title: 'Where Do Elements Come From? (Cosmic Origins)', by: 'NASA Science', url: 'https://science.nasa.gov/universe/stars/' },
    { title: 'Neutron Star Mergers & Heavy Elements (GW170817)', by: 'ESO / LIGO', url: 'https://www.eso.org/public/news/eso1733/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '宇宙开头几乎只有氢和氦',
        duration: 7,
        cues: [
          { kind: 'atom', path: [[440, 440]], symbol: 'H 75%', color: '#74c0fc', r: 62, from: 0.2 },
          { kind: 'atom', path: [[760, 440]], symbol: 'He 25%', color: '#ffd43b', r: 48, from: 0.6 },
          { kind: 'text', at: [600, 660], text: '大爆炸最初几乎没有碳、氧、铁', size: 'm', color: '#5b3e96', from: 1.8 },
        ],
      },
      {
        turn: 1,
        title: '恒星核心一层层炼出重元素',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [340, 340], color: '#ffa94d', text: '外层 氢', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [230, 230], color: '#ffd43b', text: '碳 · 氧', from: 1.0 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [120, 120], color: '#ff6b6b', text: '铁核', from: 1.8 },
          { kind: 'text', at: [600, 740], text: '大质量恒星像洋葱一样逐层聚变', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 2,
        title: '超新星把元素炸回星云',
        duration: 8,
        cues: [
          { kind: 'pulse', at: [360, 440], color: '#ff922b', radius: 200, from: 0.3 },
          { kind: 'particles', box: [260, 310, 420, 260], count: 24, color: '#ffd43b', motion: 'gas', size: 9, from: 0.6 },
          { kind: 'arrow', path: [[560, 440], [760, 440]], color: '#e8590c', text: '汇成新太阳系', from: 1.8 },
          { kind: 'shape', shape: 'circle', at: [900, 440], size: [140, 140], color: '#4dabf7', text: '地球与生命', from: 2.4 },
        ],
      },
      {
        turn: 3,
        title: '中子星撞击炼出黄金',
        duration: 7,
        cues: [
          { kind: 'atom', path: [[300, 440], [560, 440]], symbol: '中子星', color: '#74c0fc', r: 36, travel: 2.4, from: 0.4, to: 3.0 },
          { kind: 'atom', path: [[900, 440], [640, 440]], symbol: '中子星', color: '#b197fc', r: 36, travel: 2.4, from: 0.4, to: 3.0 },
          { kind: 'pulse', at: [600, 440], color: '#ffd43b', radius: 190, from: 2.8 },
          { kind: 'atom', path: [[600, 440]], symbol: 'Au 金', color: '#f59f00', r: 52, from: 2.9 },
        ],
      },
    ],
  },
};
