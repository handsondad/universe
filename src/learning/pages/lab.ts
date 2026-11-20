import { cleanHook } from '../article';
import { findUnit, labs, unitLabs, units, type Lesson } from '../catalog';
import { html, setHtml, type SafeHtml } from '../html';
import { findLabDef, type LabControl, type LabState } from '../labs';
import { renderLabCover } from '../labs/covers';
import type { LabSceneHandle } from '../labs/scenes';
import { icon } from '../visuals';
import { openVoiceChannel, readVoicePreference, saveVoicePreference } from '../film/player';
import { isStarted, startLesson } from '../store';
import { labParts, labSpeaker, labVoiceFor, type LabPart } from '../voice';
import { getElement } from '../../utils/dom';
import { avatar } from '../../series/avatar';
import { canUseWebGL } from '../../series/webgl';

/**
 * 「🔭 3D 宇宙实验台」：6 个可交互 Three.js 宇宙实验室，沿用化学奇遇记的双模式交互：
 * - 「看懂原理（watch）」：小念 × 爸爸双气泡分步引导，自动切换 3D 镜头与参数，支持自动播放；
 * - 「自由实验台（lab）」：左侧「🧪 动手试试」、中间 3D 舞台、右侧「🎛️ 调一调」大读数与滑块。
 */

const MODES = [['watch', '看懂原理'], ['lab', '自由实验台']] as const;
type LabMode = typeof MODES[number][0];

/** 没有配音（或关了声音）时，自动演示在每句话后停这么久 */
const SILENT_PAUSE: Record<LabPart, number> = { q: 1800, seen: 2800, concl: 1900 };

let currentLab: Lesson | undefined;
let sceneHandle: LabSceneHandle | undefined;
let silenceLab: (() => void) | undefined;

export function leaveLab(): void {
  silenceLab?.();
  silenceLab = undefined;
  sceneHandle?.destroy();
  sceneHandle = undefined;
  currentLab = undefined;
}

export function isLabOpen(): boolean {
  return Boolean(currentLab);
}

function controlText(ctrl: LabControl, val: number): string {
  if (ctrl.labels) return ctrl.labels[Math.round(val)] ?? '';
  return `${Number.isInteger(ctrl.step) ? Math.round(val) : val.toFixed(1)}${ctrl.unit ?? ''}`;
}

function labCard(lesson: Lesson): SafeHtml {
  const def = findLabDef(lesson.slug);
  const heard = isStarted(lesson.slug);
  return html`
    <a class="lab-card ${heard ? 'is-heard' : ''}" href="#lab/${lesson.slug}">
      <div class="lab-card-cover">${renderLabCover(lesson.slug)}</div>
      <strong>${lesson.title}</strong>
      <small>🔭 3D 宇宙实验 · ${def ? def.steps.length : lesson.steps.length} 段${heard ? ' · ⭐ 看过' : ''}</small>
    </a>`;
}

export function renderLabs(content: HTMLElement): void {
  setHtml(content, html`
    <div class="qlist labs" style="--bubble:#5b3e96">
      <header class="page-top">
        <a class="page-back" href="#home">← 回到首页</a>
        <div>
          <span>${labs.length} 个 3D 宇宙实验 · 按主题分好了</span>
          <h1><span aria-hidden="true">🔭</span> 3D 宇宙实验台</h1>
        </div>
      </header>

      <div class="qlist-intro">
        <p>${avatar('nian')}<span><b>小念：</b>听完爸爸讲宇宙，我想亲手转一转地球、调一调卫星速度和黑洞！</span></p>
        <p>${avatar('dad')}<span><b>爸爸：</b>这里的 3D 太空实验可以随便转视角、调参数。先在「看懂原理」听我们一步步拆解，再到「自由实验台」自己动手试吧！</span></p>
      </div>

      ${units.map(unit => {
        const list = unitLabs(unit.id);
        return list.length ? html`
          <section class="qlist-group" style="--bubble:${unit.color}">
            <h2>${unit.emoji} ${unit.title} <small>${list.length} 个 3D 实验</small></h2>
            <div class="lab-grid">${list.map(labCard)}</div>
          </section>` : '';
      })}
    </div>`);
}

