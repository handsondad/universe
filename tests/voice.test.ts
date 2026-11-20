import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { clipHash, wantedClips, wantedLabClips } from '../scripts/voice-clips';
import { findLesson } from '../src/learning/catalog';
import { lineAt, narrateFilm, narrationGaps } from '../src/learning/film/narration';
import { mountFilm } from '../src/learning/film/player';
import { labDefs } from '../src/learning/labs';
import { leaveLab, renderLab } from '../src/learning/pages/lab';
import { stories } from '../src/learning/stories';
import type { Film, FilmScene } from '../src/learning/stories/types';
import { clipKey, labSpeakable, speakable, type FilmVoice, type VoiceManifest } from '../src/learning/voice';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'src/data/voice-manifest.json'), 'utf8')) as VoiceManifest;

const scene = (turn: number, duration: number): FilmScene => ({
  turn,
  title: 't',
  duration,
  cues: [{ kind: 'text', at: [600, 450], text: '字', from: 1, to: duration - 1 }],
});

describe('小念和爸爸的配音', () => {
  it('has a clip for every line of every filmed article, reading the current text', () => {
    const problems: string[] = [];
    for (const [key, clip] of wantedClips()) {
      const saved = manifest.clips[key];
      if (!saved) problems.push(`${key} 没有配音`);
      else if (saved.hash !== clipHash(clip.who, clip.text)) problems.push(`${key} 文字改过了`);
      else if (!existsSync(join(root, 'public/voice', `${key}.mp3`))) problems.push(`${key} 缺音频文件`);
    }
    expect(problems.slice(0, 10), `共 ${problems.length} 句要重新配音：npm run voice`).toEqual([]);
  });

  it('voices every 3D lab step with the same two characters: 小念 asks, 爸爸 explains what you see and why', () => {
    const labManifest = JSON.parse(readFileSync(join(root, 'src/data/lab-voice-manifest.json'), 'utf8')) as VoiceManifest;
    expect(labManifest.voices).toEqual(manifest.voices);
    const wanted = wantedLabClips();
    expect(wanted.size).toBe(labDefs.reduce((sum, lab) => sum + lab.steps.length * 3, 0));
    const problems: string[] = [];
    for (const [key, clip] of wanted) {
      expect(clip.who).toBe(key.endsWith('-q') ? 'nian' : 'dad');
      const saved = labManifest.clips[key];
      if (!saved) problems.push(`${key} 没有配音`);
      else if (saved.hash !== clipHash(clip.who, clip.text)) problems.push(`${key} 文字改过了`);
      else if (!existsSync(join(root, 'public/voice', `${key}.mp3`))) problems.push(`${key} 缺音频文件`);
    }
    expect(problems.slice(0, 10), `共 ${problems.length} 段要重新配音：npm run voice -- lab`).toEqual([]);
    expect(labSpeakable('concl', '所有小于 2.6 Rs 的光线都会被黑洞吞没')).toBe('所以，所有小于 2.6 倍史瓦西半径的光线都会被黑洞吞没');
    expect(labSpeakable('seen', '把速度加到 9.6 km/s')).toBe('把速度加到 9.6 千米每秒');
  });

  it('reads a lab step aloud in the watch card, lighting up whoever is speaking', async () => {
    vi.useFakeTimers();
    localStorage.removeItem('universe-film-voice');
    const played: HTMLMediaElement[] = [];
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      played.push(this);
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    const content = document.createElement('div');
    document.body.append(content);
    renderLab(content, findLesson('black-hole-lab')!);
    const card = content.querySelector<HTMLElement>('#ulab-watch-card')!;
    expect(card.querySelector('#ulab-voice')?.getAttribute('aria-pressed')).toBe('true');

    content.querySelector<HTMLButtonElement>('[data-lab-step="1"]')!.click();
    expect(played.at(-1)?.src).toMatch(/\/voice\/lab\/black-hole-lab\/1-q\.mp3$/);
    expect(card.querySelector('.ulab-bubble.is-nian')?.classList.contains('is-speaking')).toBe(true);

    played.at(-1)!.dispatchEvent(new Event('ended'));
    await vi.advanceTimersByTimeAsync(400);
    expect(played.at(-1)?.src).toMatch(/\/voice\/lab\/black-hole-lab\/1-seen\.mp3$/);
    expect(card.querySelector('.ulab-bubble.is-dad')?.classList.contains('is-speaking')).toBe(true);
    expect(card.querySelector('[data-lab-part="seen"]')?.classList.contains('is-speaking')).toBe(true);

    card.querySelector<HTMLButtonElement>('#ulab-voice')!.click();
    expect(localStorage.getItem('universe-film-voice')).toBe('off');
    expect(card.querySelector('.is-speaking')).toBeNull();
    leaveLab();
    content.remove();
    vi.useRealTimers();
  });

  it('silences a speaking 3D lab when a film claims the voice channel', () => {
    localStorage.removeItem('universe-film-voice');
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve());
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);

    const labHost = document.createElement('div');
    const filmHost = document.createElement('div');
    document.body.append(labHost, filmHost);

    renderLab(labHost, findLesson('black-hole-lab')!);
    labHost.querySelector<HTMLButtonElement>('[data-lab-step="1"]')!.click();
    expect(labHost.querySelector('.is-speaking')).not.toBeNull();

    const film: Film = { scenes: [scene(0, 6)] };
    const voice: FilmVoice = { turnCount: 1, lengthOf: () => 2, src: (turn, who) => `/voice/demo/${turn}-${who}.mp3` };
    const handle = mountFilm(filmHost, film, { voice });
    filmHost.querySelector<HTMLButtonElement>('.film-play')!.click();

    expect(labHost.querySelector('.is-speaking')).toBeNull();
    handle.destroy();
    leaveLab();
    labHost.remove();
    filmHost.remove();
  });

  it('reads astronomy notation the way a parent would say it', () => {
    expect(speakable('月球的质量只有地球的约 1/81')).toBe('月球的质量只有地球的约 81分之1');
    expect(speakable('每多 1 米/秒，多运约 10%～15% 的载荷')).toBe('每多 1 米每秒，多运约百分之10到百分之15 的载荷');
    expect(speakable('写成 F = ṁ·v，ṁ 是每秒喷出的质量')).toBe('写成推力等于质量流量乘喷气速度，质量流量是每秒喷出的质量');
    expect(speakable('看 M87* 黑洞，用“Ia 型超新星”')).toBe('看 M87 黑洞，用“一A型超新星”');
    expect(speakable('来自 109P/斯威夫特-塔特尔彗星，表面约 5500 ℃')).toBe('来自 109P号斯威夫特塔特尔彗星，表面约 5500摄氏度');
  });

  it('reads every turn, scene by scene, and the unfilmed turns after the scene before them', () => {
    const film: Film = { scenes: [scene(0, 10), scene(1, 10)] };
    const lengths: Record<string, number> = { '0-nian': 4, '0-dad': 25, '1-nian': 1, '1-dad': 2, '2-nian': 3, '2-dad': 6 };
    const result = narrateFilm(film, 3, (turn, who) => lengths[`${turn}-${who}`])!;
    const [first, second] = result.film.scenes;
    expect(first.duration).toBeCloseTo(narrationGaps.lead + 4 + narrationGaps.between + 25 + narrationGaps.tail);
    expect(second.duration).toBeGreaterThanOrEqual(10);
    expect(result.lines.map(line => `${line.turn}-${line.who}`)).toEqual(['0-nian', '0-dad', '1-nian', '1-dad', '2-nian', '2-dad']);
    expect(lineAt(result.lines, 0.5)).toEqual({ line: result.lines[0], speaking: true });
    expect(narrateFilm(film, 3, (turn, who) => (turn === 2 && who === 'dad' ? undefined : 1)), '缺一句配音就退回无声版').toBeUndefined();
  });

  it('lets the player follow the voice: it reads the line under the playhead, reports who speaks, and can be muted', () => {
    localStorage.removeItem('universe-film-voice');
    const played: string[] = [];
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      played.push(this.src);
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    const film: Film = { scenes: [scene(0, 6), scene(1, 6)] };
    const voice: FilmVoice = { turnCount: 2, lengthOf: () => 3, src: (turn, who) => `/voice/demo/${turn}-${who}.mp3` };
    const lines = narrateFilm(film, 2, voice.lengthOf)!.lines;
    const turns: string[] = [];
    const host = document.createElement('div');
    document.body.append(host);
    const handle = mountFilm(host, film, { voice, onTurn: (turn, who) => turns.push(`${turn}-${who ?? ''}`) });

    const range = host.querySelector<HTMLInputElement>('.film-range')!;
    const voiced = Number(range.max);
    range.value = String(lines[3].start + 0.5);
    range.dispatchEvent(new Event('input'));
    host.querySelector<HTMLButtonElement>('.film-play')!.click();
    expect(played.at(-1)).toMatch(/\/voice\/demo\/1-dad\.mp3$/);
    expect(turns.at(-1)).toBe('1-dad');

    const mute = host.querySelector<HTMLButtonElement>('.film-voice')!;
    expect(mute.getAttribute('aria-pressed')).toBe('true');
    mute.click();
    expect(mute.textContent).toBe('🔇');
    expect(localStorage.getItem('universe-film-voice')).toBe('off');
    expect(Number(range.max)).toBeLessThan(voiced);
    expect(turns.at(-1)).toBe('1-');
    handle.destroy();
    host.remove();
  });

  it('narrates every film from the first turn to the last, without shortening a scene or overlapping two lines', () => {
    for (const story of stories) {
      if (!story.film) continue;
      const result = narrateFilm(story.film, story.dialogue.length, (turn, who) => manifest.clips[clipKey(story.slug, turn, who)]?.seconds);
      expect(result, `${story.slug} 缺配音`).toBeDefined();
      result!.film.scenes.forEach((item, index) => expect(item.duration).toBeGreaterThanOrEqual(story.film!.scenes[index].duration));
      expect(result!.lines.map(line => `${line.turn}-${line.who}`), `${story.slug} 有的轮次没读到`)
        .toEqual(story.dialogue.flatMap((_, turn) => [`${turn}-nian`, `${turn}-dad`]));
      result!.lines.slice(1).forEach((line, index) => {
        const before = result!.lines[index];
        expect(before.start + before.seconds, `${story.slug} 第 ${before.turn + 1} 轮和后一句叠在一起了`).toBeLessThanOrEqual(line.start);
      });
    }
  });
});
