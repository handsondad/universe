import { envelope, totalDuration } from '../film/engine';
import { simNames } from '../sims';
import type { Cue, FilmScene, Story } from './types';

/**
 * 「小念 × 爸爸」文章的写作规矩，`tests/stories.test.ts` 和 `npm run story:check` 共用。
 */

export type LabSize = { readonly steps: readonly unknown[] };

const filler = new Set('的了吗呢吧呀啊哦嘛是我你他她它们这那就也都还又在有和么什怎为个一不没会要说想看能可以得很太好真再');

/** 一句话里有意义的两字词 */
export function topicWords(line: string): Set<string> {
  const words = new Set<string>();
  const chars = [...line];
  for (let i = 0; i < chars.length - 1; i += 1) {
    const [a, b] = [chars[i], chars[i + 1]];
    if (!/\p{Script=Han}/u.test(a) || !/\p{Script=Han}/u.test(b)) continue;
    if (filler.has(a) || filler.has(b)) continue;
    words.add(a + b);
  }
  return words;
}

export function dialogueProblems(story: Story, lab?: LabSize): string[] {
  const problems: string[] = [];
  if (!lab) problems.push('curriculum.ts 里没有这个 slug');
  if (!story.title.includes('？')) problems.push('标题要是小念口吻的问题，带「？」');
  if (story.trigger.length < 8) problems.push('trigger 要用一句话写清小念刚遇到的事');
  const turns = story.dialogue;
  if (turns.length < 5 || turns.length > 8) problems.push(`需要 5–8 轮，现在 ${turns.length} 轮`);
  turns.forEach((turn, i) => {
    const last = i === turns.length - 1;
    if (!last && !turn.nian.includes('？')) problems.push(`第 ${i + 1} 轮：小念要用「？」发问`);
    if (last && !/^我(懂了|明白了)/.test(turn.nian)) problems.push('最后一轮：小念以「我懂了 / 我明白了」开头，用自己的话总结');
    if (i > 0 && ![...topicWords(turn.nian)].some(word => turns[i - 1].dad.includes(word))) {
      problems.push(`第 ${i + 1} 轮：小念的追问要接住爸爸上一句里的一个词`);
    }
    if (turn.dad.length < 20 || turn.dad.length > 180) problems.push(`第 ${i + 1} 轮：爸爸的回答 ${turn.dad.length} 字（20–180）`);
    if (turn.show?.kind === 'steps' && turn.show.frames.length < 2) problems.push(`第 ${i + 1} 轮：图解至少 2 步`);
    if (turn.show?.kind === 'lab' && lab) {
      const steps = lab.steps.length;
      if (!Number.isInteger(turn.show.step) || turn.show.step < 0 || turn.show.step >= steps) {
        problems.push(`第 ${i + 1} 轮：实验台只有第 0–${steps - 1} 段，没有第 ${turn.show.step} 段`);
      }
      const name = lab.steps[turn.show.step];
      if (typeof name === 'string' && turn.show.label && !turn.show.label.includes(name)) {
        problems.push(`第 ${i + 1} 轮：实验台第 ${turn.show.step} 段（从 0 数）是「${name}」，label 却写「${turn.show.label}」`);
      }
    }
  });
  if (story.tip.length < 20) problems.push('「给大人」要写清安全须知或背景（至少 20 字）');
  return problems;
}

const BANNED_SOURCES = /openstax/i;

export function sourceProblems(story: Story): string[] {
  const problems: string[] = [];
  if (story.sources.length < 2) problems.push(`参考来源至少 2 条（教材 + 一处科学机构或论文），现在 ${story.sources.length} 条`);
  story.sources.forEach((source, i) => {
    const where = `参考来源第 ${i + 1} 条`;
    if (!source.title.trim() || !source.by.trim()) problems.push(`${where}：要写资料名和出处`);
    if (source.url && !/^https:\/\/[^\s]+$/.test(source.url)) problems.push(`${where}：网址要以 https:// 开头`);
    if (BANNED_SOURCES.test(`${source.title} ${source.by} ${source.url ?? ''}`)) problems.push(`${where}：OpenStax 的许可不允许 AI 使用，换别的来源`);
  });
  story.dialogue.forEach((turn, i) => {
    const figure = turn.figure;
    if (figure?.kind === 'image' && figure.src.startsWith('/images/photos/') && !(figure.credit && figure.href?.startsWith('https://'))) {
      problems.push(`第 ${i + 1} 轮：别人拍的照片要写 credit（作者 · 许可）和原图页 href`);
    }
  });
  return problems;
}

