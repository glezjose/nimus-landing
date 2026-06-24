"use client";

import { useEffect, useRef } from "react";
import {
  HERO_IDLE_HALF_ARC,
  HERO_IDLE_SPEED,
} from "@/lib/data/hero";

export const HERO_MODEL_PATH = "/models/hero-tapbar.glb";

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
    camera.fov = 42;
    camera.position.set(0, 0.35, 3.2);
  } else {
    camera.fov = 42;
    camera.position.set(0, 0.35, 3.2);
  }

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
  const targetSize = width < 720 ? 1.78 : width >= 1000 ? 1.83 : 2.15;
  const fitScale = targetSize / Math.max(maxDim, 0.001);
  model.scale.setScalar(fitScale);
  model.position.y += size.y * fitScale * 0.02;
}

function enhanceModelMaterials(
  root: import("three").Object3D,
  THREE: typeof import("three"),
) {
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
        material.envMapIntensity = 1.4;
        material.roughness = THREE.MathUtils.clamp(
          material.roughness * 0.82,
          0.06,
          0.5,
        );
        material.metalness = THREE.MathUtils.clamp(
          material.metalness,
          0.04,
          0.92,
        );

        if (material instanceof THREE.MeshPhysicalMaterial) {
          material.clearcoat = Math.max(material.clearcoat, 0.2);
          material.clearcoatRoughness = Math.min(
            material.clearcoatRoughness,
            0.28,
          );
        }
      }
    }
  });
}

function createContactShadow(THREE: typeof import("three")) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.42)");
    gradient.addColorStop(0.45, "rgba(0, 0, 0, 0.14)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );

  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = -1;
  return { mesh, texture };
}

function positionContactShadow(
  shadow: import("three").Mesh,
  model: import("three").Object3D,
  THREE: typeof import("three"),
) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  shadow.position.y = box.min.y - 0.02;
  const footprint = Math.max(size.x, size.z) * 1.2;
  shadow.scale.set(footprint, footprint, 1);
}

function lerpAngle(from: number, to: number, t: number) {
  let delta = ((to - from + Math.PI) % (2 * Math.PI)) - Math.PI;
  if (delta < -Math.PI) delta += 2 * Math.PI;
  return from + delta * t;
}

function captureCameraSpherical(
  camera: import("three").PerspectiveCamera,
  target: import("three").Vector3,
  THREE: typeof import("three"),
) {
  const offset = camera.position.clone().sub(target);
  return new THREE.Spherical().setFromVector3(offset);
}

