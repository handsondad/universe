import type { Story, Vec } from './types';

const ring = (cx: number, cy: number, r: number, steps = 36): Vec[] =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const a = (i / steps) * Math.PI * 2;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy - r * Math.sin(a))];
  });

export const polarisStill: Story = {
  slug: 'polaris-still',
  title: '满天星星都在东升西落，为什么北极星几乎不动？',
  trigger: '小念在露营地用相机对着北方夜空连拍了两个小时，照片里的星星画出一圈圈同心圆，圆心附近却有一颗星几乎没动。',
  dialogue: [
    {
      nian: '爸爸，照片里的星星都在绕圈跑，是星星自己排着队绕着我们转吗？',
      dad: '星星离我们远得很，并没有绕着地球跑。真正在转的是脚下的地球：它自西向东自转，大约一天转一圈，站在地球上的我们就觉得满天星星东升西落，就像坐旋转木马时，觉得周围的景物在往反方向转。',
    },
    {
      nian: '原来是地球自转！那为什么所有星星画出的都是同心圆？',
      dad: '因为地球绕着一根看不见的轴转，这根地轴往北一直延长，会戳到天上的一个点，叫“北天极”。所有星星都绕着这个点转圈：离它远的画大圈，离它近的画小圈。相机长时间曝光，就把这些圈拍成了“星轨”，每小时每颗星大约转过 15°。',
      figure: {
        kind: 'sim',
        sim: 'polarisTrails',
        caption: '改改曝光时长和观察地纬度：星轨绕北天极画同心圆，北极星几乎不动，它的高度约等于纬度。',
      },
    },
    {
      nian: '离北天极近的星画小圈，那北极星是不是正好待在北天极上？',
      dad: '差一点点！北极星离北天极只有约 0.7°，比满月的直径宽不了多少。它每天只绕着北天极画一个小得几乎看不出来的圈，所以整夜都像钉在正北方向，古人赶路、航海都靠它来认北。',
    },
    {
      nian: '古人靠北极星认北，可它不算特别亮，我们怎么在满天星星里找到它？',
      dad: '先找北斗七星那把“大勺子”，勺口外侧的两颗星叫天璇和天枢，也叫“指极星”。从天璇往天枢连一条线，再朝勺口外面延长大约 5 倍远，碰到的那颗不算耀眼、周围却很空旷的亮星，就是北极星。',
    },
    {
      nian: '找到北极星以后，它离地平线有多高？在哪里看都一样吗？',
      dad: '不一样！北极星离地平线的高度，差不多就等于你所在地的纬度。在北纬 40° 左右的北京，它挂在北方约 40° 高的地方；越往南它越低，到了赤道就贴着地平线；去了南半球就看不见它了，而且南天极附近也没有这么亮的“南极星”。',
    },
    {
      nian: '南天极附近没有亮星当“南极星”，那北天极会一直有北极星守着吗？',
      dad: '不会永远！地轴像一个慢慢晃动的陀螺，大约 2.6 万年才晃完一圈，叫作“岁差”。地轴指的方向在星空里一点点挪动，大约 1.2 万年后，它会指到织女星附近，那时明亮的织女星就成了新的“北极星”。',
    },
    {
      nian: '我明白了！星星东升西落是因为地球自转，北极星恰好在地轴指向的北天极附近，转圈时几乎不挪窝，所以能用来认北；地轴慢慢晃，约 1.2 万年后北极星会换成织女星！',
      dad: '总结得特别清楚！晴朗的晚上我们一起去找北斗七星，用指极星把北极星“揪”出来吧。',
    },
  ],
  tip: '选一个晴朗无月的夜晚带孩子朝北观察：先找北斗七星，再用“勺口两星延长约 5 倍”找北极星；手臂伸直时一拳大约 10°，可以估一估北极星的高度，和当地纬度对比。手机架在三脚架上开长曝光，就能拍出星轨。',
  sources: [
    { title: '义务教育教科书 科学 六年级上册·地球的运动', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'What Is the North Star and How Do You Find It?', by: 'NASA Science', url: 'https://science.nasa.gov/solar-system/what-is-the-north-star-and-how-do-you-find-it/' },
    { title: 'When Vega is North（织女星成为北极星时的星轨）', by: 'NASA APOD', url: 'https://apod.nasa.gov/apod/ap150508.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '是地球在转',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 520], size: [300, 300], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'arrow', path: [[420, 320], [520, 250], [680, 250], [780, 320]], color: '#e8590c', text: '自西向东', from: 0.8 },
          { kind: 'sprite', icon: '⭐', path: [[1000, 260], [600, 120], [200, 260]], size: 54, travel: 4, from: 1.4 },
          { kind: 'myth', wrong: '星星绕着地球排队转', right: '地球自转让星星东升西落', from: 3.0 },
        ],
      },
      {
        turn: 1,
        title: '星轨同心圆',
        duration: 10,
        cues: [
          { kind: 'atom', path: [[600, 450]], symbol: '北天极', color: '#fff3bf', r: 36, from: 0.2 },
          { kind: 'flow', path: ring(600, 450, 130), color: '#cfe5f7', count: 4, speed: 60, size: 8, loop: true, from: 0.6 },
          { kind: 'flow', path: ring(600, 450, 230), color: '#ffd43b', count: 6, speed: 106, size: 8, loop: true, from: 1.0 },
          { kind: 'flow', path: ring(600, 450, 330), color: '#ffa94d', count: 8, speed: 152, size: 8, loop: true, from: 1.4 },
          { kind: 'label', at: [830, 450], pos: [1020, 160], text: '每小时约转15°', color: '#5b3e96', from: 2.6 },
          { kind: 'text', at: [600, 850], text: '离得远画大圈，离得近画小圈', size: 's', color: '#5d4e37', from: 3.6 },
        ],
      },
      {
        turn: 2,
        title: '北极星几乎不动',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[600, 440]], symbol: '北极星', color: '#ffffff', r: 42, motion: 'pulse', from: 0.2 },
          { kind: 'flow', path: ring(600, 440, 300), color: '#ffd43b', count: 8, speed: 140, size: 8, loop: true, from: 0.6 },
          { kind: 'label', at: [600, 400], pos: [900, 170], text: '离北天极约0.7°', color: '#e8590c', from: 1.6 },
          { kind: 'text', at: [600, 820], text: '整夜钉在正北方', size: 'm', color: '#5b3e96', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '指极星找北',
        duration: 9,
        cues: [
          { kind: 'ray', path: [[1170, 660], [1120, 610], [1060, 600], [990, 650], [840, 670], [860, 760], [1000, 760], [990, 650]], color: '#ffe066', draw: 1.6, from: 0.3 },
          { kind: 'atom', path: [[840, 670]], symbol: '天枢', color: '#ffd43b', r: 30, from: 1.6 },
          { kind: 'atom', path: [[860, 760]], symbol: '天璇', color: '#ffd43b', r: 30, from: 1.9 },
          { kind: 'arrow', path: [[856, 742], [744, 236]], color: '#e8590c', text: '延长约5倍', draw: 1.6, from: 2.6 },
          { kind: 'atom', path: [[740, 200]], symbol: '北极星', color: '#ffffff', r: 40, motion: 'pulse', from: 4.2 },
          { kind: 'label', at: [1060, 600], pos: [1040, 420], text: '北斗七星', color: '#5b3e96', from: 1.2 },
        ],
      },
      {
        turn: 4,
        title: '高度约等于纬度',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 780], size: [1200, 200], color: '#2f8a57', text: '地平线', from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[300, 640]], size: 72, from: 0.4 },
          { kind: 'ray', path: [[320, 630], [800, 230]], color: '#ffd43b', from: 1.0 },
          { kind: 'atom', path: [[820, 215]], symbol: '北极星', color: '#ffffff', r: 36, from: 1.8 },
          { kind: 'count', at: [960, 520], label: '北京上空', start: 0, end: 40, unit: '°高', over: 1.6, from: 2.4 },
        ],
      },
      {
        turn: 5,
        title: '织女星来接班',
        duration: 9,
        cues: [
          { kind: 'flow', path: ring(600, 380, 260), color: '#c5b3e6', count: 10, speed: 80, size: 6, loop: true, from: 0 },
          { kind: 'atom', path: [[860, 380]], symbol: '北极星', color: '#ffffff', r: 36, from: 0.4 },
          { kind: 'atom', path: [[340, 380]], symbol: '织女星', color: '#a5d8ff', r: 40, motion: 'pulse', from: 1.6 },
          { kind: 'count', at: [600, 380], label: '晃一圈', start: 0, end: 26000, unit: '年', over: 2, from: 2.4 },
          { kind: 'text', at: [600, 780], text: '约1.2万年后换织女星', size: 'm', color: '#5b3e96', from: 4.0 },
        ],
      },
    ],
  },
};