export function figureProblems(story: Story): string[] {
  const problems: string[] = [];
  const figures = story.dialogue.flatMap((turn, i) => (turn.figure ? [{ figure: turn.figure, at: i + 1 }] : []));
  if (!story.film && figures.length < 3) problems.push(`没有讲解动画的文章要图文并茂：至少 3 轮配图，现在 ${figures.length} 张`);
  const sims = figures.filter(({ figure }) => figure.kind === 'sim');
  if (!sims.length) problems.push('每篇至少配一张能拖滑块的互动图（sim）');
  if (sims.length > 2) problems.push(`互动图每篇最多 2 张，现在 ${sims.length} 张`);
  for (const { figure, at } of figures) {
    if ([...figure.caption].length > 70) problems.push(`第 ${at} 轮：图注 ${[...figure.caption].length} 字（最多 70）`);
    if (figure.kind === 'sim' && !simNames.includes(figure.sim)) problems.push(`第 ${at} 轮：没有「${figure.sim}」这种互动图，只有 ${simNames.join('、')}`);
    if (figure.kind === 'bars') {
      if (figure.bars.length < 2 || figure.bars.length > 6) problems.push(`第 ${at} 轮：柱状图画 2–6 根柱子`);
      if (figure.bars.some(bar => [...bar.label].length > 6 || [...(bar.text ?? '')].length > 12)) problems.push(`第 ${at} 轮：柱子名字最多 6 字、柱尾的数最多 12 字`);
      if (figure.bars.some(bar => !(bar.value > 0))) problems.push(`第 ${at} 轮：柱子的数值要大于 0`);
    }
    if (figure.kind === 'scale') {
      if (figure.stops.length < 3 || figure.stops.length > 5) problems.push(`第 ${at} 轮：色阶尺画 3–5 档`);
      if (figure.axis && [...figure.axis].length > 14) problems.push(`第 ${at} 轮：色阶尺顶栏文字最多 14 字`);
      if (figure.stops.some(stop => [...stop.label].length > 7 || [...stop.note].length > 9)) {
        problems.push(`第 ${at} 轮：色阶尺每档标签最多 7 字、说明最多 9 字`);
      }
    }
  }
  return problems;
}

const LIMITS: Partial<Record<Cue['kind'], number>> = { label: 12, text: 14, arrow: 10, shape: 7, meter: 8, count: 8 };

function cueText(cue: Cue): string | undefined {
  if (cue.kind === 'label' || cue.kind === 'text' || cue.kind === 'meter' || cue.kind === 'count') return 'label' in cue ? cue.label : cue.text;
  if (cue.kind === 'arrow' || cue.kind === 'shape') return cue.text;
  return undefined;
}

function sceneProblems(scene: FilmScene, where: string): string[] {
  const problems: string[] = [];
  if ([...scene.title].length > 12) problems.push(`${where}：标题不超过 12 字`);
  if (scene.duration < 4 || scene.duration > 14) problems.push(`${where}：时长 ${scene.duration} 秒（4–14）`);
  if (scene.cues.length < 2) problems.push(`${where}：至少 2 个元素`);
  for (const key of scene.camera ?? []) if (key.zoom < 1 || key.zoom > 2.6) problems.push(`${where}：镜头倍数 ${key.zoom}（1–2.6）`);
  scene.cues.forEach(cue => {
    if (cue.from > scene.duration - 0.8) problems.push(`${where}：${cue.kind} 出现得太晚（from ≤ 时长 − 0.8）`);
    if (cue.to !== undefined && (cue.to < cue.from + 0.5 || cue.to > scene.duration)) problems.push(`${where}：${cue.kind} 的 to 不合理`);
    const text = cueText(cue);
    const limit = LIMITS[cue.kind];
    if (text && limit && [...text].length > limit) problems.push(`${where}：「${text}」超过 ${limit} 字`);
    if (cue.kind === 'myth' && ([...cue.wrong].length > 18 || [...cue.right].length > 18)) problems.push(`${where}：误会卡每句不超过 18 字`);
    if (cue.kind === 'ray' && cue.path.length < 2) problems.push(`${where}：光线至少 2 个点`);
    if (cue.kind === 'swing' && (cue.angle <= 0 || cue.angle > 80)) problems.push(`${where}：摆角 ${cue.angle}°（0–80）`);
    if (cue.kind === 'toss' && cue.ground <= cue.at[1]) problems.push(`${where}：toss 的地面要在出手点下方`);
  });
  for (let t = 0; t <= scene.duration; t += 0.25) {
    const shown = scene.cues.filter(cue => envelope(t, cue.from, cue.to) > 0.02).length;
    if (shown > 8) {
      problems.push(`${where}：${t} 秒时同屏 ${shown} 个元素（最多 8 个）`);
      break;
    }
  }
  return problems;
}

export function filmProblems(story: Story): string[] {
  if (!story.film) return ['每篇都要配讲解动画（film）'];
  const problems: string[] = [];
  const { scenes } = story.film;
  if (scenes.length < 4) problems.push('讲解动画至少 4 场戏');
  if (scenes[0]?.turn !== 0) problems.push('第一场戏要配第 1 轮对话');
  const total = totalDuration(story.film);
  if (total < 30 || total > 150) problems.push(`全片 ${total} 秒（30–150）`);
  let skipped = 0;
  scenes.forEach((scene, i) => {
    const where = `第 ${i + 1} 场「${scene.title}」`;
    if (i > 0 && scene.turn < scenes[i - 1].turn) problems.push(`${where}：场次要按对话顺序排`);
    if (i > 0) skipped += Math.max(scene.turn - scenes[i - 1].turn - 1, 0);
    if (scene.turn >= story.dialogue.length) problems.push(`${where}：对话没有第 ${scene.turn + 1} 轮`);
    problems.push(...sceneProblems(scene, where));
  });
  if (skipped > 1) problems.push('最多只能跳过 1 轮对话不配戏');
  for (const turn of new Set(scenes.map(scene => scene.turn))) {
    if (scenes.filter(scene => scene.turn === turn).length > 3) problems.push(`第 ${turn + 1} 轮配了超过 3 场戏`);
  }
  return problems;
}

export function storyProblems(story: Story, lab?: LabSize): string[] {
  return [...dialogueProblems(story, lab), ...sourceProblems(story), ...figureProblems(story), ...filmProblems(story)];
}
