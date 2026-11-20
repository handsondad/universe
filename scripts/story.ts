/**
 * 写「小念 × 爸爸」文章的小工具（用 vite-node 跑，能直接读课程数据）：
 *   npm run story:todo                 按主题列出每题：写好了没有、几轮几张图、动画多长、配音齐不齐
 *   npm run story:new -- <slug>        生成 src/learning/stories/<slug>.ts 草稿并登记到 stories/index.ts
 *   npm run story:check -- [slug...]   按写作规矩检查（不写 slug 就查全部），顺带提醒配音过期、念不顺的符号
 *   npm run story:frames -- <slug>     把讲解动画每场切三帧排成一张联系表（HTML，装了 Edge / Chrome 再出 PNG）
 *   npm run story:sims -- <sim...>     把互动图在滑块两头、几个时刻的画面排成联系表，看字有没有出框、画面对不对
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cleanHook } from '../src/learning/article';
import { findLesson, lessons, unitLessons } from '../src/learning/catalog';
import { units } from '../src/learning/curriculum';
import { totalDuration } from '../src/learning/film/engine';
import { renderStage } from '../src/learning/film/stage';
import { findLabDef } from '../src/learning/labs';
import { simNames, simParams, simSnapshot, type SimName } from '../src/learning/sims';
import { stories } from '../src/learning/stories';
import { storyProblems } from '../src/learning/stories/rules';
import type { Story } from '../src/learning/stories/types';
import { speakable, type VoiceManifest } from '../src/learning/voice';
import { clipHash, wantedClips } from './voice-clips';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const storyDir = join(root, 'src', 'learning', 'stories');
const PREVIEW_DIR = join(root, '.story-preview');
const [command, ...args] = process.argv.slice(2).filter(arg => arg !== '--');

const camel = (slug: string): string => slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const quote = (text: string): string => `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')}'`;

function staleClips(slug: string): number {
  const file = join(root, 'src', 'data', 'voice-manifest.json');
  const saved = existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as VoiceManifest).clips : {};
  return [...wantedClips()].filter(([key, clip]) => clip.slug === slug
    && (saved[key]?.hash !== clipHash(clip.who, clip.text) || !existsSync(join(root, 'public', 'voice', `${key}.mp3`)))).length;
}

function summary(story: Story): string {
  const figures = story.dialogue.filter(turn => turn.figure).length;
  const film = story.film ? `🎬 ${story.film.scenes.length} 场 ${totalDuration(story.film)} 秒` : '无动画';
  const stale = story.film ? staleClips(story.slug) : 0;
  return `${story.dialogue.length} 轮 · ${figures} 张图 · ${film}${stale ? ` · 🔇 ${stale} 句待配音` : ''}`;
}

function todo(): void {
  let written = 0;
  for (const unit of units) {
    const list = unitLessons(unit.id);
    const done = list.filter(lesson => lesson.story).length;
    written += done;
    console.log(`\n${unit.emoji} ${unit.title}（${unit.id}）  已写 ${done}/${list.length}`);
    for (const lesson of list) {
      const lab = lesson.kind === 'simulation' ? ' · 🔭 3D 实验台' : '';
      const state = lesson.story ? summary(lesson.story) : '还没写';
      console.log(`  ${lesson.story ? '✅' : '⏳'} ${lesson.slug.padEnd(24)} ${lesson.level} · ${state}${lab} · ${lesson.question}`);
    }
  }
  console.log(`\n共 ${lessons.length} 题，已写 ${written} 篇。新题先进 curriculum.ts，再 npm run story:new -- <slug>`);
}

function scaffold(slug: string | undefined): void {
  if (!slug) throw new Error('用法：npm run story:new -- <slug>（slug 要先写进 src/learning/curriculum.ts 的 lessonPlan）');
  const lesson = findLesson(slug);
  if (!lesson) throw new Error(`curriculum.ts 里没有 ${slug}；先在 lessonPlan 对应主题里加这一题`);
  const file = join(storyDir, `${slug}.ts`);
  if (existsSync(file)) throw new Error(`已经有 src/learning/stories/${slug}.ts 了，直接改它`);

  const name = camel(slug);
  const lab = findLabDef(slug);
  const turns = Array.from({ length: 6 }, (_, i) => {
    const first = i === 0;
    const last = i === 5;
    const lines = [
      `      nian: ${quote(first ? `爸爸，${lesson.question}` : last ? '我懂了！……（用自己的话把因果链串一遍）' : '（接住爸爸上一句里的一个两字词往下问）？')},`,
      `      dad: ${quote(first ? lesson.takeaway : '（20–180 字：先回答，再打比方，误区点名说破）')},`,
    ];
    if (lab && i < lab.steps.length) lines.push(`      show: { kind: 'lab', step: ${i}, label: ${quote(`看「${lab.steps[i].title}」`)} },`);
    if (i === 1) lines.push(`      // figure: { kind: 'sim', sim: '', caption: '' },`);
    return `    {\n${lines.join('\n')}\n    },`;
  });
  writeFileSync(file, `import type { Story } from './types';

// 草稿：照 skills/universe-explainer 的讲法改写，再跑 npm run story:check -- ${slug}
export const ${name}: Story = {
  slug: ${quote(slug)},
  title: ${quote(lesson.question)},
  trigger: ${quote(cleanHook(lesson.hook))},
  dialogue: [
${turns.join('\n')}
  ],
  tip: ${quote(`（给大人：观测安全、数字口径、和课本写法的差别、能在家一起做的小实验）${lesson.objectives.join('；')}`)},
  // 数字和说法在哪儿核实的：至少 2 条 https（教材 + NASA / ESA / 国家航天局 / 紫金山天文台等），规矩见 skill 的 sources.md
  sources: [{ title: '', by: '', url: '' }],
  // 讲解动画放在文章右栏，一轮配一到三场戏，写法见 skill 的 film.md；每篇都要有
  film: { scenes: [{ turn: 0, title: '', duration: 10, cues: [] }] },
};
`);

  const indexFile = join(storyDir, 'index.ts');
  const lines = readFileSync(indexFile, 'utf8').split(/\r?\n/);
  const lastImport = lines.reduce((at, line, i) => (line.startsWith('import { ') ? i : at), -1);
  lines.splice(lastImport + 1, 0, `import { ${name} } from './${slug}';`);
  const listEnd = lines.findIndex((line, i) => line === '];' && lines.slice(0, i).some(l => l.startsWith('export const stories')));
  lines.splice(listEnd, 0, `  ${name},`);
  writeFileSync(indexFile, lines.join('\r\n'));

  console.log(`已生成 src/learning/stories/${slug}.ts 并登记到 stories/index.ts。`);
  console.log(`下一步：改写对话、配图、动画 → npm run story:check -- ${slug} → npm run story:frames -- ${slug} → npm run voice -- ${slug}`);
}

/** 不算没过，只是提醒：配音和现在的文字对不上、句子里还有念不出来的符号 */
function warnings(story: Story): string[] {
  const notes: string[] = [];
  if (!story.film) return notes;
  const stale = staleClips(story.slug);
  if (stale) notes.push(`${stale} 句还没配音或文字改过了：npm run voice -- ${story.slug}`);
  story.dialogue.forEach((turn, i) => {
    for (const who of ['nian', 'dad'] as const) {
      const odd = speakable(turn[who])
        .replace(/NASA|ESA|LIGO|FAST|GPS|JWST|DESI|COBE|WMAP|EHT|CSST|3D|M\d+|\d+P号/g, '')
        .replace(/(\p{Script=Han})·(?=\p{Script=Han})/gu, '$1')
        .match(/[₀-₉⁰-⁹⁺⁻☉*/=×·≈→]|[A-Za-z]{2,}/g);
      if (odd) notes.push(`第 ${i + 1} 轮${who === 'nian' ? '小念' : '爸爸'}的话里「${[...new Set(odd)].join(' ')}」念不顺：换成中文说法，或在 voice.ts 的 speakable() 里补读法`);
    }
  });
  return notes;
}

