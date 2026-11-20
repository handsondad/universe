import type { Story } from './types';

export const oceanTides: Story = {
  slug: 'ocean-tides',
  title: '海水每天涨潮落潮两次，为什么背对月亮的那一边也会涨潮？',
  trigger: '小念在海边玩了一整天，发现上午涨潮刚退下去，晚上月亮转到地球背面后海水居然又涨上来了。',
  dialogue: [
    {
      nian: '爸爸，海水涨潮是因为月亮把海水吸起来，可背对月亮的地球另一头为什么也跟着涨潮？',
      dad: '这个问题连很多大学生都会卡壳！涨潮靠的不是“整体吸力”，而是引力“近强远弱”的拉扯差——也就是引潮力。把地球想象成三节排成一排的橡皮筋：近月海水拉得最猛，地心居中，远月海水拉得最弱。',
    },
    {
      nian: '拉扯差怎么就能让最远的那一头也鼓起来呢？',
      dad: '因为近月海水被拽向月亮跑在了地心前面，形成第一个水鼓包；而背对月亮那边的海水受到的拉力比地心弱，被地球整体“甩在了后头”，相对地面同样往外鼓起第二个水包！',
      figure: {
        kind: 'sim',
        sim: 'oceanTidesSim',
        caption: '拖动月球公转方向，观察面向和背向月球两头同时鼓起的水包以及大潮小潮变化。',
      },
    },
    {
      nian: '两头同时鼓起水包，地球每自转一圈我们就会钻进这两个水包两次对吗？',
      dad: '答对啦！地球每 24 小时自转一圈，海滩会先后经过正对月亮和背对月亮的两个水鼓包，所以大多数海岸大约每 12 小时 25 分钟就涨一次潮，一天正好两涨两落。',
    },
    {
      nian: '太阳比月亮重那么多，太阳会不会也把海水拉起来？',
      dad: '会的！只是太阳离地球太远（距离是月球的近 400 倍），它的引潮力大约只有月球的一半。农历初一和十五时日地月排成一线，太阳和月亮联手拉，海水就涨得特别高，叫“大潮”。',
    },
    {
      nian: '那初八和二十三，太阳和月亮排成直角的时候，潮水就会变小吗？',
      dad: '完全正确！那时候月亮朝这边拉、太阳朝垂直方向拉，两股力量互相抵消一部分，潮差最小，叫“小潮”。赶海的渔民看农历日子就能算出什么时候退潮退得最远。',
    },
    {
      nian: '我明白了！涨潮来自月球引力“近强远弱”的拉扯差，在面对和背对月亮两头都鼓起水包，所以每天涨潮两次，初一十五太阳帮忙还会出现大潮！',
      dad: '理解得太透彻了！下次去海边赶海前，记得提前查查潮汐表、千万不要在涨潮时往礁石深处走哦。',
    },
  ],
  tip: '引潮力与距离的三次方成反比，所以虽然太阳对地球总引力远大于月球，但距离更近的月球在地球直径两端造成的引力差反而比太阳大两倍多。海边游玩务必关注潮汐时间表，防止涨潮困住退路。',
  sources: [
    { title: '普通高中地理教科书 必修第一册·海水的运动', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Tides — Moon in Motion', by: 'NASA Science', url: 'https://science.nasa.gov/moon/tides/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '引力近强远弱形成拉扯差',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[950, 440]], symbol: '月球', color: '#ffe89e', r: 44, from: 0 },
          { kind: 'shape', shape: 'circle', at: [480, 440], size: [180, 180], color: '#3b6ea5', text: '地球', from: 0.2 },
          { kind: 'arrow', path: [[585, 440], [740, 440]], color: '#e8590c', text: '近侧拉得最猛', from: 1.0 },
          { kind: 'arrow', path: [[480, 330], [585, 330]], color: '#ff922b', text: '地心拉力居中', from: 1.8 },
          { kind: 'arrow', path: [[375, 440], [435, 440]], color: '#74c0fc', text: '远侧拉得最弱', from: 2.6 },
        ],
      },
      {
        turn: 1,
        title: '一拉一甩，两头同时涨潮',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'pill', at: [520, 440], size: [340, 190], color: '#74c0fc', text: '双水鼓包', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [520, 440], size: [170, 170], color: '#3b6ea5', text: '地球', from: 0.3 },
          { kind: 'label', at: [670, 440], pos: [820, 290], text: '拉到地心前面', color: '#e8590c', from: 1.4 },
          { kind: 'label', at: [370, 440], pos: [240, 290], text: '甩在地心后头', color: '#5b3e96', from: 2.2 },
          { kind: 'myth', wrong: '只有正对月亮那一面才涨潮', right: '面对和背对月亮两头同时涨潮', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '每天大约两涨两落',
        duration: 7,
        cues: [
          { kind: 'count', at: [360, 430], label: '两次涨潮间隔', start: 0, end: 12.4, unit: '小时', over: 2.4, from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [840, 430], size: [240, 96], color: '#4dabf7', text: '地球自转穿两包', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '每天涨潮推迟约50分钟', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
      {
        turn: 3,
        title: '初一十五联手造大潮',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [170, 440], size: [130, 130], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'shape', shape: 'pill', at: [580, 440], size: [260, 140], color: '#74c0fc', from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [580, 440], size: [130, 130], color: '#3b6ea5', text: '地球', from: 0.4 },
          { kind: 'atom', path: [[920, 440]], symbol: '满月', color: '#ffe89e', r: 38, from: 0.8 },
          { kind: 'text', at: [600, 690], text: '日地月一线叠加 → 大潮', size: 'l', color: '#e8590c', from: 2.0 },
        ],
      },
    ],
  },
};
