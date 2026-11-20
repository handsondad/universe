import type { Story } from './types';

export const starLifecycleLab: Story = {
  slug: 'star-lifecycle-lab',
  title: '恒星也会变老吗？太阳将来会变成黑洞吗？',
  trigger: '小念听说天上的星星也有寿命，担心太阳老了以后会不会突然炸成一个黑洞把地球吞掉。',
  dialogue: [
    {
      nian: '爸爸，太阳燃料用完的那一天，会不会轰隆一声变成黑洞把地球吞进去？',
      dad: '放心吧，太阳一辈子都不可能变成黑洞！恒星老了变成什么样，全看它出生时“体重”有多重。要塌成黑洞至少得比太阳重 20 倍左右，我们的太阳质量远远不够格。',
    },
    {
      nian: '原来太阳太“瘦”变不成黑洞！那质量不同的恒星，老了以后各自会走什么路？',
      dad: '像太阳这样的中小质量恒星走温柔路线：大约 50 亿年后核心氢耗尽，外层膨胀成巨大的“红巨星”，随后轻轻吹散外层气体形成漂亮的行星状星云，中心留下一颗地球大小、极高密度的“白矮星”。',
      figure: {
        kind: 'sim',
        sim: 'starFateMass',
        caption: '拖动恒星初始质量（1–25 倍太阳质量），比较中小恒星与大质量巨星的不同归宿。',
      },
    },
    {
      nian: '白矮星听起来挺安静的！那比太阳重 8 倍以上的大质量恒星结局会怎样？',
      dad: '大质量恒星脾气火爆得多！它们质量越大烧得越猛，短短几百万到几千万年就把燃料烧光，随后核心瞬间塌缩引发惊天动地的“超新星爆发”，亮度能盖过整个星系，残骸压成中子星或黑洞！',
    },
    {
      nian: '为什么越重、燃料越多的恒星，寿命反倒比小恒星短那么多？',
      dad: '好比两辆车，大卡车油箱虽然比小踏板大 10 倍，但猛踩油门百公里耗油高出几百倍，油箱反而先见底！大恒星内部压强极大、核聚变猛烈得多，所以“短命又绚丽”。',
    },
    {
      nian: '那恒星最早又是从哪里生出来的呢？',
      dad: '它们都诞生在寒冷巨大的“分子星云”里！星云里的气体尘埃在引力下越聚越紧、中心越压越烫，一旦点亮核聚变，一颗新恒星就睁开了眼睛——老恒星抛出的星云，又会孕育下一代新恒星。',
    },
    {
      nian: '我明白了！恒星从星云诞生，出生质量决定寿命和归宿：太阳太轻不会变黑洞，将来会变红巨星再成白矮星，大质量巨星才会超新星爆发成中子星或黑洞！',
      dad: '总结得无懈可击！点右上角去 3D 恒星演化实验台，你可以亲手调出 1 倍、12 倍和 25 倍太阳质量的恒星，一路快进看遍它们的一生。',
    },
  ],
  tip: '太阳大约在 50 亿年后才会离开主序星阶段，人类目前完全无需担心。白矮星虽然只有地球大小，一茶匙白矮星物质却重达几吨；中子星更是致密到一茶匙重达数亿吨。',
  sources: [
    { title: 'Stars — Life Cycles & Stellar Evolution', by: 'NASA Science', url: 'https://science.nasa.gov/universe/stars/' },
    { title: 'Life Cycle of a Star', by: 'ESA / Hubble', url: 'https://esahubble.org/wordbank/stellar-evolution/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '太阳质量不够变黑洞',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 420], size: [140, 140], color: '#f59f00', text: '太阳 1 M☉', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [840, 420], size: [210, 210], color: '#74c0fc', text: '巨星超20倍', from: 0.8 },
          { kind: 'myth', wrong: '太阳老了以后会变成大黑洞', right: '太阳质量不够，将来会变白矮星', from: 2.2 },
        ],
      },
      {
        turn: 1,
        title: '太阳的温和谢幕路线',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [220, 440], size: [110, 110], color: '#ffd43b', text: '主序太阳', from: 0.2 },
          { kind: 'arrow', path: [[295, 440], [450, 440]], color: '#ff922b', text: '50亿年后', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [580, 440], size: [210, 210], color: '#ff6b6b', text: '红巨星', from: 1.4 },
          { kind: 'arrow', path: [[705, 440], [855, 440]], color: '#9775fa', text: '褪去外层', from: 2.4 },
          { kind: 'shape', shape: 'circle', at: [960, 440], size: [74, 74], color: '#edf2ff', text: '白矮星', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '大质量恒星：超新星爆发',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 440], size: [170, 170], color: '#74c0fc', text: '超巨星', from: 0.2 },
          { kind: 'pulse', at: [620, 440], color: '#ff922b', radius: 220, from: 1.4 },
          { kind: 'text', at: [620, 440], text: '超新星大爆发！', size: 'l', color: '#e8590c', from: 1.6 },
          { kind: 'shape', shape: 'pill', at: [960, 350], size: [190, 74], color: '#4dabf7', text: '中子星', from: 3.0 },
          { kind: 'shape', shape: 'pill', at: [960, 530], size: [190, 74], color: '#1c1836', text: '恒星级黑洞', from: 3.6 },
        ],
      },
      {
        turn: 4,
        title: '星云循环孕育新星',
        duration: 7,
        cues: [
          { kind: 'particles', box: [220, 300, 300, 260], count: 24, color: '#b197fc', motion: 'jitter', size: 10, from: 0.2 },
          { kind: 'label', at: [370, 300], pos: [370, 210], text: '分子星云引力坍缩', color: '#5b3e96', from: 0.8 },
          { kind: 'arrow', path: [[540, 430], [720, 430]], color: '#ffd43b', text: '点亮核聚变', from: 1.8 },
          { kind: 'shape', shape: 'circle', at: [860, 430], size: [150, 150], color: '#ffd43b', text: '新一代恒星', from: 2.6 },
        ],
      },
    ],
  },
};
