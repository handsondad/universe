import labManifest from '../data/lab-voice-manifest.json';
import manifest from '../data/voice-manifest.json';
import type { LineLength, Speaker } from './film/narration';

export const voices = {
  nian: { voice: 'zh-CN-YunxiaNeural', rate: '+0%' },
  dad: { voice: 'zh-CN-YunxiNeural', rate: '-5%' },
} as const satisfies Record<Speaker, { voice: string; rate: string }>;

export const clipKey = (slug: string, turn: number, who: Speaker): string => `${slug}/${turn}-${who}`;

export type VoiceManifest = { voices: typeof voices; clips: Record<string, { hash: string; seconds: number }> };

const ASTRO_SYMBOLS: readonly (readonly [RegExp, string])[] = [
  [/CO₂/g, '二氧化碳'],
  [/H₂O/g, '水'],
  [/M☉/g, '倍太阳质量'],
  [/R☉/g, '倍太阳半径'],
  [/\bkm\/s\b/g, '千米每秒'],
  [/\bm\/s\b/g, '米每秒'],
  [/\bkm\b/g, '千米'],
  [/\bAU\b/g, '天文单位'],
  [/\bμs\b/g, '微秒'],
  [/\bGPS\b/g, '全球定位系统'],
  [/\bJWST\b/g, '韦布望远镜'],
  [/\bL2\b/g, '拉格朗日二号点'],
  [/\bE\s*=\s*mc²/g, '质能方程'],
  [/\bF\s*=\s*ṁ\s*[·×]\s*v\b/g, '推力等于质量流量乘喷气速度'],
  [/ṁ/g, '质量流量'],
  [/\bIa\s*型/g, '一A型'],
  [/(\d+)P\//g, '$1P号'],
  [/([A-Za-z\d])\*/g, '$1'],
  [/\bRs\b/g, '倍史瓦西半径'],
];

/** 文章里的字 → 念出来的字：单位、温度、天文符号与范围换成读法 */
export function speakable(text: string): string {
  let out = text;
  for (const [pattern, name] of ASTRO_SYMBOLS) out = out.replace(pattern, name);
  return out
    .replace(/(\d+(?:\.\d+)?)%\s*[–~～]\s*(\d+(?:\.\d+)?)%/g, '百分之$1到百分之$2')
    .replace(/(\d+(?:\.\d+)?)\s*%/g, '百分之$1')
    .replace(/(\d+)\s*\/\s*(\d+)/g, '$2分之$1')
    .replace(/([\u4e00-\u9fff])\s*\/\s*([\u4e00-\u9fff])/g, '$1每$2')
    .replace(/([\u4e00-\u9fff])-(?=[\u4e00-\u9fff])/g, '$1')
    .replace(/(^|[^\d\w])[−-](\d)/g, '$1负$2')
    .replace(/(\d)\s*[–~～]\s*(\d)/g, '$1到$2')
    .replace(/(\d+(?:\.\d+)?)°/g, '$1度')
    .replace(/\s*℃/g, '摄氏度')
    .replace(/(\d)\s*K(?![A-Za-z])/g, '$1开尔文')
    .replace(/([\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, '$1');
}

export type FilmVoice = {
  readonly turnCount: number;
  readonly lengthOf: LineLength;
  readonly src: (turn: number, who: Speaker) => string;
};

const clips = (manifest as VoiceManifest).clips;

/** 这篇文章的配音；一句都还没配就是 undefined，播放器不显示声音开关 */
export function voiceFor(slug: string, turnCount: number): FilmVoice | undefined {
  if (!clips[clipKey(slug, 0, 'nian')]) return undefined;
  return {
    turnCount,
    lengthOf: (turn, who) => clips[clipKey(slug, turn, who)]?.seconds,
    src: (turn, who) => `${import.meta.env.BASE_URL}voice/${clipKey(slug, turn, who)}.mp3`,
  };
}

// 3D 实验台「看懂原理」也是小念问、爸爸讲：每一段念成 public/voice/lab/<实验>/<段>-<q|seen|concl>.mp3，
// 记在 src/data/lab-voice-manifest.json。
export type LabPart = 'q' | 'seen' | 'concl';
export const labParts: readonly LabPart[] = ['q', 'seen', 'concl'];
export const labSpeaker: Record<LabPart, Speaker> = { q: 'nian', seen: 'dad', concl: 'dad' };
export const labClipKey = (slug: string, step: number, part: LabPart): string => `lab/${slug}/${step}-${part}`;

/** 卡片上写着「💡 所以：」，爸爸念这一段时也先说「所以」 */
export function labSpeakable(part: LabPart, text: string): string {
  const spoken = speakable(text);
  return part === 'concl' && !spoken.startsWith('所以') ? `所以，${spoken}` : spoken;
}

const labClips = (labManifest as VoiceManifest).clips;

/** 这个实验每一段的配音地址；一段都还没配就是 undefined，实验台不显示声音开关 */
export function labVoiceFor(slug: string): ((step: number, part: LabPart) => string | undefined) | undefined {
  if (!labClips[labClipKey(slug, 0, 'q')]) return undefined;
  return (step, part) => {
    const key = labClipKey(slug, step, part);
    return labClips[key] ? `${import.meta.env.BASE_URL}voice/${key}.mp3` : undefined;
  };
}
