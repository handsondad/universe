import type { Story } from './types';

export const venusHottest: Story = {
  slug: 'venus-hottest',
  title: '水星离太阳最近，为什么太阳系最热的行星却是金星？',
  trigger: '小念背完太阳系行星顺序后，以为离太阳最近的水星一定是太阳系里最烫的星球。',
  dialogue: [
    {
      nian: '爸爸，水星离太阳最近，按理说它应该是太阳系里最热的行星吧？',
      dad: '听起来很有道理，但真正的大烤箱其实是第二近的金星！金星表面昼夜常年高达约 465 摄氏度，比披萨烤炉还烫；水星白天最高约 430 度，一到晚上却会猛跌到零下 180 度。',
    },
    {
      nian: '金星离太阳明明远一些，为什么比水星还烫、而且晚上也不凉快？',
      dad: '秘密全在“棉被”上！水星个头小、引力弱，几乎留不住大气，太阳一落山热量立刻散回太空。金星却裹着一层极其浓厚的大气，表面气压是地球的 92 倍，其中 96.5% 都是二氧化碳。',
      figure: {
        kind: 'sim',
        sim: 'venusGreenhouse',
        caption: '切换水星、地球、金星三种大气厚度，观察阳光进入和红外热散失的区别。',
      },
    },
    {
      nian: '厚厚的二氧化碳大气怎么就能把金星憋成大烤箱呢？',
      dad: '这就是失控的温室效应！可见光可以穿透云层照热地面，可地面往外散发的红外热辐射却被厚厚的二氧化碳死死拦住、反复弹回地面，热量只进难出，温度就越憋越高。',
    },
    {
      nian: '那二氧化碳是不是全都是坏东西，地球上一点温室效应都不要才最好？',
      dad: '恰恰相反！如果没有地球大气温和的温室效应，地球平均气温会跌到零下 18 摄氏度，海洋都会结成大冰块。关键是“刚刚好”：太薄像火星冻人，太厚像金星烤人。',
    },
    {
      nian: '金星这么烫、气压又那么大，人类派去的探测器岂不是一下就被压扁烤坏了？',
      dad: '确实如此！历史上着陆金星的探测器必须穿上钛合金厚盔甲，即便这样最多也只撑了大约两小时就失灵了，不过它们还是珍贵地拍回了橙黄云层下的岩石照片。',
    },
    {
      nian: '我懂了！水星没大气留不住热，金星披着 96.5% 二氧化碳的超级厚棉被触发了失控温室效应，所以成了太阳系最热的行星！',
      dad: '没错！地球这层刚刚好的大气棉被，正是我们能愉快生活在蓝色星球上的珍贵礼物，要好好爱护它。',
    },
  ],
  tip: '太阳下停着关紧车窗的汽车里为什么特别闷热，就是身边最直观的温室效应演示（提醒：切勿将儿童或宠物留在密闭车内）。',
  sources: [
    { title: 'Venus Facts', by: 'NASA Science', url: 'https://science.nasa.gov/venus/facts/' },
    { title: '普通高中地理教科书 必修第一册·大气受热过程', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '最热冠军不是水星',
        duration: 8,
        cues: [
          { kind: 'count', at: [340, 380], label: '水星夜温', start: 0, end: -180, unit: '℃', over: 2.5, from: 0.4 },
          { kind: 'count', at: [860, 380], label: '金星均温', start: 20, end: 465, unit: '℃', over: 2.5, from: 0.6 },
          { kind: 'myth', wrong: '离太阳最近的水星最热', right: '厚大气让金星昼夜高达 465℃', from: 2.2 },
        ],
      },
      {
        turn: 1,
        title: '超厚二氧化碳棉被',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 460], size: [150, 150], color: '#adb5bd', text: '水星无大气', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [840, 460], size: [210, 210], color: '#ffa94d', text: '厚CO₂层', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [840, 460], size: [140, 140], color: '#e8590c', text: '92倍气压', from: 1.4 },
          { kind: 'text', at: [600, 720], text: '表面气压像海底900米', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
      {
        turn: 2,
        title: '光进得去，热出不来',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 320], size: [740, 80], color: '#ffd43b', text: '厚二氧化碳层', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 620], size: [740, 90], color: '#e8590c', text: '炙热地表', from: 0.2 },
          { kind: 'ray', path: [[360, 160], [420, 575]], color: '#f59f00', from: 0.8 },
          { kind: 'arrow', path: [[580, 575], [640, 365]], color: '#e03131', text: '红外散热', from: 1.8 },
          { kind: 'arrow', path: [[660, 365], [720, 575]], color: '#c92a2a', text: '反复弹回', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '地球温室效应刚刚好',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [250, 440], size: [190, 80], color: '#74c0fc', text: '无温室-18℃', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [600, 440], size: [210, 86], color: '#51cf66', text: '地球+15℃', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [950, 440], size: [190, 80], color: '#e8590c', text: '金星+465℃', from: 2.0 },
          { kind: 'text', at: [600, 680], text: '适度保温才能留住液态海洋', size: 'm', color: '#2f8a57', from: 3.0 },
        ],
      },
    ],
  },
};