function applyCameraSpherical(
  camera: import("three").PerspectiveCamera,
  target: import("three").Vector3,
  spherical: import("three").Spherical,
  THREE: typeof import("three"),
) {
  const offset = new THREE.Vector3().setFromSpherical(spherical);
  camera.position.copy(target).add(offset);
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let camera: import("three").PerspectiveCamera | null = null;
    let controls: import("three/addons/controls/OrbitControls.js").OrbitControls | null =
      null;
    let pmremGenerator: import("three").PMREMGenerator | null = null;
    let environmentMap: import("three").Texture | null = null;
    let contactShadow: import("three").Mesh | null = null;
    let contactShadowTexture: import("three").CanvasTexture | null = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const boot = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const { OrbitControls } = await import(
        "three/addons/controls/OrbitControls.js"
      );
      const { RoomEnvironment } = await import(
        "three/addons/environments/RoomEnvironment.js"
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

      const defaultTarget = new THREE.Vector3(0, 0, 0);
      let defaultCameraSpherical = captureCameraSpherical(
        camera,
        defaultTarget,
        THREE,
      );
      const defaultModelYaw = 0;
      const idleResetDelayMs = 2500;
      const resetLerp = 0.045;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      container.appendChild(renderer.domElement);
      renderer.domElement.className = "hero-canvas__el";

      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnvironment = new RoomEnvironment();
      environmentMap = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
      scene.environment = environmentMap;
      scene.environmentIntensity = 1.15;

      const hemisphere = new THREE.HemisphereLight(0xffffff, 0x141210, 0.42);
      const ambient = new THREE.AmbientLight(0xffffff, 0.28);
      const key = new THREE.DirectionalLight(0xfff6eb, 2.1);
      key.position.set(3, 4, 5);
      const fill = new THREE.DirectionalLight(0xa8b8ff, 0.48);
      fill.position.set(-3.5, 1.5, -1.5);
      const rim = new THREE.DirectionalLight(0xffffff, 0.9);
      rim.position.set(-2, 3.5, -4);
      scene.add(hemisphere, ambient, key, fill, rim);

      const shadow = createContactShadow(THREE);
      contactShadow = shadow.mesh;
      contactShadowTexture = shadow.texture;
      scene.add(contactShadow);

      controls = new OrbitControls(
        camera,
        interactRef.current ?? renderer.domElement,
      );
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.04;
      controls.rotateSpeed = 0.55;
      controls.minPolarAngle = Math.PI * 0.28;
      controls.maxPolarAngle = Math.PI * 0.62;
      controls.target.set(0, 0, 0);

      const idleHalfArc = HERO_IDLE_HALF_ARC;
      const idleSpeed = HERO_IDLE_SPEED;
      let modelScene: import("three").Object3D | null = null;
      let idleYawCenter = defaultModelYaw;
      let userInteracting = false;
      let isResetting = false;
      let resetTimer: number | undefined;
      const idleClock = new THREE.Clock();

      const syncDefaultCamera = () => {
        if (!camera || !controls) return;
        fitCameraToViewport(
          camera,
          container.clientWidth,
          container.clientHeight,
        );
        defaultCameraSpherical = captureCameraSpherical(
          camera,
          controls.target,
          THREE,
        );
      };

      const scheduleIdleReset = () => {
        if (resetTimer !== undefined) {
          window.clearTimeout(resetTimer);
        }
        resetTimer = window.setTimeout(() => {
          isResetting = true;
          resetTimer = undefined;
        }, idleResetDelayMs);
      };

      const cancelIdleReset = () => {
        if (resetTimer !== undefined) {
          window.clearTimeout(resetTimer);
          resetTimer = undefined;
        }
        isResetting = false;
      };

      const resize = () => {
        if (!container || !renderer || !camera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;

        if (!userInteracting && !isResetting) {
          syncDefaultCamera();
        } else {
          fitCameraToViewport(camera, width, height);
        }

        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      controls.addEventListener("start", () => {
        userInteracting = true;
        cancelIdleReset();
      });
      controls.addEventListener("end", () => {
        userInteracting = false;
        scheduleIdleReset();
      });

      resize();

      const loader = new GLTFLoader();
      loader.load(
        HERO_MODEL_PATH,
        (gltf) => {
          if (disposed) return;

          fitModelToScene(gltf.scene, THREE, container.clientWidth);
          enhanceModelMaterials(gltf.scene, THREE);
          scene.add(gltf.scene);
          modelScene = gltf.scene;
          idleYawCenter = defaultModelYaw;

          if (contactShadow) {
            positionContactShadow(contactShadow, gltf.scene, THREE);
          }
        },
        undefined,
        (error) => {
          console.error("Hero model failed to load:", error);
        },
      );

      const animate = () => {
        if (disposed || !renderer || !camera || !controls) return;
        frameId = window.requestAnimationFrame(animate);

        if (isResetting && modelScene) {
          controls.enableDamping = false;

          const currentSpherical = captureCameraSpherical(
            camera,
            controls.target,
            THREE,
          );

          currentSpherical.theta = lerpAngle(
            currentSpherical.theta,
            defaultCameraSpherical.theta,
            resetLerp,
          );
          currentSpherical.phi = THREE.MathUtils.lerp(
            currentSpherical.phi,
            defaultCameraSpherical.phi,
            resetLerp,
          );
          currentSpherical.radius = THREE.MathUtils.lerp(
            currentSpherical.radius,
            defaultCameraSpherical.radius,
            resetLerp,
          );

          applyCameraSpherical(
            camera,
            controls.target,
            currentSpherical,
            THREE,
          );

          modelScene.rotation.y = lerpAngle(
            modelScene.rotation.y,
            defaultModelYaw,
            resetLerp,
          );

          const cameraSettled =
            Math.abs(currentSpherical.theta - defaultCameraSpherical.theta) <
              0.015 &&
            Math.abs(currentSpherical.phi - defaultCameraSpherical.phi) <
              0.015 &&
            Math.abs(currentSpherical.radius - defaultCameraSpherical.radius) <
              0.03;
          const modelSettled =
            Math.abs(modelScene.rotation.y - defaultModelYaw) < 0.015;

          if (cameraSettled && modelSettled) {
            applyCameraSpherical(
              camera,
              controls.target,
              defaultCameraSpherical,
              THREE,
            );
            modelScene.rotation.y = defaultModelYaw;
            idleYawCenter = defaultModelYaw;
            isResetting = false;
            controls.enableDamping = true;
            idleClock.start();
          }
        } else if (
          !prefersReducedMotion &&
          modelScene &&
          !userInteracting
        ) {
          controls.enableDamping = true;
          const elapsed = idleClock.getElapsedTime();
          modelScene.rotation.y =
            idleYawCenter + idleHalfArc * Math.sin(elapsed * idleSpeed);
        }

        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      const observer = new ResizeObserver(resize);
      observer.observe(container);
      window.addEventListener("resize", resize);

      return () => {
        if (resetTimer !== undefined) {
          window.clearTimeout(resetTimer);
        }
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
      contactShadow?.geometry.dispose();
      contactShadow?.material &&
        !Array.isArray(contactShadow.material) &&
        contactShadow.material.dispose();
      contactShadowTexture?.dispose();
      environmentMap?.dispose();
      pmremGenerator?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="hero-canvas" aria-hidden="true" />
      <div
        ref={interactRef}
        className="hero-stage__interact"
        aria-hidden="true"
      />
    </>
  );
}
