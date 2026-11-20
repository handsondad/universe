export type LabState = Record<string, number>;

export interface LabControl {
  readonly key: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly value: number;
  readonly unit?: string;
  readonly labels?: readonly string[];
}

export interface LabStep {
  readonly title: string;
  /** 小念提问 */
  readonly q: string;
  /** 可选公式或数据条 */
  readonly eq?: string;
  /** 爸爸：你看到什么 */
  readonly seen: string;
  /** 爸爸：所以原理是什么 */
  readonly concl: string;
  /** 自由实验台：这一步给孩子的动手任务 */
  readonly task: string;
  /** 看懂原理时这一步自动切到的参数 */
  readonly preset: LabState;
  /** 这一步的推荐 3D 观察视角 [方位角 rad, 仰角 rad, 距离] */
  readonly camera: readonly [number, number, number];
}

export interface LabMetric {
  readonly label: string;
  readonly value: string;
  readonly note: string;
}

export interface LabDef {
  readonly slug: string;
  readonly emoji: string;
  readonly subtitle: string;
  readonly accent: string;
  readonly controls: readonly LabControl[];
  readonly steps: readonly LabStep[];
  /** 自由实验台右栏的大读数 */
  metric(state: LabState): LabMetric;
}
