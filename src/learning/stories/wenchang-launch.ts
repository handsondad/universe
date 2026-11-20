import type { Story } from './types';

export const wenchangLaunch: Story = {
  slug: 'wenchang-launch',
  title: '为什么中国的大火箭和探月探火任务，爱选在海南文昌发射？',
  trigger: '小念看嫦娥六号发射直播，发现火箭是从椰子树环绕的海南文昌飞上天的，而不是课本里常提到的酒泉。',
  dialogue: [
    {
      nian: '爸爸，酒泉、太原、西昌都能发射火箭，为什么长征五号和嫦娥六号偏要跑到海南文昌去？',
      dad: '因为文昌占了好几样“天时地利”！最重要的一样藏在地球自转里：地球每天自西向东转一圈，站在地面上的你其实一直被地球带着往东跑，只是你和周围的一切一起动，所以感觉不到。火箭向东发射，就能白捡这份“顺风车”速度。',
    },
    {
      nian: '地球带着我们往东跑，那这份顺风车速度有多快呢？',
      dad: '在赤道上，地面随地球自转的速度约每秒 465 米，比民航客机飞得还快！越往南北两极走，绕的圈越小，这个速度就越慢：文昌在北纬约 19°，每秒约 439 米；酒泉在北纬约 41°，只剩每秒约 351 米。',
      figure: {
        kind: 'sim',
        sim: 'launchLatitude',
        caption: '选择不同发射场和发射方向，看地球自转白送多少速度，向西发射又要倒贴多少。',
      },
    },
    {
      nian: '文昌每秒比酒泉多 88 米，这点速度对火箭真的重要吗？',
      dad: '非常重要！火箭要把卫星送进轨道，至少要达到每秒约 7.9 千米的第一宇宙速度，每多 1 米/秒都得烧掉不少燃料。而且纬度低，把卫星送到赤道上空的轨道时要“拐”的弯也小。所以同一枚火箭从文昌出发，往地球同步转移轨道能比内陆发射场多运约 10%～15% 的载荷。',
    },
    {
      nian: '原来纬度越低越省燃料！那为什么不往西发射，非要向东呢？',
      dad: '向西发射就成了“逆风”：火箭得先抵消地球送的这每秒几百米，再从头加速，和向东相比，一来一回要多付出约两倍的自转速度。所以绝大多数卫星都向东发射。不过也有例外，比如要飞过南北两极上空的极轨卫星，就得朝南或朝北发射。',
    },
    {
      nian: '除了地球自转的速度，海边发射场还有别的好处吗？',
      dad: '好处可多啦！长征五号的芯级直径足足 5 米，可铁路要穿过隧道，只能运直径不超过约 3.5 米的火箭，所以这样的大火箭只能坐船走海路运到文昌。火箭升空后，用完的箭体残骸大多落进茫茫大海，比落在内陆村庄附近安全得多。',
    },
    {
      nian: '大火箭坐船到文昌，那从这里出发过哪些厉害的任务？',
      dad: '一长串！长征五号、长征七号都在这里升空；2020 年天问一号从这里出发奔向火星，同年嫦娥五号去月球带回了月壤；2024 年嫦娥六号又从这里出发，取回了人类第一份月球背面样品。文昌已经成了中国飞向深空的大门。',
    },
    {
      nian: '我明白了！火箭向东发射能搭地球自转的顺风车，文昌纬度最低，顺风最大，又靠着大海，大火箭能坐船来、残骸也落进海里，所以成了中国发射大火箭、探月探火的首选！',
      dad: '总结得清清楚楚！要是有机会去海南，可以在文昌海边的观看区远远看一次火箭升空，那轰鸣声会震得你心口发麻。',
    },
  ],
  tip: '可以拿地球仪做演示：在赤道和北纬 40° 附近各贴一张小纸片，慢慢转动地球仪一圈，赤道上的纸片走的路明显更长，说明赤道地面转得更快。去文昌看发射时，请待在官方划定的观看区域，注意防晒并保护孩子的听力。',
  sources: [
    { title: '义务教育教科书 地理 七年级上册·地球的运动', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: '文昌航天发射场与探月、探火任务公开信息', by: '国家航天局', url: 'https://www.cnsa.gov.cn/' },
    { title: "Europe's Spaceport", by: 'ESA', url: 'https://www.esa.int/Enabling_Support/Space_Transportation/Europe_s_Spaceport/Europe_s_Spaceport2' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '地球自西向东转',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [440, 440], color: '#4dabf7', from: 0.2 },
          { kind: 'arrow', path: [[400, 710], [600, 750], [800, 710]], color: '#e8590c', text: '自西向东', from: 0.8 },
          { kind: 'atom', path: [[470, 420], [730, 420]], symbol: '我', color: '#ffd43b', r: 28, travel: 4, from: 1.4 },
          { kind: 'text', at: [600, 130], text: '人跟着地球一起往东跑', size: 'm', color: '#5d4e37', from: 2.4 },
        ],
      },
      {
        turn: 1,
        title: '赤道最快，两极最慢',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [400, 450], size: [500, 500], color: '#a5d8ff', from: 0.2 },
          { kind: 'arrow', path: [[400, 450], [700, 450]], color: '#e8590c', text: '465 米/秒', from: 0.8 },
          { kind: 'arrow', path: [[400, 369], [683, 369]], color: '#f59f00', text: '文昌 439 米/秒', from: 1.6 },
          { kind: 'arrow', path: [[400, 286], [626, 286]], color: '#868e96', text: '酒泉 351 米/秒', from: 2.4 },
          { kind: 'text', at: [600, 790], text: '纬度越高，转得越慢', size: 'm', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '白捡的速度很值钱',
        duration: 9,
        cues: [
          { kind: 'meter', at: [600, 230], label: '第一宇宙速度', start: 0, end: 1, color: '#5b3e96', from: 0.3 },
          { kind: 'meter', at: [600, 400], label: '文昌白送', start: 0, end: 0.056, color: '#e8590c', from: 1.4 },
          { kind: 'text', at: [600, 600], text: '多运约 10%～15% 载荷', size: 'm', color: '#2f8a57', from: 2.6 },
          { kind: 'text', at: [600, 760], text: '纬度低，拐弯也少', size: 's', color: '#5d4e37', from: 3.8 },
        ],
      },
      {
        turn: 3,
        title: '向东顺风，向西逆风',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 560], size: [360, 360], color: '#4dabf7', text: '地球', from: 0.2 },
          { kind: 'sprite', icon: '🚀', path: [[600, 340]], size: 64, from: 0.6 },
          { kind: 'arrow', path: [[640, 320], [1000, 200]], color: '#2f8a57', text: '向东：顺风', from: 1.2 },
          { kind: 'arrow', path: [[560, 320], [200, 200]], color: '#e03131', text: '向西：逆风', from: 2.4 },
          { kind: 'text', at: [600, 840], text: '向西要多付两倍自转速', size: 's', color: '#5d4e37', from: 3.6 },
        ],
      },
      {
        turn: 4,
        title: '大火箭坐船来',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 380], size: [280, 200], color: '#adb5bd', text: '铁路隧道', from: 0.2 },
          { kind: 'label', at: [300, 380], pos: [300, 170], text: '只能过约 3.5 米', color: '#c92a2a', from: 1.0 },
          { kind: 'shape', shape: 'pill', at: [640, 560], size: [280, 70], color: '#f1f3f5', text: '5 米芯级', slide: { to: [1000, 560], at: 1.8, over: 4 }, from: 1.6 },
          { kind: 'sprite', icon: '🚢', path: [[640, 650], [1000, 650]], size: 100, travel: 4, from: 1.8 },
          { kind: 'text', at: [600, 810], text: '残骸落进大海更安全', size: 'm', color: '#1c7ed6', from: 4.2 },
        ],
      },
      {
        turn: 5,
        title: '从文昌飞向深空',
        duration: 8,
        cues: [
          { kind: 'sprite', icon: '🚀', path: [[600, 760], [600, 200]], size: 84, travel: 3, from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [260, 300], size: [260, 90], color: '#e8590c', text: '天问一号', from: 1.0 },
          { kind: 'shape', shape: 'pill', at: [940, 300], size: [260, 90], color: '#adb5bd', text: '嫦娥五号', from: 1.6 },
          { kind: 'shape', shape: 'pill', at: [940, 520], size: [260, 90], color: '#5b3e96', text: '嫦娥六号', from: 2.2 },
          { kind: 'shape', shape: 'pill', at: [260, 520], size: [260, 90], color: '#3b6ea5', text: '长征五号', from: 2.8 },
          { kind: 'text', at: [600, 840], text: '中国飞向深空的大门', size: 'm', color: '#5b3e96', from: 3.6 },
        ],
      },
    ],
  },
};
