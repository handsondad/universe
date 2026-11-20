import type { Story } from './types';

export const moonIllusion: Story = {
  slug: 'moon-illusion',
  title: '月亮刚升起时那么大，升到头顶就变小了，它真的变了吗？',
  trigger: '中秋夜，小念看见刚爬上楼顶的月亮又大又圆，像一只金黄的大盘子；到了半夜它升到头顶，却好像缩小了一大圈。',
  dialogue: [
    {
      nian: '爸爸，刚升起的月亮那么大，是不是因为它那时候离我们更近？',
      dad: '这是最常见的误会！恰恰相反，月亮挂在地平线上时，反而比升到头顶时离你远了一点点。月亮在头顶时，你正站在地球朝着它的那一面；在地平线时，你和它之间要多隔出差不多一个地球半径，远了约 1.5%。',
    },
    {
      nian: '远了一个地球半径反而看着更大？那用相机拍下来，它会不会也更大？',
      dad: '相机可不会被骗！用同一个镜头、同样的设置，每隔一会儿拍一张，你会发现地平线上的月亮和头顶的月亮几乎一样大，量一量都约是半度宽。地平线附近的月亮还会被大气压得稍微扁一点，但绝不会变大。',
      figure: {
        kind: 'sim',
        sim: 'moonIllusionSize',
        caption: '拖动月亮高度、开关楼房树木和纸筒，对比相机量到的大小和大脑“感觉”的大小。',
      },
    },
    {
      nian: '相机拍出来一样大，那为什么我的眼睛偏偏觉得它变大了？',
      dad: '其实眼睛接收到的也一样大，是大脑在“脑补”！月亮贴着地平线时，旁边有远处的楼房、树木和山头一起比较。大脑知道那些楼很远，又发现月亮“比楼还大”，就认定它特别巨大；升到空荡荡的头顶，没有东西可比，就显得小了。',
    },
    {
      nian: '要是在没有楼房树木的大海边，月亮升起时还会显得大吗？',
      dad: '还是会显得大一些！因为大脑还喜欢把天空想成一个扁扁的锅盖，觉得头顶的天比较近、地平线那边的天特别远。同样宽的月亮被放到“更远的地方”，大脑就会悄悄把它算大，这就是有名的月亮错觉。',
    },
    {
      nian: '大脑这么爱算错，有没有办法当场拆穿月亮错觉？',
      dad: '有，而且超简单！把一张纸卷成细纸筒，闭上一只眼，透过纸筒看刚升起的月亮，把楼房树木都挡在外面，它立刻就“缩水”了。或者伸直手臂，用小指指甲盖比一比，地平线和头顶的月亮都差不多刚好被遮住。',
    },
    {
      nian: '我明白了！月亮刚升起时没有变大，反而远了一点点，相机拍出来大小几乎一样；是大脑拿远处的楼房树木比较、又把天空想成扁锅盖，才把它脑补大了，用纸筒一看就拆穿！',
      dad: '完全正确！很早以前就有人琢磨月亮错觉，科学家到现在还在争论细节，但大家都同意：月亮本身一点没变，变的是我们的感觉。',
    },
  ],
  tip: '满月当晚，可以带孩子在月亮刚升起和升高后，用同一焦距各拍一张照片放在一起比较，再用纸筒或伸直手臂比一比，亲手验证“月亮没变大”。在阳台或楼顶观察时注意安全，不要攀爬护栏。',
  sources: [
    { title: '义务教育教科书 物理 八年级上册·光现象', by: '人民教育出版社', url: 'https://www.pep.com.cn/' },
    { title: 'The Moon Illusion: Why Does the Moon Look So Big Sometimes?', by: 'NASA Science', url: 'https://science.nasa.gov/solar-system/moon/the-moon-illusion-why-does-the-moon-look-so-big-sometimes/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '刚升起的大月亮',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'circle', at: [700, 610], size: [230, 230], color: '#ffd43b', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 790], size: [1200, 180], color: '#5c4b3b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 640], size: [130, 170], color: '#6b5b4b', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [920, 190], size: [120, 120], color: '#fff3bf', from: 1.8 },
          { kind: 'arrow', path: [[780, 470], [890, 270]], color: '#5b3e96', text: '升到头顶', from: 1.2 },
          { kind: 'myth', wrong: '刚升起的月亮离我们更近', right: '地平线上的月亮反而远约1.5%', from: 3.4 },
        ],
      },
      {
        turn: 0,
        title: '多隔一个地球半径',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[300, 450]], symbol: '地球', color: '#4dabf7', r: 120, from: 0 },
          { kind: 'atom', path: [[1080, 450]], symbol: '月', color: '#ffe89e', r: 40, from: 0.4 },
          { kind: 'sprite', icon: '🙂', path: [[440, 450]], size: 44, from: 0.8 },
          { kind: 'sprite', icon: '🙂', path: [[300, 312]], size: 44, from: 1.0 },
          { kind: 'arrow', path: [[470, 470], [1030, 470]], color: '#2f8a57', text: '月亮在头顶：近', from: 1.6 },
          { kind: 'arrow', path: [[330, 300], [1040, 420]], color: '#e8590c', text: '在地平线：远', from: 2.6 },
          { kind: 'text', at: [600, 790], text: '多隔了约一个地球半径', size: 's', color: '#5b3e96', from: 3.6 },
        ],
      },
      {
        turn: 1,
        title: '相机拍出一样大',
        duration: 8,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [380, 290], color: '#2a244f', from: 0 },
          { kind: 'shape', shape: 'circle', at: [330, 470], size: [84, 78], color: '#ffd43b', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [380, 290], color: '#2a244f', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [870, 420], size: [84, 84], color: '#fff3bf', from: 1.3 },
          { kind: 'text', at: [330, 650], text: '地平线上', size: 's', color: '#5d4e37', from: 1.8 },
          { kind: 'text', at: [870, 650], text: '头顶', size: 's', color: '#5d4e37', from: 2.0 },
          { kind: 'count', at: [600, 170], label: '两张照片视直径', start: 0, end: 0.5, unit: '°', from: 2.6 },
        ],
      },
      {
        turn: 2,
        title: '楼房当了参照物',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 720], size: [520, 60], color: '#7a6a55', from: 0 },
          { kind: 'shape', shape: 'rect', at: [250, 640], size: [190, 100], color: '#6b5b4b', text: '远处楼房', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [440, 560], size: [130, 130], color: '#ffd43b', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [880, 300], size: [130, 130], color: '#ffd43b', from: 1.2 },
          { kind: 'label', at: [440, 520], pos: [440, 300], text: '比楼还大？好大！', color: '#e8590c', from: 2.0 },
          { kind: 'label', at: [880, 340], pos: [880, 560], text: '没东西比，显小', color: '#5b3e96', from: 2.8 },
          { kind: 'text', at: [600, 830], text: '同样大小，感觉不同', size: 's', color: '#5d4e37', from: 3.8 },
        ],
      },
      {
        turn: 3,
        title: '扁扁的天穹',
        duration: 9,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 760], size: [1000, 560], color: '#e7f5ff', outline: true, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 840], size: [1200, 160], color: '#7a6a55', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[600, 715]], size: 60, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [1050, 705], size: [76, 76], color: '#ffd43b', from: 1.0 },
          { kind: 'label', at: [1050, 680], pos: [980, 520], text: '觉得很远，就算大', color: '#e8590c', from: 1.8 },
          { kind: 'label', at: [600, 482], pos: [600, 330], text: '觉得头顶很近', color: '#5b3e96', from: 2.6 },
          { kind: 'text', at: [600, 150], text: '大脑把天空想成锅盖', size: 's', color: '#5d4e37', from: 3.4 },
        ],
      },
      {
        turn: 4,
        title: '纸筒拆穿错觉',
        duration: 8,
        cues: [
          { kind: 'sprite', icon: '👁️', path: [[160, 450]], size: 64, from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 450], size: [380, 110], color: '#f2c879', text: '纸筒', from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [860, 450], size: [170, 170], color: '#ffd43b', from: 0.6, to: 2.6 },
          { kind: 'shape', shape: 'circle', at: [860, 450], size: [96, 96], color: '#ffd43b', from: 2.4 },
          { kind: 'sprite', icon: '✋', path: [[1040, 640]], size: 60, from: 3.0 },
          { kind: 'text', at: [600, 780], text: '挡住楼房，月亮就“缩水”', size: 's', color: '#5b3e96', from: 3.6 },
        ],
      },
    ],
  },
};
