import type { Story } from './types';

export const timeDilationGps: Story = {
  slug: 'time-dilation-gps',
  title: '电影里去黑洞旁边待一小时地球过七年，时间真的会变慢吗？',
  trigger: '看完科幻电影《星际穿越》，小念觉得“去黑洞旁边一小时、地球过七年”听起来像魔法一样不可思议。',
  dialogue: [
    {
      nian: '爸爸，电影里宇航员去黑洞旁边待一小时、地球居然过了七年，时间真会变慢吗？',
      dad: '这不是科幻瞎编，而是爱因斯坦广义相对论预言、且被无数精密实验证实的真实规律！宇宙里并没有一块步调统一的“大挂钟”——引力越强的地方，时间本身就流逝得越慢。',
    },
    {
      nian: '引力越强时间越慢？那是手表零件被引力压得转不动了，还是时间本身真变慢了？',
      dad: '是时间本身变慢了！哪怕换成原子钟、心跳、细胞衰老甚至光的振动，在强引力里都会一起变慢。对于黑洞旁边的人来说，他觉得自己的一小时完全正常，可飞回远处一看，外面已经翻过好几年。',
      figure: {
        kind: 'sim',
        sim: 'gravityClock',
        caption: '切换时钟放置位置（GPS 卫星、地球海平面、大黑洞附近），对比它与地面时钟的快慢。',
      },
    },
    {
      nian: '黑洞离我们太远，我们地球人平时能不能亲眼测出这种时间变慢的现象？',
      dad: '你爸爸手机里的地图导航每天都在用它！天上的北斗和 GPS 卫星在两万多千米高空，引力比地面弱，卫星上的原子钟每天会比地面净快约 38 微秒。',
    },
    {
      nian: '一天才差 38 微秒，眨一下眼都不止那么点时间，不校准难道还能走错路吗？',
      dad: '差之毫厘，谬以千里！卫星定位靠算无线电波（光速）飞过来的时间：光在 38 微秒里就能飞出 11 千米多！如果不按爱因斯坦相对论每天校准，只要过一天，手机导航就会把你指到隔壁城区去！',
    },
    {
      nian: '除了引力越强时间越慢，听说飞得特别特别快的时候，时间也会变慢对吗？',
      dad: '答对啦！那叫“狭义相对论”的时间膨胀：速度越接近光速，时间走得越慢。事实上卫星高速绕地球飞会让它的钟每天慢 7 微秒，高空弱引力让它每天快 45 微秒，一减一加正好净快 38 微秒！',
    },
    {
      nian: '我明白了！时间不是全宇宙同步的，引力越强、速度越快，时间流逝越慢；连每天用的卫星导航都得靠相对论校准 38 微秒才指得准路！',
      dad: '太棒了！科学最酷的地方，就是把看起来像魔法的宇宙深处规律，实实在在用进了我们每天的生活里。',
    },
  ],
  tip: 'GPS/北斗卫星同时经历狭义相对论（高速运动使钟慢约 7 μs/天）和广义相对论（高空引力较弱使钟快约 45 μs/天），净效应为快约 38 μs/天。电影《星际穿越》的科学顾问正是诺贝尔物理学奖得主基普·索恩。',
  sources: [
    { title: 'Einstein’s Relativity and Everyday Life (GPS)', by: 'APS Physics / NASA', url: 'https://www.nasa.gov/missions/tech-demonstration/deep-space-atomic-clock/' },
    { title: '普通高中物理教科书 必修第二册·相对论时空观', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '引力越强，时间越慢',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [320, 420], size: [150, 150], color: '#1c1836', text: '大黑洞旁', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [880, 420], size: [150, 150], color: '#4dabf7', text: '遥远地球', from: 0.4 },
          { kind: 'count', at: [320, 590], label: '黑洞旁过', start: 0, end: 1, unit: '小时', over: 3, from: 1.0 },
          { kind: 'count', at: [880, 590], label: '地球已过', start: 0, end: 7, unit: '年', over: 3, from: 1.0 },
          { kind: 'myth', wrong: '全宇宙时间都按同一块表走', right: '强引力会让时间本身流逝变慢', from: 2.4 },
        ],
      },
      {
        turn: 2,
        title: '导航卫星每天快38微秒',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 480], size: [210, 210], color: '#3b6ea5', text: '地球地面', from: 0.2 },
          { kind: 'atom', path: [[840, 320]], symbol: '卫星', color: '#ffd43b', r: 36, from: 0.6 },
          { kind: 'label', at: [840, 280], pos: [840, 190], text: '高空引力弱，钟变快', color: '#2f8a57', from: 1.2 },
          { kind: 'label', at: [840, 360], pos: [840, 480], text: '高速运动，钟略慢', color: '#e8590c', from: 2.2 },
          { kind: 'text', at: [600, 720], text: '综合每天比地面快38微秒', size: 'm', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 3,
        title: '不修正一天会偏11千米',
        duration: 7,
        cues: [
          { kind: 'count', at: [360, 430], label: '一天累积偏差', start: 0, end: 11, unit: '千米', over: 2.6, from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [840, 430], size: [250, 96], color: '#51cf66', text: '相对论校准', from: 1.4 },
          { kind: 'text', at: [600, 680], text: '手机导航是相对论最日常的证明', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 4,
        title: '高速度与强引力都能慢时间',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 430], size: [260, 96], color: '#74c0fc', text: '近光速→变慢', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [860, 430], size: [260, 96], color: '#b197fc', text: '强引力→变慢', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '爱因斯坦用时空弯曲统一了它们', size: 'm', color: '#5b3e96', from: 2.6 },
        ],
      },
    ],
  },
};
