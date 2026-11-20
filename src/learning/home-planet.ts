import * as THREE from 'three';
import { mountDuo, type DuoKit, type DuoStage } from '../series/duo-stage';

/** 宇宙奇遇记的小星球：在系列同一颗星球上，摆一架黄铜天文望远镜、一枚小火箭和弯月夜灯，头顶飘着土星、旋涡星系和绕飞的深空探测器。 */

function ball(kit: DuoKit, color: string, r: number, at: [number, number, number]): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), kit.toon(color));
  mesh.position.set(...at);
  return mesh;
}

function rod(kit: DuoKit, color: string, from: THREE.Vector3, to: THREE.Vector3, r = 0.016): THREE.Mesh {
  const length = from.distanceTo(to);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, length, 8), kit.toon(color));
  mesh.position.copy(from).lerp(to, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
  return mesh;
}

function telescope(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  const top = new THREE.Vector3(0, 0.3, 0);
  for (let i = 0; i < 3; i += 1) {
    const a = (i / 3) * Math.PI * 2 + 0.3;
    const foot = new THREE.Vector3(Math.cos(a) * 0.16, 0, Math.sin(a) * 0.16);
    group.add(rod(kit, '#8b6a46', foot, top, 0.016));
  }
  const mount = ball(kit, '#5b3e96', 0.045, [0, 0.31, 0]);
  const tube = new THREE.Group();
  tube.position.set(0, 0.34, 0);
  tube.rotation.z = 0.62;
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.036, 0.42, 16), kit.toon('#f3efe6'));
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.06, 16), kit.toon('#ff9f43'));
  collar.position.y = 0.19;
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.02, 16), kit.toon('#7cc7ff'));
  lens.position.y = 0.22;
  const eyepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.08, 12), kit.toon('#5b3e96'));
  eyepiece.position.y = -0.23;
  tube.add(barrel, collar, lens, eyepiece);
  group.add(mount, tube);
  return group;
}

function miniRocket(kit: DuoKit): { group: THREE.Group; flame: THREE.Mesh } {
  const group = new THREE.Group();
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.04, 18), kit.toon('#b9b1c9'));
  pad.position.y = 0.02;
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.3, 16), kit.toon('#ffffff'));
  body.position.y = 0.21;
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.076, 0.14, 16), kit.toon('#ff7058'));
  nose.position.y = 0.43;
  const windowRing = ball(kit, '#5b3e96', 0.038, [0, 0.25, 0.065]);
  const windowGlass = ball(kit, '#9be0ff', 0.028, [0, 0.25, 0.078]);
  for (let i = 0; i < 3; i += 1) {
    const a = (i / 3) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.09), kit.toon('#ff7058'));
    fin.position.set(Math.sin(a) * 0.095, 0.12, Math.cos(a) * 0.095);
    fin.rotation.y = a;
    group.add(fin);
  }
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 12), new THREE.MeshBasicMaterial({ color: '#ffb703' }));
  flame.rotation.x = Math.PI;
  flame.position.y = 0.04;
  group.add(pad, body, nose, windowRing, windowGlass, flame);
  return { group, flame };
}

function moonLamp(kit: DuoKit): { group: THREE.Group; glow: THREE.Mesh } {
  const group = new THREE.Group();
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.06, 14), kit.toon('#8b7a5c'));
  stand.position.y = 0.03;
  const moon = ball(kit, '#ffe89e', 0.12, [0, 0.17, 0]);
  const crater1 = ball(kit, '#ebd07e', 0.03, [0.05, 0.2, 0.095]);
  const crater2 = ball(kit, '#ebd07e', 0.022, [-0.04, 0.14, 0.1]);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffe066', transparent: true, opacity: 0.22 }));
  glow.position.y = 0.17;
  group.add(stand, moon, crater1, crater2, glow);
  return { group, glow };
}

