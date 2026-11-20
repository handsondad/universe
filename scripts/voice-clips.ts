import { createHash } from 'node:crypto';
import type { Speaker } from '../src/learning/film/narration';
import { labDefs } from '../src/learning/labs/index';
import { stories } from '../src/learning/stories/index';
import { clipKey, labClipKey, labParts, labSpeakable, labSpeaker, speakable, voices } from '../src/learning/voice';

export type WantedClip = { readonly slug: string; readonly turn: number; readonly who: Speaker; readonly text: string };

/** 声音、语速或念的字一变，指纹就变，这句就要重新配 */
export function clipHash(who: Speaker, text: string): string {
  const { voice, rate } = voices[who];
  return createHash('sha1').update(`${voice}|${rate}|${text}`).digest('hex').slice(0, 12);
}

/** 有讲解动画的文章，每一轮小念和爸爸各一句 */
export function wantedClips(): Map<string, WantedClip> {
  const wanted = new Map<string, WantedClip>();
  for (const story of stories) {
    if (!story.film) continue;
    story.dialogue.forEach((turn, index) => {
      for (const who of ['nian', 'dad'] as const) {
        wanted.set(clipKey(story.slug, index, who), { slug: story.slug, turn: index, who, text: speakable(turn[who]) });
      }
    });
  }
  return wanted;
}

/** 3D 实验台「看懂原理」：每一段小念问一句，爸爸讲看到了什么、所以怎样 */
export function wantedLabClips(): Map<string, WantedClip> {
  const wanted = new Map<string, WantedClip>();
  for (const lab of labDefs) {
    lab.steps.forEach((step, index) => {
      for (const part of labParts) {
        wanted.set(labClipKey(lab.slug, index, part), { slug: lab.slug, turn: index, who: labSpeaker[part], text: labSpeakable(part, step[part]) });
      }
    });
  }
  return wanted;
}
