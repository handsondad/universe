import type { Story } from './types';

export const pulsarLighthouse: Story = {
  slug: 'pulsar-lighthouse',
  title: '宇宙里为什么会有准得像钟表一样“嘀嘀”闪的星星？',
  trigger: '小念听说有一种星星每隔一秒多就准时“嘀”一下，准得让当年的科学家怀疑是外星人在发电报。',
  dialogue: [
    {
      nian: '爸爸，有颗星星每隔一秒多就准时“嘀”一下，是不是外星人在给我们发电报？',
      dad: '1967 年，英国剑桥大学的研究生乔瑟琳·贝尔也犯过嘀咕！她在射电望远镜的记录纸上，发现一个每 1.337 秒准时出现一次的信号，她和导师休伊什半开玩笑地叫它“小绿人一号”。可没过多久，天上又找到了别的类似信号，外星人可不会这么巧地到处发电报。',
    },
    {
      nian: '不是外星人的话，那个准时出现的信号到底是什么星星发出来的？',
      dad: '是一种叫“中子星”的奇特天体。大质量恒星在超新星爆发中死去时，核心会被压成一个只有城市大小、直径约 20 千米的球，里面却装着约 1.4 个太阳的质量。它密得吓人：一小勺中子星物质就重达上千万吨！',
    },
    {
      nian: '中子星只有城市那么大，又怎么会一闪一闪地准时“嘀嘀”响呢？',
      dad: '因为它像一座疯狂旋转的灯塔！中子星有超强的磁场，从两个磁极射出两束窄窄的电磁波束。磁极和自转轴并不对齐，所以它一转，光束就像灯塔的光一样扫过天空。每扫过地球一次，我们就收到一声“嘀”。',
      figure: {
        kind: 'sim',
        sim: 'pulsarBeam',
        caption: '改变自转快慢和光束倾斜角，看光束扫过地球时才收到“嘀”的脉冲。',
      },
    },
    {
      nian: '要是灯塔的光束扫不到地球，我们是不是就发现不了它了？',
      dad: '没错！光束扫不到地球的中子星，就算转得再欢，我们也收不到脉冲。所以“脉冲星”并不是星星自己一亮一灭，而是看它的光束有没有对准我们。即便这样，天文学家也已经找到了 3000 多颗脉冲星。',
    },
    {
      nian: '3000 多颗脉冲星里，转得最快的一秒钟能转多少圈？',
      dad: '最快的每秒能转 700 多圈，比家里搅拌机的刀片还快！它为什么转这么快？想想花样滑冰：运动员把张开的手臂收回来，就转得飞快。恒星核心塌缩成小小的中子星，就像“收紧了手臂”，自转一下子快了很多很多倍。',
    },
    {
      nian: '自转得这么快还这么准，脉冲星真的能当宇宙里的钟表用吗？',
      dad: '能！很多脉冲星的自转稳定得惊人，比不少钟表还准，科学家把它们当成宇宙里的天然时钟，用来检验引力理论、寻找引力波。我国贵州的“中国天眼”FAST 已经发现了 1000 多颗脉冲星，是寻找脉冲星的超级高手。',
    },
    {
      nian: '我懂了！脉冲星是疯狂旋转的中子星，光束从磁极射出，每转一圈扫过地球一次，就像一座宇宙灯塔；它一小勺物质就重上千万吨，自转比很多钟表还准！',
      dad: '总结得太棒了！以后有机会去贵州，我们去看看中国天眼这口“大锅”，它正在一颗一颗地数着这些宇宙灯塔呢。',
    },
  ],
  tip: '可以在黑暗的房间里让孩子拿着手电筒原地慢慢转圈，大人站在一旁：只有光束扫过时才看到一闪，这就是“灯塔效应”；再把手电筒抬高或压低一点，就会发现光束扫不到大人了，正像很多脉冲星的光束扫不到地球。',
  sources: [
    { title: '普通高中教科书 物理 必修第二册·万有引力与宇宙航行', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Pulsars', by: 'NASA Imagine the Universe', url: 'https://imagine.gsfc.nasa.gov/science/objects/pulsars1.html' },
    { title: 'Hubble and Pulsars', by: 'NASA Science', url: 'https://science.nasa.gov/mission/hubble/science/science-behind-the-discoveries/hubble-pulsars/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '每1.337秒一声“嘀”',
        duration: 8,
        cues: [
          { kind: 'pulse', at: [600, 400], color: '#e8590c', radius: 220, rate: 0.75, from: 0.2 },
          { kind: 'count', at: [600, 640], label: '脉冲周期', start: 0, end: 1.337, unit: '秒', over: 2, from: 0.8 },
          { kind: 'label', at: [600, 400], pos: [960, 230], text: '贝尔 1967年', color: '#5b3e96', from: 1.6 },
          { kind: 'text', at: [600, 160], text: '小绿人一号？', size: 'm', color: '#2f8a57', from: 2.4 },
          { kind: 'myth', wrong: '准时的信号是外星人电报', right: '是旋转中子星扫来的光束', from: 4.5 },
        ],
      },
      {
        turn: 1,
        title: '城市大小的中子星',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [460, 460], color: '#ffa94d', text: '恒星核心', motion: 'shrink', over: 2.4, from: 0.2, to: 3 },
          { kind: 'arrow', path: [[900, 220], [720, 340]], color: '#e8590c', text: '塌缩', from: 1 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [130, 130], color: '#5b3e96', text: '中子星', from: 2.8 },
          { kind: 'label', at: [665, 420], pos: [960, 420], text: '直径约20千米', color: '#5b3e96', from: 3.6 },
          { kind: 'count', at: [600, 690], label: '一小勺重达', start: 0, end: 1000, unit: '万吨', over: 2, from: 4.4 },
        ],
      },
      {
        turn: 2,
        title: '宇宙灯塔',
        duration: 9,
        cues: [
          { kind: 'arrow', path: [[600, 780], [600, 130]], color: '#adb5bd', from: 0.2 },
          { kind: 'label', at: [600, 170], pos: [420, 150], text: '自转轴', color: '#5d4e37', from: 0.6 },
          { kind: 'flow', path: [[1000, 300], [1021, 520], [930, 721], [750, 850], [530, 871], [329, 780], [200, 600], [179, 380], [270, 179], [450, 50], [670, 29], [871, 120], [1000, 300]], color: '#ffd43b', loop: true, count: 1, speed: 1326, size: 22, from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [110, 110], color: '#5b3e96', text: '中子星', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [1000, 300], size: [100, 100], color: '#4dabf7', text: '地球', from: 1 },
          { kind: 'pulse', at: [1000, 300], color: '#ffd43b', radius: 120, rate: 0.5, from: 0.6 },
          { kind: 'label', at: [640, 480], pos: [880, 800], text: '磁极射出光束', color: '#e8590c', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '扫不到就看不见',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 450], size: [110, 110], color: '#5b3e96', text: '中子星', from: 0.2 },
          { kind: 'ray', path: [[300, 450], [1080, 160]], color: '#ffd43b', from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [1000, 520], size: [100, 100], color: '#4dabf7', text: '地球', from: 1 },
          { kind: 'label', at: [1000, 520], pos: [900, 700], text: '一直收不到脉冲', color: '#e8590c', from: 2.4 },
          { kind: 'count', at: [330, 720], label: '已知脉冲星', start: 0, end: 3000, unit: '多颗', over: 2, from: 3.6 },
        ],
      },
      {
        turn: 4,
        title: '收紧手臂转更快',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [320, 400], size: [440, 110], color: '#d0bfff', text: '张开手臂：慢', from: 0.2 },
          { kind: 'arrow', path: [[560, 400], [700, 400]], color: '#e8590c', text: '收紧', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [880, 400], size: [260, 110], color: '#b197fc', text: '收紧：快', motion: 'wiggle', from: 1.8 },
          { kind: 'count', at: [600, 660], label: '最快每秒转', start: 0, end: 716, unit: '圈', over: 2.5, from: 3 },
        ],
      },
      {
        turn: 5,
        title: '天然的宇宙时钟',
        duration: 8,
        cues: [
          { kind: 'pulse', at: [320, 420], color: '#5b3e96', radius: 160, rate: 2, from: 0.2 },
          { kind: 'text', at: [320, 640], text: '比很多钟表还准', size: 'm', color: '#5b3e96', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [860, 300], size: [320, 100], color: '#a5d8ff', text: '中国天眼', from: 2 },
          { kind: 'count', at: [860, 520], label: 'FAST已发现', start: 0, end: 1000, unit: '多颗', over: 2, from: 2.8 },
        ],
      },
    ],
  },
};
