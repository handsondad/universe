import type { Story } from './types';

export const blackHoleLab: Story = {
  slug: 'black-hole-lab',
  title: '黑洞连光都吸进去，科学家到底怎么“看见”它的？',
  trigger: '小念看到新闻里像橘黄色甜甜圈一样的黑洞照片，奇怪连光都逃不出来的黑洞怎么会被拍到。',
  dialogue: [
    {
      nian: '爸爸，黑洞不是连一丁点光都逃不出来吗，科学家那张黑洞照片拍的是什么？',
      dad: '问到点子上了！科学家拍到的不是黑洞内部发出的光，而是黑洞在耀眼背景上抠出来的“黑色剪影”！就像夜晚有人站在探照灯前面，虽然他一身黑衣不发光，但一圈亮光立刻勾出了他的轮廓。',
      show: { kind: 'lab', step: 0, label: '3D 看看：事件视界与黑洞阴影' },
    },
    {
      nian: '黑洞本身漆黑一片，它外面那圈亮闪闪的橘黄色剪影亮光是从哪儿来的？',
      dad: '来自掉向黑洞的气体和尘埃！它们在黑洞事件视界外面疯狂旋转、挤成扁扁的“吸积盘”，互相剧烈摩擦加热到几十亿度，发出比整个星系还耀眼的辐射，把黑洞围成了一个发光火环！',
      show: { kind: 'lab', step: 1, label: '3D 看看：炽热旋转的吸积盘' },
      figure: {
        kind: 'sim',
        sim: 'blackHoleLens',
        caption: '拖动光线的瞄准距离，观察靠近黑洞的光线怎样被折弯形成光子环或跌入黑洞阴影。',
      },
    },
    {
      nian: '吸积盘不是平平的一张光盘吗，为什么电影和照片里黑洞上下左右全都有光环？',
      dad: '这就是爱因斯坦广义相对论最神奇的“引力透镜”！黑洞把周围时空压得极度弯曲，连躲在黑洞正后方的那半截吸积盘发出的光，都会被强引力掰弯、从黑洞头顶和脚底翻过来射进你的眼睛！',
      show: { kind: 'lab', step: 2, label: '3D 看看：光线绕着黑洞拐大弯' },
    },
    {
      nian: '光居然能绕着黑洞头顶翻过来！那黑洞离我们那么远，哪台望远镜有本事拍清它？',
      dad: '单靠一台望远镜绝对拍不清——看 5500 万光年外的 M87* 黑洞，难度相当于在地球上看清月球表面的一颗橘子！全世界科学家把南极、智利、夏威夷等地的射电望远镜联网，拼成了一台“地球那么大口径”的事件视界望远镜（EHT）！',
    },
    {
      nian: '那照片上看着橘黄色的光环，黑洞真是橘黄色的吗？',
      dad: '不是哦！黑洞吸积盘发出的很多是人眼看不见的毫米波射电信号，科学家把信号强的地方涂成明亮的黄白色、弱的地方涂成深红暗橘色，方便我们一眼看懂哪一边更亮。',
    },
    {
      nian: '我明白了！我们拍到的不是黑洞内部，而是它外面炽热吸积盘和引力弯曲光线勾出来的光子环，中间无光区就是黑洞阴影！',
      dad: '太酷了！点右上角进 3D 黑洞实验台，拖一拖视角看看弯曲时空漏斗和上下翻转的吸积盘光环吧！',
      show: { kind: 'lab', step: 3, label: '3D 试试：跨过临界线：落入黑洞' },
    },
  ],
  tip: '2019 年 EHT 发布了人类首张黑洞阴影照片（M87*，约 65 亿倍太阳质量），2022 年又发布了银河系中心超大质量黑洞人马座 A*（Sgr A*，约 400 万倍太阳质量）的图像。',
  sources: [
    { title: 'Astronomers Capture First Image of a Black Hole (M87*)', by: 'EHT / ESO (CC BY 4.0)', url: 'https://www.eso.org/public/news/eso1907/' },
    { title: 'Black Holes — Science Overview', by: 'NASA Science', url: 'https://science.nasa.gov/universe/black-holes/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '拍到的是黑洞的“剪影”',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [260, 260], color: '#ff922b', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [140, 140], color: '#1c1836', text: '黑洞阴影', from: 0.5 },
          { kind: 'myth', wrong: '照相机拍到了黑洞里面发的光', right: '拍到的是炽热吸积盘衬出的阴影', from: 2.0 },
        ],
      },
      {
        turn: 1,
        title: '视界外的高温吸积盘发光',
        duration: 8,
        cues: [
          { kind: 'flow', path: [[360, 440], [600, 340], [840, 440], [600, 540]], color: '#ffd43b', loop: true, count: 14, speed: 280, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [120, 120], color: '#1c1836', text: '事件视界', from: 0.2 },
          { kind: 'label', at: [830, 440], pos: [970, 290], text: '气体高速摩擦发炽热光', color: '#e8590c', from: 1.5 },
          { kind: 'text', at: [600, 700], text: '跨过事件视界，光也难逃', size: 'm', color: '#5b3e96', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '引力透镜把背面光掰上来',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [120, 120], color: '#1c1836', text: '黑洞', from: 0.2 },
          { kind: 'ray', path: [[220, 320], [560, 310], [720, 390], [980, 560]], color: '#ffd43b', from: 0.6 },
          { kind: 'ray', path: [[220, 560], [560, 570], [720, 490], [980, 320]], color: '#ff922b', from: 1.4 },
          { kind: 'text', at: [600, 720], text: '强引力弯折时空，掰弯光线', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '把地球拼成一台超级望远镜',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [260, 260], color: '#4dabf7', text: '地球口径阵', from: 0.2 },
          { kind: 'atom', path: [[500, 360]], symbol: '台', color: '#ffd43b', r: 18, from: 0.8 },
          { kind: 'atom', path: [[700, 380]], symbol: '台', color: '#ffd43b', r: 18, from: 1.1 },
          { kind: 'atom', path: [[600, 550]], symbol: '台', color: '#ffd43b', r: 18, from: 1.4 },
          { kind: 'text', at: [600, 720], text: '全球望远镜联网拍出黑洞像', size: 'm', color: '#5b3e96', from: 2.6 },
        ],
      },
    ],
  },
};
