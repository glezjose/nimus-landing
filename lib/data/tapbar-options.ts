export const tapBarOptionIds = ["bar-4", "bar-3", "bar-2", "stand"] as const;

export type TapBarOptionId = (typeof tapBarOptionIds)[number];

export const DEFAULT_TAPBAR_OPTION_ID: TapBarOptionId = "bar-4";

export const tapBarOptionModels: Record<TapBarOptionId, string> = {
  "bar-4": "/models/tapbar-4.glb",
  "bar-3": "/models/tapbar-3.glb",
  "bar-2": "/models/tapbar-2.glb",
  stand: "/models/tapstand.glb",
};

export const DEFAULT_TAPBAR_MODEL_FIT_SIZE = 1.72;

/** Per-variant bounding fit — only override when a GLB reads too large in the stage */
export const tapBarOptionFitSize: Record<TapBarOptionId, number> = {
  "bar-4": DEFAULT_TAPBAR_MODEL_FIT_SIZE,
  "bar-3": DEFAULT_TAPBAR_MODEL_FIT_SIZE,
  "bar-2": DEFAULT_TAPBAR_MODEL_FIT_SIZE * 0.75,
  stand: DEFAULT_TAPBAR_MODEL_FIT_SIZE * 0.75,
};
