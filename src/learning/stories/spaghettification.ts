import type { Story } from './types';

export const spaghettification: Story = {
  slug: 'spaghettification',
  title: '要是把太阳突然换成一样重的黑洞，地球会被立刻吸进去吗？',
  trigger: '动画片里黑洞一出现就把周围星球全吸进漩涡，小念问爸爸黑洞是不是宇宙超级吸尘器。',
  dialogue: [
    {
      nian: '爸爸，要是太阳瞬间变成一个和它一样重的黑洞，地球会被马上吸进去吗？',
      dad: '答案会让你大吃一惊：地球一点也不会被吸进去！它会照样稳稳地沿着现在这条椭圆轨道绕圈。万有引力只看中心天体的质量和距离——质量没变、距离还是 1.5 亿千米，地球感受到的拉力丝毫不变！',
    },
    {
      nian: '质量没变、引力丝毫不变？可电影里黑洞不是像吸尘器一样到处吞星球吗？',
      dad: '那是电影为了吓人加的夸张特效！黑洞根本不是到处乱吸的吸尘器。把太阳压缩成一个黑洞，它其实小得可怜，半径只有大约 3 千米（比一座小县城还小）；只要你别撞进它家门口，它和普通恒星一样老实。',
      figure: {
        kind: 'sim',
        sim: 'sunToBlackHole',
        caption: '一键把 1 倍太阳质量的太阳换成同质量黑洞，观察地球轨道有没有变化。',
      },
    },
    {
      nian: '地球不会被吸走，那太阳换成黑洞后，地球上会发生什么可怕的变化呢？',
      dad: '地球虽然没掉进黑洞，却会在 8 分 20 秒后彻底失去阳光！天空瞬间全黑，植物停止光合作用，几天后地面就会冻成冰天雪地，海洋表面也会慢慢结起厚冰壳。',
    },
    {
      nian: '那要离黑洞多近，它才真的会显出特别可怕的威力呢？',
      dad: '只有飞得离那个 3 千米小黑球非常非常近的时候！因为距离变得极小，引力会按距离平方暴涨；如果你头朝外、脚朝黑洞飘过去，脚受的引力比头大上千倍，身体会被潮汐力拉成一根细长面条——科学家幽默地叫它“面条化”！',
    },
    {
      nian: '连石头和飞船都会被潮汐力拉成面条吗？那银河系中心的大黑洞会不会把太阳系也拉过去？',
      dad: '完全不用怕！银河系中心黑洞离我们足足 2.6 万光年，它虽然重达 400 万倍太阳质量，但只占整个银河系总质量的很小一丁点，对地球的引力微弱到几乎为零，更不可能把我们吸过去。',
    },
    {
      nian: '我懂了！黑洞不是宇宙吸尘器，同质量黑洞在远处引力和普通恒星一样，地球不会掉进去；只有极度靠近时才会有可怕的潮汐“面条化”！',
      dad: '太透彻了！记住这条万有引力铁律：远离视界时，引力只认质量和距离，不认它是不是黑洞。',
    },
  ],
  tip: '任何物体都有对应的“史瓦西半径”（r_s = 2GM/c²）：太阳大约 3 千米，地球如果被压成黑洞，半径只有约 9 毫米（一颗弹珠大小）。当然，自然界中地球和太阳都不会自己坍缩成黑洞。',
  sources: [
    { title: 'Black Hole Myths vs. Reality', by: 'NASA Science', url: 'https://science.nasa.gov/universe/black-holes/anatomy/' },
    { title: '普通高中物理教科书 必修第二册·万有引力定律', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '黑洞不是宇宙吸尘器',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [80, 80], color: '#1c1836', text: '1M☉黑洞', from: 0.2 },
          { kind: 'flow', path: [[600, 240], [820, 420], [600, 600], [380, 420]], color: '#4dabf7', loop: true, count: 8, from: 0.4 },
          { kind: 'myth', wrong: '太阳变黑洞会立刻吸走地球', right: '同质量黑洞引力不变，轨道照旧', from: 2.0 },
        ],
      },
      {
        turn: 1,
        title: '太阳黑洞半径仅三千米',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 440], size: [220, 220], color: '#f59f00', text: '大太阳', from: 0.2 },
          { kind: 'arrow', path: [[480, 440], [720, 440]], color: '#5b3e96', text: '质量完全不变', from: 1.0 },
          { kind: 'shape', shape: 'circle', at: [860, 440], size: [46, 46], color: '#1c1836', from: 1.4 },
          { kind: 'label', at: [860, 415], pos: [860, 260], text: '半径仅约 3 千米', color: '#e8590c', from: 2.0 },
        ],
      },
      {
        turn: 3,
        title: '极度靠近才会被“面条化”',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [240, 450], size: [150, 150], color: '#1c1836', text: '黑洞', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [880, 450], size: [90, 90], color: '#74c0fc', text: '远处', slide: { to: [560, 450], at: 1.0, over: 2.6 }, from: 0.4, to: 3.8 },
          { kind: 'shape', shape: 'pill', at: [520, 450], size: [260, 32], color: '#ff8787', text: '潮汐拉成面条', from: 3.7 },
          { kind: 'text', at: [600, 700], text: '脚近头远，引力差把人拉长', size: 'm', color: '#e8590c', from: 4.2 },
        ],
      },
      {
        turn: 4,
        title: '银河系中心黑洞离我们极远',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [240, 440], size: [110, 110], color: '#1c1836', text: '银心黑洞', from: 0.2 },
          { kind: 'atom', path: [[960, 440]], symbol: '地球', color: '#4dabf7', r: 36, from: 0.4 },
          { kind: 'arrow', path: [[320, 440], [900, 440]], color: '#5b3e96', text: '相距 2.6 万光年', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '安全得很，不会把太阳系吸过去', size: 'm', color: '#2f8a57', from: 2.4 },
        ],
      },
    ],
  },
};
