import type { Story } from './types';

export const starColors: Story = {
  slug: 'star-colors',
  title: '夜空里的星星为什么有的偏蓝、有的发白、有的发红？',
  trigger: '冬夜抬头看猎户座，小念发现左上角的参宿四发红，右下角的参宿七却蓝得发白。',
  dialogue: [
    {
      nian: '爸爸，水龙头上红色是热水、蓝色是冷水，那发红的星星是不是比发蓝的星星更烫？',
      dad: '在天文学里恰好完全相反！发蓝白色的星星才是滚烫的超级大火炉，表面温度动辄上万到三万多度；发红的星星表面反而相对“凉快”，只有大概三千度。',
    },
    {
      nian: '发蓝居然比发红更烫！为什么越烫的东西发出的光越偏蓝呢？',
      dad: '你想想打铁匠烧铁块，或者家里燃气灶的火苗：铁块刚开始热起来发暗红光，越烧越烫会变成橙黄，最猛的火焰心反而是蓝白色的！物理上叫“黑体辐射”：温度越高，发出的高能短波蓝光比例就越多。',
      figure: {
        kind: 'sim',
        sim: 'starTempColor',
        caption: '拖动恒星表面温度，观察恒星从红星、黄星变成耀眼蓝白星的色彩和光谱峰值变化。',
      },
    },
    {
      nian: '原来颜色就是星星的温度计！那我们的太阳表面温度多少，它是什么颜色？',
      dad: '太阳表面大约 5778 开尔文（约 5500 摄氏度），正好落在光谱中间。在太空看太阳其实是非常耀眼的纯白色，只是阳光穿过地球大气层时蓝光被散射成蓝天，我们看太阳才带点鹅黄色。',
    },
    {
      nian: '太阳表面温度居中，可猎户座发红的参宿四温度更低，为什么照样那么亮？',
      dad: '亮不亮除了看温度，还看个头和距离！参宿四是一颗超级膨胀的“红超巨星”，直径差不多有太阳的几百倍，要是把它放到太阳系中心，能一路吞过火星甚至接近木星轨道，表面积巨大所以照样耀眼。',
    },
    {
      nian: '参宿四这么大颗红超巨星能看出发红，为什么夜空大多数星星看着都是白花花的？',
      dad: '因为夜里星光太微弱，人眼负责分辨颜色的视锥细胞“下班”了，主要靠不辨颜色的视杆细胞工作。只要拿双筒望远镜多聚一点光，就能一眼认出天上五颜六色的蓝星、金星和红星！',
    },
    {
      nian: '我懂了！星星颜色由表面温度决定，而且和水龙头相反：越烫越发蓝白，越凉越发橙红，太阳温度居中是温暖的黄白星！',
      dad: '学得真快！冬天晴朗的晚上我们一起去楼下找猎户座，亲眼对比一下肩膀发红的参宿四和脚下发蓝的参宿七！',
    },
  ],
  tip: '猎户座在北半球冬季傍晚非常容易辨认：中间三颗排成一线的亮星是猎户腰带，左上角偏橙红的是参宿四（Betelgeuse），右下角蓝白刺眼的是参宿七（Rigel），是向孩子展示恒星色温的最佳“天然教具”。',
  sources: [
    { title: '普通高中物理教科书 选择性必修第三册·黑体辐射', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Stars — Colors and Temperatures', by: 'NASA Science', url: 'https://science.nasa.gov/universe/stars/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '蓝星最烫，红星较凉',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 400], size: [150, 150], color: '#74c0fc', text: '蓝星两万度', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [860, 400], size: [150, 150], color: '#ff6b6b', text: '红星三千度', from: 0.6 },
          { kind: 'myth', wrong: '红色星星最烫、蓝色星星最冷', right: '恒星越烫越偏蓝白，越凉越偏红', from: 2.0 },
        ],
      },
      {
        turn: 1,
        title: '温度越高，光波越短越蓝',
        duration: 8,
        cues: [
          { kind: 'wave', a: [180, 320], b: [1020, 320], wavelength: 52, amplitude: 24, color: '#4dabf7', from: 0.4 },
          { kind: 'label', at: [600, 300], pos: [600, 210], text: '高温：短波蓝光能量高', color: '#1c7ed6', from: 1.0 },
          { kind: 'wave', a: [180, 560], b: [1020, 560], wavelength: 140, amplitude: 24, color: '#ff6b6b', from: 1.6 },
          { kind: 'label', at: [600, 580], pos: [600, 680], text: '低温：长波红光能量低', color: '#e03131', from: 2.2 },
        ],
      },
      {
        turn: 2,
        title: '太阳温度排在正中间',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [240, 440], size: [160, 74], color: '#4dabf7', text: '蓝星O/B', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 440], size: [210, 88], color: '#ffd43b', text: '太阳黄白星', from: 1.0 },
          { kind: 'shape', shape: 'pill', at: [960, 440], size: [160, 74], color: '#ff6b6b', text: '红星M型', from: 1.7 },
          { kind: 'text', at: [600, 680], text: '太空看太阳其实是耀眼纯白', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
      {
        turn: 3,
        title: '红超巨星靠大个头照亮夜空',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 440], size: [50, 50], color: '#ffd43b', text: '太阳', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [800, 440], size: [280, 280], color: '#ff6b6b', text: '参宿四', from: 0.9 },
          { kind: 'text', at: [600, 730], text: '温度虽低，但表面积大到惊人', size: 'm', color: '#c92a2a', from: 2.2 },
        ],
      },
    ],
  },
};
