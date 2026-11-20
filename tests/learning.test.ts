import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { labs, lessons, unitLabs, unitLessons, units } from '../src/learning/catalog';
import { emptyProgress, PROGRESS_KEY, readProgress, writeProgress } from '../src/learning/progress';
import { findStory } from '../src/learning/stories';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('universe astronomy collection', () => {
  it('sorts everything into 8 astronomy topics', () => {
    expect(units.map(unit => unit.id)).toEqual([
      'earth-moon',
      'solar-system',
      'gravity-orbits',
      'sun-stars',
      'galaxies-milkyway',
      'blackholes-relativity',
      'bigbang-cosmos',
      'space-exploration',
    ]);
    expect(new Set(units.map(unit => unit.color)).size).toBe(units.length);
    for (const unit of units) {
      expect(unit.emoji).not.toBe('');
      expect(unit.kidHook).toMatch(/？$/);
      expect(unit.dadLens.length).toBeGreaterThan(4);
      expect(unit.question).toMatch(/？$/);
    }
    expect(new Set(lessons.map(lesson => lesson.slug)).size).toBe(lessons.length);
    expect(lessons.every(lesson => units.some(unit => unit.id === lesson.unit))).toBe(true);
  });

  it('fills every topic with at least 6 researched questions, each with a written story', () => {
    for (const unit of units) {
      const items = unitLessons(unit.id);
      expect(items.length, unit.id).toBeGreaterThanOrEqual(6);
    }
    expect(lessons.length).toBeGreaterThanOrEqual(48);
    expect(lessons.filter(lesson => !lesson.story).map(lesson => lesson.slug)).toEqual([]);
  });

  it('ships at least 6 native 3D universe labs', () => {
    const simulations = lessons.filter(lesson => lesson.kind === 'simulation');
    expect(simulations.length).toBeGreaterThanOrEqual(6);
    expect(labs).toEqual(simulations);
    for (const lesson of simulations) {
      expect(lesson.steps.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps prerequisite questions pointing backwards, never forwards', () => {
    for (const [index, lesson] of lessons.entries()) {
      expect(lesson.hook.length).toBeGreaterThan(10);
      expect(lesson.objectives.length).toBeGreaterThan(0);
      expect(lesson.takeaway.length).toBeGreaterThan(10);
      for (const prerequisite of lesson.prerequisites) {
        const at = lessons.findIndex(item => item.slug === prerequisite);
        expect(at, `${lesson.slug} -> ${prerequisite}`).toBeGreaterThanOrEqual(0);
        expect(at, `${lesson.slug} -> ${prerequisite}`).toBeLessThan(index);
      }
    }
  });

  it('uses warm-paper ChemVerse tokens with cosmic purple accent', () => {
    const tokens = readFileSync(resolve(root, 'public', 'theme', 'tokens.css'), 'utf8');
    expect(tokens).toContain('--cv-bg: #fff8f0');
    expect(tokens).toContain('--cv-accent: #5b3e96');
    expect(tokens).toContain('color-scheme: light');
  });
});

describe('learning progress', () => {
  beforeEach(() => localStorage.clear());

  it('persists only the opened / read lesson record', () => {
    expect(readProgress()).toEqual(emptyProgress());
    const progress = { started: ['earth-seasons-lab'], completed: ['earth-seasons-lab'], lastLesson: 'earth-seasons-lab' };
    writeProgress(progress);
    expect(readProgress()).toEqual(progress);
  });

  it('drops retired slugs gracefully', () => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      started: ['retired-lesson', 'black-hole-lab'],
      completed: ['retired-lesson', 'black-hole-lab'],
      lastLesson: 'retired-lesson',
    }));
    expect(readProgress()).toEqual({ started: ['black-hole-lab'], completed: ['black-hole-lab'], lastLesson: null });
  });
});

