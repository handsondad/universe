import type { Story } from './types';

export const universeEdge: Story = {
  slug: 'universe-edge',
  title: '宇宙有边吗？我们最远能看到多远？',
  trigger: '小念在天文馆听讲解员说“宇宙才 138 亿岁，我们却能看到约 465 亿光年远”，怎么都算不明白。',
  dialogue: [
    {
      nian: '爸爸，宇宙走到尽头会不会有一堵墙，墙外面又是什么？',
      dad: '很多人都这么想象过！不过天文学家说的“宇宙的边”，其实是“我们能看到的边”。宇宙大约 138 亿岁，光就算一刻不停地跑，也只跑了这么久，所以存在一个我们最远能看到的范围，叫“可观测宇宙”。它的边不是墙，而是光来得及到达我们的极限。',
    },
    {
      nian: '光只跑了 138 亿年，那可观测宇宙的半径不就是 138 亿光年吗？',
      dad: '这是最常见的算法，可答案是约 465 亿光年！因为光在路上飞的时候，空间本身一直在伸展。就像一只蚂蚁在一根不断被拉长的橡皮筋上往前爬，等它爬到终点，出发点早被拉到比它爬过的路程远得多的地方。最古老的光源，如今已被膨胀带到约 465 亿光年之外。',
      figure: {
        kind: 'sim',
        sim: 'horizonGrow',
        caption: '拖动光在路上的时间，比较“光走过的路”和“光源现在的距离”，再切换空间膨胀开关。',
      },
    },
    {
      nian: '被拉长的橡皮筋上，我们看到的其实是那些光源过去的样子吗？',
      dad: '没错！望远镜看得越远，就看到越早的过去。我们收到的是它们很久以前发出的光，那时它们离我们近得多；而“465 亿光年”说的是它们今天被膨胀带到的位置。目前能看到的最古老的光是宇宙微波背景，它几乎就贴在可观测宇宙的边上。',
    },
    {
      nian: '可观测宇宙的边上如果站着一个外星人，他是不是就站在宇宙的悬崖上？',
      dad: '不会！他那里看起来和我们这儿差不多，周围照样是星系。“边”只是我们的视线范围，叫视界。就像在大海中央的船上，四周都有一条海平线，可海并没有在那儿结束。每个观察者都站在自己那个可观测宇宙的正中心，外星人也有他自己的一圈视界。',
    },
    {
      nian: '每个观察者都有自己的视界，那整个宇宙到底有多大，有没有尽头？',
      dad: '老实说，科学家还不知道！NASA 的天文学家也坦白说“我们其实并不知道”。整个宇宙可能比可观测宇宙大得多，甚至可能无限大；也可能是有限的，却像地球表面一样找不到尽头。目前的观测还分辨不出来，这是留给未来的大问题。',
    },
    {
      nian: '未来我们能看到更多宇宙吗？视界会一直变大吗？',
      dad: '还会有新的光陆续到达，但也有个坏消息：宇宙在加速膨胀，有些今天还能看到的遥远星系正被越推越快，它们从现在起发出的光，永远追不上我们；我们就算以光速出发，也永远到不了那里。所以趁现在多看看星空，也是一件很珍贵的事。',
    },
    {
      nian: '我明白了！宇宙的边不是一堵墙，而是光来得及跑到地球的视界，光在路上的 138 亿年里空间一直伸展，所以最远的光源现在在约 465 亿光年外，至于整个宇宙有多大，科学家还不知道！',
      dad: '完全正确！你今天弄懂的，正是“可观测宇宙”和“整个宇宙”的区别，很多大人都会把它们弄混呢。',
    },
  ],
  tip: '可以和孩子做“蚂蚁爬橡皮筋”实验：在橡皮筋两端分别点上“光源”和“地球”，让一个小夹子从光源向地球慢慢挪，同时把橡皮筋缓缓拉长；夹子到达时量一量，光源离地球的距离比夹子挪过的路更长。拉橡皮筋时别对着脸。',
  sources: [
    { title: '义务教育教科书 科学 六年级下册·宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Inconsistency Between the Age and Diameter of the Universe?', by: 'NRAO', url: 'https://public.nrao.edu/ask/inconsistency-between-the-age-and-diameter-of-the-universe/' },
    { title: 'How Big Is Space? We Asked a NASA Expert', by: 'NASA', url: 'https://www.nasa.gov/science-research/astrophysics/how-big-is-space-we-asked-a-nasa-expert-episode-61/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '宇宙尽头有墙吗？',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [580, 580], color: '#e5dbff', outline: true, from: 0.4 },
          { kind: 'atom', path: [[600, 470]], symbol: '地球', color: '#4dabf7', r: 40, from: 0.2 },
          { kind: 'count', at: [200, 150], label: '宇宙年龄', start: 0, end: 138, unit: '亿年', over: 2, from: 0.8 },
          { kind: 'label', at: [890, 470], pos: [990, 220], text: '光能到达的极限', color: '#5b3e96', from: 2.0 },
          { kind: 'myth', wrong: '宇宙尽头有一堵墙', right: '边是光来得及到达的范围', from: 3.2 },
        ],
      },
      {
        turn: 1,
        title: '橡皮筋上的蚂蚁',
        duration: 10,
        cues: [
          { kind: 'bond', a: [150, 460], b: [1000, 460], color: '#ffc078', from: 0.2 },
          { kind: 'atom', path: [[1000, 460]], symbol: '我们', color: '#4dabf7', r: 36, from: 0.2 },
          { kind: 'atom', path: [[440, 460], [170, 460]], symbol: '光源', color: '#b197fc', r: 32, travel: 6, from: 0.6 },
          { kind: 'atom', path: [[440, 460], [960, 460]], symbol: '光', color: '#ffd43b', r: 22, travel: 7, from: 0.6 },
          { kind: 'arrow', path: [[420, 580], [170, 580]], color: '#5b3e96', text: '空间被拉长', from: 2.4 },
          { kind: 'count', at: [600, 200], label: '光源现在距离', start: 138, end: 465, unit: '亿光年', over: 5, from: 2.0 },
        ],
      },
      {
        turn: 2,
        title: '越远就是越早',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[200, 460]], symbol: '我们', color: '#4dabf7', r: 36, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [1080, 460], size: [70, 520], color: '#ffa94d', from: 0.3 },
          { kind: 'ray', path: [[1040, 460], [250, 460]], color: '#ffd43b', draw: 2, from: 0.6 },
          { kind: 'label', at: [1060, 300], pos: [900, 180], text: '看到的是过去', color: '#e8590c', from: 1.8 },
          { kind: 'text', at: [600, 740], text: '最古老的光：微波背景', size: 'm', color: '#5b3e96', from: 3.0 },
        ],
      },
      {
        turn: 3,
        title: '每人都有一圈视界',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 440], size: [480, 480], color: '#d0bfff', outline: true, from: 0.3 },
          { kind: 'atom', path: [[380, 440]], symbol: '我们', color: '#4dabf7', r: 34, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [820, 440], size: [480, 480], color: '#c3fae8', outline: true, from: 1.6 },
          { kind: 'atom', path: [[820, 440]], symbol: '外星', color: '#51cf66', r: 34, from: 1.8 },
          { kind: 'text', at: [600, 810], text: '视界像海平线，不是悬崖', size: 'm', color: '#2f8a57', from: 3.2 },
        ],
      },
      {
        turn: 4,
        title: '整个宇宙多大？未知',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [380, 380], color: '#e5dbff', text: '可观测宇宙', outline: true, from: 0.3 },
          { kind: 'sprite', icon: '❓', path: [[180, 200]], size: 70, from: 1.2 },
          { kind: 'sprite', icon: '❓', path: [[1020, 200]], size: 70, from: 1.4 },
          { kind: 'sprite', icon: '❓', path: [[180, 680]], size: 70, from: 1.6 },
          { kind: 'sprite', icon: '❓', path: [[1020, 680]], size: 70, from: 1.8 },
          { kind: 'text', at: [600, 820], text: '有限还是无限？还不知道', size: 'm', color: '#5b3e96', from: 2.6 },
        ],
      },
      {
        turn: 5,
        title: '有些星系将追不上',
        duration: 9,
        cues: [
          { kind: 'atom', path: [[200, 460]], symbol: '我们', color: '#4dabf7', r: 36, from: 0.2 },
          { kind: 'atom', path: [[700, 460], [1080, 460]], symbol: '星系', color: '#b197fc', r: 32, travel: 6, from: 0.4 },
          { kind: 'atom', path: [[660, 460], [560, 460]], symbol: '光', color: '#ffd43b', r: 18, travel: 6, from: 1.0 },
          { kind: 'arrow', path: [[760, 580], [1060, 580]], color: '#e03131', text: '越推越快', from: 1.6 },
          { kind: 'text', at: [600, 760], text: '今天发的光永远追不上', size: 'm', color: '#5d4e37', from: 3.0 },
        ],
      },
    ],
  },
};
