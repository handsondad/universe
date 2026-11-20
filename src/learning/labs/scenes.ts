import * as THREE from 'three';
import type { LabState } from './types';

export interface LabSceneHandle {
  setState(state: LabState): void;
  setCameraTarget(az: number, el: number, dist: number): void;
  resetCamera(): void;
  destroy(): void;
}

interface LabWorld {
  update(state: LabState, t: number, dt: number, sync?: (patch: LabState) => void): void;
  focusTarget?(state: LabState): THREE.Vector3;
}

function makeStarfield(count = 420, radius = 48): THREE.Points {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [new THREE.Color('#fff8dc'), new THREE.Color('#cfe5ff'), new THREE.Color('#ffd8a8'), new THREE.Color('#d0bfff')];
  for (let i = 0; i < count; i += 1) {
    const u = ((i * 2654435761) >>> 0) / 4294967296;
    const v = (((i + 17) * 2246822519) >>> 0) / 4294967296;
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.75 + (i % 7) * 0.04);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    const c = palette[i % palette.length];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.24, vertexColors: true, transparent: true, opacity: 0.88 }));
}

function makeOrbitRing(radius: number, color = '#7b6fa8', segments = 96): THREE.LineLoop {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  return new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.65 }),
  );
}

/** 1. 地球倾斜与四季昼夜 3D 实验室 */
function buildEarthSeasons(scene: THREE.Scene): LabWorld {
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 32, 24),
    new THREE.MeshBasicMaterial({ color: '#ffb703' }),
  );
  const sunHalo = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 24, 18),
    new THREE.MeshBasicMaterial({ color: '#ffd43b', transparent: true, opacity: 0.22 }),
  );
  scene.add(sun, sunHalo);

  const sunLight = new THREE.PointLight('#fff4d6', 3.4, 45, 0.4);
  scene.add(sunLight);

  const orbitR = 4.6;
  scene.add(makeOrbitRing(orbitR, '#9775fa'));

  const earthCarrier = new THREE.Group();
  const tiltGroup = new THREE.Group();
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.82, 32, 24),
    new THREE.MeshStandardMaterial({ color: '#3b82f6', roughness: 0.65, metalness: 0.05 }),
  );
  // 简化的大陆块，帮助孩子看清自转与南北半球
  const landMat = new THREE.MeshStandardMaterial({ color: '#4caf50', roughness: 0.78 });
  const patches: [number, number, number, number][] = [
    [0.52, 0.45, 0.35, 0.28], [-0.45, 0.38, 0.48, 0.26], [0.22, -0.42, 0.62, 0.24], [-0.48, -0.35, -0.45, 0.22],
  ];
  for (const [x, y, z, r] of patches) {
    const p = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), landMat);
    p.position.set(x, y, z).normalize().multiplyScalar(0.76);
    earth.add(p);
  }
  const northCap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), new THREE.MeshStandardMaterial({ color: '#f8f9fa', roughness: 0.9 }));
  northCap.position.y = 0.68;
  const southCap = northCap.clone();
  southCap.position.y = -0.68;
  earth.add(northCap, southCap);

  const axis = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 2.45, 10),
    new THREE.MeshBasicMaterial({ color: '#ffe066' }),
  );
  const equator = new THREE.Mesh(
    new THREE.TorusGeometry(0.84, 0.014, 8, 48),
    new THREE.MeshBasicMaterial({ color: '#ffd43b' }),
  );
  equator.rotation.x = Math.PI / 2;

  tiltGroup.add(earth, axis, equator);
  earthCarrier.add(tiltGroup);
  scene.add(earthCarrier);

  // 太阳直射光束指示线
  const rayGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(orbitR, 0, 0)]);
  const rayLine = new THREE.Line(rayGeo, new THREE.LineBasicMaterial({ color: '#ff9f43', transparent: true, opacity: 0.75 }));
  scene.add(rayLine);

  let simMonth = 6;
  let lastSliderMonth = -1;
  return {
    update(state, t, dt, sync) {
      if (state.month !== lastSliderMonth) {
        simMonth = state.month;
        lastSliderMonth = state.month;
      }
      if (state.speed >= 0.5 && dt > 0) {
        simMonth += dt * 1.4;
        if (simMonth >= 12.5) simMonth -= 12;
        const rounded = Math.max(1, Math.min(12, Math.round(simMonth)));
        if (rounded !== lastSliderMonth) {
          lastSliderMonth = rounded;
          sync?.({ month: rounded });
        }
      }
      const angle = ((simMonth - 3) / 12) * Math.PI * 2;
      const ex = Math.cos(angle) * orbitR;
      const ez = Math.sin(angle) * orbitR;
      earthCarrier.position.set(ex, 0, ez);
      tiltGroup.rotation.z = -(state.tilt * Math.PI) / 180;
      earth.rotation.y += dt * 1.1;
      rayGeo.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(ex, 0, ez)]);
      sunHalo.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
    },
  };
}

