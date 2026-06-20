"use client";

import { useEffect, useRef } from "react";

export const HERO_MODEL_PATH = "/models/hero-tapbar.glb";

function fitCameraToViewport(
  camera: import("three").PerspectiveCamera,
  width: number,
  height: number,
) {
  const aspect = width / Math.max(height, 1);
  camera.aspect = aspect;
  camera.fov = width < 640 ? 46 : 42;

  const narrow = width < 720 || aspect < 0.92;
  camera.position.set(0, narrow ? 0.22 : 0.35, narrow ? 4.1 : 3.2);
  camera.updateProjectionMatrix();
}

function fitModelToScene(
  model: import("three").Object3D,
  THREE: typeof import("three"),
  width: number,
) {
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  model.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  const fitScale = (width < 720 ? 1.78 : 2.15) / Math.max(maxDim, 0.001);
  model.scale.setScalar(fitScale);
  model.position.y += size.y * fitScale * 0.02;
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let controls: import("three/addons/controls/OrbitControls.js").OrbitControls | null =
      null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      fitCameraToViewport(camera, width, height);
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const boot = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const { OrbitControls } = await import(
        "three/addons/controls/OrbitControls.js"
      );

      if (disposed) return;

      const scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        42,
        container.clientWidth / Math.max(container.clientHeight, 1),
        0.1,
        100,
      );
      fitCameraToViewport(
        camera,
        container.clientWidth,
        container.clientHeight,
      );

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      container.appendChild(renderer.domElement);
      renderer.domElement.className = "hero-canvas__el";
      resize();

      const ambient = new THREE.AmbientLight(0xffffff, 0.55);
      const key = new THREE.DirectionalLight(0xffffff, 1.35);
      key.position.set(2.5, 4, 3.5);
      const fill = new THREE.DirectionalLight(0x9aa3ff, 0.35);
      fill.position.set(-3, 1, -2);
      const rim = new THREE.DirectionalLight(0xffffff, 0.65);
      rim.position.set(-1.5, 2.5, -3);
      scene.add(ambient, key, fill, rim);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minPolarAngle = Math.PI * 0.28;
      controls.maxPolarAngle = Math.PI * 0.62;
      controls.target.set(0, 0, 0);

      const loader = new GLTFLoader();
      loader.load(
        HERO_MODEL_PATH,
        (gltf) => {
          if (disposed) return;

          fitModelToScene(gltf.scene, THREE, container.clientWidth);
          scene.add(gltf.scene);
        },
        undefined,
        (error) => {
          console.error("Hero model failed to load:", error);
        },
      );

      const animate = () => {
        if (disposed || !renderer || !camera) return;
        frameId = window.requestAnimationFrame(animate);

        if (!prefersReducedMotion && controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.55;
        }

        controls?.update();
        renderer.render(scene, camera);
      };

      animate();

      const observer = new ResizeObserver(resize);
      observer.observe(container);
      window.addEventListener("resize", resize);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", resize);
      };
    };

    let cleanupResize: (() => void) | undefined;

    void boot().then((cleanup) => {
      cleanupResize = cleanup;
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      cleanupResize?.();
      controls?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-canvas" aria-hidden="true" />;
}
