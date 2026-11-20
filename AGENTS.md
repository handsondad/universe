# AGENTS.md — UniVerse 宇宙奇遇记 Agent 协作与内容扩展指南

本文档面向参与 **UniVerse（宇宙奇遇记）** 的所有编码 Agent。修改代码、调整样式或新增天文问题前，请遵守以下规范。

## 1. 产品定位与核心设计哲学

1. **「星空宇宙问答馆」，不是刷题打卡平台**
   - 从孩子抬头看星空、看月亮、玩望远镜时真实遇到的问题出发，由浅入深讲懂天文与宇宙物理，并拆穿常见误区（如“夏天离太阳更近”“太空没有重力”“黑洞像吸尘器到处吸”）。
   - **禁止**引入解锁、倒计时、百分比焦虑条或刷题考试话术。唯一记录为本地 `localStorage`（键 `universe.learning.v1`）里的「⭐ 看过」。
2. **「奇遇记」系列一员**：与身体奇遇记、化学奇遇记、物理奇遇记、生物奇遇记同一对小念和爸爸、同一套暖白纸面手写风（宇宙强调色星空紫 `#5b3e96`）。三层结构：首页 `#home` → 主题 `#topic/<unit>` → 问题文章 `#q/<slug>`，外加「🔭 3D 宇宙实验台」`#labs` / `#lab/<slug>`。
3. **8 大主题**：`earth-moon` 地球与月亮 → `solar-system` 太阳系漫游 → `gravity-orbits` 引力与轨道 → `sun-stars` 太阳与恒星 → `galaxies-milkyway` 银河与星系 → `blackholes-relativity` 黑洞与时空 → `bigbang-cosmos` 大爆炸与宇宙 → `space-exploration` 望远镜与航天。
4. **原生 3D 宇宙实验台**：位于 `src/learning/labs/`，基于 Three.js 构建 6 个交互式 3D 天文实验室，沿用化学奇遇记的「看懂原理 / 自由实验台」双模式、小念×爸爸问答气泡卡片与暖色手写 UI。

## 2. 验证与测试命令

```bash
npm run lint
npm exec -- tsc --noEmit
npm run test -- --no-file-parallelism --maxWorkers=1
npm run build
```
