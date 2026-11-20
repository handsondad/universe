# 题库

选题的标准：**孩子真问过、真看过**（抬头看月亮、看日食、看新闻里的火箭和空间站），**一个题只回答一个「为什么」**，并且**能破一个常见误区**。写之前先 `npm run story:todo` 看哪些已经写了。

- 每个主题现在 6 题；扩充时每个主题往上加，`tests/learning.test.ts` 只要求每个主题至少 6 题、每题都有文章。
- 新题放在同主题已有题目的后面；`prerequisites` 只能指向排在前面的题（测试会查）。
- 「学段」：入门 = 小学高年级能懂，讲现象和定性道理；进阶 = 初中，可以讲简单比例和数字；综合 = 高中，可以讲公式，但先讲道理。
- 下面候选题里出现的数字只是方向，**写之前按 sources.md 找两处来源再核对一遍**，新闻类（「最新发现」）尤其要查最新口径。
- 写完一题，把它从「候选」挪到「已写」，并删掉本表里的那一行。

## 已写（48 题，别重复）

| 主题 | slug |
|---|---|
| 🌍 earth-moon 地球与月球 | `earth-seasons-lab` 四季 🔭 · `moon-eclipse-lab` 月相与日月食 🔭 · `moon-far-side` 潮汐锁定 · `blood-moon` 红月亮 · `moon-illusion` 月亮错觉 · `time-zones` 时差 |
| 🪐 solar-system 太阳系大家庭 | `solar-system-lab` 行星轨道 🔭 · `venus-hottest` 金星最热 · `saturn-rings` 土星环 · `mars-red` 火星为什么红 · `jupiter-giant` 木星能不能降落 · `comet-meteor` 彗星与流星雨 |
| 🛰️ gravity-orbits 引力与轨道 | `gravity-orbit-lab` 空间站为什么不掉 🔭 · `ocean-tides` 潮汐 · `gravity-assist` 引力弹弓 · `moon-gravity` 月球上会变轻吗 · `geostationary` 同步卫星 · `round-planets` 星球为什么是圆的 |
| ⭐ sun-stars 太阳与恒星的一生 | `sun-fusion` 太阳为什么能一直烧 · `star-colors` 星星的颜色 · `star-lifecycle-lab` 恒星的一生 🔭 · `aurora-solar-wind` 极光 · `polaris-still` 北极星为什么不动 · `constellations-3d` 星座是不是挨在一起 |
| 🌌 galaxies-milkyway 银河与星系 | `milky-way-band` 银河为什么是一条带 · `light-year-time` 光年 · `dark-matter-spin` 暗物质 · `andromeda-collision` 仙女座碰撞 · `hubble-deep-field` 深空场 · `galaxy-shapes` 星系形状 |
| 🕳️ blackholes-relativity 黑洞与时空奇观 | `black-hole-lab` 怎么看见黑洞 🔭 · `spaghettification` 太阳换成黑洞 · `time-dilation-gps` 时间变慢 · `gravitational-waves` 引力波 · `pulsar-lighthouse` 脉冲星 · `wormhole-travel` 虫洞 |
| 💥 bigbang-cosmos 宇宙的诞生与演化 | `big-bang-expansion` 大爆炸在哪里炸 · `dark-night-sky` 夜空为什么黑 · `stardust-elements` 我们是星尘 · `cmb-afterglow` 宇宙余晖 · `dark-energy` 暗能量 · `universe-edge` 宇宙有没有边 |
| 🚀 space-exploration 探索宇宙与地外生命 | `space-telescope` 为什么上太空 · `habitable-zone` 宜居带 · `china-space-missions` 月背怎么传信号 · `rocket-vacuum` 火箭在真空里怎么飞 · `wenchang-launch` 为什么在文昌发射 · `fast-radio-eye` 中国天眼 |

🔭 = 同时有原生 3D 实验台（`src/learning/labs/`）。

## 候选新题

列：建议 slug ｜ 小念的问题 ｜ 生活现场（`hook` 的素材）｜ 要破的误区 ｜ 学段 ｜ 互动图（✅ 现成可复用 / 🆕 要新写）｜ 查证去处

