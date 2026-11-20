import type { Story } from './types';

export const solarSystemLab: Story = {
  slug: 'solar-system-lab',
  title: '八大行星为什么都绕着太阳转，离得越远转得越慢吗？',
  trigger: '小念在天文馆看到太阳系模型：最里面的水星飞快转圈，最外面的海王星几乎像静止了一样。',
  dialogue: [
    {
      nian: '爸爸，为什么八大行星都乖乖绕着太阳转，而不是各自乱飞？',
      dad: '因为太阳是个超级大块头！整个太阳系里 99.86% 的质量全集中在太阳身上，剩下的八大行星、卫星和彗星加起来还不到千分之二。太阳强大的万有引力像无形绳子，牢牢牵着大家绕圈。',
    },
    {
      nian: '那离太阳越远的行星，是跑道太长显得慢，还是本身真的跑得更慢？',
      dad: '两件事同时发生！离太阳越远，太阳的引力按距离平方迅速变弱，行星只需要很小的速度就能拉成圆轨道不被吸进去。水星每秒狂飙 47.4 千米，而海王星每秒只走 5.4 千米。',
      eq: 'T² ∝ a³（开普勒第三定律：轨道越远，公转一年越漫长）',
      figure: {
        kind: 'sim',
        sim: 'keplerSpeed',
        caption: '切换太阳系八大行星，对比它们离太阳的距离、公转速度和一年有多长。',
      },
    },
    {
      nian: '水星每秒 47 千米、海王星才 5 千米多！那海王星过一个“新年”得等多久？',
      dad: '足足 165 个地球年！从 1846 年人类第一次发现海王星，一直到 2011 年，它才刚刚绕太阳走完被人类认识后的第一整圈；而水星只要 88 天就过一次新年。',
    },
    {
      nian: '水星和海王星差别好大！那为什么里面四颗行星小小硬硬的，外面四颗又大又松软？',
      dad: '太阳系刚诞生时，靠近太阳的地方太烫了，轻飘飘的氢、氦气体和水冰全被烤跑，只留下岩石和金属拼成水、金、地、火四颗岩质行星；外圈冰冷，冰块和气体越滚越大，长出了气态和冰巨行星。',
    },
    {
      nian: '那冥王星以前不是第九大行星吗，怎么现在只说八大行星了？',
      dad: '因为天文学家在海王星外面发现了好多和冥王星差不多大的冰天体！2006 年国际天文学联合会规定，真正的大行星必须“清空自己轨道周围的小邻居”，个头比月球还小的冥王星于是归进了矮行星家族。',
    },
    {
      nian: '我懂了！太阳占了 99.86% 的质量用引力拉住八大行星，越往外引力越弱、速度越慢且跑道越长，所以外圈行星的一年特别漫长！',
      dad: '太清晰了！点开 3D 太阳系实验台，你可以自由飞近每一颗行星，还能切换比例尺亲眼看太阳系有多空旷。',
    },
  ],
  tip: '太阳系真实尺度极其空旷：如果把太阳缩成一个足球，地球只是 23 米外的一颗芝麻，海王星则远在 700 米之外！所以几乎所有太阳系模型（包括 3D 实验台里的压缩模式）都会把行星尺寸和距离适度缩放。',
  sources: [
    { title: '义务教育科学教科书 六年级下册·太阳系大家庭', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Planetary Fact Sheet', by: 'NASA NSSDC', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '太阳占绝大部分质量',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 440], size: [260, 260], color: '#f59f00', text: '太阳99.8%', from: 0 },
          { kind: 'atom', path: [[820, 440]], symbol: '行星', color: '#4dabf7', r: 22, from: 0.8 },
          { kind: 'arrow', path: [[780, 440], [540, 440]], color: '#e8590c', text: '强大引力牵引', from: 1.5 },
          { kind: 'text', at: [600, 740], text: '行星质量合计不到0.2%', size: 'm', color: '#5d4e37', from: 2.4 },
        ],
      },
      {
        turn: 1,
        title: '越远引力越弱，跑越慢',
        duration: 8,
        cues: [
          { kind: 'meter', at: [310, 320], label: '水星速度', start: 0, end: 0.95, color: '#e8590c', over: 2.2, from: 0.3 },
          { kind: 'meter', at: [310, 460], label: '地球速度', start: 0, end: 0.6, color: '#4dabf7', over: 2.2, from: 0.7 },
          { kind: 'meter', at: [310, 600], label: '海王星速度', start: 0, end: 0.14, color: '#5b3e96', over: 2.2, from: 1.1 },
          { kind: 'count', at: [890, 320], label: '水星', start: 0, end: 47, unit: 'km/s', over: 2.2, from: 0.4 },
          { kind: 'count', at: [890, 460], label: '地球', start: 0, end: 30, unit: 'km/s', over: 2.2, from: 0.8 },
          { kind: 'count', at: [890, 600], label: '海王星', start: 0, end: 5, unit: 'km/s', over: 2.2, from: 1.2 },
        ],
      },
      {
        turn: 2,
        title: '内圈一年短，外圈超长',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 420], size: [220, 88], color: '#adb5bd', text: '水星88天', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [840, 420], size: [250, 88], color: '#4c6ef5', text: '海王星165年', from: 1.2 },
          { kind: 'formula', at: [600, 620], text: 'T² ∝ a³', color: '#5b3e96', from: 2.2 },
        ],
      },
      {
        turn: 3,
        title: '内岩质，外巨行星',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [140, 440], size: [120, 120], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'shape', shape: 'pill', at: [440, 440], size: [220, 80], color: '#e8590c', text: '水金地火岩石', from: 0.8 },
          { kind: 'shape', shape: 'pill', at: [860, 440], size: [260, 96], color: '#4dabf7', text: '木土天海巨星', from: 1.6 },
          { kind: 'text', at: [600, 700], text: '雪线内外温度决定了行星配方', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
    ],
  },
};
