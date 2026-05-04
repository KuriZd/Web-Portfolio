import { useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform float uTime;
  varying vec2 vUv;

  vec3 getPaletteColor(float t, float offset) {
    vec3 palette[4];
    palette[0] = vec3(0.4, 0.2, 1.0);
    palette[1] = vec3(0.2, 0.4, 1.0);
    palette[2] = vec3(0.6, 0.3, 0.9);
    palette[3] = vec3(0.3, 0.6, 1.0);

    float speed = 0.3;
    float i = mod(t * speed + offset, 4.0);
    int idxA = int(floor(i));
    int idxB = (idxA + 1) % 4;
    float blend = fract(i);

    return mix(palette[idxA], palette[idxB], blend);
  }

  float radialGradient(vec2 uv, vec2 center, float size) {
    float dist = distance(uv, center);
    return 1.0 - smoothstep(0.0, size, dist);
  }

  void main() {
    vec3 finalColor = vec3(0.0);

    vec2 center1 = vec2(0.5 + 0.3 * sin(uTime * 0.4), 0.5 + 0.3 * cos(uTime * 0.3));
    vec3 color1   = getPaletteColor(uTime, 0.0);
    float i1      = radialGradient(vUv, center1, 0.4);

    vec2 center2 = vec2(0.5 + 0.3 * cos(uTime * 0.6), 0.5 + 0.3 * sin(uTime * 0.5));
    vec3 color2   = getPaletteColor(uTime, 2.0);
    float i2      = radialGradient(vUv, center2, 0.5);

    vec2 center3 = vec2(0.5 + 0.2 * sin(uTime * 0.8), 0.5 + 0.2 * cos(uTime * 0.7));
    vec3 color3   = getPaletteColor(uTime, 4.0);
    float i3      = radialGradient(vUv, center3, 0.3);

    finalColor += color1 * i1;
    finalColor += color2 * i2;
    finalColor += color3 * i3;

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

export default function ShaderBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    /* ── Renderer ─────────────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,             // no sharp edges on a blurry gradient
      powerPreference: "high-performance",
    });
    // Cap at 1.5× — no visual benefit beyond that for a fullscreen blur
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    mountRef.current?.appendChild(canvas);

    /* ── Scene ────────────────────────────────────────────────────────────── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const uniforms = { uTime: { value: 0.0 } };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    );
    scene.add(mesh);

    /* ── Animation loop — RAF cancelled on cleanup ────────────────────────── */
    const clock = new THREE.Clock();
    let rafId;

    const animate = () => {
      rafId = requestAnimationFrame(animate); // schedule FIRST for stable cadence
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize — debounced to avoid jank ────────────────────────────────── */
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 80);
    };
    window.addEventListener("resize", handleResize);

    /* ── Cleanup ──────────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);          // stop the loop — key fix
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current?.contains(canvas)) {
        mountRef.current.removeChild(canvas);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-[-1]" />;
}