function saturn(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  group.add(ball(kit, '#f2c879', 0.21, [0, 0, 0]));
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 6, 48), kit.toon('#e8b263'));
  ring1.rotation.x = Math.PI / 2.25;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.018, 6, 48), kit.toon('#f7d794'));
  ring2.rotation.x = Math.PI / 2.25;
  group.rotation.z = 0.32;
  group.add(ring1, ring2);
  return group;
}

function spiralGalaxy(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  group.add(ball(kit, '#fff3bf', 0.11, [0, 0, 0]));
  const armColors = ['#9775fa', '#74c0fc', '#ffd43b'];
  for (let arm = 0; arm < 2; arm += 1) {
    for (let i = 1; i <= 10; i += 1) {
      const a = arm * Math.PI + i * 0.48;
      const r = 0.08 + i * 0.028;
      group.add(ball(kit, armColors[i % armColors.length], 0.026 - i * 0.0012, [Math.cos(a) * r, (i % 2 - 0.5) * 0.02, Math.sin(a) * r]));
    }
  }
  group.rotation.x = 0.65;
  group.rotation.z = -0.25;
  return group;
}

function spaceProbe(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.065), kit.toon('#ffd43b'));
  const dish = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.04, 16, 1, true), new THREE.MeshToonMaterial({ color: '#f8f9fa', side: THREE.DoubleSide }));
  dish.position.y = 0.08;
  dish.rotation.x = Math.PI;
  group.add(core, dish);
  for (const side of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.012, 0.075), kit.toon('#5b3e96'));
    panel.position.x = side * 0.14;
    group.add(panel);
  }
  return group;
}

function decorate(kit: DuoKit): void {
  const scope = telescope(kit);
  scope.scale.setScalar(1.25);
  kit.plant(scope, 1.15, -0.18);

  const rocket = miniRocket(kit);
  rocket.group.scale.setScalar(1.18);
  kit.plant(rocket.group, -1.25, -0.1);

  const moon = moonLamp(kit);
  moon.group.scale.setScalar(1.05);
  kit.plant(moon.group, -0.92, 0.56);

  const tinyStar = ball(kit, '#ffd43b', 0.065, [0, 0.065, 0]);
  kit.plant(tinyStar, 1.0, 0.52);

  const ringed = saturn(kit);
  const galaxy = spiralGalaxy(kit);
  const floaters = [
    { object: ringed, at: new THREE.Vector3(-1.85, 1.95, -1.1), spin: 0.42 },
    { object: galaxy, at: new THREE.Vector3(1.38, 2.42, -1.8), spin: -0.55 },
  ];
  floaters.forEach(({ object, at }) => {
    object.position.copy(at);
    kit.scene.add(object);
  });

  const probe = spaceProbe(kit);
  const center = new THREE.Vector3(-0.1, 2.65, -2.3);
  kit.scene.add(probe);

  kit.onFrame((t, dt) => {
    floaters.forEach(({ object, at, spin }, i) => {
      object.rotation.y += dt * spin;
      object.position.y = at.y + Math.sin(t * 1.1 + i * 2) * 0.08;
    });
    const pulse = 0.85 + 0.25 * Math.sin(t * 7);
    rocket.flame.scale.set(1, pulse, 1);
    (moon.glow.material as THREE.MeshBasicMaterial).opacity = 0.18 + 0.1 * (0.5 + 0.5 * Math.sin(t * 2.2));
    probe.position.set(
      center.x + Math.cos(t * 0.62) * 0.6,
      center.y + Math.sin(t * 0.62) * 0.18,
      center.z + Math.sin(t * 0.62) * 0.3,
    );
    probe.rotation.y = -t * 0.62;
  });
}

export function mountUniversePlanet(host: HTMLElement, onTap: () => void): Promise<DuoStage> {
  return mountDuo(host, { label: '小念和爸爸站在宇宙小星球上，旁边摆着望远镜和小火箭，头顶飘着土星和星系；点他们会接着聊', decorate, onTap });
}
