import type { Story } from './types';

export const hubbleDeepField: Story = {
  slug: 'hubble-deep-field',
  title: '对着一小块黑漆漆的“空”天空拍照，为什么能拍出上万个星系？',
  trigger: '小念看到一张哈勃深空照片，上面密密麻麻挤满了星系，爸爸却说它拍的是一小块“什么都没有”的黑天空。',
  dialogue: [
    {
      nian: '爸爸，这张照片拍的明明是一小块黑漆漆的空天空，怎么会挤满了上万个星系？',
      dad: '这来自天文史上一次大胆的“赌博”！1995 年，天文学家让哈勃望远镜对准北斗七星附近一小块看起来空空的天区，一连拍了好多天。很多人担心白白浪费宝贵的观测时间，结果照片一出来，满眼都是星系！',
    },
    {
      nian: '那块天区里的星系本来就在，为什么我们用眼睛看过去只是一片黑？',
      dad: '因为它们太远、太暗了！就像下雨天用水桶接雨，接一秒钟只有几滴，接上一整天就是满满一桶。望远镜曝光越久，收集到的微弱星光就越多。2004 年的哈勃超深场前后累计曝光约 100 万秒，相当于连续盯着看 11 天多！',
      figure: {
        kind: 'sim',
        sim: 'deepFieldCount',
        caption: '拖动曝光时间和天区大小，看越来越多又暗又红的遥远星系从黑暗里冒出来。',
      },
    },
    {
      nian: '曝光 100 万秒才拍到的那些最暗的小红点，离我们到底有多远？',
      dad: '越暗越红的，往往越远！光跑得再快也要花时间，照片里最暗的那些星系，光已经在路上走了约 130 亿年，我们看到的是宇宙“小时候”的样子。宇宙膨胀还把这些古老的光拉长了，所以它们看起来发红。',
      figure: { kind: 'sim', sim: 'lightYearLookback', caption: '切换不同距离的天体，体会“看得越远，看到的就越是过去”。' },
    },
    {
      nian: '光走了 130 亿年的星系都挤在照片里，这块天空到底有多大？',
      dad: '小得惊人！整张超深场只有满月直径的十分之一左右宽，差不多就是你伸直手臂、用指尖捏着的一粒沙子能挡住的那么一小块。就在这粒“沙子”后面，藏着大约 1 万个星系。',
    },
    {
      nian: '一粒沙子后面就有 1 万个星系，那整个天空加起来得有多少个？',
      dad: '我们来估一估：要用上千万粒这样的“沙子”才能铺满整个天空，每粒后面都藏着成千上万个星系，加起来就是上千亿个！还有很多更暗的根本没拍到，所以可观测宇宙里大约有数千亿甚至更多星系。现在韦布望远镜看得更深，又找到了更多更古老的星系。',
    },
    {
      nian: '我懂了！黑漆漆的天空一点都不空，只是那些星系太远太暗；哈勃把一粒沙子大小的天区曝光一百多万秒，就拍到约 1 万个星系，按比例算整个宇宙有数千亿甚至更多星系！',
      dad: '说得太好了！下次你抬头看到星星之间的黑色空隙，可以想一想：那里也许正藏着成千上万个遥远的星系，它们的光比地球还要古老。',
    },
  ],
  tip: '可以和孩子做“一粒沙”实验：伸直手臂、指尖捏一粒沙或小米对着夜空，体会哈勃超深场的天区有多小；再用手机夜景或专业模式对同一片天空分别曝光 1 秒和 10 秒，对比长曝光能多拍到多少暗星。',
  sources: [
    { title: '义务教育教科书 科学 六年级下册·宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Hubble Deep Fields', by: 'NASA Science', url: 'https://science.nasa.gov/mission/hubble/science/universe-uncovered/hubble-deep-fields/' },
    { title: 'Hubble Ultra Deep Field (heic0611b)', by: 'ESA/Hubble', url: 'https://esahubble.org/images/heic0611b/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '一块“空”天空',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [380, 380], color: '#1c1836', text: '看似空空', from: 0.2, to: 2.2 },
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [380, 380], color: '#1c1836', from: 2.2 },
          { kind: 'particles', box: [430, 250, 340, 340], count: 30, color: '#ffd43b', motion: 'jitter', size: 7, amount: { at: 2.4, over: 4, from: 0, to: 30 }, from: 2.2 },
          { kind: 'label', at: [770, 260], pos: [990, 180], text: '北斗七星附近', color: '#5b3e96', from: 1 },
          { kind: 'text', at: [600, 740], text: '一拍竟然满是星系！', size: 'm', color: '#e8590c', from: 5 },
        ],
      },
      {
        turn: 1,
        title: '水桶接雨，越久越多',
        duration: 9,
        cues: [
          { kind: 'flow', path: [[380, 130], [380, 330]], color: '#ffd43b', count: 5, speed: 180, from: 0.3 },
          { kind: 'vessel', vessel: 'beaker', at: [380, 500], size: [220, 280], liquid: '#74c0fc', level: 0.05, rise: { to: 0.85, at: 1, over: 5 }, label: '收集星光', from: 0.2 },
          { kind: 'count', at: [860, 330], label: '累计曝光', start: 0, end: 100, unit: '万秒', over: 5, from: 1 },
          { kind: 'text', at: [860, 560], text: '约等于11天多', size: 'm', color: '#5b3e96', from: 4.5 },
        ],
      },
      {
        turn: 2,
        title: '越暗越远越古老',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [260, 420], size: [170, 120], color: '#a5d8ff', text: '近', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [100, 72], color: '#ffc078', text: '远', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [920, 420], size: [60, 44], color: '#e8590c', from: 1.4 },
          { kind: 'label', at: [920, 420], pos: [960, 270], text: '最暗最红', color: '#e8590c', from: 1.8 },
          { kind: 'wave', a: [880, 600], b: [320, 600], amplitude: 26, wavelength: 150, speed: 220, color: '#ff6b6b', from: 2.4 },
          { kind: 'count', at: [600, 200], label: '最暗的光走了', start: 0, end: 130, unit: '亿年', over: 2.5, from: 3.4 },
          { kind: 'text', at: [600, 720], text: '膨胀把古老的光拉红', size: 'm', color: '#5b3e96', from: 5.5 },
        ],
      },
      {
        turn: 3,
        title: '一粒沙大小的天区',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 440], size: [340, 340], color: '#fff3bf', from: 0.2 },
          { kind: 'label', at: [300, 330], pos: [200, 200], text: '满月', color: '#5d4e37', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [380, 440], size: [34, 34], color: '#1c1836', motion: 'pulse', from: 1.5 },
          { kind: 'label', at: [380, 440], pos: [820, 300], text: '宽约满月的1/10', color: '#5b3e96', from: 2.2 },
          { kind: 'count', at: [860, 560], label: '藏着的星系', start: 0, end: 10000, unit: '个', over: 2.5, from: 3.2 },
        ],
      },
      {
        turn: 4,
        title: '铺满全天有多少？',
        duration: 9,
        cues: [
          { kind: 'particles', box: [140, 120, 920, 200], count: 60, color: '#d0bfff', motion: 'jitter', size: 6, amount: { at: 0.4, over: 4, from: 0, to: 60 }, from: 0.2 },
          { kind: 'text', at: [600, 440], text: '上千万粒“沙子”铺满天', size: 'm', color: '#5d4e37', from: 1.2 },
          { kind: 'text', at: [600, 580], text: '数千亿甚至更多星系', size: 'l', color: '#5b3e96', from: 3 },
          { kind: 'myth', wrong: '星星之间的黑处什么也没有', right: '黑处藏着又远又暗的星系', from: 5 },
        ],
      },
    ],
  },
};
