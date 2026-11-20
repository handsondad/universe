import type { Story } from './types';

export const darkEnergy: Story = {
  slug: 'dark-energy',
  title: '宇宙膨胀为什么不但没变慢，反而越来越快？',
  trigger: '小念把球往上抛，看它越飞越慢又掉回手里，忽然想到宇宙膨胀会不会也被引力拉得越来越慢。',
  dialogue: [
    {
      nian: '爸爸，球往上抛会越飞越慢，宇宙膨胀是不是也会被引力拖得越来越慢，最后停下来？',
      dad: '这正是 20 世纪很多科学家的想法！宇宙里的星系彼此都有引力，像一根根看不见的橡皮绳往回拽，所以大家都以为膨胀会一直“踩刹车”。1998 年，两个天文团队决定测一测这脚刹车到底踩得多重，结果却让全世界大吃一惊。',
    },
    {
      nian: '两个天文团队用什么尺子，去测远在天边的宇宙膨胀呢？',
      dad: '他们用的是一种叫“Ia 型超新星”的恒星大爆炸。这种爆炸每次的真实亮度都差不多，像宇宙里一盏盏瓦数相同的标准灯泡：看起来越暗，就离得越远。再量出它的光被拉长了多少，就能知道宇宙在不同年代膨胀得有多快。',
    },
    {
      nian: '那这些标准灯泡告诉了科学家什么惊人的结果？',
      dad: '遥远的超新星比预想的更暗，说明它们比“膨胀一直减速”算出来的位置更远！合理的解释是：宇宙膨胀在大约 50 亿年前开始加速。珀尔马特、施密特和里斯因此获得了 2011 年诺贝尔物理学奖。这就像抛向空中的球不但没落下，反而越飞越快！',
      figure: {
        kind: 'sim',
        sim: 'darkEnergyPie',
        caption: '调节暗能量强弱和时间，比较膨胀曲线是一直“踩刹车”还是后来“踩油门”，再看宇宙成分饼图。',
      },
    },
    {
      nian: '球越飞越快一定有东西在推，是谁在推着宇宙加速膨胀？',
      dad: '科学家也不知道它到底是什么，只好先给它起个名字叫“暗能量”。它看不见、摸不着，似乎均匀地藏在空间本身里：空间越胀越大，它的总量也跟着变多，最后压过了引力的刹车，让膨胀越来越快。',
    },
    {
      nian: '暗能量藏在空间里看不见摸不着，那它在宇宙里占多少呢？',
      dad: '按照现在的标准模型，把宇宙的全部“家当”算成 100 份：暗能量约占 68 份，看不见的暗物质约占 27 份，而恒星、行星、你我这些普通物质只占约 5 份！我们看得见的一切，只是宇宙的一小块边角。',
    },
    {
      nian: '暗能量占了 68 份，这么大一份“家当”，科学家弄清楚它的真面目了吗？',
      dad: '还没有，这是今天物理学最大的谜题之一。2025 年 3 月，DESI 暗能量光谱仪测绘了海量星系的三维分布，再和宇宙微波背景、超新星数据放在一起，提示暗能量可能在随时间慢慢减弱。不过这个信号还没达到科学界“确认发现”的标准，需要更多观测来检验。',
    },
    {
      nian: '我明白了！宇宙膨胀不但没被引力刹住，反而从大约 50 亿年前开始越胀越快，背后的推手叫暗能量，它约占宇宙的 68%，可它到底是什么，还等着科学家去揭开！',
      dad: '说得太好了！也许将来揭开暗能量之谜的科学家里，就有今天抬头看星空的你。',
    },
  ],
  tip: '可以和孩子做“抛球对比”：把球竖直上抛，观察它越飞越慢再落下，告诉孩子科学家原本以为宇宙膨胀也会这样减速，却发现它在加速。再用一张圆纸片按 68、27、5 的比例涂色，直观感受普通物质有多少。抛球时注意避开灯具和易碎物品。',
  sources: [
    { title: '普通高中教科书 物理 必修第二册·相对论时空观与牛顿力学的局限性', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Dark Energy', by: 'NASA Science', url: 'https://science.nasa.gov/dark-energy/' },
    { title: 'New DESI results strengthen hints that dark energy may evolve', by: 'Berkeley Lab', url: 'https://newscenter.lbl.gov/2025/03/19/new-desi-results-strengthen-hints-that-dark-energy-may-evolve/' },
    { title: 'The Nobel Prize in Physics 2011', by: 'Nobel Prize Outreach', url: 'https://www.nobelprize.org/prizes/physics/2011/summary/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '抛出去的球会减速',
        duration: 8,
        cues: [
          { kind: 'text', at: [600, 130], text: '宇宙膨胀也会刹车吗？', size: 'm', color: '#5b3e96', from: 0.2 },
          { kind: 'toss', at: [320, 720], velocity: [180, -760], ground: 760, color: '#ff922b', from: 0.5 },
          { kind: 'arrow', path: [[760, 360], [760, 580]], color: '#e03131', text: '引力往回拽', from: 1.6 },
          { kind: 'atom', path: [[960, 460]], symbol: '星系', color: '#b197fc', r: 34, from: 2.4 },
          { kind: 'atom', path: [[1080, 640]], symbol: '星系', color: '#b197fc', r: 30, from: 2.8 },
        ],
      },
      {
        turn: 1,
        title: 'Ia 型超新星当灯泡',
        duration: 9,
        cues: [
          { kind: 'pulse', at: [300, 420], color: '#ffd43b', radius: 140, from: 0.3 },
          { kind: 'atom', path: [[300, 420]], symbol: '近', color: '#ffd43b', r: 46, from: 0.2 },
          { kind: 'pulse', at: [900, 420], color: '#ffe8a3', radius: 50, from: 1.2 },
          { kind: 'atom', path: [[900, 420]], symbol: '远', color: '#fff3bf', r: 20, from: 1.2 },
          { kind: 'label', at: [900, 400], pos: [900, 230], text: '看着越暗就越远', color: '#e8590c', from: 2.4 },
          { kind: 'text', at: [600, 720], text: '真实亮度相同的标准灯泡', size: 'm', color: '#5d4e37', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '膨胀在加速！',
        duration: 10,
        cues: [
          { kind: 'arrow', path: [[160, 800], [1060, 800]], color: '#868e96', text: '时间', from: 0.2 },
          { kind: 'ray', path: [[200, 780], [360, 580], [520, 490], [680, 440], [840, 350], [1000, 170]], color: '#ffd43b', draw: 3, from: 0.5 },
          { kind: 'label', at: [680, 440], pos: [480, 260], text: '约 50 亿年前开始加速', color: '#e03131', from: 3.6 },
          { kind: 'myth', wrong: '宇宙膨胀会被引力越拖越慢', right: '近 50 亿年来膨胀在加速', from: 5.2 },
        ],
      },
      {
        turn: 3,
        title: '看不见的推手',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [260, 260], color: '#5b3e96', text: '暗能量', motion: 'pulse', from: 0.3 },
          { kind: 'arrow', path: [[740, 440], [1020, 440]], color: '#9775fa', text: '推着空间胀', from: 1.0 },
          { kind: 'arrow', path: [[460, 440], [180, 440]], color: '#9775fa', from: 1.2 },
          { kind: 'arrow', path: [[600, 300], [600, 140]], color: '#9775fa', from: 1.4 },
          { kind: 'arrow', path: [[600, 580], [600, 740]], color: '#9775fa', from: 1.6 },
          { kind: 'text', at: [600, 830], text: '它是什么？还是个谜', size: 's', color: '#5d4e37', from: 3.0 },
        ],
      },
      {
        turn: 4,
        title: '宇宙的家当',
        duration: 9,
        cues: [
          { kind: 'meter', at: [600, 240], label: '暗能量 68%', start: 0, end: 0.68, color: '#5b3e96', from: 0.3 },
          { kind: 'meter', at: [600, 400], label: '暗物质 27%', start: 0, end: 0.27, color: '#3b6ea5', from: 1.4 },
          { kind: 'meter', at: [600, 560], label: '普通物质 5%', start: 0, end: 0.05, color: '#f59f00', from: 2.5 },
          { kind: 'text', at: [600, 740], text: '看得见的只占约 5%', size: 'm', color: '#e8590c', from: 4.0 },
        ],
      },
      {
        turn: 5,
        title: 'DESI 的新线索',
        duration: 8,
        cues: [
          { kind: 'particles', box: [200, 160, 800, 300], count: 40, color: '#ffd43b', motion: 'jitter', size: 7, from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 600], size: [520, 100], color: '#e8590c', text: '暗能量在变弱？', from: 1.2 },
          { kind: 'text', at: [600, 780], text: '只是提示，还没确认', size: 'm', color: '#5b3e96', from: 2.6 },
        ],
      },
    ],
  },
};
