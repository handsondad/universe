import type { Story } from './types';

export const rocketVacuum: Story = {
  slug: 'rocket-vacuum',
  title: '太空里没有空气可以推，火箭为什么还能往前飞？',
  trigger: '小念在泳池里要往后划水才能往前游，看航天直播时突然想到：太空里空空荡荡，火箭往后推谁去？',
  dialogue: [
    {
      nian: '爸爸，我游泳要往后划水，飞机要推空气，太空里什么都没有，火箭是靠推什么往前飞的？',
      dad: '很多大人也以为火箭是靠喷出的火“推着空气”前进的，其实完全不是！火箭推的是它自己喷出去的燃气。发动机里燃料猛烈燃烧，把大量燃气从喷口高速往后挤出去，燃气同时就把火箭往前推。有没有空气，这一推都照样发生。',
    },
    {
      nian: '火箭推燃气、燃气推火箭，这两个力为什么会同时出现？',
      dad: '这就是牛顿第三定律：力的作用是相互的。你用手拍桌子，手也会被桌子“拍”得发疼；你站在滑板上用力往后扔一个沉甸甸的篮球，球往后飞，你和滑板就会往前滑。火箭就像一个不停往后扔东西的超级滑板，只不过它扔的是每秒大量喷出的燃气。',
    },
    {
      nian: '滑板上扔球，扔得越猛就滑得越快吗？火箭的推力由什么决定？',
      dad: '对！推力主要看两件事：每秒钟喷出去多少千克燃气，以及燃气喷得有多快。工程师把它写成 F = ṁ·v，ṁ 是每秒喷出的质量，v 是喷气速度。燃气喷得越快、越多，火箭得到的推力就越大，现代火箭的燃气能以每秒几千米的速度冲出喷口。',
      eq: 'F = ṁ × v（推力 = 每秒喷出的燃气质量 × 喷气速度）',
      figure: {
        kind: 'sim',
        sim: 'rocketRecoil',
        caption: '调节喷气速度和每秒喷出的燃气质量，看推力怎样变大，再切换大气层和太空真空。',
      },
    },
    {
      nian: '燃气要靠燃烧产生，可燃烧不是需要氧气吗？太空里没有空气怎么烧？',
      dad: '问得好！所以火箭是自带“空气”的：它不光装着燃料，还装着氧化剂，比如液氧。燃料和氧化剂在燃烧室里相遇就能剧烈燃烧，根本不用向外面借氧气。飞机的喷气发动机和螺旋桨要靠吸进或推动空气，所以到了太空就没法工作了。',
    },
    {
      nian: '没有空气飞机就不能飞，那太空的真空对火箭反而是好事吗？',
      dad: '可以这么说！在大气层里，火箭要顶着空气阻力往上冲，喷口外的大气还会往回挤燃气；到了真空里，既没有空气阻力，也没有大气往回挤，同一台发动机的推力反而更大一些。所以太空不是火箭的障碍，而是它最顺畅的跑道。',
    },
    {
      nian: '火箭这么厉害，最早是谁发明出来的？',
      dad: '最早的火箭来自中国！古人把黑火药装进竹筒或纸筒，绑在箭杆上，点燃后火药燃气向后喷出，箭就“嗖”地飞向前方。传说明代还有个叫万户的人，坐在绑满火箭的椅子上想飞上天。今天的长征系列火箭，靠的仍是同一个反冲原理。',
    },
    {
      nian: '我懂了！火箭不需要推空气，它把自带的燃料和氧化剂烧成燃气用力往后喷，燃气反过来把火箭往前推，就像滑板上扔球一样，在真空里反而推得更顺畅！',
      dad: '完全正确！下次看长征火箭发射直播，你就能给大家讲讲“推燃气、被燃气推”的秘密啦。',
    },
  ],
  tip: '可以和孩子做“气球火箭”：把一根吸管穿在拉直的细绳上，吹鼓气球后用胶带粘在吸管下，一松手气球就沿绳向前冲——喷出的空气往后、气球往前，正是反冲原理。千万不要在家用火药或火焰模仿火箭。',
  sources: [
    { title: '义务教育教科书 物理 八年级下册·力的作用是相互的', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'What Is a Rocket? (Grades 5-8)', by: 'NASA', url: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-a-rocket-grades-5-8/' },
    { title: 'Rocket Thrust Equation', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/rocket-thrust-equation/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '火箭推的不是空气',
        duration: 9,
        cues: [
          { kind: 'flow', path: [[440, 450], [90, 450]], color: '#ff922b', count: 12, size: 14, from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [620, 450], size: [360, 110], color: '#dee2e6', text: '火箭', from: 0.2 },
          { kind: 'arrow', path: [[820, 450], [1080, 450]], color: '#2f8a57', text: '燃气推火箭', from: 1.6 },
          { kind: 'arrow', path: [[420, 580], [150, 580]], color: '#e8590c', text: '火箭推燃气', from: 2.2 },
          { kind: 'myth', wrong: '火箭靠喷火推空气前进', right: '火箭推的是自己喷出的燃气', from: 3.6 },
        ],
      },
      {
        turn: 1,
        title: '滑板上扔篮球',
        duration: 9,
        cues: [
          { kind: 'text', at: [600, 160], text: '力的作用是相互的', size: 'm', color: '#5b3e96', from: 0.2 },
          { kind: 'toss', at: [560, 600], velocity: [-420, -320], ground: 760, icon: '🏀', from: 0.8 },
          { kind: 'sprite', icon: '🧒', path: [[620, 610], [860, 610]], size: 96, travel: 4, from: 0.8 },
          { kind: 'sprite', icon: '🛹', path: [[620, 700], [860, 700]], size: 84, travel: 4, from: 0.8 },
          { kind: 'arrow', path: [[700, 470], [920, 470]], color: '#2f8a57', text: '人往前滑', from: 2.0 },
        ],
      },
      {
        turn: 2,
        title: '推力看喷多少多快',
        duration: 9,
        cues: [
          { kind: 'formula', at: [600, 170], text: 'F = ṁ × v', from: 0.3 },
          { kind: 'flow', path: [[520, 450], [120, 450]], color: '#ffa94d', count: 6, speed: 200, size: 10, from: 0.8, to: 4.6 },
          { kind: 'flow', path: [[520, 450], [120, 450]], color: '#ff6b00', count: 16, speed: 520, size: 14, from: 4.6 },
          { kind: 'shape', shape: 'pill', at: [720, 450], size: [340, 110], color: '#dee2e6', text: '火箭', from: 0.2 },
          { kind: 'text', at: [600, 620], text: '喷得越多、越快', size: 'm', color: '#e8590c', from: 4.6 },
          { kind: 'meter', at: [600, 740], label: '推力', start: 0.2, end: 0.9, over: 3, color: '#2f8a57', from: 4.8 },
        ],
      },
      {
        turn: 3,
        title: '自带燃料和氧化剂',
        duration: 9,
        cues: [
          { kind: 'text', at: [600, 120], text: '不用向外面借氧气', size: 'm', color: '#5b3e96', from: 0.2 },
          { kind: 'vessel', vessel: 'jar', at: [400, 400], size: [200, 280], liquid: '#ff922b', level: 0.8, label: '燃料', from: 0.4 },
          { kind: 'vessel', vessel: 'jar', at: [800, 400], size: [200, 280], liquid: '#74c0fc', level: 0.8, label: '液氧', from: 0.8 },
          { kind: 'arrow', path: [[450, 620], [560, 740]], color: '#ff922b', from: 1.8 },
          { kind: 'arrow', path: [[750, 620], [640, 740]], color: '#1c7ed6', from: 2.0 },
          { kind: 'pulse', at: [600, 790], color: '#ff6b00', radius: 100, from: 2.6 },
        ],
      },
      {
        turn: 4,
        title: '真空里推得更顺',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [320, 440], size: [440, 520], color: '#d0ebff', text: '大气层', from: 0.2 },
          { kind: 'particles', box: [120, 200, 400, 480], count: 20, color: '#74c0fc', motion: 'gas', size: 7, from: 0.3 },
          { kind: 'arrow', path: [[320, 250], [320, 380]], color: '#e03131', text: '空气阻力', from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [880, 440], size: [440, 520], color: '#1c1836', text: '真空', from: 0.6 },
          { kind: 'sprite', icon: '🚀', path: [[880, 640], [880, 260]], size: 80, travel: 4, from: 1.2 },
          { kind: 'text', at: [600, 790], text: '没有阻力，推力还略大', size: 'm', color: '#2f8a57', from: 3.0 },
        ],
      },
      {
        turn: 5,
        title: '火箭老家在中国',
        duration: 8,
        cues: [
          { kind: 'text', at: [600, 150], text: '古代中国火箭', size: 'l', color: '#c92a2a', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [520, 450], size: [300, 70], color: '#8ce99a', text: '火药筒', from: 0.4 },
          { kind: 'arrow', path: [[350, 450], [130, 450]], color: '#e8590c', text: '喷出火气', from: 1.0 },
          { kind: 'arrow', path: [[690, 450], [900, 450]], color: '#2f8a57', text: '箭向前飞', from: 1.6 },
          { kind: 'sprite', icon: '🚀', path: [[1040, 820], [1040, 320]], size: 72, travel: 3, from: 3.0 },
          { kind: 'text', at: [560, 760], text: '和长征火箭同一个原理', size: 'm', color: '#5b3e96', from: 3.4 },
        ],
      },
    ],
  },
};
