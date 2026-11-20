import type { Story } from './types';

export const jupiterGiant: Story = {
  slug: 'jupiter-giant',
  title: '木星那么大，飞船能在它上面降落、让人站一站吗？',
  trigger: '小念在太阳系挂图上发现木星大得惊人，身上还长着一只“大红眼睛”，她想坐飞船去木星，拍一张站在地面上的照片。',
  dialogue: [
    {
      nian: '爸爸，木星那么大，飞船能不能找块平地降落，让我站上去拍张照？',
      dad: '恐怕找不到平地！木星是一颗“气态巨行星”，主要由氢和氦组成，像一个大得不得了的气体球，外面根本没有能站人的固体地面。飞船往下降，只会一直钻进越来越浓的云和气体里。',
    },
    {
      nian: '一直钻进气体里，最后会钻到哪里去？',
      dad: '越往下，头顶压着的气体越多，压力就越大，温度也越来越高。1995 年，美国的伽利略号探测器真的放下一个小探头冲进木星大气，它只坚持了大约一个小时就失去联系，离木星中心还远着呢。',
      figure: {
        kind: 'sim',
        sim: 'jupiterDive',
        caption: '拖动下潜深度，看探测器穿过云层、氢气、液态氢和金属氢时，压力和温度怎样飙升。',
      },
    },
    {
      nian: '探测器坚持一个小时就失联了，那更深的地方气体会变成什么？',
      dad: '会被挤得变了样！再往深处，氢气被压得越来越密，慢慢变得像液体一样，成了一片无边无际的氢“海洋”。更深的地方压力大得吓人，氢甚至会变成能导电的“金属氢”，像液态金属一样流动。探测器到不了那里，早被压扁、烤化了。',
    },
    {
      nian: '金属氢真神奇！木星这么个大气体球，到底有多大呢？',
      dad: '大得离谱！木星的直径大约是地球的 11 倍，质量比太阳系其他所有行星加起来的两倍还多。它还转得飞快，大约 10 小时就自转一圈，所以身上的云被拉成了一条条彩色的带子。',
    },
    {
      nian: '彩色带子上那只“大红眼睛”是什么，是一座红色的大山吗？',
      dad: '它可不是山，而是一场超级大风暴，叫大红斑！它比整个地球还宽，一百多年前最大时能并排放下两个多地球，现在正慢慢缩小，人们已经观测它 300 多年了。里面的风最快约每小时 539 千米，比地球上最强的台风还猛，深度约有 500 千米。',
    },
    {
      nian: '我明白了！木星是没有地面的气体巨人，主要是氢和氦，越往下压力和温度越高，氢会变成液体甚至金属氢，飞船只会被压扁烤化；大红斑是一场刮了 300 多年、比地球还宽的大风暴！',
      dad: '一点没错！所以科学家去木星，都是派探测器绕着它转圈、从远处测量，而不是降落。想“站”在木星上，只能在 3D 实验台里用想象力去啦。',
    },
  ],
  tip: '木星是夜空中最亮的星点之一，用家用双筒望远镜架稳，就能看到它身边排成一条线的几颗小亮点——那是木星的卫星。可以带孩子连续几晚画下这些小亮点的位置变化，像伽利略一样做观测记录。',
  sources: [
    { title: '义务教育科学教科书 六年级下册·太阳系大家庭', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Jupiter Facts', by: 'NASA Science', url: 'https://science.nasa.gov/jupiter/jupiter-facts/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '木星没有地面',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [460, 460], color: '#d9a066', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 340], size: [420, 44], color: '#b07a4f', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [600, 560], size: [430, 44], color: '#b07a4f', from: 0.5 },
          { kind: 'formula', at: [600, 450], text: '氢 + 氦', from: 1.2 },
          { kind: 'sprite', icon: '🚀', path: [[1060, 110], [780, 280]], size: 64, travel: 2.5, from: 0.8 },
          { kind: 'myth', wrong: '木星有能降落的坚硬地面', right: '木星主要由氢和氦组成', from: 3.4 },
        ],
      },
      {
        turn: 1,
        title: '越往下压力越大',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [460, 250], size: [600, 140], color: '#f1d3a5', text: '云层', from: 0 },
          { kind: 'shape', shape: 'rect', at: [460, 430], size: [600, 220], color: '#a5d8ff', text: '氢气', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [460, 650], size: [600, 220], color: '#4c6ef5', text: '更浓更热', from: 0.4 },
          { kind: 'sprite', icon: '🛸', path: [[620, 150], [620, 620]], size: 56, travel: 6, from: 0.8 },
          { kind: 'meter', at: [1010, 320], label: '压力', start: 0.05, end: 0.95, color: '#e8590c', over: 6, from: 0.8 },
          { kind: 'meter', at: [1010, 470], label: '温度', start: 0.1, end: 0.9, color: '#c92a2a', over: 6, from: 0.8 },
          { kind: 'text', at: [460, 830], text: '伽利略号约1小时后失联', size: 's', color: '#5d4e37', from: 5.0 },
        ],
      },
      {
        turn: 2,
        title: '气体变液体再变金属',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [640, 640], color: '#f1d3a5', from: 0 },
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [480, 480], color: '#74c0fc', from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [300, 300], color: '#3b5bdb', from: 1.2 },
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [110, 110], color: '#8d6e63', text: '核心', from: 1.8 },
          { kind: 'label', at: [520, 170], pos: [970, 170], text: '氢氦气体', color: '#b07a4f', from: 2.4 },
          { kind: 'label', at: [520, 255], pos: [990, 330], text: '液态氢', color: '#1c7ed6', from: 3.2 },
          { kind: 'label', at: [520, 350], pos: [990, 490], text: '能导电的金属氢', color: '#3b5bdb', from: 4.0 },
        ],
      },
      {
        turn: 3,
        title: '约11个地球宽',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [470, 430], size: [550, 550], color: '#d9a066', text: '木星', from: 0 },
          { kind: 'shape', shape: 'circle', at: [960, 430], size: [50, 50], color: '#4dabf7', from: 0.8 },
          { kind: 'label', at: [960, 410], pos: [960, 560], text: '地球', color: '#1c7ed6', from: 1.2 },
          { kind: 'arrow', path: [[195, 780], [745, 780]], color: '#5b3e96', text: '约11个地球宽', from: 1.6 },
          { kind: 'count', at: [960, 200], label: '自转一圈约', start: 0, end: 10, unit: '小时', from: 2.4 },
          { kind: 'text', at: [960, 690], text: '质量超其他行星总和2倍', size: 's', color: '#5d4e37', from: 3.6 },
        ],
      },
      {
        turn: 4,
        title: '大红斑超级风暴',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [450, 450], size: [520, 300], color: '#c0392b', text: '大红斑', from: 0 },
          {
            kind: 'flow', path: [[450, 320], [670, 360], [720, 450], [670, 540], [450, 580], [230, 540], [180, 450], [230, 360], [450, 320]],
            color: '#ffd8a8', count: 10, speed: 260, loop: true, from: 0.8,
          },
          { kind: 'shape', shape: 'circle', at: [1000, 450], size: [280, 280], color: '#4dabf7', text: '地球', from: 1.4 },
          { kind: 'count', at: [450, 790], label: '最快风速约', start: 0, end: 539, unit: '千米/时', from: 2.2 },
          { kind: 'count', at: [1000, 160], label: '已观测', start: 0, end: 300, unit: '多年', from: 3.2 },
        ],
      },
    ],
  },
};
