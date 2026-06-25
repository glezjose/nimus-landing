export const tapBarOptionIds = ["bar-4", "bar-3", "bar-2", "stand"] as const;

export type TapBarOptionId = (typeof tapBarOptionIds)[number];

/** Tapboard catalog — Bar 2 / 3 / 4 only (no Stand) */
export const tapboardOptionIds = ["bar-4", "bar-3", "bar-2"] as const;

export type TapboardOptionId = (typeof tapboardOptionIds)[number];

export const DEFAULT_TAPBOARD_OPTION_ID: TapboardOptionId = "bar-4";

export function isTapboardOptionId(id: TapBarOptionId): id is TapboardOptionId {
  return (tapboardOptionIds as readonly string[]).includes(id);
}

export const DEFAULT_TAPBAR_OPTION_ID: TapBarOptionId = "bar-4";

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
