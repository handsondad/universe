# 宇宙奇遇记 · UniVerse

> 「奇遇记」系列天文与宇宙科普交互网站：跟着小念和爸爸的问答，一起仰望星空、拆解宇宙原理，并在 3D 宇宙实验台里亲手调参做实验。

## 特色内容

- **8 大宇宙主题 · 48 个生活与星空问题**（每个主题 6 问）：覆盖地球与月亮、太阳系漫游、引力与轨道、太阳与恒星、银河与星系、黑洞与时空、大爆炸与宇宙、望远镜与航天。从红月亮、月亮错觉、时差，到极光、北极星、引力波、脉冲星、暗能量、文昌发射场与中国天眼。
- **小念 × 爸爸对话式讲解**：每个问题都配有 2D 可拖拽滑块互动图（共 48 种）与分段分镜讲解动画，附带「给大人」教材对应与权威来源（NASA、ESA、LIGO、国家航天局、人教版教材等）。
- **紧跟最新研究**：如 2025 年哈勃 + 盖亚对「银河系与仙女座碰撞」概率的重新计算、2025 年 DESI 暗能量可能减弱的线索、NASA 确认系外行星突破 6000 颗、天眼 FAST 发现脉冲星超 1000 颗。
- **6 个原生 Three.js 3D 宇宙实验台**：
  1. 地球四季与 23.4° 地轴倾斜
  2. 日食月食与 5.1° 白道倾角
  3. 太阳系八大行星实时轨道漫游
  4. 牛顿高山大炮与引力轨道速度
  5. 恒星从星云到黑洞的一生演化
  6. 黑洞事件视界、吸积盘与时空弯曲
  均支持 **「看懂原理」**（小念×爸爸分步导览 + 自动演示）与 **「自由实验台」**（动手试试任务 + 滑块实时调参 + 3D 镜头旋转缩放）双模式。

## 本地开发

```bash
npm install
npm run dev
```

## 扩充内容

想让 AI Agent（或自己）继续加问题、互动图、动画和 3D 实验台：

- **指南**：根目录 [`AGENTS.md`](AGENTS.md) 是总规矩；[`skills/universe-explainer/`](skills/universe-explainer/SKILL.md) 是写一篇新问答的完整 skill（分步清单、[题库](skills/universe-explainer/question-bank.md)、[对话写法](skills/universe-explainer/dialogue.md)、[互动图](skills/universe-explainer/figures.md)、[讲解动画](skills/universe-explainer/film.md)、[来源与许可](skills/universe-explainer/sources.md)、[界面约定](skills/universe-explainer/design.md)、[3D 实验台](skills/universe-explainer/labs.md)）。Cursor 和其他 Agent 从 `.cursor/skills/`、`.agents/skills/` 自动读取同一份。
- **工具**：

| 命令 | 做什么 |
|---|---|
| `npm run story:todo` | 每个主题哪些题已写、几轮、几张图、动画多长、是否待配音 |
| `npm run story:new -- <slug>` | 按 `curriculum.ts` 生成一篇草稿并登记 |
| `npm run story:check -- [slug...]` | 按写作规矩逐条检查，指出第几轮 / 第几场的问题 |
| `npm run story:frames -- <slug>` | 动画联系表（每场三帧）到 `.story-preview/` |
| `npm run story:sims -- <sim...>` | 互动图在滑块两头的画面联系表 |
| `npm run voice -- [slug... \| lab \| lab:<slug>]` | 用 edge-tts 配音（需要联网和 `edge-tts`、`ffmpeg`） |
| `npm run skills:sync` | 改完 `skills/` 后同步到 `.cursor/skills/`、`.agents/skills/` |

给 Agent 的一句话指令示例：「按 universe-explainer skill，从题库里给『地球与月亮』加一题 super-moon，写完配音并跑完验证。」

## 质量检查

```bash
npm run lint
npm exec -- tsc --noEmit
npm run test -- --no-file-parallelism --maxWorkers=1
npm run build
```
