import type { Story } from './types';

export const earthSeasonsLab: Story = {
  slug: 'earth-seasons-lab',
  title: '地球绕太阳转，为什么会有春夏秋冬？',
  trigger: '冬天小念穿着厚羽绒服，却在视频里看见澳大利亚的小朋友正穿着短袖去海边玩水。',
  dialogue: [
    {
      nian: '爸爸，夏天是不是因为地球转到离太阳更近的地方了？',
      dad: '其实刚好相反！地球在 1 月初才转到离太阳最近的“近日点”，可那时候咱们北半球正在过冷飕飕的冬天。四季真正的开关，是地球自己歪着脖子转——地轴倾斜了 23.44 度。',
    },
    {
      nian: '地球歪着脖子转，和地轴倾斜怎么就变出冷热了？',
      dad: '打个比方，拿手电筒垂直照在桌子上，光斑又小又亮；把灯斜过来照，同样一束光被拉成一大片，每平方厘米分到的热量就稀多了。北半球夏至时朝太阳倾过去，阳光照得更直，所以酷热。',
      figure: {
        kind: 'sim',
        sim: 'seasonsTilt',
        caption: '拖动月份和地轴倾角，看太阳直射点、正午太阳高度和地面受热效率怎么变化。',
      },
    },
    {
      nian: '除了阳光斜着照热量变稀，夏天白天是不是也特别长？',
      dad: '对极了！地轴倾斜同时改了两件事：太阳挂得更高、照得更直，而且太阳每天在天上待的时间更长。北京夏至白昼将近 15 小时，冬至只有 9 个多小时，一多一少把冷暖彻底拉开。',
    },
    {
      nian: '怪不得冬至白昼那么短，澳大利亚那边却在过夏天！那北半球冬天时南半球刚好朝太阳歪着吗？',
      dad: '没错！地球绕太阳公转时，地轴永远固执地指向北极星方向。转到轨道这一头，北半球倾着晒太阳、南半球躲着斜射；半年后转到对面，南北半球角色互换，澳大利亚就迎来炎夏。',
    },
    {
      nian: '要是地轴完全直挺挺的、一点也不歪，地球还会不会有四季？',
      dad: '那就几乎没有春夏秋冬了！如果倾角是 0 度，太阳永远直射赤道，全球每天都是 12 小时白天、12 小时黑夜，赤道一直酷热、高纬度一直寒冷，再也不会春暖花开、秋叶飘黄。',
    },
    {
      nian: '我懂了！四季不是因为离太阳近远，而是地球歪着 23.44 度地轴公转，让南北半球轮流享受阳光直射和长白天！',
      dad: '总结得太准了！点右上角去 3D 实验台，还能亲手掰动地球倾角、绕太阳转一圈看看四季怎么切换。',
    },
  ],
  tip: '家长可以拿一个橙子插根筷子当地球、手机手电筒当太阳，保持筷子永远朝房间同一面墙倾斜绕圈，孩子一眼就能明白为什么南北半球季节相反。提醒孩子切勿肉眼直视太阳。',
  sources: [
    { title: '义务教育地理教科书 七年级上册·地球的运动', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'What Causes the Seasons?', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/seasons/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '1月反倒离太阳更近',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [170, 170], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'atom', path: [[250, 450], [280, 450]], symbol: '1月', color: '#4dabf7', r: 46, from: 0.4 },
          { kind: 'atom', path: [[960, 450], [930, 450]], symbol: '7月', color: '#ff922b', r: 46, from: 0.8 },
          { kind: 'label', at: [280, 400], pos: [260, 260], text: '近日点：北半球冬天', color: '#1c7ed6', from: 1.4 },
          { kind: 'label', at: [930, 400], pos: [930, 260], text: '远日点：北半球夏天', color: '#e8590c', from: 2.0 },
          { kind: 'myth', wrong: '夏天是因为地球离太阳更近', right: '四季来自地轴倾斜 23.44°', from: 2.8 },
        ],
      },
      {
        turn: 1,
        title: '直射集中，斜射分散',
        duration: 8,
        cues: [
          { kind: 'ray', path: [[220, 220], [340, 560]], color: '#f59f00', from: 0.2, draw: 1.0 },
          { kind: 'ray', path: [[340, 220], [340, 560]], color: '#f59f00', from: 0.2, draw: 1.0 },
          { kind: 'shape', shape: 'pill', at: [340, 580], size: [120, 32], color: '#e8590c', text: '直射光斑小', from: 1.4 },
          { kind: 'ray', path: [[680, 260], [920, 560]], color: '#ffd43b', from: 2.2, draw: 1.0 },
          { kind: 'ray', path: [[760, 220], [1040, 560]], color: '#ffd43b', from: 2.2, draw: 1.0 },
          { kind: 'shape', shape: 'pill', at: [960, 580], size: [210, 32], color: '#4dabf7', text: '斜射铺开稀', from: 3.4 },
          { kind: 'text', at: [600, 740], text: '同样阳光，直射单位面积更烫', size: 'm', color: '#5d4e37', from: 4.4 },
        ],
      },
      {
        turn: 2,
        title: '白天更长，热量更足',
        duration: 7,
        cues: [
          { kind: 'meter', at: [320, 360], label: '北京夏至白昼', start: 0.2, end: 0.85, color: '#e8590c', over: 2.5, from: 0.4 },
          { kind: 'meter', at: [320, 520], label: '北京冬至白昼', start: 0.2, end: 0.45, color: '#3b6ea5', over: 2.5, from: 0.8 },
          { kind: 'count', at: [880, 360], label: '夏至日照', start: 9, end: 15, unit: '小时', over: 2.5, from: 0.6 },
          { kind: 'count', at: [880, 520], label: '冬至日照', start: 15, end: 9, unit: '小时', over: 2.5, from: 1.0 },
        ],
      },
      {
        turn: 3,
        title: '南北半球季节相反',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [140, 140], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'atom', path: [[250, 440], [250, 440]], symbol: '6月', color: '#4dabf7', r: 54, from: 0.4 },
          { kind: 'atom', path: [[950, 440], [950, 440]], symbol: '12月', color: '#4dabf7', r: 54, from: 0.8 },
          { kind: 'label', at: [250, 385], pos: [250, 230], text: '北夏南冬', color: '#e8590c', from: 1.5 },
          { kind: 'label', at: [950, 385], pos: [950, 230], text: '北冬南夏', color: '#3b6ea5', from: 2.2 },
          { kind: 'text', at: [600, 740], text: '地轴永远斜指北极星方向', size: 'm', color: '#5b3e96', from: 3.0 },
        ],
      },
      {
        turn: 5,
        title: '倾斜地轴送来四季轮回',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 360], size: [220, 74], color: '#51cf66', text: '春分秋分', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [860, 360], size: [220, 74], color: '#ff922b', text: '夏至冬至', from: 1.0 },
          { kind: 'arrow', path: [[460, 360], [740, 360]], color: '#5b3e96', text: '地轴倾斜公转', from: 1.6 },
          { kind: 'text', at: [600, 620], text: '倾角决定太阳高度与昼长', size: 'l', color: '#5b3e96', from: 2.6 },
        ],
      },
    ],
  },
};
