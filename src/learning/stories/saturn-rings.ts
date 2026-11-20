import type { Story } from './types';

export const saturnRings: Story = {
  slug: 'saturn-rings',
  title: '土星那圈漂亮的光环是实心的大圆盘吗，人能站在上面吗？',
  trigger: '小念画太阳系时，给土星涂了一圈实心的金黄色大圆环，问爸爸宇航员能不能上去跑步。',
  dialogue: [
    {
      nian: '爸爸，土星的光环看起来那么光滑平整，是不是一整块大石头圆盘，人能站上去吗？',
      dad: '站不上去，一脚就会踩空！土星环压根不是整块实心圆盘，而是亿万块水冰和碎石组成的“冰块大合唱团”，小到像雪花沙粒，大到像一座房子，各自绕着土星飞奔。',
    },
    {
      nian: '亿万块水冰拼在一起，从地球上看怎么会像一条光滑丝带呢？',
      dad: '因为土星离我们有十多亿千米远！就像远处看一大群密密麻麻的沙粒会连成一片沙滩，土星的冰块反射阳光非常亮，远远望去就像一条平整闪亮的丝带。',
    },
    {
      nian: '这圈冰块带子一定非常厚吧，不然怎么会铺开那么大一圈？',
      dad: '说出来你会吓一跳：土星主环横着铺开超过 28 万千米，快赶上地球到月球距离的四分之三，可厚度大多只有 10 米到 100 米！按比例算，它比一张 A4 复印纸还要薄上几万倍。',
    },
    {
      nian: '比复印纸还薄那么多！这些水冰怎么没抱成团变成一颗新月亮呢？',
      dad: '因为它们离土星太近，落在了“洛希极限”里面！靠土星近的一侧受到的引力比远的一侧猛得多，这股撕扯的潮汐力会把大冰块拉散，谁想聚成大卫星就会被立刻撕碎。',
      figure: {
        kind: 'sim',
        sim: 'saturnRoche',
        caption: '拖动冰卫星到土星的距离，跨过洛希极限看看它怎样被潮汐力撕成冰环。',
      },
    },
    {
      nian: '这么漂亮的洛希极限冰环，是不是只有土星才戴着？',
      dad: '其实木星、天王星和海王星全都有光环！只是它们的光环大多是黑乎乎的岩石尘埃、又暗又细，不像土星环几乎全由亮晶晶的水冰组成，所以土星的草帽最抢镜。',
    },
    {
      nian: '我明白了！土星光环不是实心圆盘，而是亿万块水冰在洛希极限内排成极薄的轨道大军，人在上面根本站不住！',
      dad: '答得漂亮！而且卡西尼号探测器还发现，土星环上的冰粒正慢慢以“环雨”的形式落回土星，几亿年后这顶大草帽甚至可能会慢慢变淡呢。',
    },
  ],
  tip: '可以在晴朗夜晚用入门级天文望远镜带孩子亲眼看一次土星环（哪怕只是 40 倍放大就能辨认出“长着耳朵的小圆点”），那是很多孩子爱上天文学的瞬间。',
  sources: [
    { title: 'Saturn Rings: Facts & Cassini Discoveries', by: 'NASA Science', url: 'https://science.nasa.gov/saturn/facts/' },
    { title: 'Cassini Mission Overview', by: 'ESA / NASA', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '不是实心圆盘，是冰块群',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [170, 170], color: '#f2c879', text: '土星', from: 0 },
          { kind: 'particles', box: [240, 380, 720, 80], count: 28, color: '#74c0fc', motion: 'jitter', size: 8, from: 0.4 },
          { kind: 'myth', wrong: '土星环是能站人的实心大圆盘', right: '由亿万块飞奔的水冰碎块组成', from: 2.0 },
        ],
      },
      {
        turn: 2,
        title: '宽阔无比却薄如纸片',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [860, 16], color: '#74c0fc', from: 0.3 },
          { kind: 'label', at: [600, 432], pos: [600, 260], text: '厚度仅 10–100 米', color: '#e8590c', from: 1.2 },
          { kind: 'arrow', path: [[170, 520], [1030, 520]], color: '#5b3e96', text: '宽约 28 万千米', from: 2.0 },
          { kind: 'text', at: [600, 700], text: '按比例比 A4 纸还薄上万倍', size: 'm', color: '#5d4e37', from: 3.2 },
        ],
      },
      {
        turn: 3,
        title: '洛希极限内的潮汐撕扯',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [260, 450], size: [180, 180], color: '#f2c879', text: '土星', from: 0 },
          { kind: 'bond', a: [620, 200], b: [620, 700], color: '#e8590c', from: 0.4 },
          { kind: 'label', at: [620, 240], pos: [780, 220], text: '洛希极限', color: '#e8590c', from: 0.9 },
          { kind: 'atom', path: [[880, 450], [520, 450]], symbol: '冰卫', color: '#74c0fc', r: 34, travel: 2.8, from: 1.0, to: 4.0 },
          { kind: 'particles', box: [440, 390, 180, 120], count: 18, color: '#a5d8ff', motion: 'gas', size: 8, from: 3.9 },
        ],
      },
      {
        turn: 4,
        title: '四颗巨行星其实都有环',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [250, 440], size: [160, 72], color: '#e59966', text: '木星暗环', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [490, 440], size: [175, 84], color: '#f2c879', text: '土星亮冰环', from: 1.0 },
          { kind: 'shape', shape: 'pill', at: [730, 440], size: [160, 72], color: '#74c0fc', text: '天王星细环', from: 1.6 },
          { kind: 'shape', shape: 'pill', at: [970, 440], size: [160, 72], color: '#4c6ef5', text: '海王星暗环', from: 2.2 },
          { kind: 'text', at: [600, 680], text: '土星环反光水冰最多，所以最亮', size: 'm', color: '#5b3e96', from: 3.0 },
        ],
      },
    ],
  },
};
