import { describe, expect, it } from 'vitest';
import { lessons } from '../src/learning/catalog';
import { renderFigure } from '../src/learning/figures';
import { cameraAt, envelope, pointAlong, sceneAt } from '../src/learning/film/engine';
import { renderStage } from '../src/learning/film/stage';
import { stories } from '../src/learning/stories';
import { dialogueProblems, figureProblems, filmProblems, sourceProblems } from '../src/learning/stories/rules';
import type { Story } from '../src/learning/stories/types';

type FilmStory = Story & { film: NonNullable<Story['film']> };
const filmed = stories.filter((story): story is FilmStory => Boolean(story.film));

const tagged = (check: (story: Story) => string[]) => (story: Story): string[] => check(story).map(problem => `${story.slug}: ${problem}`);
const labOf = (story: Story) => lessons.find(item => item.slug === story.slug);

describe('小念 × 爸爸 universe stories', () => {
  it('follow the dialogue rules', () => {
    expect(stories.flatMap(tagged(story => dialogueProblems(story, labOf(story))))).toEqual([]);
  });

  it('follow the explainer film rules, with one to three scenes per turn', () => {
    expect(stories.flatMap(tagged(filmProblems))).toEqual([]);
  });

  it('give every everyday question and 3D lab a written story with a film', () => {
    const missing = lessons.filter(lesson => !lesson.story?.film).map(lesson => lesson.slug);
    expect(missing).toEqual([]);
  });

  it('cite where the facts were checked, and reject OpenStax', () => {
    expect(stories.flatMap(tagged(sourceProblems))).toEqual([]);

    const draft: Story = {
      slug: 'draft', title: '？', trigger: '', tip: '', dialogue: [
        { nian: '', dad: '', figure: { kind: 'image', src: '/images/photos/moon.webp', alt: '', caption: '' } },
      ],
      sources: [{ title: 'Astronomy 2e', by: 'OpenStax', url: 'http://openstax.org' }],
    };
    expect(sourceProblems(draft)).toEqual([
      '参考来源至少 2 条（教材 + 一处科学机构或论文），现在 1 条',
      '参考来源第 1 条：网址要以 https:// 开头',
      '参考来源第 1 条：OpenStax 的许可不允许 AI 使用，换别的来源',
      '第 1 轮：别人拍的照片要写 credit（作者 · 许可）和原图页 href',
    ]);
  });

  it('illustrate stories with interactive figures', () => {
    expect(stories.flatMap(tagged(figureProblems))).toEqual([]);
    for (const story of stories) {
      story.dialogue.forEach((turn, index) => {
        if (!turn.figure) return;
        const markup = renderFigure(turn.figure, index).value;
        expect(markup, `${story.slug} 第 ${index + 1} 轮配图`).not.toMatch(/NaN|undefined|Infinity/);
      });
    }
  });

  it('render every moment of every film without broken numbers or text', () => {
    for (const story of filmed) {
      story.film.scenes.forEach((scene, index) => {
        for (let t = 0; t <= scene.duration; t += 0.5) {
          const markup = renderStage(scene, t, { number: index + 1, isLast: index === story.film.scenes.length - 1, stageWidth: 600, id: `t-${index}` });
          expect(markup, `${story.slug} 第 ${index + 1} 场 ${t}s`).not.toMatch(/NaN|undefined|Infinity/);
        }
      });
    }
  });

  it('keep lab steps in sync with the catalog', () => {
    for (const story of stories) {
      const lesson = lessons.find(item => item.slug === story.slug)!;
      expect(lesson.story).toBe(story);
      expect(lesson.dialogue.map(turn => turn.ask)).toEqual(story.dialogue.map(turn => turn.nian));
      expect(lesson.dialogue.map(turn => turn.stepIndex)).toEqual(story.dialogue.map(turn => (turn.show?.kind === 'lab' ? turn.show.step : undefined)));
    }
  });
});

describe('film engine', () => {
  const film = { scenes: [{ turn: 0, title: 'a', duration: 4, cues: [] }, { turn: 1, title: 'b', duration: 6, cues: [] }] };

  it('maps film time to scenes and clamps at the end', () => {
    expect(sceneAt(film, 0)).toEqual({ index: 0, local: 0 });
    expect(sceneAt(film, 5)).toEqual({ index: 1, local: 1 });
    expect(sceneAt(film, 99)).toEqual({ index: 1, local: 6 });
  });

  it('walks paths by distance and keeps the camera inside the frame', () => {
    expect(pointAlong([[0, 0], [10, 0], [10, 10]], 0.75)).toEqual([10, 5]);
    expect(cameraAt([{ t: 0, at: [0, 0], zoom: 2 }], 0)).toEqual({ x: 0, y: 0, width: 600, height: 450, zoom: 2 });
    expect(cameraAt(undefined, 3).zoom).toBe(1);
  });

  it('fades cues in after from and out after to', () => {
    expect(envelope(0.9, 1)).toBe(0);
    expect(envelope(3, 1)).toBeCloseTo(1);
    expect(envelope(3, 1, 2)).toBe(0);
  });
});
