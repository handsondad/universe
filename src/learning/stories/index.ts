import type { Story } from './types';
import { earthSeasonsLab } from './earth-seasons-lab';
import { moonEclipseLab } from './moon-eclipse-lab';
import { moonFarSide } from './moon-far-side';
import { solarSystemLab } from './solar-system-lab';
import { venusHottest } from './venus-hottest';
import { saturnRings } from './saturn-rings';
import { gravityOrbitLab } from './gravity-orbit-lab';
import { oceanTides } from './ocean-tides';
import { gravityAssist } from './gravity-assist';
import { sunFusion } from './sun-fusion';
import { starColors } from './star-colors';
import { starLifecycleLab } from './star-lifecycle-lab';
import { milkyWayBand } from './milky-way-band';
import { lightYearTime } from './light-year-time';
import { darkMatterSpin } from './dark-matter-spin';
import { blackHoleLab } from './black-hole-lab';
import { spaghettification } from './spaghettification';
import { timeDilationGps } from './time-dilation-gps';
import { bigBangExpansion } from './big-bang-expansion';
import { darkNightSky } from './dark-night-sky';
import { stardustElements } from './stardust-elements';
import { spaceTelescope } from './space-telescope';
import { habitableZone } from './habitable-zone';
import { chinaSpaceMissions } from './china-space-missions';
import { bloodMoon } from './blood-moon';
import { moonIllusion } from './moon-illusion';
import { timeZones } from './time-zones';
import { marsRed } from './mars-red';
import { jupiterGiant } from './jupiter-giant';
import { cometMeteor } from './comet-meteor';
import { moonGravity } from './moon-gravity';
import { geostationary } from './geostationary';
import { roundPlanets } from './round-planets';
import { auroraSolarWind } from './aurora-solar-wind';
import { polarisStill } from './polaris-still';
import { constellations3d } from './constellations-3d';
import { andromedaCollision } from './andromeda-collision';
import { hubbleDeepField } from './hubble-deep-field';
import { galaxyShapes } from './galaxy-shapes';
import { gravitationalWaves } from './gravitational-waves';
import { pulsarLighthouse } from './pulsar-lighthouse';
import { wormholeTravel } from './wormhole-travel';
import { cmbAfterglow } from './cmb-afterglow';
import { darkEnergy } from './dark-energy';
import { universeEdge } from './universe-edge';
import { rocketVacuum } from './rocket-vacuum';
import { wenchangLaunch } from './wenchang-launch';
import { fastRadioEye } from './fast-radio-eye';

export type { Cue, Film, FilmScene, ShowFrame, Story, StoryShow, StorySource, StoryTurn, Vec } from './types';

export const stories: readonly Story[] = [
  earthSeasonsLab,
  moonEclipseLab,
  moonFarSide,
  solarSystemLab,
  venusHottest,
  saturnRings,
  gravityOrbitLab,
  oceanTides,
  gravityAssist,
  sunFusion,
  starColors,
  starLifecycleLab,
  milkyWayBand,
  lightYearTime,
  darkMatterSpin,
  blackHoleLab,
  spaghettification,
  timeDilationGps,
  bigBangExpansion,
  darkNightSky,
  stardustElements,
  spaceTelescope,
  habitableZone,
  chinaSpaceMissions,
  bloodMoon,
  moonIllusion,
  timeZones,
  marsRed,
  jupiterGiant,
  cometMeteor,
  moonGravity,
  geostationary,
  roundPlanets,
  auroraSolarWind,
  polarisStill,
  constellations3d,
  andromedaCollision,
  hubbleDeepField,
  galaxyShapes,
  gravitationalWaves,
  pulsarLighthouse,
  wormholeTravel,
  cmbAfterglow,
  darkEnergy,
  universeEdge,
  rocketVacuum,
  wenchangLaunch,
  fastRadioEye,
];

const bySlug = new Map(stories.map(story => [story.slug, story]));

export function findStory(slug: string): Story | undefined {
  return bySlug.get(slug);
}
