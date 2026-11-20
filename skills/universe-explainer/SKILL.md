---
name: universe-explainer
description: >-
  Writes new 宇宙奇遇记 (UniVerse) content in the house style: a researched 小念 × 爸爸
  question-and-answer article about a real sky-watching or space question, with draggable
  slider sims in 爸爸's bubbles, a voiced explainer film in the right column (one to three
  scenes per turn), credited sources, and optional NASA / ESA / ESO photos; also adds or
  edits native Three.js 3D universe labs. Use when adding or rewriting an astronomy question,
  researching space topics or misconceptions, picking questions from the question bank,
  writing a story in src/learning/stories, adding a sim, figure kind or film cue, adding a
  3D lab, styling UniVerse pages, regenerating voice clips, or when the user mentions 小念,
  爸爸, 题库, 新问题, 扩充内容, 互动图, 讲解动画, 配音, 3D 实验台, 参考来源 or 奇遇记.
---

# 宇宙奇遇记：写一篇「小念 × 爸爸」

目标只有一个：孩子（小学高年级到初中，高中内容标「综合」）从头读到尾，就真的弄懂了标题里那个关于天空和宇宙的问题，并且改掉一个常见的错误想法（「夏天离太阳更近」「太空没有重力」「黑洞像吸尘器」）。问答把道理讲对、讲顺；互动图让孩子自己拖一拖、看见规律；右栏的讲解动画把爸爸每一轮讲的过程演出来，小念和爸爸把每句话读出来。

## 先弄清楚

- 仓库结构、命令、硬性规矩：根目录 `AGENTS.md`
- 选题：[question-bank.md](question-bank.md)（已写的 48 题 + 八个主题的候选新题：生活现场、要破的误区、学段、互动图、查证去处）
- 资料和许可：[sources.md](sources.md)（先读，里面有不能碰的红线）
- 问答怎么写、怎么写得能念：[dialogue.md](dialogue.md)
- 配图和互动图（48 张现成的清单 + 新图写法）：[figures.md](figures.md)
- 右栏的讲解动画：[film.md](film.md)
- 页面风格、系列规矩：[design.md](design.md)
- 原生 3D 宇宙实验台（加一个实验、改讲稿、配音）：[labs.md](labs.md)

## 做一篇新文章

照这个清单走，每一步过了检查再走下一步：

```
- [ ] 1. 选题：从 question-bank.md 挑一题；npm run story:todo 看哪些已经写了、每个主题有几题
- [ ] 2. 查资料（sources.md）：课本怎么说、NASA / ESA / 国家航天局 / 天文台怎么说；每个要写的数字找到两处一致的来源，记下网址
- [ ] 3. 进 curriculum.ts：在 lessonPlan 对应主题的最后加一条（slug、unit、title、topic、level、prerequisites、hook、question、objectives、takeaway、textbook）
- [ ] 4. 生成草稿：npm run story:new -- <slug>（写好 src/learning/stories/<slug>.ts 并登记到 stories/index.ts）
- [ ] 5. 写问答（dialogue.md）：5–8 轮追问链，点名说破误区，句子要能念出来
- [ ] 6. 核对科学：每个数字、每个说法都对上第 2 步的来源；拿不准就写「大约」或不写；写进 sources 和 tip
- [ ] 7. 互动图（figures.md）：1–2 张 sim；没有合适的就在 simlib/ 里新写一个、登记到 sims.ts，并在 figures.md 加一行
- [ ] 8. 右栏动画（film.md）：一轮配一到三场戏，至少 4 场
- [ ] 9. 检查：npm run story:check -- <slug>，直到 ✅（⚠️ 是提醒：配音过期、念不顺的符号）
- [ ] 10. 看图：npm run story:frames -- <slug>（动画联系表），新图再跑 npm run story:sims -- <sim>
- [ ] 11. 配音：npm run voice -- <slug>（要联网；以后改了对话的字也要重跑）
- [ ] 12. npm run lint；npm exec -- tsc --noEmit；npm run test -- --no-file-parallelism --maxWorkers=1；npm run build
- [ ] 13. 浏览器里看 #q/<slug>：桌面开着声音从头听一遍、看对话是否跟着动画高亮、拖一遍滑块，再看手机宽度（390px）
```

