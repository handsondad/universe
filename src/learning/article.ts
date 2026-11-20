import type { Figure } from './figures';
import type { Film, Story, StorySource } from './stories/types';

export interface DialogueTurn {
  tag: string;
  ask: string;
  answer: string;
  lead?: string;
  eq?: string;
  phenomenon?: string;
  wrong?: string;
  steps?: { icon: string; label: string }[];
  stepIndex?: number;
}

/** 文章页里的一轮：小念问一句，爸爸答一段（可带公式、配图、互动图、3D 实验台跳转）。 */
export interface ArticleTurn {
  nian: string;
  dad: string;
  eq?: string;
  figure?: Figure;
  frames?: readonly { icon: string; label: string }[];
  labStep?: { readonly step: number; readonly label: string };
}

/** 每个问题都渲染成同一种「小念 × 爸爸」文章；写了讲解动画的，页面变成左问答、右动画。 */
export interface Article {
  title: string;
  trigger: string;
  turns: ArticleTurn[];
  tip: string;
  sources: readonly StorySource[];
  film?: Film;
}

export function cleanHook(hook: string): string {
  return hook.replace(/^头顶的宇宙\s*·\s*/, '');
}

export function storyArticle(story: Story): Article {
  return {
    title: story.title,
    trigger: story.trigger,
    tip: story.tip,
    sources: story.sources,
    film: story.film,
    turns: story.dialogue.map(turn => ({
      nian: turn.nian,
      dad: turn.dad,
      eq: turn.eq,
      figure: turn.figure,
      frames: turn.show?.kind === 'steps' ? turn.show.frames : undefined,
      labStep: turn.show?.kind === 'lab' ? { step: turn.show.step, label: turn.show.label } : undefined,
    })),
  };
}
