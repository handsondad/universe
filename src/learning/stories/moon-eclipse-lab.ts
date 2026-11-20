import type { Story } from './types';

export const moonEclipseLab: Story = {
  slug: 'moon-eclipse-lab',
  title: '月亮每天怎么变形状，为什么不是每个月都有日食月食？',
  trigger: '农历初三晚上小念看见弯弯的新月，过了十来天变成圆盘，好奇是不是地球把月亮挡住了一半。',
  dialogue: [
    {
      nian: '爸爸，弯弯的月牙是不是被地球的影子遮住了一大半？',
      dad: '这是最多人猜错的地方！平时的月相根本不是地球影子挡出来的。月球自己不发光，太阳永远照亮它的一整半；月亮绕地球转的时候，我们看那半张亮脸的角度每天在变，就成了月牙和满月。',
    },
    {
      nian: '原来不是地球影子！那地球影子什么时候才会真正挡到月亮呢？',
      dad: '只有等到月食那一天！满月时如果太阳、地球、月球刚好排成一条笔直的线，月球钻进地球身后的黑影里，才会发生月食；而新月时月球挡在太阳和地球正中间，地面就会看到日食。',
      figure: {
        kind: 'sim',
        sim: 'moonPhases',
        caption: '拖动农历日期和轨道倾角开关，对比真实 5.1° 倾斜轨道和平齐轨道的区别。',
      },
    },
    {
      nian: '既然每个月都有新月和满月，为什么不是每个初一十五都有日食和月食？',
      dad: '因为月球绕地球的跑道并不是平平地贴在地球公转平面上，而是翘起了大约 5.1 度的倾角！大多数新月和满月时，月亮其实偏在太阳影子的上方或下方，影子悄悄擦肩而过。',
    },
    {
      nian: '翘起 5.1 度就能让影子错开，那一年里大概要对准几次才看得见？',
      dad: '月亮轨道和地球轨道平面只有两个“交点”。只有新月或满月恰好走到这两个交点附近，三者才能真正连成一线，所以全世界一年通常只有 2 到 5 次日食和 2 到 3 次月食。',
    },
    {
      nian: '难怪日全食那么难得！我还听说月亮远一点的时候会出现“金环日食”？',
      dad: '说得对！月球轨道其实有点椭圆：离地球近时月亮看着比太阳大一圈，能彻底盖住太阳形成日全食；离地球远一点时月亮显得小一圈，盖不严太阳边缘，就会露出一圈亮闪闪的日环食！',
    },
    {
      nian: '我明白了！月相是看月球亮面的角度变化，日月食才是三者排成一线；月球轨道翘着 5.1 度，平时影子上下错开，所以不会每月都发生！',
      dad: '太棒了！去 3D 实验台里切到侧面视角，一眼就能看清那 5.1 度的倾斜是怎么让影子擦身而过的。',
    },
  ],
  tip: '用一盏台灯当太阳、网球当月球，让孩子伸直手臂举着网球原地转圈，能立刻亲眼看到蛾眉月、上弦月、满月的变化。观察真实日食必须佩戴符合 ISO 12312-2 标准的专业日食眼镜，绝不可裸眼或用普通墨镜直视。',
  sources: [
    { title: '义务教育科学教科书 三年级下册·太阳、地球和月球', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Moon Phases & Eclipses Overview', by: 'NASA Science', url: 'https://science.nasa.gov/moon/moon-phases/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '月相不是地球影子',
        duration: 8,
        cues: [
          { kind: 'ray', path: [[100, 320], [340, 320]], color: '#ffd43b', from: 0 },
          { kind: 'ray', path: [[100, 500], [340, 500]], color: '#ffd43b', from: 0.2 },
          { kind: 'atom', path: [[640, 410]], symbol: '地球', color: '#4dabf7', r: 58, from: 0.3 },
          { kind: 'atom', path: [[640, 210], [840, 410], [640, 610]], symbol: '月', color: '#ffe89e', r: 30, travel: 5, from: 0.6 },
          { kind: 'myth', wrong: '弯月牙是地球影子挡出来的', right: '月相是看月球亮面的角度变了', from: 2.2 },
        ],
      },
      {
        turn: 1,
        title: '三者一线才有日月食',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [180, 440], size: [150, 150], color: '#f59f00', text: '太阳', from: 0 },
          { kind: 'atom', path: [[470, 440]], symbol: '日食', color: '#ffe89e', r: 28, from: 0.8 },
          { kind: 'atom', path: [[680, 440]], symbol: '地球', color: '#4dabf7', r: 52, from: 0.4 },
          { kind: 'atom', path: [[950, 440]], symbol: '月食', color: '#e03131', r: 28, from: 1.8 },
          { kind: 'arrow', path: [[270, 440], [910, 440]], color: '#ffd43b', text: '三者排成一条直线', from: 2.4 },
        ],
      },
      {
        turn: 2,
        title: '5.1° 倾角让影子错开',
        duration: 8,
        cues: [
          { kind: 'bond', a: [220, 450], b: [980, 450], color: '#ffd43b', from: 0.2 },
          { kind: 'bond', a: [240, 530], b: [960, 370], color: '#9775fa', from: 0.8 },
          { kind: 'atom', path: [[600, 450]], symbol: '地球', color: '#4dabf7', r: 44, from: 0.4 },
          { kind: 'atom', path: [[870, 390]], symbol: '满月', color: '#ffe89e', r: 28, from: 1.4 },
          { kind: 'label', at: [870, 390], pos: [870, 240], text: '偏在影子上边，不月食', color: '#e8590c', from: 2.2 },
          { kind: 'text', at: [600, 720], text: '月球白道倾斜约 5.1°', size: 'm', color: '#5b3e96', from: 3.2 },
        ],
      },
      {
        turn: 4,
        title: '近全食，远环食',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 430], size: [150, 150], color: '#ffd43b', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [360, 430], size: [154, 154], color: '#1c1836', text: '日全食', from: 1.0 },
          { kind: 'shape', shape: 'circle', at: [840, 430], size: [150, 150], color: '#ffd43b', from: 1.6 },
          { kind: 'shape', shape: 'circle', at: [840, 430], size: [122, 122], color: '#1c1836', text: '日环食', from: 2.2 },
          { kind: 'text', at: [360, 620], text: '月球离地球较近', size: 's', color: '#5d4e37', from: 2.8 },
          { kind: 'text', at: [840, 620], text: '月球离地球较远', size: 's', color: '#5d4e37', from: 3.0 },
        ],
      },
    ],
  },
};
