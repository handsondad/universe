import type { Story } from './types';

export const bigBangExpansion: Story = {
  slug: 'big-bang-expansion',
  title: '宇宙大爆炸是在某个地方“炸开”的吗？星系都在往哪儿跑？',
  trigger: '小念听到“宇宙大爆炸”这个词，想象成空荡荡的太空中间放了一颗超级大爆竹。',
  dialogue: [
    {
      nian: '爸爸，宇宙大爆炸是不是在太空正中间轰隆炸开，然后星星向四周飞出去的？',
      dad: '“大爆炸”这个名字最容易让人误会！它并不是在已经存在的空房间里放烟花，而是大约 138 亿年前，空间本身从极其致密炽热的状态在每一处同时开始伸展变大，连时间也是从那时起步的。',
    },
    {
      nian: '空间本身同时伸展变大？这听起来好抽象，有什么生活里的东西像它吗？',
      dad: '想想烤箱里的葡萄干面包！面团发起来变大时，嵌在里面的每一颗葡萄干都没有自己长腿乱跑，是它们之间的面团在膨胀。站在任何一颗葡萄干上看，别的葡萄干全都在远离你，而且离你越远退得越快！',
      figure: {
        kind: 'sim',
        sim: 'expandingSpace',
        caption: '拖动空间膨胀倍数，观察网格拉长后星系之间的距离怎样同时变大、越远退行越快。',
      },
    },
    {
      nian: '每颗葡萄干都觉得别人在远离自己，那岂不是宇宙压根没有一个特殊的“大爆炸中心”？',
      dad: '你答对了最核心的一点！如果在气球表面画满小点再吹大它，气球表面上没有哪一个点是中心，每一个点都是膨胀的起点。星系远离我们，并不是因为地球在宇宙中心，而是因为空间处处在膨胀。',
    },
    {
      nian: '既然空间处处在膨胀，那我们的地球、太阳系和我的书桌是不是也在跟着变胖？',
      dad: '放心，不会变胖！原子之间的电磁力和太阳系、银河系内部的引力比宇宙膨胀强得多，牢牢把它们绑在一起。宇宙膨胀只把相隔几千万光年以上的遥远星系团彼此推得越来越远。',
    },
    {
      nian: '科学家怎么敢肯定宇宙真的在膨胀、而且大约有 138 亿岁呢？',
      dad: '两大铁证！一是 1929 年哈勃发现几乎所有遥远星系的光都拉长变红（红移），离得越远退得越快；二是 1964 年科学家还收到了充满全天空的大爆炸“余温”——宇宙微波背景辐射！',
    },
    {
      nian: '我明白了！宇宙大爆炸不是在某一点炸开，而是空间本身像发面的葡萄干面包一样处处伸展，所以宇宙没有唯一中心，遥远星系离我们越远退得越快！',
      dad: '讲得太清楚了！能把“空间本身膨胀”想明白，小念已经摸到现代宇宙学的大门啦。',
    },
  ],
  tip: '家长可以拿一只未吹气的气球，用马克笔点上五六个小圆点代表星系，让孩子慢慢吹大气球：每个圆点之间的距离都会同时变大，而且原本隔得最远的两个点分开得最快，是最经典的哈勃定律演示。',
  sources: [
    { title: 'The Big Bang — NASA Science', by: 'NASA Science', url: 'https://science.nasa.gov/universe/overview/' },
    { title: 'Planck and the Cosmic Microwave Background', by: 'ESA', url: 'https://www.esa.int/Science_Exploration/Space_Science/Planck' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '不是空房间里放烟花',
        duration: 8,
        cues: [
          { kind: 'pulse', at: [600, 420], color: '#b197fc', radius: 220, from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [170, 170], color: '#5b3e96', text: '138 亿年前', motion: 'grow', from: 0.4 },
          { kind: 'myth', wrong: '大爆炸是在太空中心某一点炸开', right: '是空间本身在每一处同时伸展', from: 2.0 },
        ],
      },
      {
        turn: 1,
        title: '像烤箱里的葡萄干面包',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [620, 320], color: '#ffe8cc', text: '发面膨胀', motion: 'grow', from: 0.2 },
          { kind: 'atom', path: [[600, 440]], symbol: '我', color: '#e8590c', r: 28, from: 0.4 },
          { kind: 'atom', path: [[720, 440], [840, 440]], symbol: '近星', color: '#5b3e96', r: 24, travel: 4, from: 0.8 },
          { kind: 'atom', path: [[810, 340], [1020, 260]], symbol: '远星', color: '#3b6ea5', r: 24, travel: 4, from: 0.8 },
          { kind: 'text', at: [600, 740], text: '越远星系，中间空间涨越多', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '引力牢牢绑住地球和银河',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 440], size: [260, 96], color: '#51cf66', text: '银河内部不涨', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [860, 440], size: [260, 96], color: '#b197fc', text: '星系团被拉开', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '局部引力远强于宇宙膨胀', size: 'm', color: '#5b3e96', from: 2.6 },
        ],
      },
      {
        turn: 4,
        title: '星系红移与大爆炸余温',
        duration: 7,
        cues: [
          { kind: 'wave', a: [220, 340], b: [980, 340], wavelength: 110, amplitude: 24, color: '#ff6b6b', from: 0.3 },
          { kind: 'label', at: [600, 320], pos: [600, 220], text: '星光被空间拉长变红', color: '#e03131', from: 1.0 },
          { kind: 'shape', shape: 'pill', at: [600, 560], size: [340, 86], color: '#74c0fc', text: '大爆炸余温', from: 2.2 },
        ],
      },
    ],
  },
};