一次扩充多篇时，每篇单独走完 2–11，最后统一跑第 12 步；`npm run voice` 不带参数会补齐所有缺的配音。

## 讲法速记（细则见 dialogue.md）

- **小念**：好奇、爱追问的孩子。第一句说她看到的那一幕；之后每句都接住爸爸上一句里的一个词往下挖；最后以「我懂了！」或「我明白了！」开头，用自己的话把因果链串一遍。
- **爸爸**：第一句直接回答，再打一个孩子见过的比方（手电筒照篮球、旋转木马、拉面团、气球上画点），真名词只说一次；误区点名说破（「很多人以为……其实……」）；每句 20–180 字。
- **顺序**：看到了什么 → 天上实际在发生什么 → 为什么非得这样 → 误区 / 特例 → 我今晚能去看什么、怎么看 → 总结。
- **安全**：直视太阳、日食观测、夜里户外、高处观星，写进 `tip`（给大人），对话里只讲成好习惯（「看日食一定要戴合格的日食眼镜」）。

## 工具

| 命令 | 做什么 |
|---|---|
| `npm run story:todo` | 按主题列出每题：✅ 已写（几轮、几张图、动画多长、有没有待配音）还是 ⏳ 还没写 |
| `npm run story:new -- <slug>` | 按 curriculum 生成 6 轮草稿并登记到 `stories/index.ts`（有 3D 实验台的会预填 `show.lab` 段号） |
| `npm run story:check -- [slug...]` | 逐条检查写作规矩（问答、参考来源、配图、动画），用中文指出第几轮 / 第几场差在哪；顺带提醒配音过期、念不顺的符号 |
| `npm run story:frames -- <slug>` | 把动画每场切三帧排成联系表 `.story-preview/<slug>-frames.html`，找得到 Edge / Chrome 就再出 PNG |
| `npm run story:sims -- <sim...>` | 把互动图在滑块两头、几个时刻的画面排成联系表 `.story-preview/sims-*.html`（能找到浏览器就再出 PNG） |
| `npm run voice -- [slug...]` | 用 edge-tts 配音（`public/voice/`、`src/data/voice-manifest.json`）；`npm run voice -- lab` 给 3D 实验台配音 |
| `npm run skills:sync` | 改完 `skills/` 里的本 skill 后，同步到 `.cursor/skills/` 和 `.agents/skills/` |

规则本身在 `src/learning/stories/rules.ts`，`tests/stories.test.ts` 用的是同一份。改规矩时只改那里，并同步本 skill 和 `AGENTS.md`。工具都在 `scripts/`（`story.ts`、`voice.ts`、`voice-clips.ts`、`sync-skills.mjs`）；加新工具时登记到 `package.json`、上面这张表和 `AGENTS.md`（`tests/skills.test.ts` 会查文档里写的 `npm run` 命令都存在）。

**看整篇文章的截图**（开着 `npm run dev` 时；Windows 上 Edge 一般在 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`）：

```powershell
& $edge --headless=new --disable-gpu --hide-scrollbars --user-data-dir=.story-preview/.browser --window-size=1400,2600 --virtual-time-budget=6000 --screenshot=.story-preview/page.png "http://localhost:<端口>/#q/<slug>"
```

无头浏览器在 `--virtual-time-budget` 下不跑 `requestAnimationFrame`，页面被隐藏时播放器还会自动暂停：动画、配音和 3D 实验台要在真浏览器里看、听。

## 验收

- `story:check` 全过，四条验证命令全过。
- 「给大人」里的参考来源能点开、说的就是文章里的那件事；数字和来源对得上。
- 每张互动图都在演爸爸这一句；拖到两头读数还合理、字不出框；图注 ≤70 字。
- 右栏动画开着声音从头播：说到哪一轮，左边对话就高亮、滚到哪一轮；爸爸说到什么画面正好出现什么；手机上图和字不挤。