/** 2. 月相与日月食 3D 实验室 */
function buildMoonEclipse(scene: THREE.Scene): LabWorld {
  const dirLight = new THREE.DirectionalLight('#fff8e6', 2.8);
  dirLight.position.set(-14, 0, 0);
  scene.add(dirLight);

  // 左侧太阳示意球与平行光束
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1.3, 28, 20), new THREE.MeshBasicMaterial({ color: '#ffb703' }));
  sun.position.set(-8.5, 0, 0);
  scene.add(sun);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 32, 24),
    new THREE.MeshStandardMaterial({ color: '#3b82f6', roughness: 0.6 }),
  );
  scene.add(earth);

  // 地球背后的阴影锥
  const shadowCone = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 1.05, 5.8, 24, 1, true),
    new THREE.MeshBasicMaterial({ color: '#110d24', transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
  );
  shadowCone.rotation.z = -Math.PI / 2;
  shadowCone.position.set(3.4, 0, 0);
  scene.add(shadowCone);

  const orbitPivot = new THREE.Group();
  const orbitRing = makeOrbitRing(3.6, '#b197fc');
  orbitPivot.add(orbitRing);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.36, 24, 18),
    new THREE.MeshStandardMaterial({ color: '#e9e2d0', roughness: 0.9 }),
  );
  const moonShadow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.36, 3.6, 18, 1, true),
    new THREE.MeshBasicMaterial({ color: '#0b0818', transparent: true, opacity: 0.52, side: THREE.DoubleSide }),
  );
  moonShadow.rotation.z = -Math.PI / 2;
  moonShadow.position.set(1.9, 0, 0);
  moon.add(moonShadow);

  orbitPivot.add(moon);
  scene.add(orbitPivot);

  return {
    update(state, _t, dt) {
      earth.rotation.y += dt * 0.45;
      const distR = state.dist === 1 ? 4.35 : 3.45;
      orbitRing.scale.setScalar(distR / 3.6);
      // 放大 5.1° 倾角到直观可读的 14° 视觉角度，让孩子在 3D 里清晰看懂“上下错开”
      orbitPivot.rotation.z = state.inclined === 1 ? (14 * Math.PI) / 180 : 0;
      const phase = ((state.day - 1) / 29.5) * Math.PI * 2;
      const mx = -Math.cos(phase) * distR;
      const mz = Math.sin(phase) * distR;
      moon.position.set(mx, 0, mz);
      const inLunarEclipse = state.inclined === 0 && Math.abs(state.day - 15) <= 1;
      (moon.material as THREE.MeshStandardMaterial).color.set(inLunarEclipse ? '#c94a38' : '#e9e2d0');
      moonShadow.visible = state.day <= 3 || state.day >= 28;
      moonShadow.scale.set(1, state.dist === 1 ? 0.82 : 1.05, 1);
    },
  };
}

