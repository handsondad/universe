import { findLesson, findUnit, relatedLessons, type Lesson } from '../catalog';
import type { ArticleTurn } from '../article';
import { levelStars } from '../components';
import { renderFigure } from '../figures';
import { html, setHtml, type SafeHtml } from '../html';
import { mountSims } from '../sims';
import { startLesson } from '../store';
import { getElement } from '../../utils/dom';
import { filmTurns, mountFilm, type FilmHandle } from '../film/player';
import type { Speaker } from '../film/narration';
import { voiceFor } from '../voice';
import { avatar, characterNames } from '../../series/avatar';

let currentLesson: Lesson | undefined;
let activeFilm: FilmHandle | undefined;
let releaseSims: (() => void) | undefined;

export function leaveLesson(): void {
  activeFilm?.destroy();
  activeFilm = undefined;
  releaseSims?.();
  releaseSims = undefined;
  currentLesson = undefined;
}

export function isLessonOpen(): boolean {
  return Boolean(currentLesson);
}

function renderTurn(turn: ArticleTurn, index: number, last: boolean, scenes: Set<number>): SafeHtml {
  const { figure } = turn;
  const wide = figure?.kind === 'sim';
  return html`
    <article class="story-turn ${last ? 'is-epiphany' : ''}" id="qa-turn-${index}" data-turn-index="${index}" style="--i:${index}">
      <div class="story-line is-nian">
        <span class="story-avatar">${avatar('nian')}</span>
        <div class="story-bubble">
          <span class="story-name">${characterNames.nian}</span>
          <p>${turn.nian}</p>
        </div>
      </div>
      <div class="story-line is-dad">
        <span class="story-avatar">${avatar('dad')}</span>
        <div class="story-bubble ${figure && !wide ? 'has-figure' : ''}">
          <span class="story-name">${characterNames.dad}</span>
          ${turn.lead ? html`<p class="story-lead">${turn.lead}</p>` : ''}
          <p>${turn.dad}</p>
          ${turn.eq ? html`<code class="qa-eq">${turn.eq}</code>` : ''}
          ${figure && !wide ? renderFigure(figure, index) : ''}
          ${turn.frames?.length ? html`
            <ol class="qa-steps" aria-label="图解">
              ${turn.frames.map((frame, i) => html`<li style="--i:${i}"><span aria-hidden="true">${frame.icon}</span><small>${frame.label}</small></li>`)}
            </ol>` : ''}
          ${turn.see ? html`<p class="story-see"><b>👀 你会看到</b>${turn.see}</p>` : ''}
          ${turn.myth ? html`<p class="story-myth"><b>⚠️ 别弄错</b>${turn.myth}</p>` : ''}
          ${scenes.has(index) ? html`
            <div class="story-actions">
              <button type="button" class="story-action" data-film-turn="${index}" aria-label="播放这一轮的讲解动画">🎬 看动画</button>
            </div>` : ''}
        </div>
      </div>
      ${figure && wide ? html`<div class="story-sim">${renderFigure(figure, index)}</div>` : ''}
    </article>`;
}

export function renderLesson(content: HTMLElement, lesson: Lesson): void {
  activeFilm?.destroy();
  activeFilm = undefined;
  releaseSims?.();
  currentLesson = lesson;
  startLesson(lesson);
  const { article } = lesson;
  const { film } = article;
  const unit = findUnit(lesson.unit);
  const scenes = film ? filmTurns(film) : new Set<number>();
  const hasSim = article.turns.some(turn => turn.figure?.kind === 'sim');

  setHtml(content, html`
    <article class="qa-page" style="--bubble:${unit.color}">
      <header class="page-top">
        <a class="page-back" href="#topic/${unit.id}">← ${unit.emoji} ${unit.title}</a>
        <div>
          <span>${levelStars(lesson.level)} ${lesson.level} · ${lesson.topic} · 💬 ${article.turns.length} 问 ${article.turns.length} 答${film ? ' · 🎬 有讲解动画' : ''}${hasSim ? ' · 👆 能动手拖' : ''}</span>
          <h1>${article.title}</h1>
        </div>
        ${lesson.kind === 'simulation' ? html`<a class="page-lab" href="#lab/${lesson.slug}">🔭 去 3D 实验台</a>` : ''}
      </header>

      <div class="qa-main ${film ? 'has-film' : ''}">
        <section class="story-chat" aria-label="小念和爸爸的对话">
          <p class="story-scene">📍 ${article.trigger}</p>
          ${article.turns.map((turn, i) => renderTurn(turn, i, i === article.turns.length - 1, scenes))}
        </section>
        ${film ? html`<aside class="qa-film" id="qa-stage" aria-label="讲解动画"><div id="film-host"></div></aside>` : ''}
      </div>

      <footer class="qa-wrap">
        <section class="qa-more" aria-labelledby="more-title">
          <h2 id="more-title">${avatar('nian')} 小念还想问</h2>
          <div class="qa-more-list">
            ${relatedLessons(lesson, 3).map(item => html`
              <a href="#q/${item.slug}"><strong>${item.article.title}</strong><small>${findUnit(item.unit).emoji} ${findUnit(item.unit).title}${item.article.film ? ' · 🎬 有动画' : ''}${item.kind === 'simulation' ? ' · 🔭 有 3D 实验' : ''}</small></a>`)}
          </div>
        </section>
        <details class="qa-tip">
          <summary>👨‍👩‍👧 给大人</summary>
          <p>${article.tip}</p>
          ${lesson.prerequisites.length ? html`
            <p class="qa-prereq">想先打个底，可以一起看：${lesson.prerequisites.map(slug => {
              const before = findLesson(slug);
              return before ? html`<a href="#q/${slug}">${before.article.title}</a>` : '';
            })}</p>` : ''}
          <p class="qa-textbook">对应课本：${lesson.textbook.join('；')}</p>
          <div class="qa-sources">
            <strong>📚 参考来源</strong>
            <ul>${article.sources.map(source => html`
              <li>${source.url ? html`<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.title}</a>` : source.title}<small> · ${source.by}</small></li>`)}
            </ul>
          </div>
        </details>
      </footer>
    </article>`);

  releaseSims = mountSims(content);

  let spokenTurn: number | null = null;
  if (film) {
    activeFilm = mountFilm(getElement('film-host'), film, {
      id: `film-${lesson.slug}`,
      voice: voiceFor(lesson.slug, article.turns.length),
      onTurn: markFilmTurn,
    });
    content.querySelectorAll<HTMLButtonElement>('[data-film-turn]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilm?.playTurn(Number(btn.dataset.filmTurn));
        const stage = document.getElementById('qa-stage');
        if (!stage) return;
        const { top, bottom } = stage.getBoundingClientRect();
        if (top < 0 || bottom > innerHeight + 1) stage.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function markFilmTurn(turn: number | null, who?: Speaker): void {
    content.querySelectorAll<HTMLElement>('[data-turn-index]').forEach(node => {
      const current = Number(node.dataset.turnIndex) === turn;
      node.classList.toggle('is-playing', current);
      node.querySelectorAll<HTMLElement>('.story-line').forEach(line => {
        line.classList.toggle('is-speaking', current && line.classList.contains(`is-${who}`));
      });
    });
    if (turn === spokenTurn) return;
    spokenTurn = turn;
    if (turn !== null && window.matchMedia?.('(min-width: 901px)').matches) {
      document.getElementById(`qa-turn-${turn}`)?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
