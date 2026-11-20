import type { Story } from './types';

export const timeZones: Story = {
  slug: 'time-zones',
  title: '为什么北京已经天亮了，纽约还是前一天晚上？',
  trigger: '早上七点小念背着书包准备上学，视频那头住在纽约的表姐却说，自己刚吃完前一天的晚饭。',
  dialogue: [
    {
      nian: '爸爸，我这儿已经是早上了，表姐那儿怎么还是昨天晚上？我们不在同一个今天吗？',
      dad: '你们在同一个时刻，却不在同一个钟点！太阳只能照亮地球朝向它的那一半，另一半是黑夜。北京早上七点时，纽约在北京西边差不多半个地球远的地方，太阳还没转过去，所以那里才是前一天傍晚六点。',
    },
    {
      nian: '太阳怎么“转过去”？是太阳绕着地球跑吗？',
      dad: '是地球自己在转！地球像一只大陀螺，自西向东转，大约 24 小时转一整圈。站在地上的我们感觉不到在转，反而觉得太阳从东边升起、往西边落下，就像坐在开动的火车上，看到窗外的树往后跑一样。',
    },
    {
      nian: '24 小时转一整圈，那每个小时转过多少度？',
      dad: '算一算：一圈是 360 度，除以 24 小时，每小时正好转过 15 度。所以人们把地球按经度每 15 度切成一瓣，像切西瓜一样分成 24 个时区，每往东跨过一个时区，钟表就拨快 1 小时。',
      eq: '360° ÷ 24 小时 = 每小时 15°',
      figure: {
        kind: 'sim',
        sim: 'timeZoneSpin',
        caption: '拖动北京时间，从北极上空看地球自西向东转，比一比北京和纽约的钟点与昼夜。',
      },
    },
    {
      nian: '那北京和纽约之间隔了几个时区，到底差几个小时？',
      dad: '北京用东八区的时间，比世界标准时间快 8 小时；纽约冬天用西五区的时间，慢 5 小时，一加就差了 13 小时。纽约夏天还会把钟拨快 1 小时过“夏令时”，那时就差 12 小时。所以北京早上 7 点，冬天的纽约是前一天晚上 6 点。',
    },
    {
      nian: '东八区好记！那中国这么大，是不是也分了好几个时区？',
      dad: '从经度上看，中国从西到东横跨了大约 5 个时区，冬天新疆的孩子早上八点多出门，天可能还黑着呢。可为了全国上班、坐火车、看新闻都对得上，我们统一使用北京时间，也就是东八区的时间。',
    },
    {
      nian: '我明白了！地球自西向东转，每小时转 15 度，太阳总是先照到东边；纽约在北京西边差不多半个地球远，所以北京天亮时那里还是前一天傍晚，中国虽然横跨约 5 个时区，却统一用北京时间！',
      dad: '说得真清楚！冬天和表姐视频前，先用“北京时间减 13 小时”算一算，就不会在她半夜睡觉时打过去啦。',
    },
  ],
  tip: '可以在暗房里用台灯当太阳、地球仪当地球，在北京和纽约各贴一张小贴纸，让孩子自西向东慢慢转动地球仪，看哪张贴纸先“天亮”。和海外亲友视频前，也可以和孩子一起查一查对方的当地时间。',
  sources: [
    { title: '义务教育科学教科书 六年级上册·地球的运动', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Earth: Facts', by: 'NASA Science', url: 'https://science.nasa.gov/earth/facts/' },
    { title: 'Time Zones of the World', by: 'timeanddate.com', url: 'https://www.timeanddate.com/time/time-zones.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '同一刻不同钟点',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [130, 450], size: [170, 170], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'ray', path: [[230, 450], [440, 450]], color: '#ffd43b', from: 0.3 },
          { kind: 'atom', path: [[650, 450]], symbol: '地球', color: '#4dabf7', r: 170, from: 0.4 },
          { kind: 'sprite', icon: '🌙', path: [[1010, 250]], size: 60, from: 1.0 },
          { kind: 'label', at: [520, 380], pos: [380, 220], text: '北京 早上7点', color: '#e8590c', from: 1.6 },
          { kind: 'label', at: [790, 520], pos: [930, 720], text: '纽约 前一天18点', color: '#5b3e96', from: 2.4 },
          { kind: 'myth', wrong: '全世界同时都是早上7点', right: '太阳只照亮地球的一半', from: 4.0 },
        ],
      },
      {
        turn: 1,
        title: '地球自西向东转',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[600, 430]], symbol: '地球', color: '#4dabf7', r: 170, from: 0 },
          { kind: 'arrow', path: [[390, 630], [600, 690], [810, 630]], color: '#e8590c', text: '自西向东', draw: 1.2, from: 0.6 },
          { kind: 'sprite', icon: '☀️', path: [[1080, 640], [1080, 220]], size: 64, travel: 4, from: 1.0 },
          { kind: 'count', at: [200, 200], label: '转一圈约', start: 0, end: 24, unit: '小时', from: 1.6 },
          { kind: 'text', at: [600, 830], text: '太阳东升西落因地球自转', size: 's', color: '#5b3e96', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '每小时转15°',
        duration: 9,
        cues: [
          { kind: 'formula', at: [600, 130], text: '360° ÷ 24 = 15°', from: 0 },
          { kind: 'atom', path: [[560, 500]], symbol: '北极', color: '#4dabf7', r: 210, from: 0.3 },
          { kind: 'bond', a: [560, 500], b: [770, 500], color: '#e8590c', from: 1.0 },
          { kind: 'bond', a: [560, 500], b: [763, 446], color: '#e8590c', from: 1.3 },
          { kind: 'label', at: [740, 480], pos: [960, 360], text: '一个时区15°', color: '#e8590c', from: 1.9 },
          { kind: 'count', at: [960, 720], label: '全球时区', start: 0, end: 24, unit: '个', from: 2.6 },
        ],
      },
      {
        turn: 3,
        title: '北京纽约差13小时',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [290, 420], size: [330, 140], color: '#ffe8cc', text: '北京东八区', from: 0 },
          { kind: 'shape', shape: 'pill', at: [910, 420], size: [330, 140], color: '#e5dbff', text: '纽约西五区', from: 0.5 },
          { kind: 'arrow', path: [[470, 420], [730, 420]], color: '#e8590c', text: '差13小时', from: 1.2 },
          { kind: 'count', at: [290, 680], label: '北京早上', start: 0, end: 7, unit: '点', from: 1.8 },
          { kind: 'count', at: [910, 680], label: '纽约前一天', start: 0, end: 18, unit: '点', from: 2.2 },
          { kind: 'text', at: [600, 170], text: '夏令时期间只差12小时', size: 's', color: '#5d4e37', from: 3.6 },
        ],
      },
      {
        turn: 4,
        title: '全国统一北京时间',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [240, 450], size: [150, 300], color: '#ffe3e3', text: '东五区', from: 0 },
          { kind: 'shape', shape: 'rect', at: [400, 450], size: [150, 300], color: '#fff3bf', text: '东六区', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [560, 450], size: [150, 300], color: '#d3f9d8', text: '东七区', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [720, 450], size: [150, 300], color: '#ffc9c9', text: '东八区', from: 0.9 },
          { kind: 'shape', shape: 'rect', at: [880, 450], size: [150, 300], color: '#d0ebff', text: '东九区', from: 1.2 },
          { kind: 'text', at: [600, 780], text: '中国横跨约5个时区', size: 's', color: '#5d4e37', from: 1.8 },
          { kind: 'label', at: [720, 320], pos: [720, 160], text: '全国都用东八区', color: '#e8590c', from: 2.8 },
        ],
      },
    ],
  },
};