/** 3. 太阳系八大行星轨道 3D 实验室 */
function buildSolarSystem(scene: THREE.Scene): LabWorld {
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 24), new THREE.MeshBasicMaterial({ color: '#ffb703' }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(1.42, 24, 18), new THREE.MeshBasicMaterial({ color: '#ffd43b', transparent: true, opacity: 0.2 }));
  scene.add(sun, halo);
  scene.add(new THREE.PointLight('#fff6df', 3.6, 65, 0.25));

  const specs = [
    { r: 2.0, wideR: 1.05, size: 0.16, speed: 2.2, color: '#adb5bd' },
    { r: 2.8, wideR: 1.48, size: 0.24, speed: 1.6, color: '#f4c97a' },
    { r: 3.7, wideR: 1.95, size: 0.26, speed: 1.25, color: '#4dabf7' },
    { r: 4.6, wideR: 2.55, size: 0.2, speed: 0.95, color: '#e8590c' },
    { r: 6.4, wideR: 6.4, size: 0.62, speed: 0.55, color: '#e59966' },
    { r: 8.4, wideR: 10.4, size: 0.52, speed: 0.38, color: '#f2c879', ringed: true },
    { r: 10.2, wideR: 14.8, size: 0.36, speed: 0.24, color: '#74c0fc' },
    { r: 11.8, wideR: 19.2, size: 0.35, speed: 0.17, color: '#4c6ef5' },
  ];

  const orbits: THREE.LineLoop[] = [];
  const bodies: { group: THREE.Group; r: number; wideR: number; speed: number; angle: number }[] = [];
  specs.forEach((p, i) => {
    const ring = makeOrbitRing(p.r, '#70659e');
    orbits.push(ring);
    scene.add(ring);
    const group = new THREE.Group();
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(p.size, 24, 18),
      new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.68 }),
    );
    group.add(sphere);
    if (p.ringed) {
      const satRing = new THREE.Mesh(
        new THREE.RingGeometry(p.size * 1.35, p.size * 2.25, 48),
        new THREE.MeshBasicMaterial({ color: '#f7d794', side: THREE.DoubleSide, transparent: true, opacity: 0.85 }),
      );
      satRing.rotation.x = Math.PI / 2.3;
      group.add(satRing);
    }
    scene.add(group);
    bodies.push({ group, r: p.r, wideR: p.wideR, speed: p.speed, angle: i * 1.1 });
  });

  // 小行星带点云（火星与木星之间）
  const beltCount = 240;
  const beltPos = new Float32Array(beltCount * 3);
  for (let i = 0; i < beltCount; i += 1) {
    const a = (i / beltCount) * Math.PI * 2;
    const r = 5.2 + ((i * 37) % 100) / 100 * 0.65;
    beltPos[i * 3] = Math.cos(a) * r;
    beltPos[i * 3 + 1] = (((i * 19) % 10) - 5) * 0.03;
    beltPos[i * 3 + 2] = Math.sin(a) * r;
  }
  const beltGeo = new THREE.BufferGeometry();
  beltGeo.setAttribute('position', new THREE.BufferAttribute(beltPos, 3));
  const belt = new THREE.Points(beltGeo, new THREE.PointsMaterial({ color: '#c4b8d9', size: 0.09 }));
  scene.add(belt);

  return {
    update(state, _t, dt) {
      const vast = (state.scale ?? 0) >= 0.5;
      const sunScale = vast ? 0.52 : 1;
      sun.scale.setScalar(sunScale);
      halo.scale.setScalar(sunScale);
      belt.scale.setScalar(vast ? 0.78 : 1);
      orbits.forEach((o, i) => {
        o.visible = state.orbits >= 0.5;
        o.scale.setScalar(vast ? bodies[i].wideR / bodies[i].r : 1);
      });
      belt.rotation.y += dt * 0.06 * state.speed;
      bodies.forEach(b => {
        const curR = vast ? b.wideR : b.r;
        b.angle += dt * b.speed * 0.55 * state.speed;
        b.group.position.set(Math.cos(b.angle) * curR, 0, Math.sin(b.angle) * curR);
        b.group.scale.setScalar(vast ? 0.45 : 1);
        b.group.rotation.y += dt * 0.8;
      });
    },
    focusTarget(state) {
      const idx = Math.round(state.focus);
      if (idx <= 0 || idx > bodies.length) return new THREE.Vector3(0, 0, 0);
      return bodies[idx - 1].group.position.clone();
    },
  };
}