describe('learning workspace', () => {
  let listeners: { type: string; listener: EventListenerOrEventListenerObject }[] = [];
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
    listeners = [];
    localStorage.clear();
    window.history.replaceState(null, '', '/#home');
    const parsed = new DOMParser().parseFromString(indexHtml, 'text/html');
    document.documentElement.lang = parsed.documentElement.lang;
    document.head.innerHTML = parsed.head.innerHTML;
    document.body.innerHTML = parsed.body.innerHTML;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: false })),
    });
  });

  afterEach(() => {
    for (const { type, listener } of listeners) window.removeEventListener(type, listener);
    vi.clearAllTimers();
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  async function start(): Promise<void> {
    const add = window.addEventListener.bind(window);
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
      if (listener && ['hashchange', 'storage'].includes(type)) listeners.push({ type, listener });
      add(type, listener, options);
    });
    await import('../src/main');
    vi.runAllTimers();
  }

  function navigate(hash: string): void {
    window.history.replaceState(null, '', `/${hash}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  it('opens on 小念 and 爸爸 exploring the cosmos, followed by 8 topic cards and the 3D lab card', async () => {
    await start();
    expect(document.querySelector('.home-title h1')?.textContent).toContain('宇宙奇遇记');
    expect(document.getElementById('duo-title')?.textContent).toBe('小念和爸爸探索宇宙的奥秘');
    const cards = [...document.querySelectorAll<HTMLAnchorElement>('.topic-card:not(.is-labs)')];
    expect(cards.map(card => card.getAttribute('href'))).toEqual(units.map(unit => `#topic/${unit.id}`));
    const labCard = document.querySelector('.topic-card.is-labs');
    expect(labCard?.getAttribute('href')).toBe('#labs');
    expect(labCard?.textContent).toContain(`${labs.length} 个实验`);
    const first = document.getElementById('duo-go')?.getAttribute('href');
    document.getElementById('duo-next')!.click();
    expect(document.getElementById('duo-go')?.getAttribute('href')).not.toBe(first);
    expect(document.querySelector('.learning-footer')?.textContent).toContain('宇宙奇遇记');
    const posterPath = resolve(root, 'public', 'images', 'home-duo-poster.webp');
    expect(existsSync(posterPath)).toBe(true);
    expect(readFileSync(posterPath).byteLength).toBeGreaterThan(10_000);
  });

  it('lists questions in a topic and opens a lab story with a link to its 3D lab', async () => {
    const story = findStory('earth-seasons-lab')!;
    await start();
    navigate('#topic/earth-moon');
    expect(document.querySelector('.page-top h1')?.textContent).toContain('地球与月球');
    navigate('#q/earth-seasons-lab');
    expect(document.querySelectorAll('main')).toHaveLength(1);
    expect(document.querySelector('.page-top h1')?.textContent).toBe(story.title);
    expect(document.querySelector('.page-lab')?.getAttribute('href')).toBe('#lab/earth-seasons-lab');
    const stepLinks = [...document.querySelectorAll<HTMLAnchorElement>('.story-action.is-lab')];
    expect(stepLinks.length).toBeGreaterThanOrEqual(4);
    expect(stepLinks.map(link => link.getAttribute('href'))).toContain('#lab/earth-seasons-lab?step=2');
    expect(readProgress().started).toEqual(['earth-seasons-lab']);
  });

  it('gathers all universe labs under #labs, supports ?step= deep links, and preserves custom sliders on camera reset', async () => {
    await start();
    navigate('#lab/earth-seasons-lab?step=2');
    expect(readProgress().started).toEqual(['earth-seasons-lab']);
    expect(document.querySelector('.ulab-watch-badge')?.textContent).toContain('第 3 / 5 段');

    navigate('#labs');
    expect(document.querySelectorAll('.lab-card[href^="#lab/"]')).toHaveLength(labs.length);
    expect(document.querySelector('.lab-card[href="#lab/earth-seasons-lab"]')?.textContent).toContain('⭐ 看过');
    const groups = units.filter(unit => unitLabs(unit.id).length);
    expect(document.querySelectorAll('.labs .qlist-group')).toHaveLength(groups.length);

    navigate('#lab/solar-system-lab');
    const shell = document.querySelector('#lesson-player');
    expect(shell?.classList.contains('ulab-shell')).toBe(true);
    expect(shell?.classList.contains('is-watch')).toBe(true);
    document.querySelector<HTMLButtonElement>('[data-mode="lab"]')?.click();
    expect(shell?.classList.contains('is-lab')).toBe(true);

    const scaleSlider = document.querySelector<HTMLInputElement>('input[data-ctrl="scale"]')!;
    scaleSlider.value = '1';
    scaleSlider.dispatchEvent(new Event('input'));
    expect(document.querySelector('[data-out="scale"]')?.textContent).toBe('突出空旷反差');
    document.getElementById('reload-lesson')!.click();
    expect(scaleSlider.value).toBe('1');
    expect(document.querySelector('[data-out="scale"]')?.textContent).toBe('突出空旷反差');
  });
});
