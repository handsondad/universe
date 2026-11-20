import type { Story } from './types';

export const bloodMoon: Story = {
  slug: 'blood-moon',
  title: '月亮钻进地球影子，为什么不是变黑而是变红？',
  trigger: '2025 年 9 月 7 日夜里，小念守在阳台看月全食，眼看月亮一点点被“咬”掉，最后却变成了一只暗红色的“红月亮”。',
  dialogue: [
    {
      nian: '爸爸，月亮明明整个钻进了地球的影子里，为什么没有变黑消失，反而变成红色了？',
      dad: '因为地球的影子并不是全黑的！月全食时，月亮确实躲进了地球身后最暗的“本影”，太阳的直射光被地球挡得严严实实。可地球外面裹着一圈薄薄的大气，会把一部分阳光悄悄“弯”进影子里，所以月亮还亮着。',
    },
    {
      nian: '大气怎么能把阳光弯进影子里，它又不是镜子？',
      dad: '大气像一圈包住地球的透镜！阳光从几乎没有空气的太空斜着钻进越来越浓的大气，前进方向就会偏一偏，这叫折射，和插进水杯的筷子看起来“折断”是一个道理。地球一整圈边缘的阳光都被这样往里一拐，正好拐进本影，照到月亮上。',
      figure: {
        kind: 'sim',
        sim: 'bloodMoonLight',
        caption: '拖动月食进程和大气尘埃，看大气怎样把红光折进地球本影，月亮颜色又怎样变化。',
      },
    },
    {
      nian: '拐进本影的阳光本来是白色的，为什么照到月亮上就只剩红色了？',
      dad: '秘密在“散射”！阳光里的蓝光最容易被空气分子撞得四处乱飞，红光、橙光却能一路穿过去。阳光要横穿地球边缘厚厚的一大层空气，蓝光早就被散射光了，剩下的红橙光才折进影子里。这和傍晚夕阳变红是同一个原因。',
    },
    {
      nian: '跟夕阳变红一样？那月亮上看到的岂不是好多个日出日落？',
      dad: '你说对了！要是站在月亮上看地球，会看到黑乎乎的地球外面镶着一圈红亮的光环，那正是这一刻全世界所有正在发生的日出和日落。红月亮，就相当于把全球的朝霞晚霞一起投到了月面上。',
    },
    {
      nian: '全世界的朝霞晚霞颜色都一样吗，每次红月亮都一样红吗？',
      dad: '不一样！要看那时地球大气干不干净。空气清澈时，月亮是明亮的铜橙色；如果刚有大火山喷发，火山灰和尘埃飘满高空，挡掉更多光，月亮就会变成暗红甚至深褐色，有时暗得几乎找不到。所以每次红月亮都独一无二。',
    },
    {
      nian: '原来火山灰还能让月亮变暗！那看红月亮会不会像看日食一样伤眼睛？',
      dad: '完全不会！月全食时的月亮比平时的满月还暗得多，可以放心用肉眼看，用双筒望远镜看更漂亮。只有日食才必须戴专业的日食眼镜，千万别把这两件事搞混。',
    },
    {
      nian: '我明白了！月全食时月亮在地球本影里，地球大气像透镜把阳光弯进影子，蓝光被散射掉，剩下的红橙光把月亮照红；尘埃和火山灰越多，红月亮就越暗！',
      dad: '总结得太棒了！下次月全食，记得拍下月亮的颜色，和别人拍的比一比，就能“看出”那段时间地球大气干不干净。',
    },
  ],
  tip: '月全食可以全家一起用肉眼放心观看，用双筒望远镜或手机长焦效果更好；但日食绝不能裸眼或用普通墨镜直视，必须佩戴合格的专业日食眼镜。在暗处用手电照一杯滴了几滴牛奶的清水，从侧面看偏蓝、从对面透过来看偏橙红，能体会蓝光被散射的道理。',
  sources: [
    { title: '义务教育科学教科书 五年级上册·光', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Lunar Eclipses', by: 'NASA Science', url: 'https://science.nasa.gov/moon/eclipses/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '影子里的红月亮',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [140, 450], size: [170, 170], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [480, 130], color: '#3b3355', from: 0.4 },
          { kind: 'atom', path: [[560, 450]], symbol: '地球', color: '#4dabf7', r: 72, from: 0.2 },
          {
            kind: 'shape', shape: 'circle', at: [1010, 220], size: [76, 76], color: '#ffe89e', from: 0.8,
            slide: { to: [1010, 450], at: 1.0, over: 2 }, tint: { color: '#b03a2e', at: 2.8, over: 1.2 },
          },
          { kind: 'label', at: [1010, 470], pos: [1000, 700], text: '躲进影子却变红', color: '#c92a2a', from: 3.6 },
          { kind: 'myth', wrong: '进了地球影子，月亮会全黑', right: '大气把红光送进了影子里', from: 4.6 },
        ],
      },
      {
        turn: 1,
        title: '大气像一圈透镜',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [470, 450], size: [260, 260], color: '#d0ebff', outline: true, from: 0 },
          { kind: 'atom', path: [[470, 450]], symbol: '地球', color: '#4dabf7', r: 108, from: 0.2 },
          { kind: 'ray', path: [[60, 326], [470, 326], [1010, 432]], color: '#ff6b4a', draw: 1.4, from: 0.8 },
          { kind: 'ray', path: [[60, 574], [470, 574], [1010, 468]], color: '#ff6b4a', draw: 1.4, from: 1.0 },
          { kind: 'shape', shape: 'circle', at: [1050, 450], size: [72, 72], color: '#b03a2e', text: '月', from: 2.4 },
          { kind: 'label', at: [470, 326], pos: [420, 170], text: '大气让光拐弯', color: '#e8590c', from: 2.8 },
          { kind: 'text', at: [600, 790], text: '折射：光斜穿空气会偏折', size: 's', color: '#5b3e96', from: 3.6 },
        ],
      },
      {
        turn: 2,
        title: '蓝光被散射掉',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [360, 240], color: '#d0ebff', text: '厚厚的大气', from: 0 },
          { kind: 'ray', path: [[60, 450], [430, 450]], color: '#ffd43b', from: 0.3 },
          { kind: 'flow', path: [[560, 440], [640, 300], [700, 160]], color: '#4dabf7', count: 6, from: 1.2 },
          { kind: 'flow', path: [[620, 460], [700, 620], [760, 760]], color: '#4dabf7', count: 6, from: 1.4 },
          { kind: 'ray', path: [[780, 450], [1140, 450]], color: '#e8590c', from: 1.9 },
          { kind: 'label', at: [700, 200], pos: [900, 180], text: '蓝光被撞飞', color: '#1c7ed6', from: 2.5 },
          { kind: 'label', at: [1000, 450], pos: [980, 640], text: '红橙光穿过去', color: '#e8590c', from: 3.1 },
          { kind: 'text', at: [600, 830], text: '和夕阳变红同一个道理', size: 's', color: '#5d4e37', from: 4.2 },
        ],
      },
      {
        turn: 3,
        title: '全世界的日出日落',
        duration: 8,
        cues: [
          { kind: 'text', at: [600, 110], text: '站在月球上看地球', size: 's', color: '#5b3e96', from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [320, 320], color: '#e8590c', motion: 'pulse', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [286, 286], color: '#2b2d42', text: '地球', from: 0.6 },
          { kind: 'sprite', icon: '🌅', path: [[380, 260]], size: 64, from: 1.4 },
          { kind: 'sprite', icon: '🌇', path: [[820, 640]], size: 64, from: 1.8 },
          { kind: 'text', at: [600, 800], text: '一圈红光＝全球日出日落', size: 's', color: '#c92a2a', from: 2.6 },
        ],
      },
      {
        turn: 4,
        title: '尘埃越多越暗红',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 430], size: [190, 190], color: '#d9622b', text: '清澈', from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [190, 190], color: '#a3321f', text: '普通', from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [900, 430], size: [190, 190], color: '#4f1c15', text: '火山灰多', from: 1.2 },
          { kind: 'particles', box: [780, 220, 240, 90], count: 14, color: '#8d6e63', motion: 'gas', size: 6, from: 1.8 },
          { kind: 'meter', at: [600, 700], label: '大气尘埃', start: 0.1, end: 0.95, color: '#7f5539', over: 3, from: 2.2 },
          { kind: 'text', at: [600, 140], text: '每次红月亮都不一样', size: 's', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 5,
        title: '放心用肉眼看',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 430], size: [210, 210], color: '#a3321f', text: '月全食', from: 0 },
          { kind: 'sprite', icon: '👀', path: [[380, 670]], size: 60, from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [840, 430], size: [210, 210], color: '#f59f00', text: '日食', from: 1.2 },
          { kind: 'sprite', icon: '🕶️', path: [[840, 670]], size: 60, from: 1.8 },
          { kind: 'label', at: [380, 330], pos: [380, 170], text: '肉眼看很安全', color: '#2f8a57', from: 2.4 },
          { kind: 'label', at: [840, 330], pos: [840, 170], text: '必须戴日食眼镜', color: '#e8590c', from: 3.0 },
        ],
      },
    ],
  },
};