/** 4. 引力与卫星轨道（牛顿大炮）3D 实验室 */
function buildGravityOrbit(scene: THREE.Scene): LabWorld {
  const light = new THREE.DirectionalLight('#fff8e6', 2.4);
  light.position.set(8, 10, 8);
  scene.add(light);

  const er = 2.0;
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(er, 36, 26),
    new THREE.MeshStandardMaterial({ color: '#3b82f6', roughness: 0.6 }),
  );
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(er * 1.07, 28, 20),
    new THREE.MeshBasicMaterial({ color: '#74c0fc', transparent: true, opacity: 0.16 }),
  );
  scene.add(earth, atmo);

  const sat = new THREE.Group();
  const satCore = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.18), new THREE.MeshStandardMaterial({ color: '#ffd43b', metalness: 0.3, roughness: 0.4 }));
  const panelL = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.2), new THREE.MeshBasicMaterial({ color: '#74c0fc' }));
  panelL.position.x = -0.35;
  const panelR = panelL.clone();
  panelR.position.x = 0.35;
  sat.add(satCore, panelL, panelR);
  scene.add(sat);

  const trajGeo = new THREE.BufferGeometry();
  const trajMat = new THREE.LineBasicMaterial({ color: '#ffd43b' });
  const trajLine = new THREE.Line(trajGeo, trajMat);
  scene.add(trajLine);

  let phase = 0;
  let lastKey = '';
  let cachedPts: THREE.Vector3[] = [];

  function computeTrajectory(speed: number, alt: number): THREE.Vector3[] {
    const r0 = er + 0.3 + (alt / 1200) * 0.9;
    const pts: THREE.Vector3[] = [];
    if (speed < 7.7) {
      const reach = Math.max(0.45, ((speed - 4.0) / 3.8) * Math.PI * 0.95);
      for (let i = 0; i <= 48; i += 1) {
        const f = i / 48;
        const a = Math.PI / 2 - f * reach;
        const r = r0 - (r0 - er) * f * f;
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
      }
    } else if (speed < 11.2) {
      const ecc = Math.min(0.62, Math.max(0, (speed - 7.9) / 4.2));
      const semiA = r0 / (1 - ecc);
      const semiB = semiA * Math.sqrt(1 - ecc * ecc);
      const centerOffset = semiA - r0;
      for (let i = 0; i <= 96; i += 1) {
        const a = Math.PI / 2 - (i / 96) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * semiB, Math.sin(a) * semiA - centerOffset, 0));
      }
    } else {
      for (let i = 0; i <= 60; i += 1) {
        const f = i / 60;
        const x = f * 9.5;
        const y = r0 - f * f * 1.4;
        pts.push(new THREE.Vector3(x, y, 0));
      }
    }
    return pts;
  }

  return {
    update(state, _t, dt) {
      earth.rotation.y += dt * 0.35;
      const key = `${state.speed.toFixed(1)}-${state.alt}`;
      if (key !== lastKey) {
        lastKey = key;
        cachedPts = computeTrajectory(state.speed, state.alt);
        trajGeo.setFromPoints(cachedPts);
        trajMat.color.set(state.speed < 7.7 ? '#ff6b6b' : state.speed < 11.2 ? '#ffd43b' : '#74c0fc');
      }
      if (cachedPts.length > 1) {
        phase = (phase + dt * 0.28) % 1;
        const idx = Math.max(0, Math.min(cachedPts.length - 1, Math.floor(phase * (cachedPts.length - 1))));
        sat.position.copy(cachedPts[idx]);
        sat.rotation.y += dt * 1.2;
      }
    },
  };
}