### 🌍 earth-moon 地球与月球

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `daytime-moon` | 月亮不是晚上才出来吗，为什么白天也能看见它？ | 放学路上抬头，蓝天里挂着半个白白的月亮 | 月亮只在夜里出来 | 入门 | ✅ `moonPhases` | NASA Moon Phases；科学 三年级下册 |
| `super-moon` | 新闻里的「超级月亮」真的比平时大很多吗？ | 新闻说今晚有超级月亮，全家跑到楼顶却觉得差不多 | 超级月亮大一倍；和月亮错觉混为一谈 | 入门 | 🆕 近地点 / 远地点月亮大小对比；✅ `moonIllusionSize` | NASA Science「Supermoons」；紫金山天文台 |
| `leap-year` | 为什么每隔四年二月就多出一天？ | 有同学 2 月 29 日过生日，四年才过一次 | 一年正好 365 天 | 入门 | 🆕 公转一圈多出的约 1/4 天累加 | 中国科学院国家授时中心；NASA Space Place「Leap Year」 |
| `solar-eclipse-path` | 日全食为什么只有很窄一条路上的人才看得到？ | 2024 年北美日全食，只有一条带子上的城市天黑了 | 日食时全世界一起变黑 | 进阶 | ✅ `moonPhases`；🆕 月影扫过地球的窄带 | NASA Eclipses；紫金山天文台日食预报 |
| `coldest-after-solstice` | 冬至白天最短，为什么最冷的时候却在一月？ | 冬至吃饺子时还不算太冷，过了元旦才冻得受不了 | 白天最短那天就最冷 | 进阶 | ✅ `seasonsTilt`；🆕 每天进账热量和散热的差 | 中国气象局科普；地理 七年级上册 |
| `moon-craters` | 月亮上一个个圆坑是怎么来的？ | 用望远镜第一次看月亮，满脸都是「麻子」 | 月坑是火山口 | 入门 | 🆕 撞击速度 / 大小与坑径 | NASA Moon；嫦娥工程公开资料 |

### 🪐 solar-system 太阳系大家庭

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `pluto-dwarf` | 冥王星为什么被「踢出」行星队伍了？ | 爷爷的课本写着九大行星，小念的课本只有八颗 | 冥王星变小了 / 消失了 | 进阶 | 🆕 三条行星标准逐条打勾 | IAU 2006 决议；NASA Pluto |
| `asteroid-impact` | 小行星会撞上地球吗，科学家能把它推开吗？ | 看了恐龙灭绝的纪录片，晚上担心得睡不着 | 撞地球只能等死 / 电影里用核弹炸碎 | 进阶 | 🆕 轻推一下多年后的偏移量 | NASA Planetary Defense、DART 任务；国家航天局近地小行星防御 |
| `uranus-tilt` | 天王星为什么是「躺着」转的？ | 太阳系挂图里天王星的环是竖着的 | 所有行星都直着转 | 进阶 | ✅ `seasonsTilt`（把倾角拉到最大）；🆕 躺着公转的四季 | NASA Uranus |
| `venus-backward` | 金星上的太阳为什么是从西边升起来的？ | 读到「金星上一天比一年还长」 | 太阳一定东升西落 | 进阶 | 🆕 自转方向与日出方向 | NASA Venus；ESA Venus Express |
| `voyager-edge` | 旅行者 1 号飞出太阳系了吗，太阳系的边在哪？ | 新闻说旅行者号已经飞了快 50 年还在发信号 | 太阳系的边就是海王星轨道 | 综合 | ✅ `slingshotBoost`；🆕 日球层顶示意 | NASA Voyager；JPL |
| `mercury-ice` | 水星离太阳那么近，为什么两极的坑里可能有冰？ | 「最热和最冷挨在一起」的冷知识 | 离太阳近的地方到处都热 | 综合 | 🆕 永久阴影坑 | NASA MESSENGER |

### 🛰️ gravity-orbits 引力与轨道

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `jump-on-spinning-earth` | 地球转得那么快，我跳起来为什么还落回原地？ | 在操场上原地跳，担心落地时地面已经跑走了 | 跳起来会被地球甩到后面 | 入门 | 🆕 车厢里抛球 / 地面一起转 | 物理 八年级下册 惯性；NASA Space Place |
| `space-drinking` | 航天员在空间站里怎么喝水、怎么睡觉？ | 天宫课堂里水球在空中飘 | 太空里没有重力 | 入门 | ✅ `newtonCannon`；🆕 失重下的水球 | 中国载人航天工程网 天宫课堂 |
| `moon-drifting` | 月亮会不会有一天掉下来，或者飞走？ | 听说月亮每年都在离我们远一点 | 月亮会掉到地球上 | 进阶 | ✅ `oceanTidesSim`；🆕 潮汐让月亮慢慢远离 | NASA Apollo 激光测距；NASA Moon |
| `launch-window` | 去火星为什么要等「发射窗口」，不能想走就走？ | 天问一号新闻里说错过窗口要再等两年多 | 火箭朝火星直线飞过去 | 综合 | 🆕 霍曼转移轨道与行星相位 | 国家航天局天问一号；NASA Mars launch windows |
| `lagrange-l2` | 韦布望远镜为什么要停在离地球 150 万千米的地方？ | 新闻说韦布望远镜「停」在一个叫 L2 的点 | 太空里随便哪儿都能停 | 综合 | 🆕 拉格朗日点的引力平衡 | NASA Webb「Orbit」；ESA L2 |

