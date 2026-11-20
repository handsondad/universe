# 配图和互动图

爸爸气泡里放一张「边说边指」的图，写在这一轮的 `figure` 里。每篇 1–2 张互动图（`sim`）是硬性要求；`bars`、`scale`、`image` 按需加。图注 `caption` ≤70 字，写成「拖一拖 / 换一换……就能看到……」。

## 四种图（`src/learning/figures.ts`）

| kind | 用来 | 字段 | 检查器的限制 |
|---|---|---|---|
| `sim` | 能拖滑块的互动图（主力） | `sim`、`caption` | 必须是下表里有的名字；每篇 1–2 张 |
| `bars` | 横向柱状对比（行星大小、距离、温度） | `caption`、`unit`、`bars: { label, value, text?, hot? }[]` | 2–6 根；名字 ≤6 字、柱尾的数 ≤12 字；数值 > 0 |
| `scale` | 色阶横尺（恒星颜色和温度、光谱波段） | `caption`、`axis?`、`stops: { label, note, color, hot? }[]` | 3–5 档；标签 ≤7 字、说明 ≤9 字；顶栏 ≤14 字 |
| `image` | 真照片（NASA / ESA / ESO） | `src`、`alt`、`caption`、`credit`、`href` | `/images/photos/` 下的必须写 `credit` 和 https 的 `href`，见 sources.md |

宽的 `sim` 会排在两个气泡下面单独一行；其余的放在爸爸气泡里。

## 现成的 48 张互动图（先复用，再新写）

画布 560×320，代码在 `src/learning/simlib/<主题>.ts` 和 `<主题>-more.ts`，登记在 `src/learning/sims.ts` 的 `SIMS`。看画面：`npm run story:sims -- <名字>`。

| 名字 | 滑块 | 现在用在 |
|---|---|---|
| `seasonsTilt` | 公转月份、地轴倾角 | earth-seasons-lab |
| `moonPhases` | 农历日期、轨道倾角 | moon-eclipse-lab |
| `tidalLock` | 月球公转角度、月球是否自转 | moon-far-side |
| `bloodMoonLight` | 月食进程、大气尘埃 | blood-moon |
| `moonIllusionSize` | 月亮高度、地平线参照物、观察方式 | moon-illusion |
| `timeZoneSpin` | 北京时间、纽约用（标准时 / 夏令时） | time-zones |
| `keplerSpeed` | 选择行星 | solar-system-lab |
| `venusGreenhouse` | 大气温室厚度 | venus-hottest |
| `saturnRoche` | 冰卫星距土星距离 | saturn-rings |
| `marsRustDust` | 铁的氧化程度、大气尘埃、观察距离 | mars-red |
| `jupiterDive` | 下潜深度 | jupiter-giant |
| `cometTail` | 距近日点天数 | comet-meteor |
| `newtonCannon` | 水平发射速度 | gravity-orbit-lab |
| `oceanTidesSim` | 月球方向 | ocean-tides |
| `slingshotBoost` | 绕飞行星哪一侧、行星公转速度 | gravity-assist |
| `moonJump` | 小朋友的质量、站在哪个星球 | moon-gravity |
| `geoOrbitSync` | 卫星离地高度 | geostationary |
| `roundPlanetShape` | 天体直径、材料、自转快慢 | round-planets |
| `solarFusion` | 核心温度 | sun-fusion |
| `starTempColor` | 恒星表面温度 | star-colors |
| `starFateMass` | 恒星出生质量 | star-lifecycle-lab |
| `auroraField` | 太阳风强度（Kp）、发光高度 | aurora-solar-wind |
| `polarisTrails` | 曝光时长、观察地纬度 | polaris-still |
| `orionDepth` | 转动观察视角 | constellations-3d |
| `milkyWayView` | 观察视角（盘内 / 盘外） | milky-way-band |
| `lightYearLookback` | 望向哪个天体 | light-year-time、hubble-deep-field |
| `galaxyRotation` | 是否加入暗物质晕 | dark-matter-spin |
| `andromedaMerge` | 从现在往后多少亿年、观察尺度 | andromeda-collision |
| `deepFieldCount` | 累计曝光、天区边长 | hubble-deep-field |
| `galaxyFork` | 星系类型（哈勃音叉） | galaxy-shapes |
| `blackHoleLens` | 光线瞄准距离 | black-hole-lab |
| `sunToBlackHole` | 中心天体（太阳 / 同质量黑洞） | spaghettification |
| `gravityClock` | 时钟放在哪里 | time-dilation-gps |
| `gwChirp` | 两个黑洞总质量、离地球多远 | gravitational-waves |
| `pulsarBeam` | 自转快慢、光束倾斜 | pulsar-lighthouse |
| `wormholeFold` | 时空纸面折弯程度、隧道里 | wormhole-travel |
| `expandingSpace` | 空间膨胀倍数 | big-bang-expansion |
| `olbersNight` | 可见宇宙光程上限、宇宙膨胀红移 | dark-night-sky |
| `cosmicElements` | 身体里的元素 | stardust-elements |
| `cmbStretch` | 光被宇宙膨胀拉长多少 | cmb-afterglow |
| `darkEnergyPie` | 暗能量强度、时间 | dark-energy |
| `horizonGrow` | 光在路上走了多久、空间（静止 / 膨胀） | universe-edge |
| `spaceScopeWindow` | 观测电磁波段 | space-telescope |
| `habitableBand` | 行星距恒星距离 | habitable-zone |
| `relayMoonLink` | 是否部署「鹊桥」中继星 | china-space-missions |
| `rocketRecoil` | 燃气喷出速度、每秒喷出燃气、火箭在哪儿 | rocket-vacuum |
| `launchLatitude` | 发射场、发射方向 | wenchang-launch |
| `fastDish` | 天线口径、要听的信号 | fast-radio-eye |