/** 5. 恒星一生演化 3D 实验室 */
function buildStarLifecycle(scene: THREE.Scene): LabWorld {
  const starCore = new THREE.Mesh(
    new THREE.SphereGeometry(1, 36, 26),
    new THREE.MeshBasicMaterial({ color: '#ffd43b' }),
  );
  const starHalo = new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 28, 20),
    new THREE.MeshBasicMaterial({ color: '#ffa94d', transparent: true, opacity: 0.25 }),
  );
  scene.add(starCore, starHalo);

  // 星云/超新星抛射壳粒子团
  const count = 320;
  const baseDirs = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const u = ((i * 1597334677) >>> 0) / 4294967296;
    const v = (((i + 31) * 3812015801) >>> 0) / 4294967296;
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    baseDirs[i * 3] = Math.sin(phi) * Math.cos(theta);
    baseDirs[i * 3 + 1] = Math.cos(phi);
    baseDirs[i * 3 + 2] = Math.sin(phi) * Math.sin(theta);
  }
  const cloudGeo = new THREE.BufferGeometry();
  cloudGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const cloudMat = new THREE.PointsMaterial({ color: '#b197fc', size: 0.16, transparent: true, opacity: 0.85 });
  const cloud = new THREE.Points(cloudGeo, cloudMat);
  scene.add(cloud);

  // 脉冲星极轴喷流 / 黑洞吸积环
  const remnantRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.18, 12, 48),
    new THREE.MeshBasicMaterial({ color: '#ff922b', transparent: true, opacity: 0.85 }),
  );
  remnantRing.rotation.x = Math.PI / 2.4;
  remnantRing.visible = false;
  scene.add(remnantRing);

  return {
    update(state, t, dt) {
      const m = state.mass;
      const st = Math.round(state.stage);
      const coreMat = starCore.material as THREE.MeshBasicMaterial;
      const haloMat = starHalo.material as THREE.MeshBasicMaterial;
      remnantRing.visible = false;
      cloud.visible = false;

      if (st === 0) {
        // 分子星云坍缩
        starCore.scale.setScalar(0.45);
        starHalo.scale.setScalar(0.95);
        coreMat.color.set('#d0bfff');
        haloMat.color.set('#9775fa');
        cloud.visible = true;
        cloudMat.color.set('#b197fc');
        const arr = cloudGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < count; i += 1) {
          const r = 1.1 + ((i % 13) / 13) * 2.5 - Math.sin(t * 0.9 + i) * 0.2;
          arr.setXYZ(i, baseDirs[i * 3] * r, baseDirs[i * 3 + 1] * r, baseDirs[i * 3 + 2] * r);
        }
        arr.needsUpdate = true;
        cloud.rotation.y += dt * 0.35;
      } else if (st === 1) {
        // 主序星
        const size = 0.95 + (m / 25) * 1.15;
        starCore.scale.setScalar(size);
        starHalo.scale.setScalar(size * (1.28 + Math.sin(t * 3) * 0.04));
        const col = m >= 12 ? '#74c0fc' : m >= 5 ? '#edf2ff' : '#ffd43b';
        coreMat.color.set(col);
        haloMat.color.set(col);
      } else if (st === 2) {
        // 红巨星 / 红超巨星
        const size = m >= 8 ? 2.85 : 2.25;
        starCore.scale.setScalar(size + Math.sin(t * 2.5) * 0.06);
        starHalo.scale.setScalar(size * 1.2);
        coreMat.color.set(m >= 8 ? '#e03131' : '#ff6b6b');
        haloMat.color.set('#ffa94d');
      } else if (st === 3) {
        // 行星状星云 or 超新星大爆发
        const heavy = m >= 8;
        starCore.scale.setScalar(heavy ? 0.8 : 0.45);
        starHalo.scale.setScalar(heavy ? 2.4 : 1.1);
        coreMat.color.set('#ffffff');
        haloMat.color.set(heavy ? '#ff922b' : '#74c0fc');
        cloud.visible = true;
        cloudMat.color.set(heavy ? '#ff922b' : '#63e6be');
        const pulse = (t * (heavy ? 1.4 : 0.6)) % 1;
        const arr = cloudGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < count; i += 1) {
          const r = 1.0 + pulse * (heavy ? 3.8 : 2.3) + (i % 5) * 0.14;
          arr.setXYZ(i, baseDirs[i * 3] * r, baseDirs[i * 3 + 1] * r, baseDirs[i * 3 + 2] * r);
        }
        arr.needsUpdate = true;
      } else {
        // 最终残骸
        if (m < 8) {
          starCore.scale.setScalar(0.5);
          starHalo.scale.setScalar(0.95);
          coreMat.color.set('#f8f9fa');
          haloMat.color.set('#a5d8ff');
        } else if (m < 20) {
          starCore.scale.setScalar(0.42);
          starHalo.scale.setScalar(0.85 + Math.sin(t * 14) * 0.12);
          coreMat.color.set('#74c0fc');
          haloMat.color.set('#4dabf7');
          remnantRing.visible = true;
          (remnantRing.material as THREE.MeshBasicMaterial).color.set('#74c0fc');
          remnantRing.rotation.z += dt * 4.5;
        } else {
          starCore.scale.setScalar(0.95);
          starHalo.scale.setScalar(1.22);
          coreMat.color.set('#05030d');
          haloMat.color.set('#ff922b');
          remnantRing.visible = true;
          (remnantRing.material as THREE.MeshBasicMaterial).color.set('#ff922b');
          remnantRing.rotation.z += dt * 1.4;
        }
      }
    },
  };
}

