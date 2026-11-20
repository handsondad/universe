import type { Story } from './types';

export const fastRadioEye: Story = {
  slug: 'fast-radio-eye',
  title: '中国天眼 FAST 为什么要做成 500 米的大锅，它在“看”什么？',
  trigger: '小念在纪录片里看到贵州大山里有一口巨大的“银色大锅”，听说它叫中国天眼，却从来不拍彩色星空照片。',
  dialogue: [
    {
      nian: '爸爸，中国天眼明明叫“眼”，为什么它从来不拍漂亮的彩色星空照片？',
      dad: '因为它其实更像一只“大耳朵”！星星和星系除了发出眼睛能看见的光，还会发出波长长得多的射电波，也就是无线电波。天眼 FAST 是一台射电望远镜，它收集的就是这些来自宇宙的无线电信号，再由科学家把信号变成数据和图像。',
    },
    {
      nian: '宇宙的无线电信号又不是声音，天眼这只大耳朵怎么“听”到它？',
      dad: '天眼的反射面像一口超大的炒菜锅，由约 4450 块面板拼成。从天上平行射来的射电波打在锅面上，会被反射、汇聚到锅上方的焦点。那里悬着一个馈源舱，由几根粗钢索吊在半空，像接球手一样把汇聚来的微弱信号接住，送进接收机。',
    },
    {
      nian: '反射面为什么一定要做到 500 米那么大，小一点不行吗？',
      dad: '因为宇宙射电信号微弱得惊人！锅越大，接住的信号就越多：收集面积跟口径的平方成正比，500 米的锅比 30 米的锅多接住约 280 倍的信号，面积相当于约 30 个足球场。锅大了，分辨细节的本领也更强，就能听见别的望远镜听不见的“悄悄话”。',
      figure: {
        kind: 'sim',
        sim: 'fastDish',
        caption: '拖动口径大小和信号强弱，看大锅怎样让淹没在噪声里的脉冲星信号冒出来。',
      },
    },
    {
      nian: '天眼听见的“悄悄话”里，最有名的是什么？',
      dad: '是脉冲星！它是大质量恒星爆炸后留下的中子星，一边飞快自转，一边从两极射出射电波束，扫过地球时就像灯塔一样“嘀、嘀、嘀”地闪。截至 2025 年 10 月，天眼已经发现了 1152 颗脉冲星，比同期国外所有望远镜发现的总数还多！',
    },
    {
      nian: '天眼找脉冲星这么厉害，为什么要把它建在贵州的大山里？',
      dad: '贵州平塘有一个天然的喀斯特洼坑，形状像一只大碗，正好把巨锅放进去，省下了大量挖山的工程。周围群山还能挡住城市的无线电干扰，所以天眼附近划了电磁波宁静区，连手机都不能带进核心区，否则手机信号会盖过宇宙的悄悄话。',
    },
    {
      nian: '巨锅固定在洼坑里，它能转动方向去追踪天上的脉冲星吗？',
      dad: '锅身不能转，但锅面会“变形”！反射面由许多可以上下微调的面板组成，观测时，计算机让其中直径约 300 米的一块区域拼成抛物面，对准天上的目标；目标移动，这块抛物面就跟着在锅里“挪动”，馈源舱也跟着移到新的焦点。这就是“主动反射面”。',
    },
    {
      nian: '我懂了！天眼是一只巨大的宇宙耳朵，500 米的大锅把微弱的射电波汇聚到馈源舱，锅越大听得越清楚，所以它找到了一千多颗脉冲星！',
      dad: '说得真好！天眼的首席科学家南仁东爷爷为它奔波了约 22 年，从选址到建成从没放弃。你今天弄懂的，正是他用半生心血守护的这只“宇宙耳朵”。',
    },
  ],
  tip: '天眼 2016 年落成，是世界最大的单口径射电望远镜。带孩子去平塘参观时，要按规定把手机、相机等电子设备寄存在外面，以免干扰观测。在家可以用手电筒照向不锈钢碗的内凹面，观察反射光聚向一处，体会大锅把信号汇聚到馈源舱的道理。',
  sources: [
    { title: '500 米口径球面射电望远镜（FAST）', by: '中国科学院国家天文台', url: 'https://www.nao.cas.cn/' },
    { title: 'Radio Telescopes', by: 'NRAO', url: 'https://public.nrao.edu/telescopes/radio-telescopes/' },
    { title: 'Pulsars — Imagine the Universe!', by: 'NASA Goddard', url: 'https://imagine.gsfc.nasa.gov/science/objects/pulsars1.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '天眼是一只大耳朵',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 640], size: [700, 120], color: '#ced4da', text: '射电大锅', from: 0.2 },
          { kind: 'wave', a: [600, 100], b: [600, 560], wavelength: 90, amplitude: 30, color: '#74c0fc', from: 0.4 },
          { kind: 'sprite', icon: '👂', path: [[1000, 320]], size: 96, from: 1.4 },
          { kind: 'myth', wrong: '天眼拍彩色星空照片', right: '天眼收听宇宙射电波', from: 2.6 },
        ],
      },
      {
        turn: 1,
        title: '大锅汇聚到馈源舱',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 720], size: [820, 70], color: '#ced4da', text: '反射面', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 290], size: [120, 70], color: '#ffd43b', text: '馈源舱', from: 0.4 },
          { kind: 'ray', path: [[300, 100], [300, 660], [590, 320]], color: '#74c0fc', draw: 1.2, from: 0.8 },
          { kind: 'ray', path: [[450, 100], [450, 690], [595, 325]], color: '#74c0fc', draw: 1.2, from: 1.1 },
          { kind: 'ray', path: [[750, 100], [750, 690], [605, 325]], color: '#74c0fc', draw: 1.2, from: 1.4 },
          { kind: 'ray', path: [[900, 100], [900, 660], [610, 320]], color: '#74c0fc', draw: 1.2, from: 1.7 },
          { kind: 'label', at: [640, 290], pos: [960, 420], text: '接住汇聚的信号', color: '#e8590c', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '锅越大，接得越多',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [260, 620], size: [110, 44], color: '#adb5bd', text: '30 米', from: 0.2 },
          { kind: 'particles', box: [215, 300, 90, 260], count: 2, color: '#74c0fc', motion: 'rise', size: 10, from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [760, 620], size: [640, 64], color: '#ced4da', text: '500 米', from: 0.8 },
          { kind: 'particles', box: [460, 300, 600, 260], count: 30, color: '#74c0fc', motion: 'rise', size: 10, from: 1.0 },
          { kind: 'count', at: [600, 160], label: '多接住信号约', start: 1, end: 280, unit: '倍', over: 3, from: 2.0 },
          { kind: 'text', at: [600, 790], text: '面积约 30 个足球场', size: 'm', color: '#2f8a57', from: 4.6 },
        ],
      },
      {
        turn: 3,
        title: '脉冲星像灯塔',
        duration: 9,
        cues: [
          { kind: 'atom', path: [[340, 460]], symbol: '中子星', color: '#b197fc', r: 46, motion: 'pulse', from: 0.2 },
          { kind: 'pulse', at: [340, 460], color: '#9775fa', radius: 170, rate: 2, from: 0.4 },
          { kind: 'wave', a: [420, 460], b: [1080, 460], wavelength: 70, amplitude: 20, color: '#74c0fc', from: 1.0 },
          { kind: 'count', at: [880, 220], label: '天眼发现脉冲星', start: 0, end: 1152, unit: '颗', over: 3, from: 2.0 },
          { kind: 'text', at: [600, 780], text: '比同期国外总数还多', size: 'm', color: '#5b3e96', from: 4.6 },
        ],
      },
      {
        turn: 4,
        title: '大山洼坑里的宁静区',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 560], size: [720, 300], color: '#8ce99a', text: '喀斯特洼坑', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 470], size: [460, 64], color: '#ced4da', text: '天眼', from: 0.8 },
          { kind: 'sprite', icon: '📵', path: [[1020, 200]], size: 90, from: 1.8 },
          { kind: 'label', at: [990, 230], pos: [700, 170], text: '手机别进核心区', color: '#c92a2a', from: 2.4 },
          { kind: 'text', at: [600, 820], text: '群山挡住城市电波干扰', size: 'm', color: '#2f8a57', from: 3.4 },
        ],
      },
      {
        turn: 5,
        title: '会变形的主动反射面',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 700], size: [900, 80], color: '#ced4da', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [400, 640], size: [340, 60], color: '#ffd43b', text: '300米抛物面', slide: { to: [800, 640], at: 2.5, over: 4 }, from: 1.0 },
          { kind: 'shape', shape: 'rect', at: [400, 300], size: [110, 60], color: '#e8590c', text: '馈源舱', slide: { to: [800, 300], at: 2.5, over: 4 }, from: 1.0 },
          { kind: 'text', at: [600, 130], text: '锅面跟着目标“挪动”', size: 'm', color: '#5b3e96', from: 0.6 },
          { kind: 'text', at: [600, 840], text: '约 4450 块面板可微调', size: 's', color: '#5d4e37', from: 4.6 },
        ],
      },
    ],
  },
};
