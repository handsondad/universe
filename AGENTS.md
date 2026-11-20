# AGENTS.md — UniVerse 宇宙奇遇记 Agent 协作与内容扩展指南

本文档面向参与 **UniVerse（宇宙奇遇记）** 的所有编码 Agent。修改代码、调整样式或新增天文问题前，请遵守以下规范。

> **要扩充内容（新问题、新互动图、新动画、新 3D 实验台）时，先读 skill：`skills/universe-explainer/SKILL.md`**（同一份镜像在 `.cursor/skills/` 和 `.agents/skills/`）。里面有分步清单、题库、写作细则和全部工具的用法。

## 1. 产品定位与核心设计哲学

1. **「星空宇宙问答馆」，不是刷题打卡平台**
   - 从孩子抬头看星空、看月亮、玩望远镜时真实遇到的问题出发，由浅入深讲懂天文与宇宙物理，并拆穿常见误区（如“夏天离太阳更近”“太空没有重力”“黑洞像吸尘器到处吸”）。
   - **禁止**引入解锁、倒计时、百分比焦虑条或刷题考试话术。唯一记录为本地 `localStorage`（键 `universe.learning.v1`）里的「⭐ 看过」。
2. **「奇遇记」系列一员**：与身体奇遇记、化学奇遇记、物理奇遇记、生物奇遇记同一对小念和爸爸、同一套暖白纸面手写风（宇宙强调色星空紫 `#5b3e96`）。三层结构：首页 `#home` → 主题 `#topic/<unit>` → 问题文章 `#q/<slug>`，外加「🔭 3D 宇宙实验台」`#labs` / `#lab/<slug>`。
3. **8 大主题**：`earth-moon` 地球与月亮 → `solar-system` 太阳系漫游 → `gravity-orbits` 引力与轨道 → `sun-stars` 太阳与恒星 → `galaxies-milkyway` 银河与星系 → `blackholes-relativity` 黑洞与时空 → `bigbang-cosmos` 大爆炸与宇宙 → `space-exploration` 望远镜与航天。目前每个主题 6 题，共 48 题。
4. **一篇问答 = 对话 + 互动图 + 讲解动画 + 配音 + 来源**：5–8 轮「小念问、爸爸答」的追问链；爸爸气泡里 1–2 张能拖滑块的互动图；右栏一部按对话节奏播放的讲解动画；小念和爸爸每句都有真人感配音，播放时左边对话跟着高亮；「给大人」里列出可点开的参考来源。
5. **原生 3D 宇宙实验台**：位于 `src/learning/labs/`，基于 Three.js 构建 6 个交互式 3D 天文实验室，沿用化学奇遇记的「看懂原理 / 自由实验台」双模式、小念×爸爸问答气泡卡片与暖色手写 UI；「看懂原理」也有配音。

## 2. 目录速览

| 位置 | 内容 |
|---|---|
| `src/learning/curriculum.ts` | 8 个主题（`units`）和每一题的教学计划（`lessonPlan`） |
| `src/learning/stories/<slug>.ts` | 每篇问答（`Story`），登记在 `stories/index.ts`（CRLF 换行） |
| `src/learning/stories/rules.ts` | 写作规矩，`npm run story:check` 和 `tests/stories.test.ts` 共用 |
| `src/learning/simlib/*.ts` + `sims.ts` | 48 张 2D SVG 互动图，登记在 `SIMS` |
| `src/learning/film/` | 讲解动画引擎（时间线、画面、播放器、按配音拉伸） |
| `src/learning/labs/` | 3D 实验台：`index.ts` 定义、`scenes.ts` 场景（`BUILDERS`）、`covers.ts` 封面（`COVERS`） |
| `src/learning/voice.ts` | 配音的读法（`speakable`）和播放地址 |
| `src/data/*-manifest.json`、`public/voice/` | 配音清单和 mp3，由 `npm run voice` 生成，别手改 |
| `src/series/` | 五个「奇遇记」共用的小念、爸爸和 3D 小星球 |
| `public/theme/tokens.css` | 系列共用的颜色、字体、圆角（`--cv-*`） |
| `scripts/` | `story.ts` 写作工具、`voice.ts` 配音、`sync-skills.mjs` |
| `skills/universe-explainer/` | 扩充内容的 skill（唯一的源文件，镜像由 `npm run skills:sync` 生成） |

## 3. 新增一个问题（概要，细则见 skill）

1. 选题：`skills/universe-explainer/question-bank.md`；`npm run story:todo` 看现状。
2. 查资料：每个数字找两处一致的权威来源（见 `sources.md`）。
3. 在 `curriculum.ts` 的 `lessonPlan` 对应主题末尾加一条；`prerequisites` 只能指向排在前面的题。
4. `npm run story:new -- <slug>` 生成草稿并登记。
5. 写对话、配互动图、写动画；`npm run story:check -- <slug>` 直到 ✅。
6. `npm run story:frames -- <slug>` 看动画联系表；新图用 `npm run story:sims -- <名字>` 看。
7. `npm run voice -- <slug>` 配音（要联网，需要 `edge-tts`、`ffmpeg`、`ffprobe`）。
8. 跑第 6 节的四条验证命令，再在浏览器里开着声音看一遍 `#q/<slug>`。

新加 3D 实验台见 `skills/universe-explainer/labs.md`：`LabDef`、`BUILDERS`、`COVERS`、同名课四处都要登记，然后 `npm run voice -- lab:<slug>`。

## 4. 写作与科学红线

- **科学准确第一**：数字和说法都要能在来源里查到；不确定就写「大约」或「科学家还在研究」。图里、动画里出现的数字只能是爸爸说过的。
- **来源**：每篇至少 2 条 https 来源（教材 + NASA / ESA / 中国国家航天局 / 天文台等）；**不能用 OpenStax**（许可不允许 AI 使用）。别人拍的照片要写 `credit` 和原图页 `href`。
- **写给耳朵听**：对话会被朗读，公式和符号放进 `eq`，句子里说中文。改了任何一句对话或实验台讲稿，都要重跑 `npm run voice`（测试会查配音是否过期）。
- **安全**：直视太阳、日食观测、夜间户外观星等写进 `tip`（给大人）。
- **语气**：小念是好奇追问的孩子，爸爸先给答案再打比方，点名说破误区；不说教、不考试。

## 5. 前端约定

- TypeScript strict，无 UI 框架；页面用 `html\`…\`` + `setHtml()`（`src/learning/html.ts`），不直接拼 `innerHTML`。
- 颜色、圆角、阴影用 `--cv-*` 变量；橙色 `#e8590c` 只用来点出重点和正在朗读的气泡。
- Three.js 只在 3D 实验台和首页小星球里用，并且动态 `import()`。
- 尊重 `prefers-reduced-motion`；离开页面时停掉动画、音频和 3D 渲染。
- 改了 `skills/` 后跑 `npm run skills:sync`；新加 npm 脚本要同时写进 skill 的工具表和本文件（`tests/skills.test.ts` 会查）。

## 6. 验证与测试命令

```bash
npm run lint
npm exec -- tsc --noEmit
npm run test -- --no-file-parallelism --maxWorkers=1
npm run build
```

写内容时常用：`npm run story:todo`、`npm run story:check`、`npm run story:frames -- <slug>`、`npm run story:sims -- <名字>`、`npm run voice -- <slug>`、`npm run skills:sync`。
