import type { Story } from './types';

export const constellations3d: Story = {
  slug: 'constellations-3d',
  title: '猎户座里的星星连成一个猎人，它们在太空里真的挨在一起吗？',
  trigger: '冬夜里小念认出了猎户座：三颗排成一线的腰带星，左上角红红的参宿四，右下角蓝白色的参宿七。',
  dialogue: [
    {
      nian: '爸爸，猎户座的星星挨得这么近，是不是像一家人一样住在同一个地方？',
      dad: '它们只是“看起来”挨着！星座是古人从地球这个角度看过去，把方向差不多的星星用想象的线连起来的图案，就像在夜空里玩“连连看”。这些星星其实有的近、有的远，远近相差好几倍。',
    },
    {
      nian: '远近相差好几倍？那猎户座里最近和最远的星星分别有多远？',
      dad: '最近的是右上角的参宿五，约 250 光年；红色的参宿四约 550 光年；右下角的参宿七约 860 光年；中间的腰带三星更远，参宿二约 1300 多光年。光从参宿二出发，要走 1300 多年才能钻进你的眼睛！',
      figure: {
        kind: 'sim',
        sim: 'orionDepth',
        caption: '拖动视角，把“从地球看”转到“从侧面看”，猎户座的星星就按远近前后散开。',
      },
    },
    {
      nian: '要走 1300 多年才到眼睛！它们远近差这么多，为什么从地球看会排成一个猎人？',
      dad: '因为它们恰好落在差不多同一个方向上。你闭上一只眼，让眼前的手指和远处的路灯“对齐”，看着好像挨在一起，其实一个在眼前、一个在马路对面。星座也一样，前后的“深度”被我们的眼睛压扁了，看不出谁前谁后。',
    },
    {
      nian: '深度被眼睛压扁了，那参宿七比参宿四远那么多，为什么看起来还更亮？',
      dad: '星星看起来多亮，要看两件事：它自己有多会发光，以及离我们多远。就像远处的探照灯可能比你手里的手电筒还亮。参宿七是一颗非常明亮的蓝白超巨星，虽然比参宿四远了 300 多光年，看起来通常还要更亮一点。',
    },
    {
      nian: '远处的探照灯比手电筒还亮！那腰带三星离那么远还很亮，是不是也特别会发光？',
      dad: '没错！腰带三星都是又热又大的蓝色巨星，本身比太阳亮得多得多，所以隔着 1200 多光年依然清清楚楚。顺便说一句，光年是距离单位，不是时间单位：1 光年就是光走一年的路程。',
    },
    {
      nian: '光年原来是距离单位！那要是我们飞到别的星星旁边，猎户座还是一个猎人吗？',
      dad: '猎人就会“散架”！换个位置看，近的星挪得多、远的星挪得少，原本排成一线的腰带三星可能分得老远，参宿四和参宿七也可能跑到天空两边。所以外星人如果也给星星连线，名字和图案一定和我们完全不同。',
    },
    {
      nian: '我懂了！星座只是从地球这个角度看过去的“连连看”，猎户座的星星有的约 250 光年、有的远到 1300 多光年，在太空里根本不挨着；星星看着多亮，还要看它本身多亮和离我们多远！',
      dad: '太棒了！去互动图里把视角转到侧面，亲眼看看猎人是怎么“散架”的。',
    },
  ],
  tip: '猎户座是冬季傍晚最好认的星座。可以和孩子做“手指对路灯”的小实验：闭一只眼把近处的手指和远处的路灯对齐，再换另一只眼看，体会方向相同不等于距离相同。恒星距离测量有误差，参宿四等星的距离不同资料略有出入，所以都写“约”。',
  sources: [
    { title: '义务教育教科书 科学 六年级下册·宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Discovering the Universe Through the Constellation Orion', by: 'NASA Science', url: 'https://science.nasa.gov/universe/stories/quick-reads/discovering-the-universe-through-the-constellation-orion/' },
    { title: 'SkyTellers: Constellations', by: 'Lunar and Planetary Institute', url: 'https://www.lpi.usra.edu/education/skytellers/constellations/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '连连看出猎人',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[430, 230]], symbol: '四', color: '#ff8c5a', r: 34, from: 0.2 },
          { kind: 'atom', path: [[770, 260]], symbol: '五', color: '#dbe4ff', r: 26, from: 0.5 },
          { kind: 'atom', path: [[540, 450]], symbol: '一', color: '#a5d8ff', r: 24, from: 0.8 },
          { kind: 'atom', path: [[600, 430]], symbol: '二', color: '#a5d8ff', r: 24, from: 1.0 },
          { kind: 'atom', path: [[660, 410]], symbol: '三', color: '#a5d8ff', r: 22, from: 1.2 },
          { kind: 'atom', path: [[470, 690]], symbol: '六', color: '#dbe4ff', r: 24, from: 1.5 },
          { kind: 'atom', path: [[800, 660]], symbol: '七', color: '#a5d8ff', r: 34, from: 1.8 },
          { kind: 'text', at: [600, 840], text: '星座是地球视角的连连看', size: 'm', color: '#5b3e96', from: 2.8 },
        ],
      },
      {
        turn: 1,
        title: '远近差好几倍',
        duration: 10,
        cues: [
          { kind: 'text', at: [600, 130], text: '离地球多远（光年）', size: 'm', color: '#5d4e37', from: 0 },
          { kind: 'meter', at: [600, 270], label: '参宿五 250', start: 0, end: 0.18, color: '#74c0fc', over: 1.4, from: 0.6 },
          { kind: 'meter', at: [600, 410], label: '参宿四 550', start: 0, end: 0.39, color: '#ff8c5a', over: 1.4, from: 1.4 },
          { kind: 'meter', at: [600, 550], label: '参宿七 860', start: 0, end: 0.61, color: '#4dabf7', over: 1.4, from: 2.2 },
          { kind: 'meter', at: [600, 690], label: '参宿二 1340', start: 0, end: 0.96, color: '#1c7ed6', over: 1.4, from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '方向一样远近不同',
        duration: 9,
        cues: [
          { kind: 'sprite', icon: '👁️', path: [[140, 460]], size: 70, from: 0.2 },
          { kind: 'ray', path: [[190, 455], [1080, 370]], color: '#ffd43b', draw: 1.4, from: 0.6 },
          { kind: 'atom', path: [[430, 432]], symbol: '近', color: '#dbe4ff', r: 26, from: 1.6 },
          { kind: 'atom', path: [[1000, 378]], symbol: '远', color: '#a5d8ff', r: 40, from: 2.0 },
          { kind: 'label', at: [700, 405], pos: [700, 220], text: '看起来挨在一起', color: '#5b3e96', from: 2.8 },
          { kind: 'myth', wrong: '星座里的星星住在一起', right: '只是方向相近，远近不同', from: 4.0 },
        ],
      },
      {
        turn: 3,
        title: '亮不亮看两件事',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 420], size: [170, 170], color: '#ff8c5a', text: '参宿四', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [860, 420], size: [210, 210], color: '#74c0fc', text: '参宿七', motion: 'pulse', from: 0.8 },
          { kind: 'label', at: [340, 510], pos: [340, 680], text: '约550光年', color: '#e8590c', from: 1.6 },
          { kind: 'label', at: [860, 530], pos: [860, 680], text: '约860光年', color: '#1c7ed6', from: 2.2 },
          { kind: 'text', at: [600, 180], text: '亮度＝本身多亮＋多远', size: 'm', color: '#5b3e96', from: 3.2 },
        ],
      },
      {
        turn: 4,
        title: '光年是距离',
        duration: 7,
        cues: [
          { kind: 'atom', path: [[1020, 420]], symbol: '腰带', color: '#a5d8ff', r: 44, from: 0.2 },
          { kind: 'flow', path: [[970, 420], [200, 420]], color: '#ffd43b', count: 6, speed: 260, from: 0.6 },
          { kind: 'sprite', icon: '🌍', path: [[150, 420]], size: 70, from: 0.4 },
          { kind: 'count', at: [600, 640], label: '腰带星距离', start: 0, end: 1200, unit: '多光年', over: 2, from: 1.2 },
          { kind: 'text', at: [600, 180], text: '1光年＝光走一年的路', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 5,
        title: '换个地方就散架',
        duration: 10,
        cues: [
          { kind: 'atom', path: [[430, 230], [200, 180]], symbol: '四', color: '#ff8c5a', r: 34, travel: 3, from: 1.0 },
          { kind: 'atom', path: [[770, 260], [1000, 700]], symbol: '五', color: '#dbe4ff', r: 26, travel: 3, from: 1.0 },
          { kind: 'atom', path: [[540, 450], [300, 600]], symbol: '一', color: '#a5d8ff', r: 24, travel: 3, from: 1.0 },
          { kind: 'atom', path: [[600, 430], [950, 250]], symbol: '二', color: '#a5d8ff', r: 24, travel: 3, from: 1.0 },
          { kind: 'atom', path: [[660, 410], [700, 760]], symbol: '三', color: '#a5d8ff', r: 22, travel: 3, from: 1.0 },
          { kind: 'atom', path: [[470, 690], [150, 420]], symbol: '六', color: '#dbe4ff', r: 24, travel: 3, from: 1.0 },
          { kind: 'atom', path: [[800, 660], [1050, 480]], symbol: '七', color: '#a5d8ff', r: 34, travel: 3, from: 1.0 },
          { kind: 'text', at: [600, 100], text: '换个位置看，猎人散架', size: 'm', color: '#5b3e96', from: 4.6 },
        ],
      },
    ],
  },
};