function findBrowser(): string | undefined {
  const candidates = [
    process.env.CHROME_PATH,
    `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/microsoft-edge',
  ];
  return candidates.find((path): path is string => Boolean(path) && existsSync(path!));
}

function screenshot(page: string, png: string, width: number, height: number): void {
  const browser = findBrowser();
  if (!browser) {
    console.log('没找到 Edge / Chrome，直接用浏览器打开上面的 HTML 看；或设置 CHROME_PATH 再跑一次出 PNG。');
    return;
  }
  spawnSync(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${join(PREVIEW_DIR, '.browser')}`,
    `--window-size=${width},${Math.ceil(height)}`, `--screenshot=${png}`, pathToFileURL(page).href], { stdio: 'ignore', timeout: 60000 });
  console.log(existsSync(png) ? `截图：${png}` : '截图没出来，直接用浏览器打开上面的 HTML 看。');
}

const sheetCss = (): string => ['public/theme/tokens.css', 'src/learning/learning.css'].map(file => readFileSync(join(root, file), 'utf8')).join('\n');

/** 每场取开头不久、中间、快结束三个时刻，一行一场，一眼看出元素有没有重叠、字有没有出框、该出现的有没有出现 */
function frames(slug: string | undefined): void {
  if (!slug) throw new Error('用法：npm run story:frames -- <slug>');
  const story = stories.find(item => item.slug === slug);
  if (!story) throw new Error(`stories/index.ts 里没有 ${slug}`);
  if (!story.film) throw new Error(`${slug} 没有讲解动画`);
  const { scenes } = story.film;
  const width = 400;
  const rows = scenes.map((scene, index) => {
    const moments = [0.35, 0.7, 1].map(share => Math.max(0.5, Math.min(scene.duration - 0.35, scene.duration * share)));
    const cells = moments.map((t, k) => `<figure><figcaption>${index + 1}. 第 ${scene.turn + 1} 轮 · ${t.toFixed(1)} 秒</figcaption>`
      + `<div class="film-screen"><div class="film-stage">${renderStage(scene, t, { number: index + 1, isLast: index === scenes.length - 1, stageWidth: width, id: `f${index}-${k}` })}</div></div></figure>`);
    return `<section>${cells.join('')}</section>`;
  });
  mkdirSync(PREVIEW_DIR, { recursive: true });
  const page = join(PREVIEW_DIR, `${slug}-frames.html`);
  writeFileSync(page, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>${slug} 动画联系表</title><style>${sheetCss()}
body { margin: 0; padding: 12px; background: var(--cv-bg); font: 13px/1.4 var(--cv-font); color: var(--cv-text); }
h1 { margin: 0 0 10px; font-size: 18px; }
section { display: grid; grid-template-columns: repeat(3, ${width}px); gap: 10px; margin-bottom: 10px; }
figure { margin: 0; } figcaption { margin-bottom: 3px; color: var(--cv-muted); }
.film-stage { cursor: default; border: 1px solid var(--cv-border); }
</style><body class="learning-app"><h1>${story.title}（${scenes.length} 场 · ${totalDuration(story.film)} 秒）</h1>${rows.join('')}</body></html>`);
  console.log(`联系表：${page}`);
  screenshot(page, join(PREVIEW_DIR, `${slug}-frames.png`), width * 3 + 44, 60 + scenes.length * (width * 0.75 + 32));
}

/** 每个互动图一行：默认值的三个时刻，再加每个滑块拨到最小、最大 */
function simSheet(names: string[]): void {
  const unknown = names.filter(name => !simNames.includes(name as SimName));
  if (!names.length || unknown.length) throw new Error(`用法：npm run story:sims -- <sim...>，可选：${simNames.join('、')}`);
  const width = 460;
  const columns = 3;
  let cells = 0;
  const rows = (names as SimName[]).map(name => {
    const shots: { note: string; values: Record<string, number>; t?: number }[] = [
      { note: '默认', values: {} },
      { note: '默认 · 0.6 秒', values: {}, t: 0.6 },
      { note: '默认 · 2.5 秒', values: {}, t: 2.5 },
      ...simParams(name).flatMap(p => [p.min, p.max].map(value => ({
        note: `${p.label} = ${p.labels ? p.labels[Math.round(value)] : `${value}${p.unit ?? ''}`}`,
        values: { [p.key]: value },
      }))),
    ];
    cells = Math.max(cells, shots.length);
    const figures = shots.map(({ note, values, t }) => {
      const { svg, readout } = simSnapshot(name, values, t);
      return `<figure><figcaption><b>${note}</b></figcaption>${svg}<p>${readout}</p></figure>`;
    });
    return `<h2>${name}</h2><section>${figures.join('')}</section>`;
  });
  mkdirSync(PREVIEW_DIR, { recursive: true });
  const tag = names.length > 3 ? `${names.length}` : names.join('-');
  const page = join(PREVIEW_DIR, `sims-${tag}.html`);
  writeFileSync(page, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>互动图联系表</title><style>${sheetCss()}
body { margin: 0; padding: 12px; background: var(--cv-bg); font: 13px/1.45 var(--cv-font); color: var(--cv-text); }
h2 { margin: 8px 0 6px; font-size: 16px; }
section { display: grid; grid-template-columns: repeat(${columns}, ${width}px); gap: 10px; }
figure { margin: 0; padding: 6px; background: #fff; border: 1px solid var(--cv-border); border-radius: 10px; }
figcaption { margin-bottom: 3px; color: var(--cv-muted); } p { margin: 4px 0 0; color: var(--cv-text-2); }
</style><body class="learning-app">${rows.join('')}</body></html>`);
  console.log(`联系表：${page}`);
  const perRow = Math.ceil(cells / columns);
  screenshot(page, join(PREVIEW_DIR, `sims-${tag}.png`), columns * (width + 10) + 34, 40 + names.length * (36 + perRow * (width * 0.57 + 100)));
}