### ⭐ sun-stars 太阳与恒星的一生

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `sun-white` | 太阳到底是什么颜色，黄的还是白的？ | 画画时太阳总涂成黄色，航天员却说太阳是白的 | 太阳是黄色的 | 入门 | ✅ `starTempColor`；✅ `bloodMoonLight`（大气散射） | NASA Space Place；物理 八年级上册 光的色散 |
| `never-stare-sun` | 为什么不能直接看太阳，戴墨镜看日食也不行？ | 日偏食那天同学想拿墨镜看 | 墨镜、胶片、只看一会儿都没事 | 入门 | 🆕 不同滤镜透过的光 | NASA Eclipse Safety；中国天文学会日食观测安全 |
| `twinkle-stars` | 星星为什么一闪一闪，行星却不怎么闪？ | 唱《小星星》时发现木星一点都不闪 | 星星自己在一亮一灭 | 入门 | 🆕 大气湍流里的点光源和小圆面 | NASA Space Place；紫金山天文台科普 |
| `sunspots` | 太阳黑子是什么，太阳上真有黑的东西吗？ | 用投影法看太阳，白纸上有几个小黑点 | 黑子是洞 / 是冷掉的煤渣 | 进阶 | ✅ `auroraField`；🆕 磁场与较冷的区域 | NASA SDO；国家空间科学中心 |
| `nearest-star` | 除了太阳，离我们最近的星星有多远，飞过去要多久？ | 科幻片里飞船几天就到了别的恒星 | 恒星之间很近 | 进阶 | ✅ `lightYearLookback`；🆕 用今天的探测器速度换算年数 | NASA Proxima Centauri；ESO |
| `betelgeuse` | 参宿四要爆炸了吗，爆了我们能看见吗？ | 新闻说猎户座的参宿四忽然变暗了 | 超新星爆发会毁掉地球 | 进阶 | ✅ `starFateMass`；✅ `orionDepth` | ESO 参宿四变暗研究；NASA Hubble |

### 🌌 galaxies-milkyway 银河与星系

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `city-no-milky-way` | 为什么在城市里看不到银河？ | 去乡下露营第一次看到银河，惊呆了 | 银河只在夏天、只在古代才有 | 入门 | ✅ `milkyWayView`；🆕 光污染等级与能看到的星星数 | 国际暗夜协会（DarkSky）；国家天文台暗夜保护 |
| `milky-way-center` | 银河系的中心有什么？ | 看到 2022 年银河系中心黑洞的照片 | 银河系中心是太阳 | 进阶 | ✅ `blackHoleLens`；✅ `galaxyRotation` | EHT 人马座 A* 发布；ESO |
| `sun-galactic-year` | 太阳系也在绕着银河系转吗，转一圈要多久？ | 「地球上的一年」之外还有「银河年」 | 太阳不动，是宇宙中心 | 进阶 | ✅ `galaxyRotation`；🆕 银河年时间轴 | NASA；ESA Gaia |
| `magellanic-clouds` | 南半球夜空里那两团「云」是什么？ | 去澳大利亚旅行的亲戚拍到两团白雾 | 那是真的云 | 进阶 | ✅ `lightYearLookback`；🆕 卫星星系示意 | ESO；NASA Hubble |
| `cosmic-web` | 星系之间是空荡荡的吗，宇宙里的星系是怎么排的？ | 看到宇宙大尺度结构图，像一张蜘蛛网 | 星系均匀撒在宇宙里 | 综合 | 🆕 纤维与空洞 | ESA Euclid；DESI 公开资料 |

### 🕳️ blackholes-relativity 黑洞与时空奇观

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `speed-of-light-limit` | 为什么什么东西都快不过光？ | 科幻片里飞船「超光速跃迁」 | 只要发动机够大就能超光速 | 综合 | ✅ `gravityClock`；🆕 越接近光速越难加速 | NASA；高中物理 选择性必修三 |
| `biggest-black-hole` | 宇宙里最大的黑洞有多大？ | 看到「比太阳系还大」的黑洞新闻 | 黑洞都差不多大 / 黑洞都很小 | 进阶 | ✅ `blackHoleLens`；🆕 视界大小与质量 | NASA Black Holes；EHT M87* |
| `neutron-star-spoon` | 一小勺中子星的物质为什么比一座山还重？ | 冷知识书上说中子星物质重得吓人 | 中子星就是普通的小星星 | 进阶 | ✅ `pulsarBeam`；🆕 把太阳压成城市大小 | NASA Neutron Stars；FAST 脉冲星成果 |
| `hawking-radiation` | 黑洞会一直变大，还是有一天会消失？ | 听说霍金说黑洞会「蒸发」 | 黑洞永远只进不出 | 综合 | 🆕 质量越小蒸发越快（定性） | NASA；剑桥大学霍金相关科普 |
| `twin-astronaut` | 航天员在空间站待一年，回来会比我们年轻吗？ | 新闻说双胞胎航天员一个上天一个留地面 | 会年轻好多岁 | 综合 | ✅ `gravityClock` | NASA Twins Study；GPS 相对论修正资料 |

