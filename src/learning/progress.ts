import { findLesson } from './catalog';

export const PROGRESS_KEY = 'universe.learning.v1';
export interface Progress {
  started: string[];
  completed: string[];
  lastLesson: string | null;
}

export function emptyProgress(): Progress {
  return { started: [], completed: [], lastLesson: null };
}

function isSlugList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string') &&
    new Set(value).size === value.length;
}

// Records that mention lessons removed from the curriculum stay readable: those slugs are dropped.
function knownSlugs(slugs: string[]): string[] {
  return slugs.filter(slug => !!findLesson(slug));
}

export function readProgress(): Progress {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return emptyProgress();
  const data: unknown = JSON.parse(stored);
  if (!data || typeof data !== 'object' || !('started' in data) || !('completed' in data) ||
      !('lastLesson' in data) || !isSlugList(data.started) || !isSlugList(data.completed) ||
      !(data.lastLesson === null || typeof data.lastLesson === 'string')) {
    throw new Error('Invalid learning progress data');
  }
  const { started, completed, lastLesson } = data;
  if (!completed.every(slug => started.includes(slug))) throw new Error('Completed lesson must have been started');
  return {
    started: knownSlugs(started),
    completed: knownSlugs(completed),
    lastLesson: lastLesson !== null && findLesson(lastLesson) ? lastLesson : null,
  };
}

export function writeProgress(progress: Progress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