function check(slugs: string[]): void {
  const targets = slugs.length ? slugs : stories.map(story => story.slug);
  let failed = 0;
  for (const slug of targets) {
    const story = stories.find(item => item.slug === slug);
    if (!story) {
      failed += 1;
      const hint = existsSync(join(storyDir, `${slug}.ts`)) ? '文件在，但还没登记到 stories/index.ts' : `还没写，先 npm run story:new -- ${slug}`;
      console.log(`❌ ${slug}  ${hint}`);
      continue;
    }
    const problems = storyProblems(story, findLesson(slug));
    if (problems.length) failed += 1;
    console.log(`${problems.length ? '❌' : '✅'} ${slug}  ${summary(story)}`);
    for (const problem of problems) console.log(`   - ${problem}`);
    for (const note of warnings(story)) console.log(`   ⚠️ ${note}`);
  }
  console.log(failed ? `\n${failed} 篇没过，改完再跑一次。` : `\n${targets.length} 篇全部通过。浏览器里打开 #q/<slug> 开着声音从头听一遍，再看手机宽度。`);
  if (failed) process.exitCode = 1;
}

try {
  if (command === 'todo') todo();
  else if (command === 'new') scaffold(args[0]);
  else if (command === 'check') check(args);
  else if (command === 'frames') frames(args[0]);
  else if (command === 'sims') simSheet(args);
  else throw new Error('用法：story todo | story new <slug> | story check [slug...] | story frames <slug> | story sims <sim...>');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
