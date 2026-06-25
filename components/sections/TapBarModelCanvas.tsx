"use client";

import { useEffect, useRef } from "react";
import { DEFAULT_TAPBAR_MODEL_FIT_SIZE } from "@/lib/data/tapbar-options";

const IDLE_HALF_ARC = Math.PI / 10;
const IDLE_SPEED = 0.22;

type TapBarModelCanvasProps = {
  modelPath: string;
  fitSize?: number;
};

function fitCameraToViewport(
  camera: import("three").PerspectiveCamera,
  width: number,
  height: number,
) {
  const aspect = width / Math.max(height, 1);
  camera.aspect = aspect;

  const narrow = width < 720 || aspect < 0.92;
  const desktop = width >= 1000 && !narrow;

  if (narrow) {
    camera.fov = width < 640 ? 46 : 42;
    camera.position.set(0, 0.22, 4.1);
  } else if (desktop) {
    camera.fov = 40;
    camera.position.set(0, 0.28, 3.4);
  } else {
    camera.fov = 42;
    camera.position.set(0, 0.28, 3.4);
  }

  camera.updateProjectionMatrix();
}

/** +30% model scale — mobile stage height stays fixed in CSS (no extra Y space). */
const MODEL_SCALE_BOOST = 1.3;

function resolveTargetFitSize(
  fitSize: number,
  width: number,
  height: number,
) {
  const aspect = width / Math.max(height, 1);
  const narrow = width < 720 || aspect < 0.92;
  const desktop = width >= 1000 && !narrow;

  if (narrow) {
    return fitSize * (width < 640 ? 0.9 : 0.94) * MODEL_SCALE_BOOST;
  }
  if (desktop) {
    return fitSize * MODEL_SCALE_BOOST * MODEL_SCALE_BOOST;
  }
  return fitSize * MODEL_SCALE_BOOST;
}

function fitModelToScene(
  model: import("three").Object3D,
  THREE: typeof import("three"),
  fitSize: number,
  width: number,
  height: number,
) {
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());

  model.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  const targetSize = resolveTargetFitSize(fitSize, width, height);
  const fitScale = targetSize / Math.max(maxDim, 0.001);
  model.scale.setScalar(fitScale);
  model.position.y += size.y * fitScale * 0.02;
}

export function TapBarModelCanvas({
  modelPath,
  fitSize = DEFAULT_TAPBAR_MODEL_FIT_SIZE,
}: TapBarModelCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let pmremGenerator: import("three").PMREMGenerator | null = null;
    let environmentMap: import("three").Texture | null = null;
    let modelScene: import("three").Object3D | null = null;
    let idleYawCenter = 0;
    let idleClock: import("three").Clock | null = null;

    const boot = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const { RoomEnvironment } = await import(
        "three/addons/environments/RoomEnvironment.js"
      );

      if (disposed) return;

      const scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0.28, 3.4);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;
      container.appendChild(renderer.domElement);
      renderer.domElement.className = "tapbar-model-canvas__el";

      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnvironment = new RoomEnvironment();
      environmentMap = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
      scene.environment = environmentMap;
      scene.environmentIntensity = 1.1;

      const hemisphere = new THREE.HemisphereLight(0xffffff, 0x141210, 0.38);
      const key = new THREE.DirectionalLight(0xfff6eb, 1.85);
      key.position.set(2.5, 4, 4.5);
      const fill = new THREE.DirectionalLight(0xa8b8ff, 0.42);
      fill.position.set(-3, 1.2, -1);
      const rim = new THREE.DirectionalLight(0xffffff, 0.75);
      rim.position.set(-1.5, 3, -3.5);
      scene.add(hemisphere, key, fill, rim);

      idleClock = new THREE.Clock();

      const fitModel = (model: import("three").Object3D) => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        fitModelToScene(model, THREE, fitSize, width, height);
      };

      const enhanceMaterials = (root: import("three").Object3D) => {
        root.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          for (const material of materials) {
            if (
              material instanceof THREE.MeshStandardMaterial ||
              material instanceof THREE.MeshPhysicalMaterial
            ) {
              material.envMapIntensity = 1.35;
              material.roughness = THREE.MathUtils.clamp(
                material.roughness * 0.84,
                0.06,
                0.52,
              );
            }
          }
        });
      };

      const resize = () => {
        if (!container || !renderer || !camera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;
        fitCameraToViewport(camera, width, height);
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      const scheduleResize = () => {
        resize();
        requestAnimationFrame(resize);
      };

      scheduleResize();

      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          if (disposed) return;
          if (modelScene) {
            scene.remove(modelScene);
            modelScene = null;
          }
          fitModel(gltf.scene);
          enhanceMaterials(gltf.scene);
          scene.add(gltf.scene);
          modelScene = gltf.scene;
          idleYawCenter = modelScene.rotation.y;
          scheduleResize();
        },
        undefined,
        (error) => {
          console.error("Tap Bar model failed to load:", error);
        },
      );

      const animate = () => {
        if (disposed || !renderer || !camera || !idleClock) return;
        frameId = window.requestAnimationFrame(animate);

        if (!prefersReducedMotion && modelScene) {
          const elapsed = idleClock.getElapsedTime();
          modelScene.rotation.y =
            idleYawCenter + IDLE_HALF_ARC * Math.sin(elapsed * IDLE_SPEED);
        }

        renderer.render(scene, camera);
      };

      animate();

      const observer = new ResizeObserver(scheduleResize);
      observer.observe(container);
      const stage = container.parentElement;
      if (stage) observer.observe(stage);
      window.addEventListener("resize", scheduleResize);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", scheduleResize);
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
      environmentMap?.dispose();
      pmremGenerator?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [fitSize, modelPath]);

  return (
    <div
      ref={containerRef}
      className="tapbar-model-canvas"
      aria-hidden="true"
    />
  );
}
