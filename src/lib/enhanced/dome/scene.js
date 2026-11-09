// Figma Enhanced step 2.10 (docs/figma-enhanced-step2.md): the 3D Dome, the owner's reference 14 from the early
// prototype (Vessyl-Prototype app/components/DomeScene.tsx), made a small scene beside the designer's "Geometry, not
// mysticism". As the section crosses the screen the camera starts on the cladding and draws back to the whole Dome in
// front of Arenal, while waves leave its base. The Dome is copper in the site's colours and the waves take the site's
// other colours (owner, 2026-11-09). Loaded only when the section comes near; interactions.js decides who gets it.
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {createDomeCladdingGeometry} from './cladding.js';

const R = 2.48;
const DRUM = R * 0.62;
const SPRING = 0;
const BASE = SPRING - DRUM;
const SITE = {copper: '#a2551b', copperDark: '#311500', sand: '#d3a079', beige: '#f5ebe7', label: '#dabfb6', green: '#364830', greenDeep: '#1a3013'};
const WAVES = [SITE.sand, SITE.beige, SITE.green, SITE.label, SITE.sand, SITE.beige];

// The shell under the shingles: a drum and a half sphere, as in the prototype.
function shellGeometry(compact) {
  const profile = [];
  const drum = compact ? 4 : 6, cap = compact ? 16 : 24;
  for (let i = 0; i <= drum; i++) profile.push(new THREE.Vector2(R * 0.995, BASE + (DRUM * i) / drum));
  for (let i = 1; i <= cap; i++) {
    const a = (i / cap) * (Math.PI / 2);
    profile.push(new THREE.Vector2(Math.cos(a) * R * 0.995, SPRING + Math.sin(a) * R * 0.995));
  }
  return new THREE.LatheGeometry(profile, compact ? 48 : 72);
}

