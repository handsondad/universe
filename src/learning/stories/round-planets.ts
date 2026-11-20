import type { Story } from './types';

export const roundPlanets: Story = {
  slug: 'round-planets',
  title: '行星和月亮都是圆的，小行星为什么长得像土豆？',
  trigger: '小念在科普书上看到探测器拍的小行星照片，坑坑洼洼像个大土豆，旁边配图里的月亮却圆滚滚的。',
  dialogue: [
    {
      nian: '爸爸，行星和月亮都圆滚滚的，是不是有人像捏橡皮泥一样把它们搓圆的？',
      dad: '还真有一双“看不见的大手”在捏——它就是引力！星球上的每一块石头、每一滴水都被往星球中心拉，而且四面八方拉得一样用力。哪儿高高凸起，哪儿底下就被压得更狠，久而久之，表面处处离中心差不多远的“球”就成了最稳当的形状。',
    },
    {
      nian: '引力往中心拉，那小行星也有引力，为什么还是像个土豆？',
      dad: '小行星太小啦，它的引力弱得就像蚂蚁推大石头。岩石本身很硬，像搭得结结实实的积木，这份“硬度”足够扛住那一点点引力，于是凸起的尖角、凹下的大坑都能一直保持下去，长成土豆、花生的模样。',
    },
    {
      nian: '岩石的硬度能扛住引力，那天体要长到多大，引力才能赢过石头？',
      dad: '科学家估算过：岩石天体直径大约超过 800 千米，冰质天体大约超过 400 千米，引力就能压过材料的硬度，把自己慢慢捏成球。冰比石头软，所以冰球个头小一点也能被捏圆。',
      figure: {
        kind: 'sim',
        sim: 'roundPlanetShape',
        caption: '把天体从小拖到大、换换冰和岩石：看引力什么时候压过硬度，把“土豆”捏成球。',
      },
    },
    {
      nian: '冰比石头软就更容易变圆！那星球被捏圆以后，是不是像玻璃珠一样完全正圆？',
      dad: '还差一点点！行星都在自转，转起来时赤道附近会被“甩”得往外鼓。地球赤道方向的直径约 12756 千米，两极方向约 12712 千米，差了 44 千米；土星、木星转得更快，又主要由气体组成，扁得用望远镜都能看出来。',
    },
    {
      nian: '转起来会被甩得往外鼓？就像披萨师傅甩面团那样吗？',
      dad: '一模一样！师傅一转面团，面团就被甩得越摊越开、越来越扁。星球也一样：引力把它往圆里拉，自转又把赤道往外甩，两边“商量”出一个稍扁的球。科学家把这种引力和内部压力互相抵住的状态叫“流体静力平衡”。',
    },
    {
      nian: '流体静力平衡这个词好厉害！它和“行星”这个名字有关系吗？',
      dad: '有关系！国际天文学联合会给行星定的条件里，就有一条“质量大到能靠自身引力变成接近球形”。所以圆不圆，是判断一个天体算不算行星、矮行星的重要标准，冥王星就是一颗圆圆的矮行星。',
    },
    {
      nian: '我懂了！引力从四面八方把物质拉向中心，天体够大时引力压过岩石的硬度，高处被压平、低处被填满，就成了球；小行星太小拉不动石头，只好一直是土豆形！',
      dad: '说得真棒！去互动图里把天体从小拖到大，看看“土豆”是怎么一步步被引力捏成球的。',
    },
  ],
  tip: '可以和孩子用橡皮泥做对比：一小块橡皮泥能捏出尖角并一直保持，像小行星；一大团湿沙堆高了就会塌成圆丘，体会“够大、够软就会被压平”。做披萨甩面团时，也能顺便讲讲自转让行星赤道鼓起来。',
  sources: [
    { title: '普通高中物理教科书 必修第二册·万有引力定律', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Planets and Pluto: Definition of a Planet', by: 'NASA JPL Solar System Dynamics', url: 'https://ssd.jpl.nasa.gov/planets/def.html' },
    { title: 'Why Are Planets Round?', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/planets-round/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '引力四面拉',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [300, 300], color: '#a68a6d', text: '星球', from: 0 },
          { kind: 'arrow', path: [[600, 110], [600, 260]], color: '#e8590c', text: '拉向中心', from: 0.6 },
          { kind: 'arrow', path: [[600, 750], [600, 600]], color: '#e8590c', from: 0.9 },
          { kind: 'arrow', path: [[260, 430], [430, 430]], color: '#e8590c', from: 1.2 },
          { kind: 'arrow', path: [[940, 430], [770, 430]], color: '#e8590c', from: 1.5 },
          { kind: 'myth', wrong: '星球是被谁搓圆的', right: '引力从四面八方把它拉圆', from: 3.0 },
        ],
      },
      {
        turn: 1,
        title: '小个子扛得住',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [300, 150], color: '#a68a6d', text: '小行星', motion: 'wiggle', from: 0.2 },
          { kind: 'arrow', path: [[600, 250], [600, 335]], color: '#ff922b', text: '引力很弱', from: 1.0 },
          { kind: 'arrow', path: [[600, 610], [600, 525]], color: '#ff922b', from: 1.2 },
          { kind: 'label', at: [740, 430], pos: [960, 640], text: '岩石硬度扛住了', color: '#5b3e96', from: 2.0 },
          { kind: 'text', at: [600, 790], text: '尖角和大坑都保留下来', size: 'm', color: '#5d4e37', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '够大就被捏圆',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [200, 430], size: [170, 90], color: '#a68a6d', text: '土豆形', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [540, 430], size: [230, 190], color: '#a68a6d', text: '快圆了', from: 1.4 },
          { kind: 'shape', shape: 'circle', at: [920, 430], size: [280, 280], color: '#a68a6d', text: '球形', from: 2.5 },
          { kind: 'arrow', path: [[300, 600], [820, 600]], color: '#e8590c', text: '越大引力越强', from: 3.4 },
          { kind: 'label', at: [920, 300], pos: [920, 140], text: '岩石约800千米', color: '#6f5a45', from: 4.4 },
          { kind: 'label', at: [540, 340], pos: [460, 140], text: '冰质约400千米', color: '#1c7ed6', from: 5.2 },
        ],
      },
      {
        turn: 3,
        title: '自转让赤道鼓',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [340, 340], color: '#ffffff', outline: true, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [380, 300], color: '#3b6ea5', text: '地球', from: 1.0 },
          { kind: 'arrow', path: [[800, 430], [930, 430]], color: '#e8590c', text: '赤道外鼓', from: 2.0 },
          { kind: 'arrow', path: [[400, 430], [270, 430]], color: '#e8590c', from: 2.2 },
          { kind: 'count', at: [600, 760], label: '赤道多出', start: 0, end: 44, unit: '千米', over: 1.8, from: 3.0 },
        ],
      },
      {
        turn: 4,
        title: '像甩披萨面团',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [360, 220], color: '#ffe8a3', text: '面团', motion: 'grow', over: 2.4, from: 0.3 },
          { kind: 'sprite', icon: '🍕', path: [[600, 180]], size: 80, from: 0.6 },
          { kind: 'arrow', path: [[820, 420], [960, 420]], color: '#e8590c', text: '甩开', from: 1.6 },
          { kind: 'arrow', path: [[380, 420], [240, 420]], color: '#e8590c', from: 1.8 },
          { kind: 'text', at: [600, 740], text: '引力拉圆，自转甩扁', size: 'm', color: '#5b3e96', from: 2.8 },
        ],
      },
      {
        turn: 5,
        title: '圆是行星的标志',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [240, 430], size: [240, 240], color: '#3b6ea5', text: '行星', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [130, 130], color: '#d9c5a0', text: '冥王星', from: 0.9 },
          { kind: 'shape', shape: 'pill', at: [930, 430], size: [150, 80], color: '#a68a6d', text: '小行星', from: 1.6 },
          { kind: 'text', at: [600, 720], text: '靠自身引力成球是关键', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
    ],
  },
};
