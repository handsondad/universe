import type { Story } from './types';

export const chinaSpaceMissions: Story = {
  slug: 'china-space-missions',
  title: '嫦娥去月球背面、祝融去火星，怎么把信号和照片传回地球的？',
  trigger: '小念看到嫦娥六号在月球背面挖土升国旗的新闻，疑惑月球把地球挡得严严实实，信号怎么传回来。',
  dialogue: [
    {
      nian: '爸爸，月球背面永远背对着地球，嫦娥四号和六号在月背拍的照片是怎么传回来的？',
      dad: '问得太棒了！无线电波走直线，根本穿不过 3474 千米厚的月球石头。所以中国航天先干了一件非常聪明的事：提前发射“鹊桥”和“鹊桥二号”中继卫星，让它们飞到能同时看见月球背面和地球的高处！',
    },
    {
      nian: '同时看见月球背面和地球！那鹊桥中继星是停在太空的什么神奇位置呢？',
      dad: '它绕着月球背面上方大约 6.5 万千米外的“地月 L2 点”转圈，或者走精心设计的环月大椭圆冻结轨道。嫦娥着陆器先把照片发给头顶的鹊桥，鹊桥再转头传回地球，就像高空里的太空传话筒！',
      figure: {
        kind: 'sim',
        sim: 'relayMoonLink',
        caption: '切换是否部署“鹊桥”中继星，看无线电信号怎样绕过厚厚的月球传回地球。',
      },
    },
    {
      nian: '有了鹊桥传话筒就能连上月球背面！那飞到几千万千米外的祝融号火星车呢，也要等很久吗？',
      dad: '去火星可比月球远上几百倍！无线电波就算按每秒 30 万千米的光速狂奔，从火星传到地球单程也要 3 到 22 分钟。所以地球上的控制员根本没法像开遥控汽车那样实时操控火星车！',
    },
    {
      nian: '单程都要等十几分钟，那“天问一号”降落火星最惊险的那几分钟，地球岂不是完全帮不上忙？',
      dad: '完全靠它自己！天问一号进入火星大气到稳稳着陆的“黑色九分钟”，等信号传回地球时其实早就尘埃落定了。全靠科学家提前写好聪明的自主程序，让它自己开降落伞、扫描避开大石头安全落地！',
    },
    {
      nian: '信号从火星飞过来那么远，到地球时一定弱得不得了吧，谁能听见它呢？',
      dad: '到了地球时信号能量甚至比雪花落地还微弱上亿倍！中国在喀什、佳木斯和南美建起了像巨型大锅一样的深空测控天线（口径达 66 米到 70 米），专门聚拢来自亿万千米外的微弱太空私语！',
    },
    {
      nian: '我懂了！去月球背面靠“鹊桥”中继星当高空传话筒绕过月球遮挡，去火星则因为光速延迟，要靠探测器自主避障和地面超大深空天线来接收信号！',
      dad: '总结得清清楚楚！从“东方红一号”到“嫦娥探月”“天问探火”和“天宫空间站”，人类正一步步把眼睛和脚步迈向更远的星辰大海。',
    },
  ],
  tip: '“鹊桥”取名自中国传统神话里喜鹊搭桥的意象；2019 年嫦娥四号实现人类首次月球背面软着陆，2024 年嫦娥六号实现人类首次月球背面采样返回；2021 年天问一号一次实现火星“绕、着、巡”三大目标。',
  sources: [
    { title: '探月工程与行星探测任务公开信息', by: '中国国家航天局（CNSA）', url: 'https://www.cnsa.gov.cn/' },
    { title: 'Deep Space Network — How Spacecraft Talk to Earth', by: 'NASA JPL', url: 'https://www.nasa.gov/communicating-with-missions/dsn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '月背信号穿不过月球石头',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [240, 450], size: [150, 150], color: '#4dabf7', text: '地球', from: 0 },
          { kind: 'shape', shape: 'circle', at: [640, 450], size: [160, 160], color: '#adb5bd', text: '月球遮挡', from: 0.2 },
          { kind: 'atom', path: [[740, 450]], symbol: '嫦娥', color: '#e8590c', r: 26, from: 0.6 },
          { kind: 'arrow', path: [[715, 450], [685, 450]], color: '#e03131', text: '直线被挡住', from: 1.4 },
          { kind: 'text', at: [600, 700], text: '电波走直线，穿不透月球', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
      {
        turn: 1,
        title: '鹊桥中继星搭起太空传话筒',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [220, 520], size: [140, 140], color: '#4dabf7', text: '地球', from: 0 },
          { kind: 'shape', shape: 'circle', at: [620, 520], size: [130, 130], color: '#ced4da', text: '月球', from: 0 },
          { kind: 'atom', path: [[920, 260]], symbol: '鹊桥', color: '#ffd43b', r: 36, from: 0.4 },
          { kind: 'flow', path: [[690, 520], [920, 260], [270, 490]], color: '#51cf66', count: 10, from: 1.0 },
          { kind: 'text', at: [600, 740], text: '月背照片经鹊桥接力传回', size: 'm', color: '#2f8a57', from: 2.6 },
        ],
      },
      {
        turn: 2,
        title: '火星通信要等十几分钟',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [220, 440], size: [130, 130], color: '#4dabf7', text: '地球', from: 0 },
          { kind: 'shape', shape: 'circle', at: [980, 440], size: [110, 110], color: '#e8590c', text: '火星', from: 0 },
          { kind: 'atom', path: [[920, 440], [290, 440]], symbol: '电波', color: '#ffd43b', r: 24, travel: 4.5, from: 0.6 },
          { kind: 'count', at: [600, 280], label: '单程通信延迟', start: 3, end: 20, unit: '分钟', over: 3.5, from: 1.0 },
          { kind: 'text', at: [600, 680], text: '没法实时遥控，降落靠自主', size: 'm', color: '#5b3e96', from: 3.0 },
        ],
      },
      {
        turn: 4,
        title: '巨型大锅接住微弱信号',
        duration: 7,
        cues: [
          { kind: 'wave', a: [220, 360], b: [620, 480], wavelength: 80, amplitude: 18, color: '#74c0fc', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [760, 480], size: [260, 110], color: '#5b3e96', text: '深空大天线阵列', from: 0.6 },
          { kind: 'text', at: [600, 700], text: '聚拢亿万千米外微弱信号', size: 'm', color: '#5d4e37', from: 2.2 },
        ],
      },
    ],
  },
};
