import type { Story, Vec } from './types';

const arc = (cx: number, cy: number, r: number, from: number, to: number, steps = 16): Vec[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / steps) * Math.PI) / 180;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy - r * Math.sin(a))];
  });

export const geostationary: Story = {
  slug: 'geostationary',
  title: '天上的通信卫星为什么能一直“停”在同一个位置？',
  trigger: '小念跟爸爸上楼顶，发现邻居家的卫星电视“锅”装好以后，一直歪着头朝南边天空的同一个方向。',
  dialogue: [
    {
      nian: '爸爸，卫星“锅”一直对着天上同一个地方，是不是那颗卫星被钉在天上不动了？',
      dad: '卫星要是真停下来，马上就会被地球引力拽着掉下去！它其实正以每秒约 3.07 千米的速度绕着地球飞，差不多是声音速度的 9 倍。只是它转圈的节奏和地球自转一模一样，咱们跟着地球一起转，看它就像停住了。',
    },
    {
      nian: '和地球自转节奏一样？卫星绕一圈要多久，难道还能自己挑吗？',
      dad: '能挑，靠的是高度！离地球越近，引力越强，卫星得跑得越快才不会掉下来，绕的圈又小，转一圈就越快：中国空间站离地约 400 千米，大约 90 分钟就绕地球一圈；越往高处，圈越大、速度越慢，绕一圈的时间就越长。',
      eq: '开普勒第三定律：T = 2π√(r³ / GM)，轨道半径 r 越大，周期 T 越长',
      figure: {
        kind: 'sim',
        sim: 'geoOrbitSync',
        caption: '拖动卫星高度，看绕地球一圈要多久；调到约 35786 千米，卫星就和地面上的你同步转动。',
      },
    },
    {
      nian: '越往高处绕得越慢，那要飞多高，绕一圈才正好等于地球自转一圈？',
      dad: '答案是赤道上空约 35786 千米！在那里绕地球一圈正好 23 小时 56 分 4 秒，跟地球自转一圈分秒不差。注意不是 24 小时：24 小时是太阳回到天空同一位置的时间，地球相对遥远的星星转一圈要少大约 4 分钟。',
    },
    {
      nian: '为什么一定要在赤道上空？停在北京头顶正上方不行吗？',
      dad: '卫星的轨道圈必须绕着地心转。要是轨道斜着，卫星就会一会儿跑到赤道北边、一会儿跑到南边，在天上来回画“8”字；只有待在赤道正上方、和地球一起朝东转，它才能一直守在同一个方向。所以在我们北半球，卫星锅都朝南边天空歪着头。',
    },
    {
      nian: '卫星锅都朝南歪着头！那这条轨道上都住着哪些卫星？',
      dad: '这条轨道最早是英国科幻作家阿瑟·克拉克在 1945 年设想的，用来让卫星转播电视和电话。现在上面排着通信卫星、电视直播卫星，还有我国的风云四号气象卫星——它一直盯着中国和周边的同一片天空，连续拍下台风和云团怎样移动。',
    },
    {
      nian: '一直盯着同一片天空真方便！那空间站为什么不也搬到这么高的地方？',
      dad: '因为太远啦！35786 千米差不多是空间站高度的 90 倍，火箭要花大得多的力气才能把飞船送上去，航天员往返和运送补给都难得多。空间站留在约 400 千米的低轨道，来回方便，做实验、换班都更容易。',
    },
    {
      nian: '我明白了！同步卫星一点也没停，它在赤道上空约 35786 千米、以每秒约 3.07 千米飞行，绕一圈约 23 时 56 分，正好跟上地球自转，所以从地面看就像挂在天上不动！',
      dad: '说得完全对！下次在楼顶看到卫星锅，你就知道它正对着赤道上空一颗“跟着地球一起跑”的卫星。',
    },
  ],
  tip: '可以带孩子观察楼顶或阳台的卫星电视天线：在我国它们大多朝南偏上，正对赤道上空的同步卫星。让孩子用手机指南针量一量天线朝向；上楼顶观察务必由大人陪同，远离边缘和电线。',
  sources: [
    { title: '普通高中物理教科书 必修第二册·宇宙航行', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: '风云四号气象卫星', by: '国家卫星气象中心（中国气象局）', url: 'https://www.nsmc.org.cn/' },
    { title: 'Geostationary orbit', by: 'ESA', url: 'https://www.esa.int/ESA_Multimedia/Images/2017/11/Geostationary_orbit' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '卫星其实在飞',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [480, 480], size: [240, 240], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'flow', path: arc(480, 480, 300, 0, 360, 36), color: '#ffd43b', count: 10, speed: 240, loop: true, from: 0.5 },
          { kind: 'count', at: [980, 160], label: '卫星速度', start: 0, end: 3.07, unit: 'km/s', over: 2, from: 1.0 },
          { kind: 'myth', wrong: '同步卫星停在天上不动', right: '它每秒飞约3.07千米', from: 3.0 },
        ],
      },
      {
        turn: 1,
        title: '越高绕得越慢',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [500, 460], size: [220, 220], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'flow', path: arc(500, 460, 150, 0, 360, 36), color: '#ff922b', count: 4, speed: 600, loop: true, from: 0.5 },
          { kind: 'flow', path: arc(500, 460, 330, 0, 360, 36), color: '#ffd43b', count: 4, speed: 120, loop: true, from: 1.2 },
          { kind: 'label', at: [650, 460], pos: [950, 600], text: '低轨约90分钟一圈', color: '#e8590c', from: 2.0 },
          { kind: 'label', at: [830, 460], pos: [990, 260], text: '越高一圈越久', color: '#5b3e96', from: 3.0 },
        ],
      },
      {
        turn: 2,
        title: '正好同步转',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [420, 460], size: [240, 240], color: '#3b6ea5', from: 0 },
          { kind: 'atom', path: arc(420, 460, 120, 90, 270), symbol: '你', color: '#e8590c', r: 22, travel: 7, from: 1.0 },
          { kind: 'atom', path: arc(420, 460, 330, 90, 270), symbol: '星', color: '#ffd43b', r: 28, travel: 7, from: 1.0 },
          { kind: 'count', at: [960, 300], label: '绕地一圈', start: 0, end: 23.93, unit: '小时', over: 2.2, from: 1.4 },
          { kind: 'count', at: [960, 560], label: '轨道高度', start: 0, end: 35786, unit: 'km', over: 2.2, from: 2.4 },
          { kind: 'text', at: [600, 840], text: '一起转，看着就不动', size: 'm', color: '#2f8a57', from: 4.5 },
        ],
      },
      {
        turn: 3,
        title: '只能在赤道上空',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [420, 450], size: [300, 300], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'shape', shape: 'pill', at: [620, 450], size: [700, 14], color: '#ffd43b', from: 0.4 },
          { kind: 'atom', path: [[970, 450]], symbol: '星', color: '#ffd43b', r: 30, from: 1.0 },
          { kind: 'label', at: [500, 330], pos: [300, 180], text: '北京', color: '#e8590c', from: 1.6 },
          { kind: 'arrow', path: [[510, 330], [950, 430]], color: '#2f8a57', text: '天线朝南', from: 2.2 },
          { kind: 'myth', wrong: '同步卫星能停在北京头顶', right: '只能待在赤道正上方', from: 3.6 },
        ],
      },
      {
        turn: 4,
        title: '风云四号盯台风',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 460], size: [300, 300], color: '#3b6ea5', from: 0 },
          { kind: 'particles', box: [280, 380, 200, 160], count: 10, color: '#f1f3f5', motion: 'jitter', size: 16, from: 0.5 },
          { kind: 'atom', path: [[960, 300]], symbol: '风云四号', color: '#ffd43b', r: 56, from: 0.8 },
          { kind: 'ray', path: [[910, 330], [480, 440]], color: '#74c0fc', from: 1.6 },
          { kind: 'label', at: [960, 360], pos: [960, 600], text: '1945年克拉克设想', color: '#5b3e96', from: 2.6 },
          { kind: 'text', at: [600, 820], text: '一直盯着同一片天空', size: 'm', color: '#5d4e37', from: 3.6 },
        ],
      },
      {
        turn: 5,
        title: '远了约90倍',
        duration: 7,
        cues: [
          { kind: 'meter', at: [600, 300], label: '空间站', start: 0, end: 0.011, color: '#ff922b', over: 1.5, from: 0.3 },
          { kind: 'meter', at: [600, 460], label: '同步轨道', start: 0, end: 1, color: '#ffd43b', over: 1.8, from: 1.0 },
          { kind: 'count', at: [600, 680], label: '高度相差', start: 0, end: 90, unit: '倍', over: 1.8, from: 2.2 },
        ],
      },
    ],
  },
};
