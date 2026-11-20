# 3D 宇宙实验台

「🔭 3D 宇宙实验台」（`#labs`、`#lab/<slug>`）是原生 Three.js 场景，代码在 `src/learning/labs/`，页面在 `src/learning/pages/lab.ts`。每个实验台有两种用法：

- **📖 看懂原理**：分几段，每段小念提一个问题（`q`），场景自动切到这一段的参数和视角，爸爸讲「你看到什么」（`seen`）和「所以……」（`concl`）。有配音时三句依次朗读、读完自动进下一段。
- **🧪 自由实验台**：孩子自己拖滑块、转视角，每段给一个动手任务（`task`），右栏显示一个大读数（`metric`）。

现有 6 个：`earth-seasons-lab`、`moon-eclipse-lab`、`solar-system-lab`、`gravity-orbit-lab`、`star-lifecycle-lab`、`black-hole-lab`。

## 新加一个实验台

一个实验台要四处都登记（`tests/labs.test.ts` 会逐项查）：

1. **课**：`src/learning/curriculum.ts` 的 `lessonPlan` 里有一题，`slug` 相同（习惯以 `-lab` 结尾）。有了 `LabDef`，这题的 `kind` 自动变成 `'simulation'`，出现在实验台列表里。
2. **定义**：`src/learning/labs/index.ts` 的 `labDefs` 里加一个 `LabDef`（类型在 `labs/types.ts`）：
   - `slug`、`emoji`、`subtitle`、`accent`（这一主题的颜色）；
   - `controls`：至少 2 个滑块 `{ key, label, min, max, step, value, unit?, labels? }`；
   - `steps`：至少 4 段，每段 `{ title, q, eq?, seen, concl, task, preset, camera }`；`preset` 只能用 `controls` 里有的 key；`camera` 是 `[方位角 rad, 仰角 rad, 距离]`；
   - `metric(state)`：返回 `{ label, value, note }`，任何滑块组合下都不能出 NaN / undefined。
3. **场景**：`src/learning/labs/scenes.ts` 里写一个 `buildXxx(scene): LabWorld`，返回 `{ update(state, t, dt), focusTarget? }`，并登记进 `BUILDERS`：`'<slug>': buildXxx`。可以用文件里现成的 `makeStarfield()`、`makeOrbitRing()`。
4. **封面**：`src/learning/labs/covers.ts` 的 `COVERS` 里加 `'<slug>': \`<svg …>\``（实验台列表和不支持 WebGL 时的占位图）。

然后：
- 写这一题的问答文章（`npm run story:new -- <slug>` 会按段数预填 `show: { kind: 'lab', step, label }`），让对话和实验台的段落对上。
- `npm run voice -- lab:<slug>` 给「看懂原理」配音（全部重配用 `npm run voice -- lab`）；改了 `q` / `seen` / `concl` 任何一个字都要重配，`tests/voice.test.ts` 会查。
- 在浏览器里打开 `#lab/<slug>`，两种模式都点一遍，开着声音听完「看懂原理」。

## 场景的写法

- 只用 `three`，不加别的 3D 依赖；场景模块由 `pages/lab.ts` 动态 `import()`，别在别处静态引用。
- `update` 只根据 `state`（滑块值）和时间推进画面，别在里面新建几何体或材质；需要变的东西先建好，改 `position` / `scale` / `visible` / 颜色。
- 天体大小和距离通常没法按比例：在 `subtitle` 或 `seen` 里说一句「为了看得清，大小和距离不按比例」。
- 光照：太阳用 `PointLight` 放在太阳位置，再加一点环境光，让背光面看得出但不全黑。
- 不支持 WebGL 时页面会自动显示封面和提示（`canUseWebGL()`），不用另外处理。
- `prefers-reduced-motion` 下场景要停下自转/公转动画（照着现有 builder 写）。

## 看懂原理的台词

- `title`：这一段讲什么，≤8 字（「冬至的太阳」）。
- `q`：小念的问题，带「？」，像在场景前随口问的。
- `seen`：爸爸描述画面里正在发生什么，指着具体的东西说（「看地球右边那根红色的地轴……」）。
- `concl`：一句原理；朗读时如果不以「所以」开头，会自动加上「所以，」，写的时候别再自己加别的连接词。
- `task`：自由实验台里给孩子的一个动手任务，动词开头（「把月份拖到 12 月，看看北京的影子有多长」）。
- 三句都会被读出来：和对话一样，符号放进 `eq`，句子里说中文（见 dialogue.md）。
- 数字只用有来源的；和同一题问答文章里说的一致。
