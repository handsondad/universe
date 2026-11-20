import type { Story } from './types';

export const auroraSolarWind: Story = {
  slug: 'aurora-solar-wind',
  title: '夜空里绿色、红色的“光帘”极光是怎么来的？',
  trigger: '小念在新闻里看到，2024 年 5 月一场超强地磁暴之后，连新疆、内蒙古、黑龙江的夜空都映出了红紫色的极光。',
  dialogue: [
    {
      nian: '爸爸，极光不是只在北极圈才有吗？它是不是北极的冰雪把太阳光反射到天上了？',
      dad: '极光跟冰雪反光没关系，它是高层大气自己在发光！而“电源”远在太阳那边：太阳不停地往外吹出带电的粒子流，叫作“太阳风”。太阳“打喷嚏”——发生日冕物质抛射时，会一下子甩出大团带电物质，太阳风就猛烈得多。',
    },
    {
      nian: '太阳风吹到地球，为什么偏偏落在南北两极的天上？',
      dad: '因为地球自带一层看不见的“防护罩”——地球磁场。磁感线从南极附近冒出来，绕个大弯钻回北极附近。带电粒子只能顺着磁感线打着旋儿滑行，就像水顺着漏斗往下流，最后被引到南北两极上空的一圈“极光带”里。',
    },
    {
      nian: '粒子被引到两极上空以后，天空为什么就亮起来了？',
      dad: '高速粒子一头撞进一两百千米高的稀薄大气，把氧原子、氮分子“撞得兴奋”起来，它们平静下来时，就把多出来的能量变成光放出来。这有点像霓虹灯：电流撞击灯管里的气体，气体就发出彩色的光。',
      figure: {
        kind: 'sim',
        sim: 'auroraField',
        caption: '调强太阳风，看极光带怎样被推向低纬度；再改改发光高度，看氧和氮各发出什么颜色。',
      },
    },
    {
      nian: '像霓虹灯一样发光！那极光为什么有绿的、红的，还有紫色的？',
      dad: '颜色要看撞到哪种气体、在多高的地方。大约 100 到 200 千米高处的氧原子发出最常见的绿光；200 千米以上更稀薄的氧会发出红光；更低处、不到 100 千米的氮则发出蓝紫、粉紫色的光，常常镶在光帘的下边缘。',
    },
    {
      nian: '红光在更高的地方，那为什么 2024 年 5 月我国北方看到的大多是红色极光？',
      dad: '那次是一场特别强的地磁暴，极光带被一路推向低纬度。不过光帘的主体仍在遥远的北方天空，我国北方的人只能看到它高高探出地平线的“顶部”，正好是 200 千米以上发红光的那一段，所以照片里多是红紫色的。',
    },
    {
      nian: '这么强的地磁暴，会不会对地面上的人有危险？',
      dad: '别担心，厚厚的大气层和地球磁场把我们保护得好好的，站在地面看极光很安全。只是强地磁暴可能干扰卫星、导航和无线电通信，所以我国和其他国家都会监测“空间天气”，提前发布预警。',
    },
    {
      nian: '我懂了！极光是太阳风的带电粒子被地球磁场引到两极上空，撞上高层大气里的氧和氮发出的光：氧在 100 到 200 千米发绿光、更高处发红光，氮发蓝紫光！',
      dad: '完全正确！去互动图里把太阳风调强，看看极光带怎样一路向低纬度扩展吧。',
    },
  ],
  tip: '想带孩子看极光，可以关注官方发布的空间天气和地磁暴预警；在我国北方要去远离城市灯光的地方，朝北方低空观察，用手机长曝光更容易拍到。冬夜野外观测务必做好保暖，并由大人全程陪同。',
  sources: [
    { title: '普通高中地理教科书 必修第一册·太阳对地球的影响', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'Auroras', by: 'NASA Science', url: 'https://science.nasa.gov/sun/auroras/' },
    { title: 'What Is an Aurora?', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/aurora/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '太阳吹出太阳风',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [170, 430], size: [240, 240], color: '#f59f00', text: '太阳', motion: 'pulse', from: 0 },
          { kind: 'flow', path: [[300, 430], [1100, 430]], color: '#ffd43b', count: 12, speed: 260, from: 0.6 },
          { kind: 'text', at: [700, 300], text: '带电粒子流：太阳风', size: 'm', color: '#e8590c', from: 1.2 },
          { kind: 'pulse', at: [170, 430], color: '#e8590c', radius: 260, rate: 0.8, from: 2.4 },
          { kind: 'label', at: [260, 360], pos: [420, 180], text: '日冕物质抛射', color: '#c92a2a', from: 2.8 },
          { kind: 'myth', wrong: '极光是冰雪反射的阳光', right: '极光是高层大气在发光', from: 4.0 },
        ],
      },
      {
        turn: 1,
        title: '磁场像个漏斗',
        duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [220, 220], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'arrow', path: [[600, 560], [760, 650], [880, 450], [760, 250], [620, 345]], color: '#748ffc', text: '磁感线', draw: 1.4, from: 0.6 },
          { kind: 'arrow', path: [[600, 560], [440, 650], [320, 450], [440, 250], [580, 345]], color: '#748ffc', draw: 1.4, from: 0.9 },
          { kind: 'flow', path: [[1100, 200], [860, 230], [700, 290], [620, 345]], color: '#ffd43b', count: 6, speed: 200, from: 2.0 },
          { kind: 'flow', path: [[1100, 700], [860, 670], [700, 610], [620, 555]], color: '#ffd43b', count: 6, speed: 200, from: 2.4 },
          { kind: 'label', at: [600, 340], pos: [600, 170], text: '北极光带', color: '#2f8a57', from: 3.2 },
          { kind: 'text', at: [600, 820], text: '粒子顺着磁感线滑行', size: 'm', color: '#5b3e96', from: 4.0 },
        ],
      },
      {
        turn: 2,
        title: '撞上气体发光',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[600, 120], [600, 380]], symbol: '粒子', color: '#ffd43b', r: 30, travel: 1.4, from: 0.3, to: 2.2 },
          { kind: 'atom', path: [[600, 450]], symbol: 'O', color: '#69db7c', r: 46, motion: 'pulse', from: 0.2 },
          { kind: 'pulse', at: [600, 450], color: '#2f8a57', radius: 220, rate: 1.1, from: 1.8 },
          { kind: 'atom', path: [[340, 520]], symbol: 'N₂', color: '#b197fc', r: 40, motion: 'jitter', from: 0.6 },
          { kind: 'text', at: [600, 760], text: '像霓虹灯一样发光', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 3,
        title: '颜色看高度',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [420, 220], size: [380, 140], color: '#ff6b6b', text: '氧·红光', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [420, 400], size: [380, 200], color: '#69db7c', text: '氧·绿光', from: 1.0 },
          { kind: 'shape', shape: 'rect', at: [420, 570], size: [380, 120], color: '#b197fc', text: '氮·蓝紫', from: 1.7 },
          { kind: 'label', at: [610, 220], pos: [880, 220], text: '200千米以上', color: '#c92a2a', from: 2.4 },
          { kind: 'label', at: [610, 400], pos: [880, 400], text: '100～200千米', color: '#2f8a57', from: 2.9 },
          { kind: 'label', at: [610, 570], pos: [880, 570], text: '100千米以下', color: '#5b3e96', from: 3.4 },
          { kind: 'text', at: [600, 780], text: '撞到谁、在多高定颜色', size: 'm', color: '#5d4e37', from: 4.4 },
        ],
      },
      {
        turn: 4,
        title: '南边只见红顶',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [920, 300], size: [180, 160], color: '#ff6b6b', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [920, 470], size: [180, 180], color: '#69db7c', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 700], size: [1200, 500], color: '#23302a', from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[200, 410]], size: 72, from: 0.8 },
          { kind: 'ray', path: [[230, 395], [880, 310]], color: '#ffd43b', from: 1.6 },
          { kind: 'label', at: [920, 300], pos: [700, 160], text: '只看到红色顶部', color: '#c92a2a', from: 2.6 },
          { kind: 'text', at: [400, 230], text: '强磁暴把极光带推向南方', size: 's', color: '#5b3e96', from: 3.6 },
        ],
      },
      {
        turn: 5,
        title: '地面上很安全',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [420, 420], color: '#d0ebff', outline: true, from: 0 },
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [260, 260], color: '#3b6ea5', text: '地球', from: 0.3 },
          { kind: 'atom', path: [[880, 230]], symbol: '卫星', color: '#ffd43b', r: 40, motion: 'jitter', from: 1.0 },
          { kind: 'label', at: [880, 270], pos: [960, 480], text: '可能被干扰', color: '#e8590c', from: 1.8 },
          { kind: 'text', at: [600, 780], text: '大气和磁场保护着我们', size: 'm', color: '#2f8a57', from: 2.8 },
        ],
      },
    ],
  },
};
