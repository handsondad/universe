import type { Story } from './types';

export const milkyWayBand: Story = {
  slug: 'milky-way-band',
  title: '银河明明是个大圆盘，为什么我们在天上看到的是一条带子？',
  trigger: '夏夜在郊外露营，小念抬头看到横贯天际的白茫茫银河，奇怪它怎么不像书里画的旋涡风车。',
  dialogue: [
    {
      nian: '爸爸，绘本上把银河系画成一个旋涡大圆盘，可我抬头看到的怎么是一条长长的带子？',
      dad: '想象你变成了一只小芝麻，镶在一张巨大薄煎饼的里面！如果你往煎饼的上方或下方抬头看，只能透过薄薄一层看见零星几粒芝麻；但如果你顺着煎饼的边平着往四周看，满眼都是层层叠叠的芝麻连成一条带子。',
    },
    {
      nian: '我们住在煎饼里面平着看出去！那太阳系在银河这张大煎饼的正中间吗？',
      dad: '不在正中间，而在挺安静的“郊区”！整个银河系直径大约 10 万光年，包含上千亿颗恒星；太阳系住在距离银河中心大约 2.6 万光年的猎户臂旁边，绕银心转一圈就要花 2.3 亿年！',
      figure: {
        kind: 'sim',
        sim: 'milkyWayView',
        caption: '切换“银盘上方俯瞰”和“站在银盘里平视”，一眼看懂大风车怎样变成夜空里的银河带。',
      },
    },
    {
      nian: '既然我们一直在银河里面，书上那些完整的银河系大风车照片是谁飞出去拍的？',
      dad: '好眼力！人类造得最远的旅行者号连太阳系外缘都还没走多远，根本飞不出银河系！书上的“银河系全景照”其实是科学家用望远镜量出千亿颗恒星和气体的距离画出来的，或者用长得像我们的其他旋涡星系做的示意。',
    },
    {
      nian: '我刚才看银河中间好像有一条黑乎乎的裂纹，那里是不是一颗星星都没有？',
      dad: '那不是没星星，反而是星星多得躲在后面！那条暗暗的“大裂谷”其实是厚厚的星际尘埃云，挡住了后面银心方向传来的可见光；换成红外望远镜一照，尘埃后面藏着密密麻麻的耀眼星海。',
    },
    {
      nian: '原来暗缝里藏着星际尘埃和星海！可为什么在城里晚上抬头，我一次也没见过银河带？',
      dad: '是被城市灯光“淹没”了！夜晚路灯、广告牌往天上散射的杂光把天空照得灰蒙蒙的，叫“光污染”，比暗淡的银河亮太多。到了远离城市、没有月亮干扰的晴朗乡村夏夜，肉眼就能清楚看见它。',
    },
    {
      nian: '我懂了！我们就住在扁平银河系圆盘里面的猎户臂旁，顺着盘面平视出去，千亿颗恒星叠加成了横跨夜空的银河光带！',
      dad: '完全正确！以后夏夜去草原或海边露营，咱们一起找找天鹅座和人马座方向最亮的那段银心光带。',
    },
  ],
  tip: '每年 6 月至 9 月是北半球观看银河银心段的黄金季节，最好选在农历廿五到初五的无月夜、远离城市光污染的开阔高地。',
  sources: [
    { title: '义务教育科学教科书 六年级下册·浩瀚的宇宙', by: '教育科学出版社', url: 'https://www.esph.com.cn/' },
    { title: 'Our Milky Way Galaxy: How Big is Space?', by: 'NASA Science', url: 'https://science.nasa.gov/resource/the-milky-way-galaxy/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '站在大煎饼里看煎饼',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 440], size: [260, 260], color: '#b197fc', text: '俯瞰：旋涡盘', from: 0.2 },
          { kind: 'arrow', path: [[495, 440], [670, 440]], color: '#e8590c', text: '钻进盘内平视', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [880, 440], size: [340, 62], color: '#ffe066', text: '看到一条亮带！', from: 2.0 },
          { kind: 'text', at: [600, 720], text: '身处银盘内部，视角定形状', size: 'm', color: '#5b3e96', from: 3.2 },
        ],
      },
      {
        turn: 1,
        title: '太阳系住在银河郊区',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [360, 360], color: '#e5dbff', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [96, 96], color: '#ffd43b', text: '银心', from: 0.4 },
          { kind: 'atom', path: [[720, 450]], symbol: '太阳', color: '#e8590c', r: 24, from: 1.0 },
          { kind: 'label', at: [720, 425], pos: [880, 260], text: '距银心约 2.6 万光年', color: '#e8590c', from: 1.6 },
          { kind: 'text', at: [600, 740], text: '银河宽十万光年，含千亿星', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
      {
        turn: 2,
        title: '全景照其实是“画”出来的',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [380, 400], size: [250, 88], color: '#74c0fc', text: '星表测距绘制', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [820, 400], size: [250, 88], color: '#b197fc', text: '参考同类星系', from: 1.2 },
          { kind: 'myth', wrong: '飞船飞出银河系拍了全景照', right: '人类还没飞出太阳系，靠测距绘出', from: 2.2 },
        ],
      },
      {
        turn: 3,
        title: '暗缝其实是星际尘埃云',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 440], size: [740, 120], color: '#ffe89e', text: '背后满是恒星', from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 440], size: [460, 44], color: '#495057', text: '尘埃挡住星光', from: 1.2 },
          { kind: 'text', at: [600, 680], text: '红外望远镜能穿透尘埃看清银心', size: 'm', color: '#5b3e96', from: 2.6 },
        ],
      },
    ],
  },
};
