import type { Story } from './types';

export const gravityOrbitLab: Story = {
  slug: 'gravity-orbit-lab',
  title: '空间站飘在天上，为什么不掉下来，航天员为什么会失重？',
  trigger: '看空间站直播时，小念看见航天员松开手，水珠居然停在半空中晃来晃去。',
  dialogue: [
    {
      nian: '爸爸，空间站里航天员和水珠都能飘起来，是不是因为飞到太空就没有地球引力了？',
      dad: '恰恰相反！中国空间站离地面大约 400 千米，那里的地球引力依然有地面的 88% 左右！要是真没引力，空间站早就笔直飞进深空，根本不可能乖乖绕着地球转圈。',
    },
    {
      nian: '引力还有 88% 那么大，空间站为什么没有像石头一样砸回地面呢？',
      dad: '其实空间站每分每秒都在往地球“掉”！只是它横着跑得实在太快——每秒约 7.7 千米，比子弹还快十倍。它往前飞一段往下掉一点，地球的圆弧表面刚好也往下弯掉同样一段，于是永远“摔”不着地！',
      eq: '第一宇宙速度 v₁ = √(GM/R) ≈ 7.9 km/s',
      figure: {
        kind: 'sim',
        sim: 'newtonCannon',
        caption: '拖动大炮水平发射速度，看看低于 7.9 km/s、等于 7.9 km/s 和超过 11.2 km/s 时的不同轨道。',
      },
    },
    {
      nian: '一边往下掉一边绕着地球转！那航天员在舱里为什么会觉得失重、飘起来呢？',
      dad: '你想想坐跳楼机突然下坠的那一瞬间，屁股是不是离开座椅、手里水瓶也跟着悬空？空间站和里面的航天员正以完全相同的节奏一起“自由落体”，脚底不再压着地板，人就飘起来了。',
    },
    {
      nian: '原来失重是一起自由落体！那火箭要飞多快，才能彻底挣脱地球去火星呢？',
      dad: '水平速度超过 7.9 千米每秒，轨道会被拉成椭圆；一旦冲到每秒 11.2 千米（第二宇宙速度），地球引力就再也拽不回来了，飞船就能真正踏上去月球和火星的远行。',
    },
    {
      nian: '空间站一直在 400 千米高空绕圈，有没有阻力让它慢慢减速掉下来？',
      dad: '好问题！400 千米高空虽然接近真空，还是有极其稀薄的高层大气分子轻轻擦过，空间站每个月都会下降几百米到一两千米，所以隔一段时间就需要点火“抬升”一下轨道。',
    },
    {
      nian: '我懂了！空间站那里依然有 88% 的地球引力，它靠每秒约 7.7 千米的高速一边自由下落一边绕过地球弧面，人和舱一起下落所以呈现失重！',
      dad: '太赞了！进 3D 牛顿大炮实验台调一调发射速度，亲眼看着卫星从坠地、画圆到飞向深空吧！',
    },
  ],
  tip: '“太空零重力”是日常口语里的误称，科学上更准确叫“微重力环境”。家长可以在家用透明塑料杯底部扎个小孔装水，托在手里水会往下漏，但松手让杯子自由下落时水流会立刻停止（建议在浴室或室外尝试），直观演示自由落体中的失重。',
  sources: [
    { title: '普通高中物理教科书 必修第二册·宇宙航行', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'What Is Microgravity?', by: 'NASA Science', url: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '高空依然有强引力',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [420, 460], size: [220, 220], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'atom', path: [[820, 460]], symbol: '空间站', color: '#ffd43b', r: 34, from: 0.4 },
          { kind: 'arrow', path: [[770, 460], [550, 460]], color: '#e8590c', text: '仍有88%引力', from: 1.0 },
          { kind: 'myth', wrong: '空间站飘起来是因为没引力', right: '400千米高空仍有88%引力', from: 2.2 },
        ],
      },
      {
        turn: 1,
        title: '跑得够快就永远摔不着地',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 520], size: [250, 250], color: '#3b6ea5', text: '地球', from: 0 },
          { kind: 'arrow', path: [[600, 310], [820, 310]], color: '#ff922b', text: '高速水平飞出', from: 0.6 },
          { kind: 'arrow', path: [[820, 310], [820, 460]], color: '#e8590c', text: '引力往下拉', from: 1.5 },
          { kind: 'flow', path: [[600, 290], [830, 520], [600, 750], [370, 520]], color: '#ffd43b', loop: true, count: 10, from: 2.2 },
        ],
      },
      {
        turn: 2,
        title: '一起自由下落就是失重',
        duration: 7,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 320], size: [220, 170], color: '#d0bfff', text: '空间站舱', slide: { to: [600, 580], at: 1.0, over: 4.0 }, from: 0.2 },
          { kind: 'atom', path: [[600, 320], [600, 580]], symbol: '人', color: '#ff922b', r: 28, travel: 4.0, from: 1.0 },
          { kind: 'text', at: [600, 760], text: '人和舱同速下落，互不挤压', size: 'm', color: '#5b3e96', from: 2.2 },
        ],
      },
      {
        turn: 3,
        title: '两个关键宇宙速度',
        duration: 7,
        cues: [
          { kind: 'count', at: [340, 420], label: '绕地环绕', start: 0, end: 7.9, unit: 'km/s', over: 2.4, from: 0.4 },
          { kind: 'count', at: [860, 420], label: '挣脱地球', start: 0, end: 11.2, unit: 'km/s', over: 2.4, from: 1.0 },
          { kind: 'text', at: [600, 660], text: '速度决定掉下来、绕圈还是远航', size: 'm', color: '#5d4e37', from: 2.8 },
        ],
      },
    ],
  },
};