复用时，图注要改成演这一篇里爸爸这一句的话；滑块的默认值不合适，就新写一张，别为了复用硬讲。

## 新写一张互动图

1. 放进对应主题的 `src/learning/simlib/<主题>-more.ts`（文件太长就新开 `<主题>-extra.ts`），导出一个 `SimDef`：

```ts
import { starBackdrop, txt, GOLD, type SimDef } from './kit';

/** 一句话：这张图演什么 */
export const superMoonSize: SimDef = {
  params: [
    { key: 'dist', label: '月亮离地球', min: 0, max: 1, step: 1, value: 0, labels: ['近地点', '远地点'] },
  ],
  animated: false,        // 会自己动就写 true，再给一个 still（静态页面画哪一秒）
  draw(s, t) {            // 只由滑块的值和时间 t 决定画面，返回 SVG 片段
    return starBackdrop() + txt(280, 40, '…', { color: GOLD, bold: true, plain: true });
  },
  readout(s) {            // 图下方一句读数，带单位，> 6 个字
    return '…';
  },
};
```

2. 在 `src/learning/sims.ts` 里 import，并加进 `SIMS`（按主题那一行）。
3. 在本文件上表加一行（`tests/skills.test.ts` 会查每张图都登记了）。
4. `npm run story:sims -- <名字>` 看两头和几个时刻的画面；`tests/sims.test.ts` 会把每个滑块拨到最小、中间、最大，查不出 NaN、读数有内容。

**画法**：
- 公用的颜色和画笔在 `simlib/kit.ts`：`starBackdrop()` 深色星空底、`txt()` 文字（用 `.sim-text` 雅黑，在深色星空底上加 `plain: true` 去掉暖白描边）、`arrow()`、`poly()`、`noise()`（确定性的伪随机，别用 `Math.random`）、颜色常量 `INK` `HOT` `PURPLE` `BLUE` `SUN` `GOLD` `TEAL` `GREEN`。
- 橙色 `HOT`（#e8590c）只用来点出「看这里」；宇宙主色是星空紫 `PURPLE`。
- 字不出框：560×320 里四边留 12px；长标签换行或缩小到 11–12px。
- 画面里出现的数字要真实、带单位，和爸爸这一句说的一致；比例尺画不下时写「示意，不按比例」。
- 滑块不超过 3 个，每个都要让画面明显变化；离散选项用 `labels`。

## 要新写的图（题库里标 🆕 的，写完删掉这一行）

- 近地点 / 远地点满月大小对比（`super-moon`）
- 公转多出的约 1/4 天累加成闰日（`leap-year`）
- 月影扫过地球的窄带（`solar-eclipse-path`）
- 每天进账热量和散热的差（`coldest-after-solstice`）
- 撞击速度 / 大小与坑径（`moon-craters`）
- 行星三条标准逐条打勾（`pluto-dwarf`）
- 轻推小行星多年后的偏移量（`asteroid-impact`）
- 霍曼转移轨道与行星相位（`launch-window`）
- 拉格朗日点的引力平衡（`lagrange-l2`）
- 大气湍流里的点光源和小圆面（`twinkle-stars`）
- 激波前空气被压缩变热（`reentry-fire`）
