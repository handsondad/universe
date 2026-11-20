import './learning.css';
import { findLab, findLesson, units } from './catalog';
import { html, setHtml } from './html';
import { initProgressStore, reloadProgress } from './store';
import { leaveHome, renderHome } from './pages/home';
import { isLabOpen, leaveLab, renderLab, renderLabs } from './pages/lab';
import { renderTopic } from './pages/topic';
import { getElement } from '../utils/dom';

/** 问答页带着全部互动图解（simlib），只在打开问答时才加载，首页不用背着它 */
type LessonPage = typeof import('./pages/lesson');
let lessonPage: LessonPage | undefined;
const loadLessonPage = (): Promise<LessonPage> => import('./pages/lesson').then(page => (lessonPage = page));

/** 和「身体奇遇记」「化学奇遇记」「物理奇遇记」一样没有顶栏：首页大标题就是招牌，其余页面都有「← 返回」。 */
const shell = html`
  <a class="skip-link" href="#learning-content">跳到正文内容</a>
  <p class="storage-notice" id="storage-notice" role="alert" hidden></p>
  <main id="learning-content" tabindex="-1"></main>
  <footer class="learning-footer">奇遇记系列 · 宇宙奇遇记 —— 小念一问，爸爸一答，把头顶的宇宙看个明白</footer>`;

const notFound = html`
  <section class="empty-state">
    <h1>这个问题还没写好</h1>
    <p>回到首页，挑一个别的问题吧。</p>
    <a class="page-back" href="#home">← 回到首页</a>
  </section>`;

const loadFailed = html`
  <section class="empty-state">
    <h1>这一页没加载出来</h1>
    <p>可能是网络断了一下，刷新页面再试试。</p>
    <a class="page-back" href="#home">← 回到首页</a>
  </section>`;

const HOME_PAGES = new Set(['home', 'path', 'courses', 'progress']);

export function initLearningApp(): void {
  const root = getElement('app-content');
  root.classList.add('learning-app');
  setHtml(root, shell);
  const content = getElement('learning-content');
  const notice = getElement('storage-notice');

  initProgressStore({
    onError(error) {
      console.error('UniVerse learning progress could not be saved or restored.', error);
      notice.hidden = false;
      notice.textContent = '无法读取或保存本机记录（浏览器存储受限或记录损坏）。阅读不受影响，只是「看过」的标记不会保留。';
    },
    onChange: () => {},
  });

  let routeId = 0;

  function route(focus = false): void {
    if (location.hash === '#learning-content') {
      content.focus();
      return;
    }
    const thisRoute = (routeId += 1);
    lessonPage?.leaveLesson();
    leaveLab();
    leaveHome();
    content.replaceChildren();

    const [rawPage, query = ''] = (location.hash.slice(1) || 'home').split('?');
    const page = rawPage || 'home';
    const [kind, id = ''] = page.split('/');
    const rawStep = new URLSearchParams(query).get('step');
    const stepParam = rawStep !== null && /^\d+$/.test(rawStep) ? Number(rawStep) : 0;
    const unit = kind === 'topic' || kind === 'unit' ? units.find(item => item.id === id) : undefined;
    const lab = kind === 'lab' ? findLab(id) : undefined;
    const lesson = kind === 'q' || kind === 'lesson' || kind === 'lab' ? findLesson(id) : undefined;
    if (kind === 'lab' && !lab && lesson) history.replaceState(null, '', `#q/${lesson.slug}`);

    let title = '小念和爸爸探索宇宙的奥秘';
    if (HOME_PAGES.has(page)) {
      renderHome(content);
    } else if (page === 'labs') {
      title = '3D 宇宙实验台';
      renderLabs(content);
    } else if (lab) {
      title = `3D 宇宙实验台 · ${lab.title}`;
      renderLab(content, lab, stepParam);
    } else if (unit) {
      title = unit.title;
      renderTopic(content, unit);
    } else if (lesson) {
      title = lesson.article.title;
      loadLessonPage().then(
        page => {
          if (thisRoute === routeId) page.renderLesson(content, lesson);
        },
        (error: unknown) => {
          console.error('UniVerse lesson page failed to load.', error);
          if (thisRoute === routeId) setHtml(content, loadFailed);
        },
      );
    } else {
      title = '页面未找到';
      setHtml(content, notFound);
    }

    document.title = `宇宙奇遇记 · ${title}`;
    if (focus) {
      content.focus({ preventScroll: true });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  window.addEventListener('hashchange', () => route(true));
  window.addEventListener('storage', () => {
    if (reloadProgress() && !lessonPage?.isLessonOpen() && !isLabOpen()) route();
  });
  route();
  // 首页先轻装出场，加载完、空下来再把问答页拉进缓存，点进去就不用等
  const idle = window.requestIdleCallback ?? ((run: () => void) => window.setTimeout(run, 2000));
  const prefetch = (): void => void idle(() => void loadLessonPage().catch(() => {}));
  if (document.readyState === 'complete') prefetch();
  else window.addEventListener('load', prefetch, { once: true });
}
