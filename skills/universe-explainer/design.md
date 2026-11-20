# 界面和代码约定

## 结构

```
src/
  main.ts                 入口，挂 learning/app.ts
  css/base.css            全局重置
  series/                 「奇遇记」系列共用：小念和爸爸（characters.ts、avatar.ts）、3D 小星球舞台（duo-stage.ts）、WebGL 探测（webgl.ts）
  data/                   配音清单 voice-manifest.json、lab-voice-manifest.json（脚本生成，别手改）
  learning/
    app.ts                hash 路由：#home → #topic/<unit> → #q/<slug>，以及 #labs、#lab/<slug>
    curriculum.ts         8 个主题和每一题的教学计划（LessonPlan）
    catalog.ts            把 curriculum + stories + labs 拼成 Lesson；有 LabDef 的课 kind 是 'simulation'
    pages/                home / topic / lesson（问答文章 + 右栏动画）/ lab（3D 实验台）
    stories/              每篇问答一个文件，index.ts 登记，rules.ts 是写作规矩，types.ts 是类型
    film/                 讲解动画引擎（engine 时间线、stage 画面、player 播放器、narration 配音拉伸）
    sims.ts + simlib/     能拖滑块的 2D SVG 互动图（kit.ts 是公用画笔和颜色）
    figures.ts            四种配图：sim / bars / scale / image
    labs/                 原生 Three.js 3D 宇宙实验台（index.ts 定义、scenes.ts 场景、covers.ts 封面）
    voice.ts              配音的读法（speakable）和播放地址
    home-planet.ts        首页小星球上的天文道具
    progress.ts / store.ts 「⭐ 看过」记录，localStorage 键 universe.learning.v1
public/
  theme/tokens.css        系列共用的颜色、字体、圆角
  voice/                  配音 mp3（脚本生成）
  images/photos/          真照片（署名见 sources.md）
scripts/                  story.ts（写作工具）、voice.ts（配音）、sync-skills.mjs
tests/                    vitest + jsdom
```

## 视觉

- 「奇遇记」系列同一套暖白纸面、棕色文字、手写字体，宇宙奇遇记只换强调色：**星空紫 `#5b3e96`**（`--cv-accent`，`tests/learning.test.ts` 会查）。
- 颜色、圆角、阴影一律用 `public/theme/tokens.css` 里的 `--cv-*` 变量，别在组件里写死新颜色。主题自己的颜色写在 `curriculum.ts` 的 `units[].color`。
- 橙色 `#e8590c` 只用来点出「看这里」和正在朗读的气泡（`.is-speaking`）。
- 太空画面（互动图、动画、3D）用深紫底 `#1c1836` / `#1a1633`，上面的字用浅色。
- 不加解锁、倒计时、进度百分比、分数、排行这类刷题元素。唯一的记录是「⭐ 看过」。

## 写代码

- TypeScript strict，不引 UI 框架，页面用 `html\`…\`` 模板（`learning/html.ts`）拼 `SafeHtml`，再 `setHtml(el, …)` 写进去；插值会自动转义，确实要插现成的 HTML 用 `raw()`。不直接给 `innerHTML` 赋用户可见的字符串。
- 中文文案直接写在代码里，不做多语言。
- 新文件跟着同目录已有文件的写法：命名、注释密度、导出方式。注释只写代码表达不出来的约束。
- `stories/index.ts` 是 CRLF 换行（`story:new` 会自动处理）；其余文件 LF。
- Three.js 只在 3D 实验台和首页小星球里用，并且要动态 `import()`，保持首屏包小。
- 尊重 `prefers-reduced-motion`：动画、互动图、3D 场景、小星球都要在这个设置下停下或放慢（已有的代码里都有，照抄）。
- 页面离开时要清理：`mountSims` 返回的 stop、`mountFilm` 的销毁、3D `destroy()`、音频暂停。

## 小念和爸爸

- 形象和名字在 `src/series/`，五个「奇遇记」共用，别在这里改长相。
- 小念：小学中高年级的孩子，好奇、会追问、会说出常见的错误想法；爸爸：耐心，先给答案再打比方，不说教。
- 配音：小念 `zh-CN-YunxiaNeural`，爸爸 `zh-CN-YunxiNeural`（慢 5%），声音开关记在 `universe-film-voice`。

## 验证

```bash
npm run lint
npm exec -- tsc --noEmit
npm run test -- --no-file-parallelism --maxWorkers=1
npm run build
```

改界面后在浏览器里看一遍宽屏（≥901px，右栏动画吸附）和手机宽度（动画在对话上方）。
