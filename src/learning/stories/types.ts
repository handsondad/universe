import type { Figure } from '../figures';

/**
 * 小念 × 爸爸：问题驱动的生物讲解（与「身体奇遇记」「化学奇遇记」「物理奇遇记」同一对角色）。
 */

export type { CharacterId } from '../../series/characters';

export type ShowFrame = { readonly icon: string; readonly label: string };

export type StoryShow =
  | { readonly kind: 'steps'; readonly frames: readonly ShowFrame[] }
  | { readonly kind: 'lab'; readonly step: number; readonly label: string };

export type StoryTurn = {
  readonly nian: string;
  readonly dad: string;
  readonly eq?: string;
  readonly figure?: Figure;
  readonly show?: StoryShow;
};

export type StorySource = {
  readonly title: string;
  readonly by: string;
  readonly url?: string;
};

export type Story = {
  readonly slug: string;
  readonly title: string;
  readonly trigger: string;
  readonly dialogue: readonly StoryTurn[];
  readonly tip: string;
  readonly sources: readonly StorySource[];
  readonly film?: Film;
};

export type Vec = readonly [number, number];

type Timed = {
  readonly from: number;
  readonly to?: number;
};

export type Tint = { readonly color: string; readonly at: number; readonly over?: number };

export type Cue = Timed & (
  | { readonly kind: 'text'; readonly at: Vec; readonly text: string; readonly size?: 's' | 'm' | 'l'; readonly color?: string }
  | { readonly kind: 'formula'; readonly at: Vec; readonly text: string; readonly color?: string }
  | { readonly kind: 'label'; readonly at: Vec; readonly pos: Vec; readonly text: string; readonly color?: string }
  | {
    readonly kind: 'atom';
    readonly path: readonly Vec[];
    readonly symbol: string;
    readonly color: string;
    readonly r?: number;
    readonly charge?: string;
    readonly travel?: number;
    readonly motion?: 'jitter' | 'pulse';
  }
  | { readonly kind: 'bond'; readonly a: Vec; readonly b: Vec; readonly order?: 1 | 2; readonly color?: string }
  | {
    readonly kind: 'shape';
    readonly shape: 'circle' | 'rect' | 'pill';
    readonly at: Vec;
    readonly size: Vec;
    readonly color: string;
    readonly text?: string;
    readonly tint?: Tint;
    readonly slide?: { readonly to: Vec; readonly at: number; readonly over?: number };
    readonly motion?: 'pulse' | 'wiggle' | 'grow' | 'shrink';
    readonly over?: number;
    readonly outline?: boolean;
  }
  | {
    readonly kind: 'vessel';
    readonly vessel: 'beaker' | 'flask' | 'jar';
    readonly at: Vec;
    readonly size: Vec;
    readonly liquid?: string;
    readonly level?: number;
    readonly rise?: { readonly to: number; readonly at: number; readonly over?: number };
    readonly tint?: Tint;
    readonly label?: string;
  }
  | {
    readonly kind: 'particles';
    readonly box: readonly [number, number, number, number];
    readonly count: number;
    readonly color: string;
    readonly motion: 'gas' | 'jitter' | 'rise';
    readonly size?: number;
    readonly symbol?: string;
    readonly amount?: { readonly at: number; readonly over: number; readonly from: number; readonly to: number };
  }
  | { readonly kind: 'sprite'; readonly icon: string; readonly path: readonly Vec[]; readonly size?: number; readonly travel?: number; readonly wobble?: boolean }
  | { readonly kind: 'arrow'; readonly path: readonly Vec[]; readonly color?: string; readonly text?: string; readonly draw?: number }
  | { readonly kind: 'flow'; readonly path: readonly Vec[]; readonly color?: string; readonly count?: number; readonly speed?: number; readonly size?: number; readonly loop?: boolean }
  | { readonly kind: 'pulse'; readonly at: Vec; readonly color?: string; readonly radius?: number; readonly rate?: number }
  | { readonly kind: 'meter'; readonly at: Vec; readonly label: string; readonly start: number; readonly end: number; readonly color?: string; readonly over?: number }
  | { readonly kind: 'count'; readonly at: Vec; readonly label: string; readonly start: number; readonly end: number; readonly unit?: string; readonly over?: number }
  | { readonly kind: 'myth'; readonly wrong: string; readonly right: string }
  | {
    readonly kind: 'wave';
    readonly a: Vec;
    readonly b: Vec;
    readonly amplitude?: number;
    readonly wavelength?: number;
    readonly speed?: number;
    readonly color?: string;
  }
  | { readonly kind: 'ray'; readonly path: readonly Vec[]; readonly color?: string; readonly draw?: number }
  | {
    readonly kind: 'swing';
    readonly pivot: Vec;
    readonly length: number;
    readonly angle: number;
    readonly period?: number;
    readonly damping?: number;
    readonly color?: string;
    readonly icon?: string;
  }
  | {
    readonly kind: 'toss';
    readonly at: Vec;
    readonly velocity: Vec;
    readonly gravity?: number;
    readonly ground: number;
    readonly color?: string;
    readonly icon?: string;
  }
);

export type CameraKey = { readonly t: number; readonly at: Vec; readonly zoom: number };

export type FilmScene = {
  readonly turn: number;
  readonly title: string;
  readonly duration: number;
  readonly camera?: readonly CameraKey[];
  readonly cues: readonly Cue[];
};

export type Film = { readonly scenes: readonly FilmScene[] };
