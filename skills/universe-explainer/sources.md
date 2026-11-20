# 资料来源与许可

网站不商用，但仍然只用许可允许的东西，并且写清出处。文章的 `sources`（`StorySource[]`）列在「给大人」里，检查器要求至少 2 条、都是 https。

## 红线（检查器能拦的会拦，拦不到的靠自觉）

- **OpenStax 不读不用**（包括 Astronomy 2e）：它的许可明确禁止拿内容训练或喂给 AI。网页、PDF、习题都不打开，`sources` 里出现 openstax 会被拦。
- **不抄文字**：NASA、科普中国、天文台的科普文章、课本，都只拿来找选题、核对说法；问答全部用自己的话写，比方也自己想。
- **不搬没有开放许可的图、视频、动画**：只当灵感，要画就按真实数据自己画（互动图、动画、3D 实验台都是自己画的）。
- **百科、知乎、公众号、短视频、AI 生成的文字不当来源**：可以顺着它们找到原始出处，引的是原始出处。
- **不夸大、不制造恐慌**：小行星撞地球、超新星、太阳风暴、「末日」类话题，按机构的正式口径写概率和时间尺度；没定论的说「科学家还在研究」。

## 来源分级

| 级别 | 是什么 | 例子 |
|---|---|---|
| 1 | 课本、课标、国家和国际科学机构 | 人教版地理 / 物理教材、教科版小学科学、义务教育科学课程标准；国家航天局（cnsa.gov.cn）、中国载人航天工程网（cmse.gov.cn）、中国科学院紫金山天文台 / 国家天文台、中国科学院国家授时中心、中国气象局；NASA、ESA、ESO、JAXA、IAU（国际天文学联合会）、NOAA 空间天气预报中心 |
| 2 | 大学、科学馆、大科学装置、学会的科普 | NASA Space Place、NASA Science、HubbleSite、Webb Telescope（webbtelescope.org）、LIGO Caltech、Event Horizon Telescope、中国天眼 FAST、科普中国、中国天文学会、Las Cumbres Observatory、ESA Kids |
| 3 | 同行评议论文与正式数据发布 | Nature、Science、ApJ、A&A 上的论文；DESI、Planck、Gaia 的官方数据发布说明（预印本只在机构新闻稿也报道时用） |

- 每篇至少一条 1 级（通常是课本那一章或 NASA / 国家航天局）加一条 1–3 级。
- 网上的数字至少对上两处来源；对不上就写「大约」，或者不写数字。天文数字常有不同口径（平均距离 vs 近日点、半径 vs 直径、地球年 vs 当地日），写清楚是哪一种。
- **「最新发现」要查最新**：系外行星数量、最远星系纪录、脉冲星数量、DESI 暗能量结果这类会变的数，写当下机构公布的值，并在 `tip` 里写「截至 XXXX 年」。
- 课本和课外写法不一样（比如 23.5° 和 23.44°、光年的近似值）时，在 `tip` 里说一句。

`sources` 每条写 `title`（资料名，课本写到章：「科学 六年级上册 · 地球的运动」）、`by`（人民教育出版社、NASA Science、国家航天局……）、能点开的 `url`（https）。课本没有网址时可以只写出版社主页。

## 别人的照片

真照片能让孩子相信「这真的发生过」：地出、黑洞照片、韦布深空场、嫦娥月背照片、极光。

| 来源 | 许可（用之前到图片页再确认） | 署名写法 |
|---|---|---|
| NASA（images.nasa.gov、science.nasa.gov） | 一般是公有领域；页面上标了第三方版权的除外 | 「NASA」或页面写的「NASA/JPL-Caltech」等；**不用 NASA 标志和徽章，不暗示 NASA 认可本站** |
| ESA/Hubble、ESA/Webb（esahubble.org、esawebb.org） | CC BY 4.0 | 照图片页写，如「ESA/Webb, NASA & CSA, …」 |
| ESA 其他图片 | 多数是 CC BY-SA 3.0 IGO，逐张看 | 照图片页写 |
| ESO（eso.org） | CC BY 4.0 | 「ESO/作者」 |
| NOIRLab / NSF | CC BY 4.0 | 照图片页写 |
| Wikimedia Commons | 只用公有领域、CC0、CC BY、CC BY-SA | 照文件页写作者和许可 |
| 国家航天局、中国科学院 | 公开发布的新闻图片版权归发布方，**不能当开放许可用**；只当参考，自己画 | — |

- CC BY-SA 的照片原样用、不改图。
- **怎么放**：下载到 `public/images/photos/<slug>-<名字>.webp`（宽 ≤1200px，尽量 ≤200KB），在 `public/images/photos/CREDITS.md` 记一行（文件、原图页、作者、许可；第一次用时新建这个文件）。配图写：

```ts
figure: {
  kind: 'image',
  src: '/images/photos/blood-moon-eclipse.webp',
  alt: '月全食时暗红色的月亮',
  caption: '…（≤70 字）',
  credit: 'NASA · 公有领域',
  href: 'https://images.nasa.gov/details/…',
},
```

`/images/photos/` 下的图没写 `credit` 和 https 的 `href`，检查器会拦。

## 交互模拟

先用自己的互动图（同一个画风、只演爸爸这一句）。NASA Eyes on the Solar System、Stellarium Web 这类外部工具只在 `tip` 里推荐给大人，不嵌进页面。

## 署名汇总

README 写清：照片（指向 `public/images/photos/CREDITS.md`）、小念和爸爸的模型（`public/models/` 下的 CC0 说明）、重要的数据来源机构。
