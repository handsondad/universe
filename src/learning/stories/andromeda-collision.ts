import type { Story } from './types';

export const andromedaCollision: Story = {
  slug: 'andromeda-collision',
  title: '银河系真的会和仙女座星系撞在一起吗？撞了地球会怎样？',
  trigger: '小念在科普书上读到“大约四五十亿年后，银河系一定会和仙女座星系迎面相撞”，担心地球会被撞得粉碎。',
  dialogue: [
    {
      nian: '爸爸，书上说四五十亿年后银河系一定会和仙女座星系相撞，到时候地球会被撞碎吗？',
      dad: '先别慌！仙女座星系离我们约 250 万光年，是银河系最大的邻居。它确实正以每秒约 110 千米的速度朝我们靠近，比步枪子弹还快一百多倍。可“一定会撞”这个说法，2025 年被科学家用新数据重新算了一遍。',
    },
    {
      nian: '每秒 110 千米都朝我们冲过来了，科学家重新算了一遍，难道还会撞不上？',
      dad: '朝我们冲的速度只是一半信息，还得知道它往旁边“飘”得多快。研究团队用哈勃和盖亚望远镜的最新测量，把几个星系未来的路线模拟了成千上万次：未来 100 亿年内真正合并的只占一半左右，四五十亿年内就撞上的只有约 2%。',
      figure: {
        kind: 'sim',
        sim: 'andromedaMerge',
        caption: '拖动时间，数数许多次模拟里有几次真的撞上；再切到恒星尺度，看看星星之间有多空。',
      },
    },
    {
      nian: '为什么模拟出来只有一半机会，是有谁在旁边捣乱吗？',
      dad: '还真有“捣乱”的邻居！银河系旁边的大麦哲伦云往一边拽，让相撞的机会变小；仙女座身边的三角座星系 M33 往另一边拉，又让机会变大一点。几个星系你拉我扯，就像好几个人同时推一辆小车，路线一下子就很难算死了。',
    },
    {
      nian: '那万一几个星系真的撞上了，里面的星星不就一颗颗撞得稀巴烂吗？',
      dad: '这是最常见的误会！星系照片看着密密麻麻，其实恒星之间空得吓人：要是把太阳缩成一只乒乓球，离它最近的恒星就是另一只乒乓球，远在上千千米之外。两个星系“相撞”，更像两团稀薄的烟雾互相穿过，恒星几乎不会真的撞在一起。',
    },
    {
      nian: '恒星撞不上的话，那星系“相撞”以后会变成什么样子？',
      dad: '引力会把两个星系的旋臂扯出长长的“尾巴”，它们来回绕几圈，最后揉成一个圆鼓鼓的大椭圆星系，科学家给它起了个外号叫“银仙星系”。新的计算显示，如果真会合并，最可能发生在大约 76 亿年后，那是非常非常遥远的未来。',
    },
    {
      nian: '我懂了！仙女座离我们约 250 万光年、每秒约 110 千米靠近，可最新计算说 100 亿年内合并只有一半可能；就算真撞上，恒星之间空得像相隔上千千米的乒乓球，太阳和地球几乎不会被撞到！',
      dad: '总结得真棒！科学结论会随着更精确的数据不断修正，这正是科学最诚实的地方。秋天找个晴朗的夜晚，我们去郊外找找仙女座星系那团淡淡的光斑吧！',
    },
  ],
  tip: '秋季夜晚远离城市灯光，在仙女座方向用肉眼或双筒望远镜能看到仙女座星系（M31）：一团椭圆形的淡淡光斑。它是肉眼能看到的最遥远天体之一，进入孩子眼睛的光已经走了约 250 万年。',
  sources: [
    { title: '义务教育教科书 科学 六年级下册·宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Hubble and Gaia reveal uncertain fate of the Milky Way (heic2508)', by: 'ESA/Hubble', url: 'https://esahubble.org/news/heic2508/' },
    { title: '中国科学院 · 天文科普', by: '中国科学院', url: 'https://www.cas.cn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '仙女座正在靠近',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 430], size: [220, 220], color: '#b197fc', text: '银河系', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [980, 400], size: [240, 150], color: '#74c0fc', text: '仙女座', slide: { to: [800, 420], at: 1.5, over: 4 }, from: 0.4 },
          { kind: 'arrow', path: [[900, 590], [520, 590]], color: '#e8590c', text: '每秒约110千米', from: 1.2 },
          { kind: 'count', at: [600, 190], label: '相隔距离', start: 0, end: 250, unit: '万光年', over: 2, from: 2.4 },
          { kind: 'text', at: [600, 740], text: '它真的会撞上来吗？', size: 'm', color: '#5b3e96', from: 4.5 },
        ],
      },
      {
        turn: 1,
        title: '模拟了成千上万次',
        duration: 9,
        cues: [
          { kind: 'meter', at: [600, 290], label: '45亿年内合并', start: 0, end: 0.02, color: '#e8590c', over: 1.5, from: 0.4 },
          { kind: 'meter', at: [600, 440], label: '100亿年内合并', start: 0, end: 0.5, color: '#5b3e96', over: 2.2, from: 1.4 },
          { kind: 'text', at: [600, 600], text: '合并只有约一半可能', size: 'm', color: '#5d4e37', from: 3 },
          { kind: 'myth', wrong: '四五十亿年后一定会相撞', right: '100亿年内合并约一半可能', from: 4.5 },
        ],
      },
      {
        turn: 2,
        title: '邻居们你拉我扯',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 440], size: [190, 190], color: '#b197fc', text: '银河系', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [860, 420], size: [200, 130], color: '#74c0fc', text: '仙女座', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [220, 700], size: [130, 84], color: '#d0bfff', text: '大麦哲伦云', from: 1 },
          { kind: 'shape', shape: 'circle', at: [1040, 640], size: [110, 84], color: '#a5d8ff', text: 'M33', from: 1.6 },
          { kind: 'arrow', path: [[320, 550], [240, 640]], color: '#e8590c', text: '机会变小', from: 2.4 },
          { kind: 'arrow', path: [[920, 500], [1010, 590]], color: '#2f8a57', text: '机会变大', from: 3.2 },
          { kind: 'text', at: [600, 200], text: '几个星系你拉我扯', size: 'm', color: '#5b3e96', from: 4 },
        ],
      },
      {
        turn: 3,
        title: '恒星之间空荡荡',
        duration: 9,
        cues: [
          { kind: 'flow', path: [[100, 360], [1100, 360]], color: '#74c0fc', count: 6, speed: 160, from: 0.2 },
          { kind: 'flow', path: [[1100, 470], [100, 470]], color: '#ffd43b', count: 6, speed: 160, from: 0.2 },
          { kind: 'text', at: [600, 220], text: '两群星星互相穿过', size: 'm', color: '#5d4e37', from: 1 },
          { kind: 'shape', shape: 'circle', at: [260, 640], size: [36, 36], color: '#fff3bf', from: 2.5 },
          { kind: 'shape', shape: 'circle', at: [940, 640], size: [36, 36], color: '#fff3bf', from: 2.8 },
          { kind: 'arrow', path: [[300, 640], [900, 640]], color: '#5b3e96', text: '上千千米', from: 3.2 },
          { kind: 'label', at: [260, 640], pos: [300, 560], text: '乒乓球大的太阳', color: '#e8590c', from: 3.6 },
          { kind: 'myth', wrong: '星系相撞就是恒星撞恒星', right: '恒星之间太空，几乎撞不上', from: 5 },
        ],
      },
      {
        turn: 4,
        title: '揉成“银仙星系”',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 430], size: [200, 200], color: '#b197fc', text: '银河系', slide: { to: [560, 430], at: 0.8, over: 2.5 }, from: 0, to: 4.2 },
          { kind: 'shape', shape: 'circle', at: [840, 430], size: [210, 140], color: '#74c0fc', text: '仙女座', slide: { to: [640, 430], at: 0.8, over: 2.5 }, from: 0, to: 4.2 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [380, 280], color: '#ffc078', text: '银仙星系', motion: 'grow', over: 2, from: 3.8 },
          { kind: 'label', at: [770, 360], pos: [960, 220], text: '圆鼓鼓的椭圆星系', color: '#e8590c', from: 5.2 },
          { kind: 'text', at: [600, 740], text: '若合并，最可能约76亿年后', size: 'm', color: '#5b3e96', from: 6 },
        ],
      },
    ],
  },
};
