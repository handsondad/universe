import type { Story } from './types';

export const gravityAssist: Story = {
  slug: 'gravity-assist',
  title: '旅行者号飞那么远，怎么不用带满一船燃料就能加速飞出太阳系？',
  trigger: '小念听说旅行者 1 号已经飞了快五十年、闯出了太阳风边界，好奇它到底装了多大一个油箱。',
  dialogue: [
    {
      nian: '爸爸，旅行者 1 号飞出太阳系那么远，它的火箭油箱是不是像一座大楼那么大？',
      dad: '恰恰相反，旅行者 1 号只是一辆小轿车大小，发射时连土星都直接够不着！它能一路狂飙飞出太阳系，靠的不是超大油箱，而是一招省油神技——“引力弹弓”。',
    },
    {
      nian: '引力弹弓听起来好酷！靠行星的引力吸过去又甩出来，速度怎么会白白变快呢？',
      dad: '如果木星傻傻停在原地，飞船冲过去加速、离开时又会被拉慢，一加一减确实白忙活。可木星正以每秒 13 千米的速度绕太阳狂奔！飞船绕到它身后，就像把网球扔向迎面开来的高铁，弹走时速度直接翻倍！',
      figure: {
        kind: 'sim',
        sim: 'slingshotBoost',
        caption: '切换从行星后方绕（加速）和前方绕（减速），调节行星公转速度观察离场速度变化。',
      },
    },
    {
      nian: '从高铁身上借来速度！那木星被飞船借走了能量，木星会不会变慢呢？',
      dad: '会的，能量守恒一点都没破！木星确实变慢了一丁点儿，只是木星比旅行者号重上万亿亿倍，它慢掉的速度算下来一万亿年才差一根头发丝，完全察觉不到。',
    },
    {
      nian: '既然借一次木星就能加速这么多，旅行者号是不是像打台球一样连着借了好几颗行星？',
      dad: '太聪明了！1977 年正好赶上 175 年才一遇的“行星大连珠”，木星、土星、天王星、海王星排成一条顺风弯道。旅行者 2 号一连借了四颗巨行星的引力弹弓，一口气看遍四大家族！',
    },
    {
      nian: '反过来想，如果要派探测器去离太阳很近的水星，能用引力弹弓来“刹车”吗？',
      dad: '完全可以！往行星前进方向的前方绕过去，飞船反而会把速度“还”给行星实现免费刹车。欧洲和日本的贝皮可伦坡号探测水星，就靠绕飞地球、金星和水星一共刹了九次车！',
    },
    {
      nian: '我懂了！引力弹弓是借高速公转大行星的轨道动量来免费加速或刹车，旅行者号正是靠 175 年一遇的行星排布一路甩出了太阳系！',
      dad: '总结得像航天工程师一样专业！科学家只要算准轨道角度，就能把大行星变成宇宙里的免费加油站。',
    },
  ],
  tip: '旅行者 1 号和 2 号携带着“金唱片”，记录了地球上 55 种语言的问候（包含中文普通话、粤语、闽南语和吴语）以及《流水》古琴曲。它们靠钚-238 放射性同位素热电发生器供电，而非太阳能板。',
  sources: [
    { title: 'A Gravity Assist Primer', by: 'NASA Science', url: 'https://science.nasa.gov/learn/basics-of-space-flight/primer/' },
    { title: 'Voyager — Mission Overview', by: 'NASA JPL', url: 'https://science.nasa.gov/mission/voyager/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '不带大油箱，靠引力弹弓',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [260, 440], size: [210, 86], color: '#4dabf7', text: '轻巧旅行者号', from: 0.2 },
          { kind: 'arrow', path: [[380, 440], [720, 440]], color: '#e8590c', text: '借木星土星加速', from: 1.0 },
          { kind: 'shape', shape: 'circle', at: [860, 440], size: [170, 170], color: '#e59966', text: '木星', from: 0.6 },
          { kind: 'text', at: [600, 700], text: '单靠火箭燃料难出太阳系', size: 'm', color: '#5d4e37', from: 2.4 },
        ],
      },
      {
        turn: 1,
        title: '像把网球扔向高速高铁',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [820, 440], size: [220, 110], color: '#e59966', text: '高速公转木星', slide: { to: [560, 440], at: 0.6, over: 4.5 }, from: 0.2 },
          { kind: 'atom', path: [[200, 560], [520, 480], [980, 260]], symbol: '飞船', color: '#ffd43b', r: 28, travel: 4.5, from: 0.8 },
          { kind: 'myth', wrong: '引力弹弓凭空变出了能量', right: '是借走了行星极微小的公转动量', from: 2.6 },
        ],
      },
      {
        turn: 3,
        title: '百年一遇行星大巡游',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[200, 580]], symbol: '地', color: '#4dabf7', r: 24, from: 0.2 },
          { kind: 'atom', path: [[430, 500]], symbol: '木', color: '#e59966', r: 42, from: 0.6 },
          { kind: 'atom', path: [[670, 410]], symbol: '土', color: '#f2c879', r: 38, from: 1.0 },
          { kind: 'atom', path: [[870, 320]], symbol: '天', color: '#74c0fc', r: 32, from: 1.4 },
          { kind: 'atom', path: [[1040, 240]], symbol: '海', color: '#4c6ef5', r: 32, from: 1.8 },
          { kind: 'arrow', path: [[220, 565], [440, 520], [680, 425], [880, 330], [1060, 235]], color: '#ff922b', text: '一路连跳加速', from: 2.2 },
        ],
      },
      {
        turn: 4,
        title: '绕后加速，绕前免费刹车',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [340, 420], size: [260, 96], color: '#51cf66', text: '绕后侧加速', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [860, 420], size: [260, 96], color: '#74c0fc', text: '绕前侧刹车', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '去外圈加速，去水星靠它刹车', size: 'm', color: '#5b3e96', from: 2.4 },
        ],
      },
    ],
  },
};
