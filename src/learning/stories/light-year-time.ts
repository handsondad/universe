import type { Story } from './types';

export const lightYearTime: Story = {
  slug: 'light-year-time',
  title: '科学家说星星离我们几百光年，“光年”是时间还是距离？',
  trigger: '小念读科普绘本时看到“比邻星距地球 4.2 光年”，以为坐飞船只要飞 4 年多就能到。',
  dialogue: [
    {
      nian: '爸爸，“光年”里面带着一个“年”字，它到底是在说时间还是在说距离？',
      dad: '这是宇宙里最容易让人上当的名字！“光年”其实是地地道道的距离单位，不是时间。它指的是一束光在真空里以每秒 30 万千米的速度，马不停蹄跑一整年走过的路程，大约 9.46 万亿千米！',
      eq: '1 光年 ≈ 300,000 km/s × 31,557,600 s ≈ 9.46 万亿千米',
    },
    {
      nian: '一光年就有 9.46 万亿千米！那光飞过这么远的路程，是不是也要花好多时间？',
      dad: '没错！光虽然是宇宙最快的速度冠军，但依然不是瞬间瞬移。连离我们最近的太阳，阳光也要飞 8 分 20 秒才照到你的脸上；比邻星的光飞到你眼里时，已经走了 4.2 年！',
      figure: {
        kind: 'sim',
        sim: 'lightYearLookback',
        caption: '切换不同距离的天体，看看星光抵达地球时需要飞多久、你看到的是多久以前的它。',
      },
    },
    {
      nian: '比邻星的光都要飞四年多！那看 1300 多光年外的猎户座星云，看到的岂不是唐朝时候的它？',
      dad: '一点没错！你抬头望向的每一颗星星，都是它“过去”的样子，而且离得越远、回望得越久。望远镜就像一台真正的时光机，把几十万甚至上百亿年前的宇宙现场直播到今天！',
    },
    {
      nian: '望远镜真像一台时光机！那坐现在最快的飞船，飞去 4.2 光年外的比邻星要多久？',
      dad: '就算坐每秒飙出 17 千米的旅行者 1 号，飞完 4.2 光年也要足足七万多年！正因为宇宙里的距离动辄几万亿千米，用“千米”写起来全是零，天文学家才发明了“光年”这把大尺子。',
    },
    {
      nian: '要是太阳突然熄灭了，我们是不是要在 8 分 20 秒之后才发现天黑了？',
      dad: '是呀！不仅是光，连引力变化也是以光速传播的。所以在那 8 分 20 秒里，地球还会照样暖洋洋地绕着原来的轨道转，直到最后那批阳光和引力波抵达才发觉。',
    },
    {
      nian: '我明白了！光年是光走一年的距离单位，约 9.46 万亿千米；因为光速有限，看越远的星空就等于看越久以前的宇宙！',
      dad: '说得真浪漫又准确！今晚抬头看星星时，别忘了你正亲眼接收着穿越几十上百年时空赶来的古老星光。',
    },
  ],
  tip: '除了“光年”，太阳系内部天文学家常用“天文单位（AU）”——地球到太阳的平均距离约 1.5 亿千米，合 8.3 光分；研究遥远星系还常用“秒差距（pc）”，1 秒差距约等于 3.26 光年。',
  sources: [
    { title: 'What Is a Light-Year?', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/light-year/en/' },
    { title: 'Measuring the Universe — Units of Astronomical Distance', by: 'IAU', url: 'https://www.iau.org/public/themes/measuring/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '光年是距离，不是时间',
        duration: 8,
        cues: [
          { kind: 'ray', path: [[140, 400], [1040, 400]], color: '#ffd43b', from: 0.2, draw: 2.0 },
          { kind: 'count', at: [600, 280], label: '光跑一年的距离', start: 0, end: 9.46, unit: '万亿km', over: 2.4, from: 0.8 },
          { kind: 'myth', wrong: '光年是用来计算时间的单位', right: '光年是光跑 1 年走过的长度单位', from: 2.2 },
        ],
      },
      {
        turn: 1,
        title: '阳光也要跑八分多钟',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [200, 440], size: [150, 150], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'shape', shape: 'circle', at: [980, 440], size: [100, 100], color: '#4dabf7', text: '地球', from: 0 },
          { kind: 'atom', path: [[290, 440], [910, 440]], symbol: '光', color: '#ffd43b', r: 26, travel: 4.0, from: 0.8 },
          { kind: 'count', at: [600, 280], label: '阳光在路上', start: 0, end: 500, unit: '秒', over: 4.0, from: 0.8 },
          { kind: 'text', at: [600, 680], text: '我们看的是八分钟前的太阳', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 2,
        title: '星空是天然的时光机',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'pill', at: [280, 380], size: [230, 82], color: '#ff8787', text: '比邻星4年前', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 460], size: [260, 82], color: '#b197fc', text: '猎户座唐朝光', from: 1.3 },
          { kind: 'shape', shape: 'pill', at: [920, 540], size: [250, 82], color: '#74c0fc', text: '仙女座远古光', from: 2.3 },
          { kind: 'text', at: [600, 720], text: '望得越远，看见的历史就越古老', size: 'm', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 3,
        title: '旅行者号要飞七万多年',
        duration: 7,
        cues: [
          { kind: 'meter', at: [340, 400], label: '光的速度', start: 0, end: 1.0, color: '#ffd43b', over: 2.0, from: 0.4 },
          { kind: 'meter', at: [340, 540], label: '旅行者号速度', start: 0, end: 0.04, color: '#4dabf7', over: 2.0, from: 1.0 },
          { kind: 'text', at: [600, 700], text: '光速比现有最快飞船快上万倍', size: 'm', color: '#e8590c', from: 2.4 },
        ],
      },
    ],
  },
};