export function renderLab(content: HTMLElement, lesson: Lesson, initialStep = 0): void {
  leaveLab();
  currentLab = lesson;
  const def = findLabDef(lesson.slug);
  if (!def) return;
  startLesson(lesson);
  const unit = findUnit(lesson.unit);

  let mode: LabMode = 'watch';
  let stepIndex = Math.max(0, Math.min(def.steps.length - 1, initialStep));
  let playing = false;
  let revealSeen = false;
  let revealConcl = false;
  const state: LabState = Object.fromEntries(def.controls.map(c => [c.key, def.steps[stepIndex].preset[c.key] ?? c.value]));

  setHtml(content, html`
    <article class="lab-page" style="--bubble:${unit.color}">
      <header class="page-top">
        <a class="page-back" href="#labs">← 🔭 3D 宇宙实验台</a>
        <div>
          <span>${unit.emoji} ${unit.title} · 3D 宇宙实验</span>
          <h1>${lesson.title}</h1>
        </div>
        <a class="page-lab" href="#q/${lesson.slug}">📖 先听爸爸讲</a>
      </header>
      <p class="lab-hook">📍 ${cleanHook(lesson.hook)}</p>

      <div class="player-toolbar" id="player-toolbar">
        <div class="mode-switch" role="group" aria-label="看的方式">${MODES.map(([m, title]) => html`
          <button type="button" data-mode="${m}" aria-pressed="${m === mode}">${title}</button>`)}
        </div>
        <span id="player-status" role="status">看懂原理 · 拖拽画面可旋转 3D 视角，滚轮缩放</span>
        <div class="player-actions">
          <button id="reload-lesson" type="button">重置视角</button>
          <button id="fullscreen-lesson" type="button">${icon('expand')}全屏</button>
        </div>
      </div>

      <div class="ulab-shell is-watch" id="lesson-player">
        <aside class="ulab-side ulab-try" id="ulab-try" aria-label="动手试试"></aside>
        <div class="ulab-stage-wrap">
          <div class="ulab-stage" id="ulab-stage"></div>
          <div class="ulab-watch-card" id="ulab-watch-card" aria-live="polite"></div>
        </div>
        <aside class="ulab-side ulab-controls" id="ulab-controls" aria-label="调一调">
          <div class="ulab-metric" id="ulab-metric"></div>
          <div class="ulab-sliders">
            ${def.controls.map(ctrl => html`
              <label class="ulab-param">
                <span>${ctrl.label}</span>
                <output data-out="${ctrl.key}">${controlText(ctrl, state[ctrl.key])}</output>
                <input type="range" min="${ctrl.min}" max="${ctrl.max}" step="${ctrl.step}" value="${state[ctrl.key]}" data-ctrl="${ctrl.key}">
              </label>`)}
          </div>
        </aside>
      </div>

      <nav class="lab-steps" aria-label="分段看">
        <b>分段看</b>
        ${def.steps.map((step, i) => html`<button type="button" data-lab-step="${i}"><span>${i + 1}</span>${step.title}</button>`)}
      </nav>
    </article>`);

  const shellEl = getElement('lesson-player');
  const stageEl = getElement('ulab-stage');
  const watchCardEl = getElement('ulab-watch-card');
  const tryEl = getElement('ulab-try');
  const metricEl = getElement('ulab-metric');
  const statusEl = getElement('player-status');
  const modeButtons = [...content.querySelectorAll<HTMLButtonElement>('[data-mode]')];
  const stepButtons = [...content.querySelectorAll<HTMLButtonElement>('[data-lab-step]')];
  const inputs = [...content.querySelectorAll<HTMLInputElement>('input[data-ctrl]')];

  const voiceSrc = labVoiceFor(lesson.slug);
  const audio = voiceSrc ? Object.assign(new Audio(), { preload: 'auto' }) : undefined;
  let voiceOn = readVoicePreference();
  let speaking: LabPart | null = null;
  /** 换段、暂停、关声音都换一个号，旧号的念白和等待自己作废 */
  let run = 0;
  let hush: (() => void) | null = null;

  const wait = (ms: number, token: number): Promise<boolean> =>
    new Promise(done => setTimeout(() => done(token === run), ms));

  function silence(): number {
    run += 1;
    hush?.();
    return run;
  }

  function stopAuto(): void {
    playing = false;
    silence();
  }

  function markSpeaking(part: LabPart | null): void {
    speaking = part;
    const who = part ? labSpeaker[part] : null;
    watchCardEl.querySelectorAll<HTMLElement>('.ulab-bubble').forEach(bubble => {
      bubble.classList.toggle('is-speaking', who !== null && bubble.classList.contains(`is-${who}`));
    });
    watchCardEl.querySelectorAll<HTMLElement>('[data-lab-part]').forEach(line => {
      line.classList.toggle('is-speaking', line.dataset.labPart === part);
    });
  }

  /** 念完才 resolve(true)；没开声音、没配音或被打断就是 false */
  function speak(part: LabPart, token: number): Promise<boolean> {
    hush?.();
    const src = voiceSrc?.(stepIndex, part);
    if (!audio || !src || !voiceOn || token !== run) return Promise.resolve(false);
    const player = audio;
    return new Promise(done => {
      let settled = false;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const finish = (spoken: boolean): void => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        hush = null;
        player.onended = player.onerror = player.onloadedmetadata = null;
        markSpeaking(null);
        done(spoken && token === run);
      };
      // 迟迟加载不出来、或者念完了却没等到 ended，都别让演示卡住
      const giveUp = (ms: number): void => {
        clearTimeout(timer);
        timer = setTimeout(() => hush?.(), ms);
      };
      hush = () => {
        player.pause();
        finish(false);
      };
      giveUp(8000);
      player.onloadedmetadata = () => giveUp((Number.isFinite(player.duration) ? player.duration : 30) * 1000 + 2000);
      player.onended = () => finish(true);
      player.onerror = () => finish(false);
      player.src = src;
      markSpeaking(part);
      voiceChannel.claim();
      let started: Promise<void> | undefined;
      try {
        started = player.play();
      } catch (error) {
        started = Promise.reject(error);
      }
      Promise.resolve(started).catch((error: unknown) => {
        // 浏览器不让自动出声：先无声演示，点一下 🔊 就能听
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          voiceOn = false;
          renderStepUI();
        }
        finish(false);
      });
    });
  }

  /** 把这一段念一遍：小念问，爸爸讲「你看到」，再讲「所以」；不出声时每句后停一会儿 */
  async function narrateStep(token: number, pauseWhenSilent: boolean): Promise<boolean> {
    for (const part of labParts) {
      const spoken = await speak(part, token);
      if (token !== run) return false;
      if (!spoken && !pauseWhenSilent) return false;
      if (!(await wait(spoken ? 350 : SILENT_PAUSE[part], token))) return false;
    }
    return true;
  }

  async function autoPlay(token: number): Promise<void> {
    while (token === run) {
      if (!(await narrateStep(token, true))) return;
      if (stepIndex >= def!.steps.length - 1) {
        stopAuto();
        renderStepUI();
        return;
      }
      goStep(stepIndex + 1);
    }
  }

  /** 手动换到一段时念一遍这一段（不自动往下翻） */
  function readStep(): void {
    if (mode === 'watch' && voiceSrc && voiceOn) void narrateStep(run, false);
  }

  function toggleVoice(): void {
    voiceOn = !voiceOn;
    saveVoicePreference(voiceOn);
    const token = silence();
    renderStepUI();
    if (playing) void autoPlay(token);
    else if (voiceOn) void narrateStep(token, false);
  }

  const voiceChannel = openVoiceChannel(() => {
    if (!speaking && !playing) return;
    stopAuto();
    renderStepUI();
  });
  const fsBtn = getElement('fullscreen-lesson');
  const syncFullscreen = (): void => {
    const on = Boolean(document.fullscreenElement);
    setHtml(fsBtn, html`${icon('expand')}${on ? '退出全屏' : '全屏'}`);
    fsBtn.setAttribute('aria-pressed', String(on));
  };
  const onHidden = (): void => {
    if (!document.hidden) return;
    stopAuto();
    renderStepUI();
  };
  document.addEventListener('visibilitychange', onHidden);
  document.addEventListener('fullscreenchange', syncFullscreen);
  silenceLab = () => {
    stopAuto();
    audio?.removeAttribute('src');
    voiceChannel.close();
    document.removeEventListener('visibilitychange', onHidden);
    document.removeEventListener('fullscreenchange', syncFullscreen);
  };

  function syncControls(pushToScene = true): void {
    for (const input of inputs) {
      const key = input.dataset.ctrl!;
      const ctrl = def!.controls.find(c => c.key === key);
      if (!ctrl) continue;
      input.value = String(state[key]);
      const out = content.querySelector<HTMLElement>(`[data-out="${key}"]`);
      if (out) out.textContent = controlText(ctrl, state[key]);
    }
    const m = def!.metric(state);
    setHtml(metricEl, html`
      <span class="ulab-metric-label">${m.label}</span>
      <strong class="ulab-metric-value">${m.value}</strong>
      <small class="ulab-metric-note">${m.note}</small>`);
    if (pushToScene) sceneHandle?.setState(state);
  }

  function renderStepUI(): void {
    const step = def!.steps[stepIndex];
    stepButtons.forEach((btn, i) => btn.classList.toggle('is-active', i === stepIndex));

    setHtml(watchCardEl, html`
      <div class="ulab-watch-top">
        <span class="ulab-watch-badge">第 ${stepIndex + 1} / ${def!.steps.length} 段 · ${step.title}</span>
        <div class="ulab-watch-nav">
          <button type="button" id="ulab-prev" ${stepIndex === 0 ? html`disabled` : ''}>‹ 上一段</button>
          <button type="button" id="ulab-play">${playing ? '⏸ 暂停自动' : '▶ 自动演示'}</button>
          <button type="button" id="ulab-next" ${stepIndex === def!.steps.length - 1 ? html`disabled` : ''}>下一段 ›</button>
          ${voiceSrc ? html`<button type="button" id="ulab-voice" aria-pressed="${voiceOn}" title="${voiceOn ? '关掉小念和爸爸的声音' : '听小念和爸爸讲'}">${voiceOn ? '🔊 讲解' : '🔇 讲解'}</button>` : ''}
        </div>
      </div>
      <div class="ulab-bubbles">
        <p class="ulab-bubble is-nian">${avatar('nian')}<span><b>小念：</b>${step.q}</span></p>
        <div class="ulab-bubble is-dad">
          ${avatar('dad')}
          <div>
            <p data-lab-part="seen"><b>爸爸：</b>${step.seen}</p>
            ${step.eq ? html`<code class="ulab-eq">${step.eq}</code>` : ''}
            <p class="ulab-concl" data-lab-part="concl">💡 <b>所以：</b>${step.concl}</p>
          </div>
        </div>
      </div>`);

    setHtml(tryEl, html`
      <h3>🧪 动手试试</h3>
      <p class="ulab-try-step">第 ${stepIndex + 1} 步 · ${step.title}</p>
      <p class="ulab-try-q">${step.q}</p>
      <p class="ulab-try-task"><b>这一步这样做：</b>${step.task}</p>
      <div class="ulab-try-actions">
        <button type="button" id="ulab-toggle-seen">${revealSeen ? '收起观察提示' : '👀 应该看到什么'}</button>
        <button type="button" id="ulab-toggle-concl">${revealConcl ? '收起结论' : '💡 揭示结论'}</button>
      </div>
      ${revealSeen ? html`<p class="ulab-try-reveal">${step.seen}</p>` : ''}
      ${revealConcl ? html`<p class="ulab-try-reveal is-concl">${step.concl}</p>` : ''}`);

    content.querySelector('#ulab-prev')?.addEventListener('click', () => { stopAuto(); goStep(stepIndex - 1); readStep(); });
    content.querySelector('#ulab-next')?.addEventListener('click', () => { stopAuto(); goStep(stepIndex + 1); readStep(); });
    content.querySelector('#ulab-play')?.addEventListener('click', () => {
      if (playing) {
        stopAuto();
        renderStepUI();
        return;
      }
      const token = silence();
      playing = true;
      if (stepIndex === def!.steps.length - 1) goStep(0);
      else renderStepUI();
      void autoPlay(token);
    });
    content.querySelector('#ulab-voice')?.addEventListener('click', toggleVoice);
    content.querySelector('#ulab-toggle-seen')?.addEventListener('click', () => { revealSeen = !revealSeen; renderStepUI(); });
    content.querySelector('#ulab-toggle-concl')?.addEventListener('click', () => { revealConcl = !revealConcl; renderStepUI(); });
    markSpeaking(speaking);
  }

  function goStep(next: number): void {
    stepIndex = Math.max(0, Math.min(def!.steps.length - 1, next));
    revealSeen = false;
    revealConcl = false;
    const step = def!.steps[stepIndex];
    Object.assign(state, step.preset);
    syncControls();
    sceneHandle?.setCameraTarget(step.camera[0], step.camera[1], step.camera[2]);
    renderStepUI();
  }

  function setMode(next: LabMode): void {
    mode = next;
    if (mode === 'lab') {
      stopAuto();
      renderStepUI();
    }
    shellEl.classList.toggle('is-watch', mode === 'watch');
    shellEl.classList.toggle('is-lab', mode === 'lab');
    modeButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.mode === mode)));
    statusEl.textContent = mode === 'watch'
      ? '看懂原理 · 跟着小念和爸爸逐段看，画面可自由拖拽旋转'
      : '自由实验台 · 自己调右边的滑块，观察 3D 宇宙实时变化';
  }

  modeButtons.forEach(btn => btn.addEventListener('click', () => {
    const m = btn.dataset.mode as LabMode;
    if (m === 'watch' || m === 'lab') setMode(m);
  }));

  stepButtons.forEach((btn, i) => btn.addEventListener('click', () => {
    stopAuto();
    goStep(i);
    readStep();
  }));

  inputs.forEach(input => input.addEventListener('input', () => {
    const key = input.dataset.ctrl!;
    state[key] = Number(input.value);
    syncControls();
  }));

  const showFallback = (): void => {
    setHtml(stageEl, html`<div class="ulab-fallback">${renderLabCover(lesson.slug)}<p>当前浏览器未启用 WebGL，可先阅读「📖 先听爸爸讲」中的互动图解。</p></div>`);
  };
  if (canUseWebGL()) {
    setHtml(stageEl, html`<div class="ulab-fallback">${renderLabCover(lesson.slug)}<p>正在搭建 3D 宇宙……</p></div>`);
    import('../labs/scenes')
      .then(({ mountLabScene }) => {
        if (currentLab !== lesson || !stageEl.isConnected) return;
        stageEl.replaceChildren();
        sceneHandle = mountLabScene(stageEl, lesson.slug, state, def.steps[stepIndex].camera, patch => {
          Object.assign(state, patch);
          syncControls(false);
        });
      })
      .catch(showFallback);
  } else {
    showFallback();
  }

  getElement('reload-lesson').addEventListener('click', () => {
    sceneHandle?.resetCamera();
  });
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void shellEl.requestFullscreen?.();
  });

  goStep(stepIndex);
  setMode('watch');
}
