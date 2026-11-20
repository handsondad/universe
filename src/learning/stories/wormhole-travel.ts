import type { Story } from './types';

export const wormholeTravel: Story = {
  slug: 'wormhole-travel',
  title: '科幻电影里能穿越宇宙的虫洞，现实中真的存在吗？',
  trigger: '小念看完科幻电影《星际穿越》，好奇飞船钻进一个闪着光的“虫洞”，就能眨眼间到达另一个星系，这是真的吗。',
  dialogue: [
    {
      nian: '爸爸，电影里飞船钻进虫洞，一眨眼就到了另一个星系，宇宙里真有这种隧道吗？',
      dad: '先说结论：到今天为止，天文学家一个虫洞都没发现过。不过虫洞也不是编剧凭空瞎想的，它来自爱因斯坦的广义相对论。早在 1935 年，爱因斯坦和罗森就在方程里算出一种连接两个地方的“桥”，后来人们给它起了个形象的名字：虫洞。',
    },
    {
      nian: '方程里算出来的“桥”，怎么就成了穿越宇宙的捷径？',
      dad: '想象时空是一张大纸，纸的两头各画一个点，沿着纸面爬过去要走很远。可要是把纸对折，让两个点上下靠近，再用铅笔戳个洞把它们连起来，一下子就钻过去了！虫洞就是这样一条假想中的“折纸捷径”。',
      figure: {
        kind: 'sim',
        sim: 'wormholeFold',
        caption: '拖动折弯程度看 A、B 怎样靠近，再切换有没有奇异物质，看隧道撑不撑得住。',
      },
    },
    {
      nian: '把纸对折再戳个洞听起来挺简单，为什么宇宙里一条这样的捷径都找不到？',
      dad: '因为这条隧道极不稳定！科学家计算发现，爱因斯坦—罗森桥一形成就会飞快地“夹断”，快到连光都来不及从一头跑到另一头。想让它一直开着、让东西通过，就得往隧道的“喉咙”里塞一种具有负能量的奇异物质，把它撑住。',
    },
    {
      nian: '具有负能量的奇异物质是什么东西，宇宙里能找到吗？',
      dad: '这正是最大的难题：普通物质的能量都是正的，只会让隧道塌下去；奇异物质却要反过来把它撑开。物理学家在一些特殊的微观实验里见过一丁点类似负能量的效应，可能不能有足够多、足够强的这种物质，目前谁也不知道。',
    },
    {
      nian: '既然奇异物质找不到，那黑洞的另一头会不会连着别的宇宙？',
      dad: '这是科幻里最常见的误会！大恒星塌缩形成的普通黑洞，并不是通往别处的隧道。掉进去的东西会被巨大的引力拉长、压向中心，不会从另一头冒出来。黑洞是天文学家真正观测到的天体，而虫洞至今只存在于数学和科幻里。',
    },
    {
      nian: '虫洞只存在于科幻里，那电影《星际穿越》里的虫洞画面全是瞎编的吗？',
      dad: '也不全是！为了让画面尽量符合物理，电影请物理学家基普·索恩当顾问，他按广义相对论的方程算出光线经过虫洞时会怎样弯曲，所以电影里的虫洞像一颗映着星空的“水晶球”，而不是一个平平的圆洞。不过它仍然是科学幻想，不是观测事实。',
    },
    {
      nian: '我明白了！虫洞是广义相对论方程允许的“折纸捷径”，可它一形成就会夹断，要撑开得靠还不知道是否存在的负能量奇异物质；至今没观测到任何虫洞，普通黑洞也不是穿越隧道！',
      dad: '分得清清楚楚！科学和科幻最大的区别，就是科学要用观测和实验来检验。也许将来你会用新的理论告诉大家，虫洞到底能不能存在。',
    },
  ],
  tip: '可以和孩子拿一张纸，在两端各画一个点，先用尺子量沿纸面的距离，再把纸对折、用铅笔穿过两点，直观理解“折纸捷径”。同时提醒孩子：这只是数学模型的类比，现实中从未发现过虫洞，看科幻片时可以一起分辨哪些是科学、哪些是想象。',
  sources: [
    { title: '普通高中教科书 物理 必修第二册·相对论时空观与牛顿力学的局限性', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Cosmicopia: Ask Us — Black Holes, Wormholes', by: 'NASA Goddard', url: 'https://science.gsfc.nasa.gov/attic/cosmicopia.gsfc.nasa.gov/qa_sp_sl.html' },
    { title: 'Focus: The Birth of Wormholes', by: 'APS Physics', url: 'https://physics.aps.org/story/v15/st11' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '电影里的时空隧道',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [640, 420], size: [260, 260], color: '#d0bfff', text: '虫洞？', motion: 'pulse', from: 0.2 },
          { kind: 'arrow', path: [[180, 420], [470, 420]], color: '#e8590c', text: '飞船钻入', from: 0.8 },
          { kind: 'text', at: [600, 160], text: '1935年：爱因斯坦—罗森桥', size: 'm', color: '#5b3e96', from: 2 },
          { kind: 'myth', wrong: '电影里的虫洞已被观测到', right: '至今一个虫洞都没发现', from: 4 },
        ],
      },
      {
        turn: 1,
        title: '把时空对折',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [375, 450], size: [450, 26], color: '#9775fa', slide: { to: [500, 640], at: 3.5, over: 2 }, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [825, 450], size: [450, 26], color: '#b197fc', slide: { to: [500, 280], at: 3.5, over: 2 }, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [180, 450], size: [50, 50], color: '#4dabf7', text: 'A', slide: { to: [305, 640], at: 3.5, over: 2 }, from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [1020, 450], size: [50, 50], color: '#e8590c', text: 'B', slide: { to: [305, 280], at: 3.5, over: 2 }, from: 0.6 },
          { kind: 'arrow', path: [[200, 380], [1000, 380]], color: '#5d4e37', text: '沿纸面很远', from: 1.2, to: 3.3 },
          { kind: 'arrow', path: [[305, 600], [305, 320]], color: '#e8590c', text: '戳洞抄近路', from: 6 },
          { kind: 'text', at: [820, 460], text: '对折后两点靠近', size: 'm', color: '#5b3e96', from: 6.6 },
        ],
      },
      {
        turn: 2,
        title: '隧道一开就夹断',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 260], size: [700, 26], color: '#b197fc', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [700, 26], color: '#9775fa', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [90, 340], color: '#e5dbff', motion: 'shrink', over: 1.6, from: 0.8 },
          { kind: 'ray', path: [[480, 620], [520, 470]], color: '#ffd43b', from: 1.6 },
          { kind: 'label', at: [600, 450], pos: [900, 450], text: '连光都来不及过', color: '#e8590c', from: 2.6 },
          { kind: 'text', at: [600, 780], text: '想撑开得靠负能量', size: 'm', color: '#5b3e96', from: 4.4 },
        ],
      },
      {
        turn: 3,
        title: '负能量物质？',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 450], size: [140, 340], color: '#e5dbff', outline: true, from: 0.2 },
          { kind: 'particles', box: [520, 300, 160, 300], count: 6, color: '#ff8787', motion: 'gas', size: 16, symbol: '−', from: 0.8 },
          { kind: 'label', at: [680, 380], pos: [940, 280], text: '奇异物质（假想）', color: '#e8590c', from: 1.6 },
          { kind: 'text', at: [600, 760], text: '目前不知是否存在', size: 'm', color: '#5b3e96', from: 3.2 },
        ],
      },
      {
        turn: 4,
        title: '黑洞不是隧道',
        duration: 9,
        cues: [
          { kind: 'flow', path: [[1060, 220], [860, 300], [720, 380], [640, 420]], color: '#ff922b', count: 6, speed: 200, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [220, 220], color: '#1c1836', text: '黑洞', from: 0.2 },
          { kind: 'label', at: [700, 400], pos: [960, 560], text: '被拉长压向中心', color: '#e8590c', from: 1.8 },
          { kind: 'text', at: [600, 160], text: '黑洞已被观测，虫洞没有', size: 'm', color: '#5b3e96', from: 3 },
          { kind: 'myth', wrong: '黑洞另一头连着别的宇宙', right: '黑洞不是通往别处的隧道', from: 4.6 },
        ],
      },
      {
        turn: 5,
        title: '科学还是科幻？',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 400], size: [400, 120], color: '#b2f2bb', text: '科学：方程允许', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [870, 400], size: [400, 120], color: '#ffc9c9', text: '科幻：电影画面', from: 1 },
          { kind: 'text', at: [600, 600], text: '索恩帮电影算出虫洞', size: 'm', color: '#5d4e37', from: 2.4 },
          { kind: 'text', at: [600, 720], text: '至今未观测到虫洞', size: 's', color: '#e8590c', from: 3.8 },
        ],
      },
    ],
  },
};