/** 6. 黑洞时空弯曲与引力透镜 3D 实验室 */
function buildBlackHole(scene: THREE.Scene): LabWorld {
  // 史瓦西事件视界黑球 + 光子环
  const horizon = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 36, 26),
    new THREE.MeshBasicMaterial({ color: '#04020a' }),
  );
  const photonRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.48, 0.055, 16, 64),
    new THREE.MeshBasicMaterial({ color: '#fff3bf' }),
  );
  scene.add(horizon, photonRing);

  // 水平发光吸积盘 + 引力透镜翻上来的“背面光弧”
  const disk = new THREE.Group();
  const innerDisk = new THREE.Mesh(
    new THREE.RingGeometry(1.6, 2.7, 64),
    new THREE.MeshBasicMaterial({ color: '#ffd43b', side: THREE.DoubleSide, transparent: true, opacity: 0.9 }),
  );
  innerDisk.rotation.x = Math.PI / 2;
  const outerDisk = new THREE.Mesh(
    new THREE.RingGeometry(2.65, 4.1, 64),
    new THREE.MeshBasicMaterial({ color: '#e8590c', side: THREE.DoubleSide, transparent: true, opacity: 0.62 }),
  );
  outerDisk.rotation.x = Math.PI / 2;
  const lensedArc = new THREE.Mesh(
    new THREE.TorusGeometry(1.85, 0.14, 14, 64),
    new THREE.MeshBasicMaterial({ color: '#ff922b', transparent: true, opacity: 0.72 }),
  );
  disk.add(innerDisk, outerDisk, lensedArc);
  scene.add(disk);

  // 3D 时空弯曲漏斗网格
  const gridSize = 18;
  const gridSeg = 26;
  const gridGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridSeg, gridSeg);
  gridGeo.rotateX(-Math.PI / 2);
  const gridMat = new THREE.MeshBasicMaterial({ color: '#7950f2', wireframe: true, transparent: true, opacity: 0.42 });
  const spacetimeGrid = new THREE.Mesh(gridGeo, gridMat);
  spacetimeGrid.position.y = -1.6;
  scene.add(spacetimeGrid);

  // 光子弯曲轨迹与发光光子小球
  const rayGeo = new THREE.BufferGeometry();
  const rayMat = new THREE.LineBasicMaterial({ color: '#ffd43b' });
  const rayLine = new THREE.Line(rayGeo, rayMat);
  const photonDot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), new THREE.MeshBasicMaterial({ color: '#fff3bf' }));
  scene.add(rayLine, photonDot);

  let lastKey = '';
  let rayPts: THREE.Vector3[] = [];
  let prog = 0;

  return {
    update(state, _t, dt) {
      const m = state.mass;
      const rs = 0.62 + m * 0.22;
      horizon.scale.setScalar(rs);
      photonRing.scale.setScalar(rs);
      disk.scale.setScalar(rs);
      innerDisk.rotation.z += dt * 1.1;
      outerDisk.rotation.z += dt * 0.55;

      spacetimeGrid.visible = state.grid >= 0.5;
      const key = `${m.toFixed(1)}-${state.impact.toFixed(1)}`;
      if (key !== lastKey) {
        lastKey = key;
        const posAttr = gridGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < posAttr.count; i += 1) {
          const x = posAttr.getX(i);
          const z = posAttr.getZ(i);
          const r = Math.hypot(x, z);
          const depth = -(m * 2.1) / (r + 1.15);
          posAttr.setY(i, depth);
        }
        posAttr.needsUpdate = true;

        const b = state.impact * rs;
        const captured = state.impact < 2.6;
        rayPts = [];
        for (let i = 0; i <= 64; i += 1) {
          const f = i / 64;
          if (captured) {
            const x = -7.5 + f * 7.5;
            const bend = Math.pow(f, 2.2) * b;
            rayPts.push(new THREE.Vector3(x, 0.35, b - bend));
          } else {
            const x = -7.5 + f * 15;
            const deflect = (2.6 * rs) / Math.max(0.7, state.impact - 1.35);
            const z = b - (f > 0.45 ? Math.pow((f - 0.45) / 0.55, 1.55) * deflect * 3.1 : 0);
            rayPts.push(new THREE.Vector3(x, 0.35, z));
          }
        }
        rayGeo.setFromPoints(rayPts);
        rayMat.color.set(captured ? '#ff6b6b' : '#ffd43b');
      }

      if (rayPts.length > 1) {
        prog = (prog + dt * 0.42 + 1) % 1;
        const idx = Math.max(0, Math.min(rayPts.length - 1, Math.floor(prog * (rayPts.length - 1))));
        photonDot.position.copy(rayPts[idx]);
      }
    },
  };
}

