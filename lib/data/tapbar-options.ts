export const tapBarOptionIds = ["stand", "bar-2", "bar-3", "bar-4"] as const;

export type TapBarOptionId = (typeof tapBarOptionIds)[number];

/** Tapboard catalog — Bar 2 / 3 / 4 only (no Stand) */
export const tapboardOptionIds = ["bar-2", "bar-3", "bar-4"] as const;

export type TapboardOptionId = (typeof tapboardOptionIds)[number];

export const DEFAULT_TAPBOARD_OPTION_ID: TapboardOptionId = "bar-2";

/** Tapbase catalog — Base 2 / 3 / 4 */
export const tapbaseOptionIds = ["base-2", "base-3", "base-4"] as const;

export type TapbaseOptionId = (typeof tapbaseOptionIds)[number];

export const DEFAULT_TAPBASE_OPTION_ID: TapbaseOptionId = "base-3";

export type FeaturePreviewOptionId = TapBarOptionId | TapbaseOptionId;

export function isTapboardOptionId(id: TapBarOptionId): id is TapboardOptionId {
  return (tapboardOptionIds as readonly string[]).includes(id);
}

export const DEFAULT_TAPBAR_OPTION_ID: TapBarOptionId = "stand";

export const tapBarOptionModels: Record<TapBarOptionId, string> = {
  "bar-4": "/models/tapbar-4.glb",
  "bar-3": "/models/tapbar-3.glb",
  "bar-2": "/models/tapbar-2.glb",
  stand: "/models/tapstand.glb",
};

export const tapBarOptionPreviewImages: Record<TapBarOptionId, string> = {
  "bar-4": "/assets/products/tapbar-4.png",
  "bar-3": "/assets/products/tapbar-3.png",
  "bar-2": "/assets/products/tapbar-2.png",
  stand: "/assets/products/tapstand.png",
};

export const DEFAULT_TAPBAR_MODEL_FIT_SIZE = 1.72;

/** Per-variant bounding fit — only override when a GLB reads too large in the stage */
export const tapBarOptionFitSize: Record<TapBarOptionId, number> = {
  "bar-4": DEFAULT_TAPBAR_MODEL_FIT_SIZE,
  "bar-3": DEFAULT_TAPBAR_MODEL_FIT_SIZE,
  "bar-2": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 0.75,
  stand: DEFAULT_TAPBAR_MODEL_FIT_SIZE * 0.75,
};

export const tapboardOptionModels: Record<TapboardOptionId, string> = {
  "bar-4": "/models/tapboard-4.glb",
  "bar-3": "/models/tapboard-3.glb",
  "bar-2": "/models/tapboard-2.glb",
};

export const tapboardOptionPreviewImages: Record<TapboardOptionId, string> = {
  "bar-4": "/assets/products/tapboard-4.png",
  "bar-3": "/assets/products/tapboard-3.png",
  "bar-2": "/assets/products/tapboard-2.png",
};

export const tapboardOptionFitSize: Record<TapboardOptionId, number> = {
  "bar-4": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 1.2,
  "bar-3": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 1.2,
  "bar-2": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 0.75 * 1.2,
};

export const tapbaseOptionModels: Record<TapbaseOptionId, string> = {
  "base-2": "/models/tapbase-3.glb",
  "base-4": "/models/tapbase-4.glb",
  "base-3": "/models/tapbase-3.glb",
};

export const tapbaseOptionPreviewImages: Record<TapbaseOptionId, string> = {
  "base-2": "/assets/products/tapbase-3.png",
  "base-4": "/assets/products/tapbase-4.png",
  "base-3": "/assets/products/tapbase-3.png",
};

export const tapbaseOptionFitSize: Record<TapbaseOptionId, number> = {
  "base-2": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 1.2,
  "base-4": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 1.2,
  "base-3": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 1.2,
};
