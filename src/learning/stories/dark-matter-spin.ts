import type { Story } from './types';

export const darkMatterSpin: Story = {
  slug: 'dark-matter-spin',
  title: '星系外圈的星星转得那么快，为什么没有被甩飞出去？',
  trigger: '小念学完太阳系外圈行星转得慢，听说银河系外圈的星星转得照样飞快，觉得非常反常。',
  dialogue: [
    {
      nian: '爸爸，太阳系越往外行星转得越慢，为什么星系最外圈的星星却转得一样快、还没甩飞？',
      dad: '你抓住了现代天文学最大的悬案之一！按理说星系大部分发光的恒星挤在中心，外圈应该像海王星一样慢悠悠转。可 1970 年代天文学家薇拉·鲁宾一测量，外圈星星竟然飙得飞快却稳稳没散架！',
    },
    {
      nian: '外圈星星飙得飞快还不散架，是不是藏着什么看不见的重东西在拉着它们？',
      dad: '一针见血！如果只算望远镜看得见的恒星和气体，引力远远拉不住这么快的旋转。科学家据此推断，整个星系被包裹在一团庞大得多、看不见的“暗物质晕”里，是这团隐形质量提供了额外引力！',
      figure: {
        kind: 'sim',
        sim: 'galaxyRotation',
        caption: '切换“只有可见恒星”和“加入暗物质晕”，对比星系旋转曲线和外圈恒星速度。',
      },
    },
    {
      nian: '这团看不见的暗物质晕到底是什么东西，为什么连最强望远镜都拍不到？',
      dad: '因为它和光压根“不打交道”——既不发光，也不反光，还不挡光！光线穿过暗物质就像风吹过透明玻璃一样毫无阻碍，所以我们看不见它，只能靠它的引力脚印（比如拉住星系、折弯远方星光）来追踪它。',
    },
    {
      nian: '那宇宙里看不见的暗物质，比我们能看见的星星和地球还多吗？',
      dad: '多得多！根据卫星对宇宙微波背景的精密测量，宇宙所有物质里，构成恒星、行星、石头和你我身体的普通物质只占大约六分之一，其余超过五分之四的物质全是暗物质！',
    },
    {
      nian: '既然暗物质到处都有，现在我身边是不是也飘着暗物质粒子？',
      dad: '科学家认为很可能每秒就有无数暗物质粒子悄悄穿过地球和你的身体，只是它们几乎不和普通原子撞击。中国四川锦屏山 2400 米深的地下实验室，就正安静地守株待兔寻找它们的微弱信号。',
    },
    {
      nian: '我懂了！星系外圈恒星飞转却不被甩飞，是因为被庞大的隐形暗物质晕用引力紧紧拉住；它不发光也不挡光，但占了宇宙物质的大头！',
      dad: '太厉害了！暗物质究竟由什么粒子组成至今仍是世界级未解之谜，说不定等小念长大，正是你们这一代揭开谜底呢！',
    },
  ],
  tip: '中国锦屏地下实验室（CJPL）埋深约 2400 米，是目前世界上岩石覆盖最深的地下实验室之一，厚厚的山体挡住宇宙射线干扰，专门用于直接探测暗物质和中微子。',
  sources: [
    { title: 'Dark Matter & Vera Rubin’s Galaxy Rotation Discovery', by: 'NASA Science', url: 'https://science.nasa.gov/dark-matter/' },
    { title: 'Dark Matter and Dark Energy', by: 'ESA Science & Technology', url: 'https://www.esa.int/Science_Exploration/Space_Science/Dark_matter_and_dark_energy' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '外圈星星居然不减速',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [110, 110], color: '#ffd43b', text: '星系核心', from: 0 },
          { kind: 'flow', path: [[600, 220], [820, 440], [600, 660], [380, 440]], color: '#74c0fc', loop: true, count: 12, speed: 260, from: 0.4 },
          { kind: 'label', at: [820, 440], pos: [980, 280], text: '外圈依然飞快转！', color: '#e8590c', from: 1.4 },
          { kind: 'text', at: [600, 740], text: '按可见恒星算，外圈早该被甩飞', size: 'm', color: '#5d4e37', from: 2.6 },
        ],
      },
      {
        turn: 1,
        title: '隐形暗物质晕拉住星系',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [420, 420], color: '#d0bfff', from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [170, 170], color: '#ffd43b', text: '可见星系', from: 0.2 },
          { kind: 'label', at: [790, 350], pos: [970, 230], text: '庞大暗物质晕', color: '#5b3e96', from: 1.4 },
          { kind: 'arrow', path: [[780, 440], [690, 440]], color: '#e8590c', text: '额外引力拉牢', from: 2.2 },
        ],
      },
      {
        turn: 2,
        title: '透明隐身，靠引力现形',
        duration: 7,
        cues: [
          { kind: 'ray', path: [[180, 430], [1020, 430]], color: '#ffd43b', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [210, 210], color: '#b197fc', text: '透明暗物质', outline: true, from: 0.6 },
          { kind: 'text', at: [600, 680], text: '光线穿透，但会被引力弯折', size: 'm', color: '#5b3e96', from: 2.2 },
        ],
      },
      {
        turn: 3,
        title: '暗物质占宇宙物质大头',
        duration: 7,
        cues: [
          { kind: 'meter', at: [340, 390], label: '暗物质占比', start: 0, end: 0.84, color: '#5b3e96', over: 2.2, from: 0.4 },
          { kind: 'meter', at: [340, 540], label: '普通物质占比', start: 0, end: 0.16, color: '#4dabf7', over: 2.2, from: 1.0 },
          { kind: 'text', at: [600, 710], text: '暗物质占宇宙物质八成以上', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
    ],
  },
};