const BUILDERS: Record<string, (scene: THREE.Scene) => LabWorld> = {
  'earth-seasons-lab': buildEarthSeasons,
  'moon-eclipse-lab': buildMoonEclipse,
  'solar-system-lab': buildSolarSystem,
  'gravity-orbit-lab': buildGravityOrbit,
  'star-lifecycle-lab': buildStarLifecycle,
  'black-hole-lab': buildBlackHole,
};

const BASE_FOV = 44;
const REF_ASPECT = 1.35;
const TAN_HALF_BASE = Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2));
const MIN_DIST = 3.2;
const MAX_DIST = 30;

function disposeScene(scene: THREE.Scene): void {
  scene.traverse(obj => {
    const mesh = obj as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
    mesh.geometry?.dispose();
    if (!mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach(mat => mat.dispose());
  });
}

export function mountLabScene(
  host: HTMLElement,
  slug: string,
  initialState: LabState,
  initialCam: readonly [number, number, number],
  onAutoState?: (patch: LabState) => void,
): LabSceneHandle {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1a1633');
  scene.add(new THREE.AmbientLight('#fff4e6', 0.85));
  scene.add(makeStarfield());

  const camera = new THREE.PerspectiveCamera(BASE_FOV, 1, 0.1, 160);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.domElement.className = 'ulab-canvas';
  host.replaceChildren(renderer.domElement);

  const builder = BUILDERS[slug] ?? buildSolarSystem;
  const world = builder(scene);
  let state: LabState = { ...initialState };

  let az = initialCam[0];
  let el = initialCam[1];
  let dist = initialCam[2];
  let targetAz = az;
  let targetEl = el;
  let targetDist = dist;
  const homeCam = [...initialCam] as [number, number, number];
  const lookAt = new THREE.Vector3();

  // 单指旋转 + 双指捏合缩放 + 滚轮缩放
  const pointers = new Map<number, { x: number; y: number }>();
  let pinchDist = 0;

  const onDown = (e: PointerEvent): void => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    renderer.domElement.setPointerCapture?.(e.pointerId);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };
  const onMove = (e: PointerEvent): void => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    if (pointers.size === 1) {
      targetAz -= (e.clientX - prev.x) * 0.008;
      targetEl = Math.max(-1.25, Math.min(1.35, targetEl + (e.clientY - prev.y) * 0.007));
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      wake();
    } else if (pointers.size === 2) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist > 8 && d > 8) {
        targetDist = Math.max(MIN_DIST, Math.min(MAX_DIST, targetDist * (pinchDist / d)));
        wake();
      }
      pinchDist = d;
    }
  };
  const onUp = (e: PointerEvent): void => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchDist = 0;
  };
  const onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    targetDist = Math.max(MIN_DIST, Math.min(MAX_DIST, targetDist + e.deltaY * 0.01));
    wake();
  };

  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointermove', onMove);
  renderer.domElement.addEventListener('pointerup', onUp);
  renderer.domElement.addEventListener('pointercancel', onUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

  const resize = (): void => {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    const aspect = w / h;
    camera.aspect = aspect;
    // 窄屏竖屏下放大垂直 FOV，保持横向视场不缩水，避免行星与轨道被左右裁切
    camera.fov = aspect >= REF_ASPECT
      ? BASE_FOV
      : THREE.MathUtils.radToDeg(2 * Math.atan(TAN_HALF_BASE * (REF_ASPECT / Math.max(aspect, 0.52))));
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (!raf && !disposed) renderFrame(0);
  };
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
  ro?.observe(host);

  let raf = 0;
  let disposed = false;
  let inView = true;
  let active = true;
  let lastNow = performance.now();
  let elapsed = 0;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

  function renderFrame(rawDt: number): void {
    const dt = reduced ? 0 : rawDt;
    elapsed += dt;
    const blend = rawDt > 0 ? 1 - Math.exp(-8 * rawDt) : 1;
    az += (targetAz - az) * blend;
    el += (targetEl - el) * blend;
    dist += (targetDist - dist) * blend;

    world.update(state, elapsed, dt, patch => {
      state = { ...state, ...patch };
      onAutoState?.(patch);
    });
    const focus = world.focusTarget ? world.focusTarget(state) : new THREE.Vector3(0, 0, 0);
    if (rawDt > 0) lookAt.lerp(focus, blend);
    else lookAt.copy(focus);
    camera.position.set(
      lookAt.x + Math.cos(el) * Math.sin(az) * dist,
      lookAt.y + Math.sin(el) * dist,
      lookAt.z + Math.cos(el) * Math.cos(az) * dist,
    );
    camera.lookAt(lookAt);
    renderer.render(scene, camera);
  }

  const tick = (now: number): void => {
    raf = 0;
    if (disposed || !active) return;
    const rawDt = Math.max(0, Math.min(0.05, (now - lastNow) / 1000));
    lastNow = now;
    renderFrame(rawDt);
    raf = requestAnimationFrame(tick);
  };

  function syncLoop(): void {
    active = !disposed && inView && document.visibilityState !== 'hidden';
    if (active && !raf) {
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!active && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function wake(): void {
    if (disposed) return;
    if (!raf) renderFrame(0);
    syncLoop();
  }

  const io = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      syncLoop();
    })
    : null;
  io?.observe(host);
  document.addEventListener('visibilitychange', syncLoop);

  resize();
  syncLoop();

  return {
    setState(next) {
      state = { ...next };
      wake();
    },
    setCameraTarget(nextAz, nextEl, nextDist) {
      const clampedDist = Math.max(MIN_DIST, Math.min(MAX_DIST, nextDist));
      homeCam[0] = nextAz;
      homeCam[1] = nextEl;
      homeCam[2] = clampedDist;
      targetAz = nextAz;
      targetEl = nextEl;
      targetDist = clampedDist;
      wake();
    },
    resetCamera() {
      targetAz = homeCam[0];
      targetEl = homeCam[1];
      targetDist = homeCam[2];
      wake();
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(raf);
      raf = 0;
      ro?.disconnect();
      io?.disconnect();
      document.removeEventListener('visibilitychange', syncLoop);
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointercancel', onUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      disposeScene(scene);
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
