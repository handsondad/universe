import { storyArticle, type Article, type DialogueTurn } from './article';
import { lessonPlan, units, type LessonPlan, type Unit } from './curriculum';
import { findLabDef } from './labs';
import { findStory, type Story } from './stories';

export { units, type Article, type DialogueTurn, type Story, type Unit };

export interface Lesson extends LessonPlan {
  /** native：生活星空问答，配互动图和讲解动画；simulation：同时配有 3D 宇宙实验室 */
  kind: 'native' | 'simulation';
  question: string;
  textbook: string[];
  steps: string[];
  dialogue: DialogueTurn[];
  story?: Story;
  article: Article;
}

function storyDialogue(story: Story): DialogueTurn[] {
  return story.dialogue.map((turn, i) => ({
    tag: story.film?.scenes.find(scene => scene.turn === i)?.title ?? `第 ${i + 1} 问`,
    ask: turn.nian,
    answer: turn.dad,
    eq: turn.eq,
    stepIndex: turn.show?.kind === 'lab' ? turn.show.step : undefined,
  }));
}

export const lessons: Lesson[] = lessonPlan.map(plan => {
  const labDef = findLabDef(plan.slug);
  const story = findStory(plan.slug);
  const question = plan.question ?? findUnit(plan.unit).question;
  const dialogue = story ? storyDialogue(story) : [];
  return {
    ...plan,
    kind: labDef ? 'simulation' : 'native',
    question,
    textbook: plan.textbook ?? ['头顶的宇宙 · 天文观察与原理解释'],
    steps: labDef ? labDef.steps.map(step => step.title) : [],
    dialogue,
    story,
    article: story
      ? storyArticle(story)
      : {
        title: question,
        trigger: plan.hook,
        turns: [{ nian: question, dad: plan.takeaway }],
        tip: plan.objectives.join('；'),
        sources: [],
      },
  };
});

export function findUnit(id: string): Unit {
  const unit = units.find(item => item.id === id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  return unit;
}

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug);
}

export function unitLessons(unitId: string): Lesson[] {
  return lessons.filter(lesson => lesson.unit === unitId);
}

/** 「🔭 3D 宇宙实验台」里只放真正有 3D 实验室的课 */
export const labs: Lesson[] = lessons.filter(lesson => lesson.kind === 'simulation');

export function findLab(slug: string): Lesson | undefined {
  return labs.find(lesson => lesson.slug === slug);
}

export function unitLabs(unitId: string): Lesson[] {
  return labs.filter(lesson => lesson.unit === unitId);
}

/** 「小念还想问」：先接着往后问同一主题里的下一题，不够再从相邻主题补。 */
export function relatedLessons(lesson: Lesson, limit = 3): Lesson[] {
  const siblings = unitLessons(lesson.unit);
  const at = siblings.indexOf(lesson);
  const sameUnit = [...siblings.slice(at + 1), ...siblings.slice(0, at)];
  const index = lessons.indexOf(lesson);
  const nearby = [...lessons.slice(index + 1), ...lessons.slice(0, index)].filter(item => item.unit !== lesson.unit);
  return [...sameUnit, ...nearby].slice(0, limit);
}
