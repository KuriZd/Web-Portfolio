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

// Paleta de colores restringida
vec3 getPaletteColor(float t, float offset) {
  vec3 palette[4];
  palette[0] = vec3(0.4, 0.2, 1.0); // púrpura
  palette[1] = vec3(0.2, 0.4, 1.0); // azul
  palette[2] = vec3(0.6, 0.3, 0.9); // lila
  palette[3] = vec3(0.3, 0.6, 1.0); // azul claro

  // Cambiar suavemente entre colores de la paleta
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

  // Foco 1
  vec2 center1 = vec2(0.5 + 0.3 * sin(uTime * 0.4), 0.5 + 0.3 * cos(uTime * 0.3));
  vec3 color1 = getPaletteColor(uTime, 0.0);
  float intensity1 = radialGradient(vUv, center1, 0.4);

  // Foco 2
  vec2 center2 = vec2(0.5 + 0.3 * cos(uTime * 0.6), 0.5 + 0.3 * sin(uTime * 0.5));
  vec3 color2 = getPaletteColor(uTime, 2.0);
  float intensity2 = radialGradient(vUv, center2, 0.5);

  // Foco 3
  vec2 center3 = vec2(0.5 + 0.2 * sin(uTime * 0.8), 0.5 + 0.2 * cos(uTime * 0.7));
  vec3 color3 = getPaletteColor(uTime, 4.0);
  float intensity3 = radialGradient(vUv, center3, 0.3);

  finalColor += color1 * intensity1;
  finalColor += color2 * intensity2;
  finalColor += color3 * intensity3;

  finalColor = clamp(finalColor, 0.0, 1.0);
  gl_FragColor = vec4(finalColor, 1.0);
}


`;

export default function ShaderBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvas = renderer.domElement;

    if (mountRef.current) {
      mountRef.current.appendChild(canvas);
    }

    const uniforms = {
      uTime: { value: 0.0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current && canvas) {
        mountRef.current.removeChild(canvas);
      }
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-[-1]" />;
}
