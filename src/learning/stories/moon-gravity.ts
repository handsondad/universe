import type { Story } from './types';

export const moonGravity: Story = {
  slug: 'moon-gravity',
  title: '到了月球上我会变轻吗，体重秤上的数字为什么会变？',
  trigger: '看阿波罗登月纪录片时，小念发现航天员穿着笨重的宇航服，在月球上却像袋鼠一样一蹦老远。',
  dialogue: [
    {
      nian: '爸爸，航天员在月球上蹦得像袋鼠一样轻飘飘，是不是一到月球，身体就变轻、变少了？',
      dad: '你身上一块肉都没少！科学家把“身体里含有多少物质”叫作质量，你现在是 30 千克，带到月球、火星还是 30 千克。真正变了的是重量——也就是星球把你往下拉的力气，月球拉人的力气只有地球的大约六分之一。',
    },
    {
      nian: '质量不变、重量变了？那我站上月球的体重秤，数字会变成多少？',
      dad: '体重秤量的其实是你往下压它的力气。在地球上它显示 30 千克，搬到月球就只剩 5 千克左右，因为月球表面的重力加速度约 1.62 米每二次方秒，大约是地球 9.8 的六分之一。你一点没瘦，是秤被压得轻了！',
      eq: '重力 G = m·g，月球 g ≈ 1.62 m/s² ≈ 地球的 1/6',
      figure: {
        kind: 'sim',
        sim: 'moonJump',
        caption: '换换星球、改改体重：质量始终不变，体重秤读数和跳跃高度却跟着星球的重力一起变。',
      },
    },
    {
      nian: '月球的重力为什么只有地球的六分之一呢？',
      dad: '引力大小看两样：星球有多少质量，你离它的中心有多远。月球的质量只有地球的约 1/81，拉力本该弱得多；可它的半径只有地球的约 0.27 倍，站在上面离中心近了不少，拉力又被“补”回来一些，算下来正好约六分之一。',
    },
    {
      nian: '离中心近了拉力会变大？那在月球上用同样的力气跳，能跳多高？',
      dad: '同样使劲蹬地，起跳速度一样，可月球往回拽你的力气只有六分之一，所以你能升到地球上约 6 倍的高度，在空中停留的时间也拉长到约 6 倍。在地球上跳起 25 厘米左右，到月球就能跳到一米五上下！',
    },
    {
      nian: '在空中停留那么久！那阿波罗航天员在月球上为什么偏要像袋鼠一样蹦着走？',
      dad: '因为重量变小了，可质量和惯性一点没少！穿着又大又笨重的宇航服，脚底压地的力气又小、抓地不牢，迈大步很容易刹不住、摔跟头。航天员发现双脚一蹦一蹦地往前跳，反而又省力又稳当，就成了月球上的“袋鼠”。',
    },
    {
      nian: '质量和惯性都没少，那要是去火星，体重秤又会显示多少呢？',
      dad: '火星表面的重力加速度约 3.71 米每二次方秒，差不多是地球的 0.38 倍，30 千克的你称出来大约 11 千克多。不管去哪个星球，你的质量都是 30 千克，变的只是那个星球拉你的力气。',
    },
    {
      nian: '我懂了！质量是我身上有多少物质，走到哪儿都不变；重量是星球拉我的力，月球的引力只有地球约六分之一，所以秤上的数字变小，同样一跳能蹦得更高、在空中停得更久！',
      dad: '总结得太到位了！去互动图里换换星球和体重，看看秤上的数字和跳跃弧线怎么变吧。',
    },
  ],
  tip: '可以和孩子用厨房秤称一瓶水，说明“秤上的数字其实是压力换算出来的”，再讨论把秤搬到月球会怎样。孩子模仿“月球袋鼠跳”时请在软垫或草地上进行，远离桌角、楼梯和玻璃门。',
  sources: [
    { title: '义务教育教科书 物理 八年级下册·重力', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Earth’s Moon: Facts', by: 'NASA Science', url: 'https://science.nasa.gov/moon/facts/' },
    { title: 'What Is Gravity?', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/what-is-gravity/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '身体一点没少',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 420], size: [230, 230], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'shape', shape: 'circle', at: [880, 420], size: [150, 150], color: '#adb5bd', text: '月球', from: 0.3 },
          { kind: 'sprite', icon: '🧒', path: [[300, 230], [880, 270]], size: 64, travel: 2.2, from: 0.6 },
          { kind: 'label', at: [880, 270], pos: [880, 150], text: '还是30千克', color: '#5b3e96', from: 2.8 },
          { kind: 'myth', wrong: '到了月球，身体会变少变轻', right: '质量不变，变的是重量', from: 3.4 },
        ],
      },
      {
        turn: 1,
        title: '秤上读数变小',
        duration: 8,
        cues: [
          { kind: 'count', at: [340, 400], label: '地球秤读数', start: 0, end: 30, unit: 'kg', over: 1.8, from: 0.3 },
          { kind: 'count', at: [860, 400], label: '月球秤读数', start: 0, end: 5, unit: 'kg', over: 1.8, from: 1.2 },
          { kind: 'arrow', path: [[340, 520], [340, 660]], color: '#e8590c', text: '压力大', from: 2.2 },
          { kind: 'arrow', path: [[860, 520], [860, 565]], color: '#ff922b', text: '压力小', from: 2.6 },
          { kind: 'text', at: [600, 760], text: '月球重力约地球1/6', size: 'm', color: '#5b3e96', from: 3.2 },
        ],
      },
      {
        turn: 2,
        title: '月球又小又轻',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 440], size: [380, 380], color: '#3b6ea5', text: '地球', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [900, 440], size: [103, 103], color: '#adb5bd', text: '月球', from: 0.8 },
          { kind: 'label', at: [900, 400], pos: [900, 220], text: '质量约1/81', color: '#e8590c', from: 1.6 },
          { kind: 'label', at: [900, 490], pos: [900, 660], text: '半径约0.27倍', color: '#3b6ea5', from: 2.4 },
          { kind: 'text', at: [600, 800], text: '算下来重力约六分之一', size: 'm', color: '#5d4e37', from: 3.4 },
        ],
      },
      {
        turn: 3,
        title: '同样一跳六倍高',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 800], size: [420, 60], color: '#3f7d4e', text: '地球', from: 0 },
          { kind: 'shape', shape: 'rect', at: [860, 800], size: [420, 60], color: '#8d8a96', text: '月球', from: 0 },
          { kind: 'toss', at: [230, 740], velocity: [60, -300], gravity: 900, ground: 760, icon: '🧒', from: 1.0 },
          { kind: 'toss', at: [740, 740], velocity: [60, -300], gravity: 150, ground: 760, icon: '🧒', from: 1.0 },
          { kind: 'text', at: [600, 200], text: '高约6倍，停约6倍久', size: 'm', color: '#e8590c', from: 5.2 },
        ],
      },
      {
        turn: 4,
        title: '蹦着走更稳当',
        duration: 8,
        cues: [
          { kind: 'sprite', icon: '🧑‍🚀', path: [[180, 680], [330, 540], [480, 680], [630, 540], [780, 680], [930, 540], [1060, 680]], size: 72, travel: 5.5, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1100, 50], color: '#8d8a96', from: 0 },
          { kind: 'text', at: [600, 220], text: '重量变小，惯性没少', size: 'm', color: '#5b3e96', from: 1.6 },
          { kind: 'label', at: [480, 680], pos: [480, 360], text: '双脚蹦跳不打滑', color: '#2f8a57', from: 3.0 },
        ],
      },
      {
        turn: 5,
        title: '三个星球比重力',
        duration: 8,
        cues: [
          { kind: 'meter', at: [600, 260], label: '地球9.8', start: 0, end: 1, color: '#3b6ea5', over: 1.6, from: 0.3 },
          { kind: 'meter', at: [600, 420], label: '火星3.71', start: 0, end: 0.38, color: '#b8572f', over: 1.6, from: 1.0 },
          { kind: 'meter', at: [600, 580], label: '月球1.62', start: 0, end: 0.17, color: '#8d8a96', over: 1.6, from: 1.7 },
          { kind: 'text', at: [600, 760], text: '质量处处都是30千克', size: 'm', color: '#5d4e37', from: 3.0 },
        ],
      },
    ],
  },
};