// A soft disc of the site's deep forest green that melts into the photograph's forest.
function groundTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(26,48,19,0.92)');
  grad.addColorStop(0.55, 'rgba(26,48,19,0.7)');
  grad.addColorStop(1, 'rgba(26,48,19,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// The camera's path: on the shingles, then three quarters, then the whole Dome with Arenal behind.
const KEYS = [
  {at: 0, cam: [2.05, 1.55, 2.45], look: [1.45, 1.35, 0.55], fov: 30, turn: 0.55},
  {at: 0.45, cam: [4.6, 2.3, 6.1], look: [0.35, 0.7, 0], fov: 34, turn: 0.2},
  {at: 1, cam: [0.4, 1.7, 11.2], look: [0, 0.35, 0], fov: 34, turn: -0.25}
];
const ease = x => x * x * (3 - 2 * x);

export function createDomeScene(host, {backdrop, compact = false}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'dome-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, powerPreference: 'high-performance'});
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.68;
  renderer.setClearColor(0x2b3a2a, 1);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 140);

  // Arenal, far behind, so the camera's travel gives it a little parallax.
  const backdropMaterial = new THREE.MeshBasicMaterial({toneMapped: false, depthWrite: false, color: 0xd9d4cc});
  const backdropPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), backdropMaterial);
  backdropPlane.position.set(-2, 6.5, -46);
  scene.add(backdropPlane);
  let ready = 0;
  new THREE.TextureLoader().load(backdrop, texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    backdropMaterial.map = texture;
    backdropMaterial.needsUpdate = true;
    ready++;
    frame();
  });

  scene.add(new THREE.HemisphereLight(SITE.beige, SITE.greenDeep, 0.6));
  const sun = new THREE.DirectionalLight(0xfff0dc, 1.7);
  sun.position.set(7, 10, 6);
  scene.add(sun);

  const dome = new THREE.Group();
  scene.add(dome);
  const shell = new THREE.Mesh(shellGeometry(compact), new THREE.MeshStandardMaterial({color: SITE.copperDark, metalness: 0.7, roughness: 0.55}));
  dome.add(shell);
  const {geometry: tileGeometry} = createDomeCladdingGeometry({radius: R, drumHeight: DRUM, springY: SPRING, compact});
  const tiles = new THREE.Mesh(tileGeometry, new THREE.MeshStandardMaterial({color: 0xffffff, vertexColors: true, metalness: 0.8, roughness: 0.5, envMapIntensity: 0.62}));
  dome.add(tiles);

  const ground = new THREE.Mesh(new THREE.CircleGeometry(R * 4.6, 96), new THREE.MeshBasicMaterial({map: groundTexture(), transparent: true, depthWrite: false}));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = BASE - 0.005;
  scene.add(ground);

  // Waves leave the Dome's base, one after another, in the site's other colours.
  const waves = WAVES.map((color, i) => {
    const mesh = new THREE.Mesh(new THREE.RingGeometry(R + 0.06, R + 0.2, 128), new THREE.MeshBasicMaterial({color, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide}));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = BASE + 0.01 + i * 0.001;
    mesh.userData.phase = i / WAVES.length;
    scene.add(mesh);
    return mesh;
  });

  let progress = 0, target = 0, width = 0, height = 0, visible = false, raf = 0, last = performance.now(), clock = 0;
  const v = new THREE.Vector3(), look = new THREE.Vector3();

  function place() {
    // Between two keys, eased; the far keys move back on narrow frames so the whole Dome still fits.
    let k = 0;
    while (k < KEYS.length - 2 && progress > KEYS[k + 1].at) k++;
    const a = KEYS[k], b = KEYS[k + 1];
    const t = ease(Math.min(1, Math.max(0, (progress - a.at) / (b.at - a.at))));
    const narrow = Math.max(1, 1.05 / camera.aspect);
    const lerp = (x, y) => x + (y - x) * t;
    const far = (key, i) => key.look[i] + (key.cam[i] - key.look[i]) * (key.at > 0 ? narrow : 1);
    v.set(lerp(far(a, 0), far(b, 0)), lerp(far(a, 1), far(b, 1)), lerp(far(a, 2), far(b, 2)));
    look.set(lerp(a.look[0], b.look[0]), lerp(a.look[1], b.look[1]), lerp(a.look[2], b.look[2]));
    camera.position.copy(v);
    camera.fov = lerp(a.fov, b.fov);
    camera.lookAt(look);
    camera.updateProjectionMatrix();
    dome.rotation.y = lerp(a.turn, b.turn);
    // The photograph fills the frustum behind, whatever the frame.
    const d = camera.position.distanceTo(backdropPlane.position);
    const h = 2 * d * Math.tan((camera.fov * Math.PI) / 360) * 1.3;
    // Larger than the frame by a margin, and shifted so that Arenal stands to the right of the Dome.
    const w = Math.max(h * camera.aspect, h * (16 / 9)) * 1.35;
    backdropPlane.scale.set(w, w * (9 / 16), 1);
    backdropPlane.position.set(look.x - w * 0.22, look.y + 4.5, -46);
    backdropPlane.lookAt(camera.position);
  }

  function frame(now = performance.now()) {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;
    progress += (target - progress) * Math.min(1, dt * 6);
    if (Math.abs(target - progress) < 0.0005) progress = target;
    place();
    const amount = ease(Math.min(1, Math.max(0, (progress - 0.3) / 0.45)));
    for (const wave of waves) {
      const phase = (clock * 0.11 + wave.userData.phase) % 1;
      wave.scale.setScalar(1 + phase * 2.4);
      wave.material.opacity = Math.pow(1 - phase, 1.6) * 0.75 * amount;
    }
    renderer.render(scene, camera);
    if (ready && !host.hasAttribute('data-dome-ready')) host.setAttribute('data-dome-ready', '');
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  }

  function resize() {
    const box = host.getBoundingClientRect();
    if (!box.width || !box.height || (box.width === width && box.height === height)) return;
    width = box.width;
    height = box.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    frame();
  }

  host.append(canvas);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const io = new IntersectionObserver(entries => {
    visible = entries.some(e => e.isIntersecting);
    if (visible && !raf) raf = requestAnimationFrame(frame);
  });
  io.observe(host);
  const onVisibility = () => {if (visible && !document.hidden && !raf) raf = requestAnimationFrame(frame);};
  document.addEventListener('visibilitychange', onVisibility);
  resize();

  return {
    host,
    setProgress(p) {
      target = p;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    },
    destroy() {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse(o => {o.geometry?.dispose();if (o.material) {o.material.map?.dispose();o.material.dispose();}});
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
      host.removeAttribute('data-dome-ready');
    }
  };
}
