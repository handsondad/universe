import type { Story } from './types';

export const moonFarSide: Story = {
  slug: 'moon-far-side',
  title: '为什么我们在地球上，永远只能看见月亮的同一张脸？',
  trigger: '中秋节看满月时，小念发现书上百年前的月亮照片和今晚天上的“玉兔”花纹一模一样。',
  dialogue: [
    {
      nian: '爸爸，月亮上的图案从来不变，是不是因为月亮压根就不自转？',
      dad: '好多大人也这么想，其实月亮一直在自转！如果你绕着一张圆桌走一圈，同时脸一直对着桌子中间，等你走回起点，其实你自己的身体也正好原地转了一整圈。',
    },
    {
      nian: '原地转了一整圈才一直脸朝圆桌！那月亮自转一圈和公转一圈一样久吗？',
      dad: '一分不差！月球绕地球公转一圈大约 27.3 天，它自己转一圈也刚好是 27.3 天。天文学把这种步调完全一致的状态叫“同步自转”，所以正面永远朝向地球。',
      figure: {
        kind: 'sim',
        sim: 'tidalLock',
        caption: '切换“真实同步自转”和“假设不自转”，拖动公转角度看红点（正面）的朝向。',
      },
    },
    {
      nian: '同步自转也太巧了吧！怎么会正好卡得一分不差呢？',
      dad: '这不是巧合，而是地球引力“刹车”的结果。几十亿年前月球转得飞快，地球引力把月球拉得微微发扁、鼓起潮汐隆起；每次月球转歪一点，地球就拽着这个鼓包把它往回扯，久而久之就锁死同步了。',
    },
    {
      nian: '那月球永远背对我们的背面，是不是终年照不到阳光的“黑夜背面”？',
      dad: '可别被“暗面”这个词骗了！月球背面和正面一样能晒到太阳，每半个月白天、每半个月黑夜。我们叫它背面，只是因为站在地球上看不见它，而不是那里没有阳光。',
    },
    {
      nian: '既然人类从地球上看不见背面，我们怎么知道月背长什么样？',
      dad: '1959 年人类探测器第一次飞到月背拍回照片，2019 年中国嫦娥四号更直接降落在月球背面，2024 年嫦娥六号还从月背挖回 1935 克月壤，发现背面环形山密得多、月海少得多！',
    },
    {
      nian: '我懂了！月亮不是不自转，而是被地球潮汐锁定成了同步自转，公转一圈正好自转一圈，而且月背也有白天黑夜！',
      dad: '真棒！下次再听人说“月亮不自转”或“月球背面永远漆黑”，小念就能当小老师帮他们纠正啦。',
    },
  ],
  tip: '可以在客厅玩一个 10 秒小游戏：爸爸站中间当地球，小念面向爸爸绕着走一圈，让小念注意自己的鼻尖先后朝向了东南西北四面墙——瞬间明白“一直面向中心”就必须同步自转。',
  sources: [
    { title: 'Tidal Locking and Why We See Only One Side of the Moon', by: 'NASA Science', url: 'https://science.nasa.gov/moon/tidal-locking/' },
    { title: '嫦娥六号任务实现世界首次月球背面采样返回', by: '中国国家航天局（CNSA）', url: 'https://www.cnsa.gov.cn/' },
  ],
  film: {
    scenes: [
      {
        turn: 0,
        title: '面朝中心其实在自转',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[600, 440]], symbol: '地球', color: '#4dabf7', r: 64, from: 0 },
          { kind: 'atom', path: [[900, 440], [600, 200], [300, 440], [600, 680]], symbol: '正面', color: '#ffe89e', r: 36, travel: 5.5, from: 0.4 },
          { kind: 'myth', wrong: '月亮脸不变是因为不自转', right: '公转一圈正好自转一圈（27.3天）', from: 2.0 },
        ],
      },
      {
        turn: 1,
        title: '如果不自转会怎样',
        duration: 7,
        cues: [
          { kind: 'atom', path: [[600, 440]], symbol: '地球', color: '#4dabf7', r: 54, from: 0 },
          { kind: 'shape', shape: 'circle', at: [320, 440], size: [96, 96], color: '#ffe89e', text: '朝右', from: 0.5 },
          { kind: 'shape', shape: 'circle', at: [880, 440], size: [96, 96], color: '#d0bfff', text: '仍朝右', from: 1.4 },
          { kind: 'label', at: [880, 390], pos: [880, 250], text: '背对地球，看见月背！', color: '#e8590c', from: 2.4 },
          { kind: 'text', at: [600, 720], text: '只有同步自转才始终面向地球', size: 'm', color: '#5b3e96', from: 3.4 },
        ],
      },
      {
        turn: 2,
        title: '地球引力给月亮刹车',
        duration: 8,
        cues: [
          { kind: 'atom', path: [[350, 450]], symbol: '地球', color: '#4dabf7', r: 64, from: 0 },
          { kind: 'shape', shape: 'pill', at: [790, 450], size: [180, 120], color: '#ffe89e', text: '潮汐隆起', motion: 'wiggle', from: 0.5 },
          { kind: 'arrow', path: [[700, 450], [440, 450]], color: '#e8590c', text: '亿万年拉力锁死', from: 1.6 },
          { kind: 'count', at: [600, 700], label: '同步周期', start: 10, end: 27, unit: '天', over: 3, from: 2.2 },
        ],
      },
      {
        turn: 3,
        title: '月球背面也有阳光',
        duration: 7,
        cues: [
          { kind: 'ray', path: [[120, 340], [380, 340]], color: '#ffd43b', from: 0.2 },
          { kind: 'ray', path: [[120, 520], [380, 520]], color: '#ffd43b', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [540, 430], size: [110, 110], color: '#ffe89e', text: '新月月背', from: 0.8 },
          { kind: 'atom', path: [[880, 430]], symbol: '地球', color: '#4dabf7', r: 58, from: 0.6 },
          { kind: 'label', at: [540, 370], pos: [540, 220], text: '新月时月背正晒大太阳', color: '#e8590c', from: 1.8 },
        ],
      },
    ],
  },
};