### 💥 bigbang-cosmos 宇宙的诞生与演化

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `universe-age` | 科学家怎么知道宇宙已经 138 亿岁了？ | 小念问「宇宙几岁了」，爸爸说 138 亿岁 | 是「猜」出来的 | 综合 | ✅ `expandingSpace`；✅ `cmbStretch` | NASA WMAP / ESA Planck |
| `before-big-bang` | 大爆炸之前是什么样子的？ | 睡前突然冒出来的大问题 | 科学已经知道答案 / 有一个「爆炸点」 | 综合 | ✅ `horizonGrow` | NASA；ESA Planck（写清楚「科学家还不知道」） |
| `first-stars` | 宇宙里第一批星星是什么时候亮起来的？ | 韦布望远镜拍到「最远的星系」的新闻 | 宇宙一开始就到处是星星 | 综合 | ✅ `lightYearLookback`；🆕 宇宙时间轴 | NASA Webb JADES 成果（查最新纪录） |
| `universe-end` | 宇宙最后会怎样结束？ | 看了科幻片里的「宇宙热寂」 | 科学已经确定结局 | 综合 | ✅ `darkEnergyPie` | NASA Dark Energy；DESI 最新结果 |
| `antimatter-missing` | 反物质都到哪里去了？ | 科普视频说宇宙诞生时物质和反物质一样多 | 反物质只是科幻 | 综合 | 🆕 一对一湮灭后剩下一点点 | CERN；中国科学院高能物理研究所 |

### 🚀 space-exploration 探索宇宙与地外生命

| slug | 问题 | 生活现场 | 误区 | 学段 | 互动图 | 查证去处 |
|---|---|---|---|---|---|---|
| `see-space-station` | 我用眼睛能看到天上的空间站吗？ | 爸爸说今晚天宫会从头顶飞过 | 空间站太远、太小看不见 | 入门 | ✅ `newtonCannon`；🆕 过境时间与亮度 | 中国载人航天工程网；NASA Spot the Station |
| `spacesuit` | 航天员的航天服为什么那么厚那么重？ | 看出舱直播，航天员动作慢吞吞 | 只是为了保暖 / 太空里人会爆炸 | 入门 | 🆕 真空、温差、辐射三道防线 | 中国载人航天工程网；NASA Spacesuits |
| `reentry-fire` | 返回舱回来时为什么会烧得通红？ | 看神舟返回直播，返回舱像一颗火球 | 是和空气摩擦生热 | 进阶 | ✅ `rocketRecoil`；🆕 激波前空气被压缩变热 | NASA Glenn 再入加热；中国载人航天 |
| `change6-far-side` | 嫦娥六号从月球背面带回了什么，为什么这么难？ | 2024 年嫦娥六号带回月背土壤的新闻 | 月球背面一直是黑的 | 进阶 | ✅ `relayMoonLink`；✅ `tidalLock` | 国家航天局嫦娥六号；中国科学院 |
| `mars-rover-slow` | 火星车为什么跑得那么慢，祝融号还要「冬眠」？ | 看到祝融号一天只走几十米 | 火星车坏了才慢 | 进阶 | ✅ `marsRustDust`；🆕 通信延时与太阳能 | 国家航天局天问一号；NASA Mars rovers |
| `alien-search` | 宇宙那么大，外星人存在吗，科学家怎么找？ | 看完外星人电影问「他们在哪儿」 | UFO 视频就是外星人 / 科学已经证明没有 | 进阶 | ✅ `habitableBand`；✅ `fastDish` | NASA Astrobiology；SETI Institute；FAST 地外文明搜寻 |

## 补新题的格式

在对应主题表里加一行，同样七列；生活现场写成具体的一幕（时间、地点、小念看到什么），误区写成一句孩子会说的话。没有合适的现成互动图就标 🆕，并在 figures.md 的「要新写的图」里一句话写清它要演什么。
